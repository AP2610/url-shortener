import { ExpiryModal } from '@/components/features/expiry-modal';
import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { Heading } from '@/components/ui/heading';
import { MyLink } from '@/components/ui/my-link';

const ExpiredPage = () => {
  return (
    <>
      <ExpiryModal isExpired={true}>
        <Heading level="h1" className="mb-6">
          Expired Link
        </Heading>

        <div className="flex flex-col gap-4">
          <p className="text-dark-gray">Whoops! Looks like that link has expired</p>

          <MyLink variant="primary" href="/">
            Homepage
          </MyLink>
        </div>
      </ExpiryModal>

      <AnimatedElementPresence
        delay={2}
        className="container mx-auto flex h-full flex-col items-center justify-center px-4 pt-[var(--header-height)] pb-10"
      >
        <Heading level="h1" className="mb-6">
          Expired Link
        </Heading>

        <MyLink variant="primary" href="/">
          Homepage
        </MyLink>
      </AnimatedElementPresence>
    </>
  );
};

export default ExpiredPage;
