import InsightsClient from './InsightsClient';

export const metadata = {
  title: 'When a Business Problem Becomes a Software Opportunity',
  description:
    'Everyday process friction often points directly to where custom software can help. A short article on spotting workflow opportunities and building practical software around real business problems.',
  openGraph: {
    title: 'What If the Problems Holding Your Business Back Are Actually Pointing the Way Forward?',
    description:
      'Everyday process friction often points directly to where custom software can help.',
    type: 'article',
    url: 'https://danspelt.com/insights',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://danspelt.com/insights',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What If the Problems Holding Your Business Back Are Actually Pointing the Way Forward?',
  author: {
    '@type': 'Person',
    name: 'Dan Spelt',
    url: 'https://danspelt.com',
  },
  publisher: {
    '@type': 'Person',
    name: 'Dan Spelt',
    url: 'https://danspelt.com',
  },
  url: 'https://danspelt.com/insights',
};

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InsightsClient />
    </>
  );
}
