import { Input } from '@/components/ui/input'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from '../../component/ui/table-ui/data-table-pagination'
import { DataTableViewOptions } from '../../component/ui/table-ui/data-table-view-options'
import { Button } from '@/components/ui/button'

export function DataTable({ columns, data }) {
	const [sorting, setSorting] = React.useState([])
	const [columnFilters, setColumnFilters] = React.useState([])
	const [columnVisibility, setColumnVisibility] = React.useState({})
	const [rowSelection, setRowSelection] = React.useState({})
	const [globalFilter, setGlobalFilter] = React.useState('')
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 3,
	})
	const [canScrollLeft, setCanScrollLeft] = React.useState(false)
	const [canScrollRight, setCanScrollRight] = React.useState(false)
	const [isTableVisible, setIsTableVisible] = React.useState(false)
	const [isHeaderSticky, setIsHeaderSticky] = React.useState(false)
	const [tableRect, setTableRect] = React.useState(null)
	const tableRef = React.useRef(null)
	const tableWrapperRef = React.useRef(null)
	const headerRef = React.useRef(null)

	const checkScrollable = React.useCallback(() => {
		if (tableRef.current) {
			const scrollContainer =
				tableRef.current.querySelector('div') || tableRef.current
			setCanScrollLeft(scrollContainer.scrollLeft > 0)
			setCanScrollRight(
				scrollContainer.scrollLeft <
					scrollContainer.scrollWidth - scrollContainer.clientWidth
			)

			// Update table position
			const rect = tableWrapperRef.current.getBoundingClientRect()

			setTableRect(rect)
		}
	}, [])

	React.useEffect(() => {
		const scrollContainer =
			tableRef.current.querySelector('div') || tableRef.current

		if (scrollContainer) {
			checkScrollable()
			scrollContainer.addEventListener('scroll', checkScrollable)
			window.addEventListener('resize', checkScrollable)
			window.addEventListener('scroll', checkScrollable)
			// Listen for main-content width changes
			const mainContent = document.getElementById('main-content')
			let resizeObserver
			if (mainContent) {
				resizeObserver = new ResizeObserver(checkScrollable)
				resizeObserver.observe(mainContent)
			}
			// Set up intersection observer for table visibility
			const tableObserver = new IntersectionObserver(
				([entry]) => {
					setIsTableVisible(entry.isIntersecting)
				},
				{
					// threshold: 0.1 means the callback will trigger when 10% of the target element becomes visible in or exits the viewport
					threshold: 0.1,
				}
			)

			// Set up intersection observer for header
			const headerObserver = new IntersectionObserver(
				([entry]) => {
					if (isTableVisible) {
						setIsHeaderSticky(!entry.isIntersecting)
					}
				},
				{ threshold: 1.0 }
			)

			tableObserver.observe(tableRef.current)
			if (headerRef.current) {
				headerObserver.observe(headerRef.current)
			}

			return () => {
				scrollContainer.removeEventListener('scroll', checkScrollable)
				window.removeEventListener('resize', checkScrollable)
				window.removeEventListener('scroll', checkScrollable)
				tableObserver.disconnect()
				headerObserver.disconnect()
				if (resizeObserver) {
					resizeObserver.disconnect()
				}
			}
		}
	}, [checkScrollable, isTableVisible])

	const handleScroll = (direction) => {
		if (tableRef.current) {
			// Get the scrollable container - likely need to target the inner div that actually scrolls
			const scrollContainer =
				tableRef.current.querySelector('div') || tableRef.current

			const scrollAmount = scrollContainer.clientWidth * 0.9
			const currentScroll = scrollContainer.scrollLeft
			const newScroll =
				direction === 'left'
					? currentScroll - scrollAmount
					: currentScroll + scrollAmount

			scrollContainer.scrollTo({
				left: newScroll,
				behavior: 'smooth',
			})
		}
	}

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: 'includesString',
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
			globalFilter,
		},
	})

	return (
		<div>
			<div className='flex items-center py-4 gap-2'>
				<Input
					placeholder='Search all columns...'
					value={globalFilter ?? ''}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className='max-w-sm'
				/>
				<DataTableViewOptions table={table} />
			</div>

			<div className='relative ' ref={tableWrapperRef}>
				<div
					className='rounded-md border overflow-x-auto'
					ref={tableRef}
					style={{ scrollBehavior: 'smooth' }}
				>
					{isTableVisible && canScrollLeft && tableRect && (
						<Button
							variant='outline'
							size='icon'
							className='fixed top-1/2 transform -translate-y-1/2 z-10 rounded-full shadow-lg bg-white'
							style={{ left: `${tableRect.left - 40}px` }}
							onClick={() => handleScroll('left')}
						>
							<ChevronLeftIcon className='h-4 w-4' />
						</Button>
					)}
					<Table>
						<TableHeader
							ref={headerRef}
							className={
								isHeaderSticky ? 'sticky top-0 bg-white  shadow-sm' : ''
							}
						>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext()
													  )}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className='h-24 text-center'
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					{isTableVisible && canScrollRight && tableRect && (
						<Button
							variant='outline'
							size='icon'
							className='fixed top-1/2 transform -translate-y-1/2 z-10 rounded-full shadow-lg bg-white'
							style={{ left: `${tableRect.right - 10}px` }}
							onClick={() => handleScroll('right')}
						>
							<ChevronRightIcon className='h-4 w-4' />
						</Button>
					)}
				</div>
			</div>

			<div className='py-4'>
				<DataTablePagination table={table} />
			</div>
		</div>
	)
}
