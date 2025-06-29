import { MyLink } from '@/components/ui/my-link';

export const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto flex items-center justify-between px-4 pt-10 pb-4">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Shortly. All rights reserved.</p>

        <MyLink href="/admin">Admin</MyLink>
      </div>
    </footer>
  );
};
