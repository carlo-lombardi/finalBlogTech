import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { TfiGithub } from 'react-icons/tfi';
import { AiFillLinkedin } from 'react-icons/ai';
import { MdWork } from 'react-icons/md';
import { BiMoon } from 'react-icons/bi';
import { BiSolidMoon } from 'react-icons/bi';
import { useTheme } from '../../../pages/utils/themeContext';
import { Container } from '@src/components/shared/container';
const buttonStyle = {
  position: 'relative',
  backgroundColor: 'black', // Bootstrap primary color
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  overflow: 'hidden',
};

const lineStyle = {
  position: 'absolute',
  width: '100%',
  height: '2px',
  transformOrigin: '0 0',
};

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const { t } = useTranslation();

  return (
    <header className={`app ${theme === 'dark' ? 'dark' : 'light'} py-5`}>
      <nav>
        <Container className="flex items-center justify-between p-5 ">
          <Link className="flex" href="/" title={t('common.homepage')} style={{ fontSize: '30px' }}>
            <div className="software-logo">Software</div>
          </Link>
          {/* <LanguageSelector /> */}
          <div
            className={'flex'}
            style={{
              textAlign: 'center',
              marginTop: '20px',
              fontSize: '30px',
              alignItems: 'center',
            }}
          >
            {/* <Link href="" style={{marginRight: '10px'}}>
            <AiFillInstagram />
          </Link>
          <Link href="/about" style={{marginRight: '10px'}}>
            <AiFillYoutube />
          </Link> */}
            <Link
              target="_blank"
              href="https://github.com/carlo-lombardi"
              style={{ marginRight: '10px' }}
            >
              <TfiGithub />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/carlo-lombardi/"
              style={{ marginRight: '10px' }}
            >
              <AiFillLinkedin />
            </Link>
            {/* <Link target="_blank" href="/about" style={{marginRight: '10px'}}>
            <BsTwitch />
          </Link> */}
            <Link
              target="_blank"
              href="https://carlo-portfolio-git-master-carlo-lombardi.vercel.app/#/home"
              style={{ marginRight: '10px' }}
            >
              <MdWork />
            </Link>
            <button onClick={toggleTheme}>
              {theme === 'light' ? <BiMoon /> : <BiSolidMoon />}
            </button>
          </div>
        </Container>
      </nav>
    </header>
  );
};
