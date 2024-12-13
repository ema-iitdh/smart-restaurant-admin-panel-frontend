import { FormLabel } from '@/components/ui/form';

export default function FormCustomLabel({ required, children }) {
  return (
    <div>
      <FormLabel className='text-sm font-medium text-gray-900'>
        {children} {required && <span className='text-red-500'>*</span>}
      </FormLabel>
    </div>
  );
}
