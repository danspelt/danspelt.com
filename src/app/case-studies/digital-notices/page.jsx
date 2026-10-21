import EvidenceCaseStudy from '@/components/project-case-study/EvidenceCaseStudy';
import { getProjectProof } from '@/data/project-proof';

export const metadata = {
  title: 'Digital Notices with Proof of Delivery Case Study',
  description:
    'A demo app for BC property and strata managers featuring digital notice delivery, resident consent recording, per-recipient delivery tracking, and audit-ready proof-of-delivery logs.',
  alternates: {
    canonical: 'https://danspelt.com/case-studies/digital-notices',
  },
  openGraph: {
    title: 'Digital Notices with Proof of Delivery Case Study | Dan Spelt',
    description:
      'How Digital Notices tracks consent, delivery status, and provides SHA-256 fingerprinted proof-of-delivery logs for BC property managers.',
    url: 'https://danspelt.com/case-studies/digital-notices',
    images: ['/og.png'],
  },
};

export default function DigitalNoticesCaseStudyPage() {
  return <EvidenceCaseStudy project={getProjectProof('digital-notices')} />;
}
