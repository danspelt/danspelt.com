import EvidenceCaseStudy from '@/components/project-case-study/EvidenceCaseStudy';
import { getProjectProof } from '@/data/project-proof';

export const metadata = {
  title: 'CareBoard Care Coordination Case Study',
  description:
    'A full-stack care-coordination case study covering household employers, role-isolated worker dashboards, scheduling, employer records, testing, and known constraints.',
  alternates: {
    canonical: 'https://danspelt.com/case-studies/careboard',
  },
  openGraph: {
    title: 'CareBoard Care Coordination Case Study | Dan Spelt',
    description:
      'How CareBoard gives BC household employers and care workers scheduling, task proof, handoffs, and employer records in one private system.',
    url: 'https://danspelt.com/case-studies/careboard',
    images: ['/og.png'],
  },
};

export default function CareBoardCaseStudyPage() {
  return <EvidenceCaseStudy project={getProjectProof('careboard')} />;
}
