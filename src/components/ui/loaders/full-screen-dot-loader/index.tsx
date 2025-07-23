import { DotLoader } from '@/components/ui/animation/dot-loader';

const FullScreenDotLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
      <DotLoader color="primary" />
    </div>
  );
};

export default FullScreenDotLoader;
