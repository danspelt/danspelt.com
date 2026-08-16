import EvidenceCaseStudy from '@/components/project-case-study/EvidenceCaseStudy';
import { getProjectProof } from '@/data/project-proof';

export const metadata = {
  title: 'WindowsHelperSuite Case Study | Dan Spelt',
  description:
    'How WindowsHelperSuite coordinates writing assistance, hotkeys, speech, settings, and desktop input through a modular .NET architecture.',
};

export default function WindowsHelperSuiteCaseStudyPage() {
  return <EvidenceCaseStudy project={getProjectProof('windows-helper-suite')} />;
}
