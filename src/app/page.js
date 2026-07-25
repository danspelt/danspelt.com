import HomeClient from './HomeClient';

export const metadata = {
  title: {
    absolute: 'Dan Spelt — Senior Full-Stack Engineer & Accessibility Specialist',
  },
  description:
    'I build accessible web applications with 18+ years of experience. Lived WCAG expertise, AI-assisted delivery, and practical custom software from Victoria, BC.',
  alternates: {
    canonical: 'https://danspelt.com',
  },
};

export default function Home() {
  return <HomeClient />;
}
