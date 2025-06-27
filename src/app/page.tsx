import { UrlForm } from '@/components/features/url-form';
import { EntryAnimation } from '@/components/ui/entry-animation';

const Home = () => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center pt-[var(--header-height)]">
      <EntryAnimation />
      <UrlForm />
    </div>
  );
};

export default Home;
