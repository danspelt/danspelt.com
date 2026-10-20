import EvidenceCaseStudy from '@/components/project-case-study/EvidenceCaseStudy';
import { getProjectProof } from '@/data/project-proof';

export const metadata = {
  title: 'AccessLens Accessibility Mapping Case Study',
  description:
    'A full-stack accessibility mapping case study covering place scoring, community evidence, geospatial search, authentication, testing, and known constraints.',
  alternates: {
    canonical: 'https://danspelt.com/case-studies/accesslens',
  },
  openGraph: {
    title: 'AccessLens Accessibility Mapping Case Study | Dan Spelt',
    description:
      'How AccessLens combines accessibility evidence, place scoring, mapping, authentication, and community contributions.',
    url: 'https://danspelt.com/case-studies/accesslens',
    images: ['/og.png'],
  },
};

export default function AccessLensCaseStudyPage() {
  return <EvidenceCaseStudy project={getProjectProof('accesslens')} />;
}
