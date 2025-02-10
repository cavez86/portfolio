import { Mail, Linkedin, Github, LucideIcon, LucideProps } from 'lucide-react';

export type ContactType = 'email' | 'linkedin' | 'github';

interface ContactIconProps extends LucideProps {
  type: ContactType;
}

const iconMap: Record<ContactType, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  github: Github,
};

export function ContactIcon({ type, ...props }: ContactIconProps) {
  const Icon = iconMap[type] || Mail;
  return <Icon {...props} />;
}
