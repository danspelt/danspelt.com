import EvidenceCaseStudy from '@/components/project-case-study/EvidenceCaseStudy';
import { getProjectProof } from '@/data/project-proof';

export const metadata = {
  title: 'WindowsHelperSuite .NET Desktop App Case Study',
  description:
    'A .NET desktop application case study covering writing assistance, global hotkeys, text-to-speech, settings, testing, and modular Windows architecture.',
  alternates: {
    canonical: 'https://danspelt.com/case-studies/windows-helper-suite',
  },
  openGraph: {
    title: 'WindowsHelperSuite .NET Desktop App Case Study | Dan Spelt',
    description:
      'How WindowsHelperSuite coordinates writing assistance, hotkeys, speech, settings, and desktop input.',
    url: 'https://danspelt.com/case-studies/windows-helper-suite',
    images: ['/og.png'],
  },
};

export default function WindowsHelperSuiteCaseStudyPage() {
  return <EvidenceCaseStudy project={getProjectProof('windows-helper-suite')} />;
}
