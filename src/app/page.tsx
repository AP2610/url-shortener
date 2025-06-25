import { UrlForm } from '@/components/url-form';
import prisma from '@/lib/db/prisma';

const Home = async () => {
  const urls = await prisma.uRL.findMany();

  console.log(urls);

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      Linkly
      <UrlForm />
    </div>
  );
};

export default Home;
