import { Button } from '@/components/ui/Button';
import { personalInfo } from '@/data/content';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

export const Header = () => (
  <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky -top-[66px] z-50 border-b px-6 py-4 backdrop-blur md:top-0">
    <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
      <nav className="hidden items-center gap-8 md:flex">
        {/* <Link
        href="#projects"
        className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
      >
        Projects
      </Link> */}
        <Link
          href="#experience"
          className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          Experience
        </Link>
        <Link
          href="#skills"
          className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          Skills
        </Link>
        <Link
          href="#contact"
          className="text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          Contact
        </Link>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-4">
        {personalInfo.contacts.map((contact) => (
          <Button key={contact.type} variant="ghost" size="sm" className="rounded md:text-sm" asChild>
            <a href={contact.url}>
              <contact.icon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:block">{contact.label}</span>
            </a>
          </Button>
        ))}
        <div className="ml-auto md:ml-2 md:border-l md:pl-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
);
