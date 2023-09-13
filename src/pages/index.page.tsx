import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { getServerSideTranslations } from './utils/get-serverside-translations';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { useTheme } from './utils/themeContext';

const Page = ({ page, posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  if (!page?.featuredBlogPost || !posts) return;
  return (
    <div className={`app ${theme === 'dark' ? 'dark' : 'light'}`}>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <Container style={{ padding: '0px 50px' }}>
        <Link href={`/${page.featuredBlogPost.slug}`}>
          <ArticleHero article={page.featuredBlogPost} />
        </Link>
      </Container>

      {/* Tutorial: contentful-and-the-starter-template.md */}
      {/* Uncomment the line below to make the Greeting field available to render */}
      {/* <Container>
       <div className="my-5 bg-colorTextLightest p-5 text-colorBlueLightest">{page.greeting}xcvxcvcxv</div>
      </Container> */}

      <Container style={{ padding: '50px' }}>
        <h2 className="mb-4 md:mb-6">{t('landingPage.latestArticles')}</h2>
        <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={posts} />
      </Container>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  try {
    const landingPageData = await client.pageLanding({ locale });
    const page = landingPageData.pageLandingCollection?.items[0];

    const blogPostsData = await client.pageBlogPostCollection({
      limit: 6,
      locale,
      order: PageBlogPostOrder.PublishedDateDesc,
      where: {
        slug_not: page?.featuredBlogPost?.slug,
      },
    });
    const posts = blogPostsData.pageBlogPostCollection?.items;

    if (!page) {
      return {
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        ...(await getServerSideTranslations(locale)),
        page,
        posts,
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
