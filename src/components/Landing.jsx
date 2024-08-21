import IntroVideo from './IntroVideo';
const Landing = () => {
  return (
    <div className='flex flex-col items-center'>
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold text-center">
          Dan Spelt
        </h1>
        <h2 className="text-2xl font-medium text-center mt-2">
          Full Stack Web Developer
        </h2>
      </header>
      <IntroVideo />
      <div className="flex flex-row items-center p-12">
        <div className="w-full">
          <p className="text-2xl leading-relaxed">
            Dan Spelt, a full-stack developer with cerebral palsy, demonstrates that physical limitations do not diminish his capabilities in the tech industry. Cerebral palsy may present certain challenges, but Dan has successfully navigated these by leveraging adaptive technologies and a problem-solving mindset. His expertise in web development, particularly in creating accessible and user-friendly applications, showcases his ability to excel in a field that demands precision and innovation. Dan’s commitment to accessibility is also enhanced by his personal experiences, making him a valuable asset in any development team.

            Dan’s success as a developer highlights the importance of adaptability, continuous learning, and the effective use of technology to overcome challenges, proving that disabilities do not define one’s professional capabilities.          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;