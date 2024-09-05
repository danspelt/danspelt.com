import Image from "next/image";
const About = () => {
  return (
    <div className="flex flex-col items-center">
              <div className="w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Dan Spelt: Transforming Challenges into Innovation</h1>
        <Image
         src="/images/dan.jpeg"
          alt="Dan Spelt"
          width={200}
          height={200}
          className="rounded-full mb-4"
        />
        <p className="text-lg mb-4">
          Greetings, I'm Dan Spelt, a seasoned full-stack web developer with over 18 years of experience in crafting robust, scalable, and user-centric applications. My ability to collaborate with cross-functional teams, coupled with my technical expertise, has consistently resulted in the successful delivery of projects that meet both business and user needs.
        </p>
        <p className="text-lg mb-4">
          I also am able to incorporate an insight and level of expertise few can parallel, this expertise is not just theoretical; it is born out of personal experience. I was born with cerebral palsy, a condition affecting muscle coordination and mobility. I have faced unique challenges throughout my life, and this has fueled my drive to innovate and find creative solutions which I incorporate into every project. I bring a unique blend of technical expertise, real-world experience, and a relentless drive to create solutions that empower users and clients alike.
        </p>
        <p className="text-lg mb-4">
          Choosing to collaborate with me means partnering with a professional who is not only skilled but an addition, deeply committed to making technology accessible to all. My condition has never been a limitation; instead, it has been a source of inspiration, driving me to push the boundaries of what is possible in web development. It has instilled in me resilience, adaptability, and a profound understanding of the importance of accessibility in technology.
        </p>
        <p className="text-lg mb-4">
          I have led the development of several high-impact projects, including a Next.js app designed to enhance device accessibility and a comprehensive visualization dashboard using the MERN stack. I have implemented WCAG 2.0 standards in various projects, resulting in improved accessibility compliance and enhanced user experiences for individuals with disabilities. My commitment to accessibility extends beyond compliance; it is about creating genuinely inclusive experiences.
        </p>
        <p className="text-lg mb-4">
          Whether you are seeking a senior developer to lead a complex project or a partner who understands the nuances of accessibility and diversity, I am confident that my skills and experiences will make a valuable contribution to your team. Let us collaborate to build something extraordinary together.
        </p>
      </div>
    </div>
  );
};

export default About;

