import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Container } from '@src/components/shared/container';
import { useTheme } from '@src/pages/utils/themeContext';

export const Footer = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <footer
      className={`app ${
        theme === 'dark' ? 'dark' : 'light'
      } border-t-color border-t border-gray200 text-center`}
    >
      <Container className="py-8">
        <h2 className="h4 mb-4">{t('footer.aboutUs')}</h2>
        <div className="">{t('footer.description')}</div>
        <div className="mt-8">
          {t('footer.powerBy')}{' '}
          <Link
            href="https://www.lombardicarlo.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue500"
          >
            Carlo Lombardi
          </Link>
        </div>
      </Container>
    </footer>
  );
};
