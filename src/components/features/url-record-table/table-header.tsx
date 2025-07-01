import { cn } from '@/lib/utils/cn';

export type TableHeaderWidth = 'small' | 'medium' | 'large' | 'xl';

interface TableHeaderProps {
  children: React.ReactNode;
  className?: React.ComponentProps<'th'>['className'];
  width: TableHeaderWidth;
}

export const TableHeader = ({ children, className, width }: TableHeaderProps) => {
  const tableHeaderClasses = cn('resize-x overflow-hidden border border-dark-gray px-4 py-2', {
    'w-16': width === 'small',
    'w-24': width === 'medium',
    'w-32': width === 'large',
    'w-64': width === 'xl',
  });

  return <th className={cn(tableHeaderClasses, className)}>{children}</th>;
};
