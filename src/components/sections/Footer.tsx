import { getTranslations } from 'next-intl/server';

const REPOSITORY = 'cavez86/portfolio';

const Footer = async () => {
  'use cache';
  const t = await getTranslations('Footer');

  return (
    <footer className="page-frame py-8 text-base text-muted-foreground">
      <p>
        {t('source')}{' '}
        <a
          className="font-mono text-foreground underline decoration-border hover:decoration-current"
          href={`https://github.com/${REPOSITORY}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {REPOSITORY}
        </a>
      </p>
    </footer>
  );
};

export default Footer;
