import { UrlForm } from '@/components/features/url-form';
import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { EntryAnimation } from '@/components/ui/animation/entry-animation';
import { Heading } from '@/components/ui/heading';
import { MyLink } from '@/components/ui/my-link';
import { TextWithUnderline } from '@/components/ui/text-with-underline';
import { SignedOut } from '@clerk/nextjs';

const Home = () => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 pt-[var(--header-height)] pb-10">
      <EntryAnimation />
      <AnimatedElementPresence shouldWaitToAnimateFor="entry-animation">
        <div className="mb-8 flex flex-col items-center justify-center space-y-8 text-center md:mb-16">
          <Heading level="h1">
            Got a long URL? <TextWithUnderline text="Shortly" className="text-primary" svgClassName="text-foreground" /> it!
          </Heading>

          <p className="text-dark-gray">Shorten your links with our URL shortening service. It's free and easy to use.</p>
        </div>
      </AnimatedElementPresence>

      <UrlForm />

      <SignedOut>
        <AnimatedElementPresence shouldWaitToAnimateFor="entry-animation">
          <p className="mt-8 text-center text-dark-gray">
            Want to keep track of your shortened links? <MyLink href="/sign-up">Sign up!</MyLink>.
          </p>
        </AnimatedElementPresence>
      </SignedOut>
    </div>
  );
};

export default Home;
