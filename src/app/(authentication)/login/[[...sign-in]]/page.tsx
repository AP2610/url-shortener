import { LoginForm } from '@/components/features/authentication/login-form';

// TODO: Implement forgot password flow - https://clerk.com/docs/custom-flows/forgot-password

const Login = () => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center gap-10 px-4 pt-[var(--header-height)]">
      <LoginForm />
    </div>
  );
};

export default Login;
