import { MyLink } from '@/components/ui/my-link';
import { cn } from '@/lib/utils/cn';
import { FaHome } from 'react-icons/fa';

interface HomeLinkIconProps {
  className?: string;
}

export const HomeLinkIcon = ({ className }: HomeLinkIconProps) => {
  return (
    <MyLink
      variant="icon-button"
      href="/"
      title="Home"
      className={cn('flex rounded-full bg-secondary p-3 transition-colors hover:bg-secondary/80', className)}
    >
      <FaHome size={18} className="pointer-events-none text-white" />
    </MyLink>
  );
};
