import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { forwardRef } from 'react';

const DeleteDialog = forwardRef(
  ({ deleteApiFunction, data, closeDropdown }, ref) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
      mutationFn: deleteApiFunction,
      onSuccess: () => {
        toast.success(`${data.name} deleted successfully`);
        setIsDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      },
      onError: () => {
        toast.error(`${data.name} deletion failed`);
      },
      onSettled: () => {
        closeDropdown();
      },
    });

    return (
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            closeDropdown();
          }
        }}
      >
        <DialogTrigger className='bg-rose-500 hover:bg-rose-600 w-full text-slate-100 py-1 px-2 rounded'>
          Delete
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete and
              remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={isPending} variant='destructive' onClick={mutate}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

DeleteDialog.displayName = 'DeleteDialog';

export default DeleteDialog;
