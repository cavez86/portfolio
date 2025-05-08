import { getLocalizedCollection, getLocalizedGlobal } from '@/components/utils/db';
import HeroSectionView from './HeroSectionView';

const HeroSection = async () => {
  const personalInfo = await getLocalizedGlobal('personal-info');
  const summaryInfo = await getLocalizedCollection('summary-info');

  return <HeroSectionView personalInfo={personalInfo} summaryInfo={summaryInfo.docs} />;
};

export default HeroSection;
