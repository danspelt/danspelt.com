import ChatClient from './ChatClient';

export const metadata = {
  title: 'Message',
  description:
    'Draft a short conversation for Dan Spelt and email it to his inbox. Personal replies — not a live chatbot.',
  alternates: {
    canonical: 'https://danspelt.com/chat',
  },
};

export default function ChatPage() {
  return <ChatClient />;
}
