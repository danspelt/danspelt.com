import Image from 'next/image';

const Landing = () => {
  return (
    <div className="min-h-screen p-8 bg-white text-gray-900">
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center">
          Dan Spelt
        </h1>
        <h2 className="text-2xl font-medium text-center mt-2">
          Full Stack Web Developer
        </h2>
      </header>
      <section className="flex flex-col items-center">
          <Image
            src="/images/dan.jpeg"
            alt="Dan Spelt Full Stack Web Developer"
            width={300}
            height={300}
            className="rounded-full shadow-2xl mb-8"
          />
        <div className="w-2/3 text-center">
          <p className="text-xl leading-relaxed">
      Hi, my name is Dan Spelt. I’m a full stack developer, specialized in developing web applications using React, Next.js, Node.js, and more, with a passion for creating efficient and scalable solutions.
          </p>
        </div>
      </section>
        </div>
  );
};

export default Landing;