import EvidenceCaseStudy from '@/components/project-case-study/EvidenceCaseStudy';
import { getProjectProof } from '@/data/project-proof';

export const metadata = {
  title: 'AccessLens Case Study | Dan Spelt',
  description:
    'How AccessLens structures accessibility evidence, place scoring, mapping, authentication, and community contributions.',
};

export default function AccessLensCaseStudyPage() {
  return <EvidenceCaseStudy project={getProjectProof('accesslens')} />;
}
