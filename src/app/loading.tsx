import { Heading } from '@/components/ui/heading';
import { LOGO_TEXT } from '@/components/ui/logo';
import { AnimatedText } from '@/components/ui/animation/animated-text';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <Heading level="h1" color="purple">
        <AnimatedText text={LOGO_TEXT} />
      </Heading>
    </div>
  );
};

export default Loading;
