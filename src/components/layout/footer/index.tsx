import { MyLink } from '@/components/ui/my-link';

export const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto flex items-center justify-between px-4 pt-10 pb-4">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Shortly. All rights reserved.</p>

        {/* Disabled prefetch for admin link as it redirects to a protected route from a public route */}
        {/* TODO: Hide link for non-admin users */}
        <MyLink prefetch={false} href="/admin">
          Admin
        </MyLink>
      </div>
    </footer>
  );
};
