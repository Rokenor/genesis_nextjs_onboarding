import Head from 'next/head';

export default function Blog({ articles }) {
  return (
    <>
      <Head>
        <title>NextJS Wokrshop | Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="NextJS Wokrshop | Blog" />
        <meta
          property="og:description"
          content="Place for description of page..."
        />
      </Head>
      <div>
        <h2>Articles</h2>
        <div>
          {articles.map((article, index) => {
            return (
              <div key={article.id}>
                <img src={article.image} alt={article.title} />
                <div>
                  <p>Article #{article.id}</p>
                  <h5>{article.title}</h5>
                  <p>{article.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:8085/articles');
  const posts = await res.json();

  const articles = [];
  for (const [key, value] of Object.entries(posts)) {
    articles.push(value);
  }

  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
}
