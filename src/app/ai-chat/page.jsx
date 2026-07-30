import AIChatClient from './AIChatClient';

export const metadata = {
  title: 'AI Chat',
  description:
    "Chat with Dan Spelt's AI assistant. Ask about his full stack development experience, skills, projects, and how he can help with your software needs.",
  alternates: {
    canonical: 'https://danspelt.com/ai-chat',
  },
};

export default function AIChatPage() {
  return <AIChatClient />;
}
