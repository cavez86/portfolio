import { getLocalizedCollection } from '@/components/utils/db';

import LanguagesSectionView from './LanguagesSectionView';

const LanguagesSection = async () => {
  const languages = await getLocalizedCollection('languages');

  return <LanguagesSectionView languages={languages.docs} />;
};

export default LanguagesSection;
