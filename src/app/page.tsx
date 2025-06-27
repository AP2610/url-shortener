import { UrlForm } from '@/components/features/url-form';
import { EntryAnimation } from '@/components/ui/entry-animation';

const Home = () => {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <EntryAnimation />
      <UrlForm />
    </div>
  );
};

export default Home;
