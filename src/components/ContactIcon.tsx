import type { LucideIcon, LucideProps } from 'lucide-react';
import { Mail, Linkedin, Github } from 'lucide-react';

export type ContactType = 'email' | 'linkedin' | 'github';

interface ContactIconProps extends LucideProps {
  type: ContactType;
}

const iconMap: Record<ContactType, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
};

export const ContactIcon = ({ type, ...props }: ContactIconProps) => {
  const Icon = iconMap[type] || Mail;
  return <Icon {...props} />;
};
