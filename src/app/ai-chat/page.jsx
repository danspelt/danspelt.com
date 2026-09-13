import AIChatClient from './AIChatClient';

export const metadata = {
  title: 'Ask About Dan Spelt’s Software Development Work',
  description:
    "Chat with Dan Spelt's AI assistant. Ask about his full stack development experience, skills, projects, and how he can help with your software needs.",
  alternates: {
    canonical: 'https://danspelt.com/ai-chat',
  },
  openGraph: {
    title: 'Ask About Dan Spelt’s Software Development Work',
    description:
      'Ask Dan Spelt’s AI assistant about his full-stack development experience, skills, projects, and software services.',
    url: 'https://danspelt.com/ai-chat',
    images: ['/og.png'],
  },
};

export default function AIChatPage() {
  return <AIChatClient />;
}
