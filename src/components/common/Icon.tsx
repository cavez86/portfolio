import {
  Briefcase,
  Clock,
  Code,
  Cpu,
  Database,
  GitBranch,
  Github,
  GraduationCap,
  Layout,
  Lightbulb,
  Linkedin,
  Mail,
  Search,
  Terminal,
  User,
  Users,
} from 'lucide-react';

const icons = {
  Briefcase,
  Clock,
  Code,
  Cpu,
  Database,
  GitBranch,
  Github,
  GraduationCap,
  Layout,
  Lightbulb,
  Linkedin,
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
