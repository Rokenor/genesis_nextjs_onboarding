import Head from 'next/head';
import { useRouter } from 'next/router';

export default function BlogArticle({ article }) {
  const router = useRouter();

  if (!article) {
    return null;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>
          Blog | #{article.id} {article.title}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content={`Blog | #${article.id} ${article.title}`}
        />
        <meta property="og:description" content={article.description} />
      </Head>
      <div>
        <div>
          <a href="/blog">Back to blog</a>
          <span>
            Article #{article.id}
            {article.title}
          </span>
        </div>
        <h3>{article.title}</h3>
        <img src={article.image} alt={article.title} />
        {article.content.map((text, index) => {
          return (
            <div key={`${text}${index}`}>
              <p>{text}</p>
            </div>
          );
        })}
        <p>Author: {article.author}</p>
        <p>From: {article.author_company}</p>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8085/article/${params.slug}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:8085/articles');
  const posts = await res.json();

  const articles = [];
  for (const [key, value] of Object.entries(posts)) {
    articles.push(value);
  }

  // Get the paths we want to pre-render based on posts
  const paths = articles.map((article) => ({
    params: { slug: article.id.toString() },
  }));

  return { paths, fallback: true };
}
