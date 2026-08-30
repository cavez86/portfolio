import {
  Briefcase,
  Clock,
  Code,
  Cpu,
  Database,
  GitBranch,
  GraduationCap,
  Layout,
  Lightbulb,
  Mail,
  Search,
  Terminal,
  User,
  Users,
} from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { siGithub } from 'simple-icons/icons';

function SimpleIcon({
  icon,
  ...props
}: {
  icon: { path: string; title: string };
} & React.SVGProps<SVGSVGElement>) {
  return (
    <svg aria-label={icon.title} fill="currentColor" role="img" viewBox="0 0 24 24" {...props}>
      <path d={icon.path} />
    </svg>
  );
}

function GitHub(props: React.SVGProps<SVGSVGElement>) {
  return <SimpleIcon icon={siGithub} {...props} />;
}

const icons = {
  Briefcase,
  Clock,
  Code,
  Cpu,
  Database,
  GitBranch,
  Github: GitHub,
  GraduationCap,
  Layout,
  Lightbulb,
  Linkedin: FaLinkedin,
  Mail,
  Search,
  Terminal,
  User,
  Users,
} as const;
export const iconNames = Object.keys(icons) as Array<keyof typeof icons>;
export type IconName = keyof typeof icons;

export default function Icon({ name, ...props }: { name: IconName } & React.SVGProps<SVGSVGElement>) {
  const IconComponent = icons[name];
  if (!IconComponent) {
    console.error(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
