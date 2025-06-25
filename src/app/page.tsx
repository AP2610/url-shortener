import { UrlForm } from '@/components/url-form';
// import prisma from '@/lib/db/prisma';

const Home = async () => {
  // const urls = await prisma.uRL.findMany();

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <UrlForm />
    </div>
  );
};

export default Home;
