import { Checkbox } from '@/components/ui/checkbox';

export default function BatchSelect({ row }) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label='Select row'
    />
  );
}
