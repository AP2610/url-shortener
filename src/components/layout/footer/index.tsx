import { MyLink } from '@/components/ui/my-link';

export const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 pt-10 pb-4">
        <p className="text-sm text-light-gray">&copy; {new Date().getFullYear()} Shortly. All rights reserved.</p>

        <MyLink href="/privacy-policy" className="ml-auto">
          Privacy Policy
        </MyLink>

        {/* Disabled prefetch for admin link as it redirects to a protected route from a public route */}
        <MyLink prefetch={false} href="/admin">
          Admin
        </MyLink>
      </div>
    </footer>
  );
};
