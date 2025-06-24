import { UrlForm } from '@/components/features/url-form';
import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { EntryAnimation } from '@/components/ui/animation/entry-animation';
import { Heading } from '@/components/ui/heading';
import { MyLink } from '@/components/ui/my-link';

const Home = () => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 pb-10 pt-[var(--header-height)]">
      <EntryAnimation />
      <AnimatedElementPresence shouldWaitToAnimateFor="entry-animation">
        <div className="mb-8 flex flex-col items-center justify-center space-y-8 text-center md:mb-16">
          <Heading level="h1">Got a long URL? Shortly it!</Heading>

          <p className="text-dark-gray">Shorten your links with our URL shortening service. It's free and easy to use.</p>
        </div>
      </AnimatedElementPresence>

      <UrlForm />

      {/* TODO: Guard with auth */}
      <AnimatedElementPresence shouldWaitToAnimateFor="entry-animation">
        <p className="text-dark-gray mt-8 text-center">
          Want to keep track of your shortened links? <MyLink href="/sign-up">Sign up!</MyLink>.
        </p>
      </AnimatedElementPresence>
    </div>
  );
};

export default Home;
