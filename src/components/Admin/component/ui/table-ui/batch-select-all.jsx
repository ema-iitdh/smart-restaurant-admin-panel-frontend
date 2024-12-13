import { Checkbox } from '@/components/ui/checkbox';

function BatchSelectAll({ table }) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label='Select all'
    />
  );
}
export default BatchSelectAll;
