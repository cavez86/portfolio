import { getLocalizedCollection } from '@/components/utils/db';
import ContactSectionView from './ContactSectionView';

const ContactSection = async () => {
  const contacts = await getLocalizedCollection('contacts');

  return <ContactSectionView contacts={contacts.docs} />;
};

export default ContactSection;
