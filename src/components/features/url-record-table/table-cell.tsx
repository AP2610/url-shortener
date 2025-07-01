import { cn } from '@/lib/utils/cn';

interface TableCellProps {
  children: React.ReactNode;
  className?: React.ComponentProps<'td'>['className'];
}

export const TableCell = ({ children, className }: TableCellProps) => {
  return <td className={cn('truncate border border-dark-gray px-4 py-2', className)}>{children}</td>;
};
