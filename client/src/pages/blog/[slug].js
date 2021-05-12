import { useRouter } from 'next/router';

import {
  Breadcrumbs,
  Container,
  Link,
  Box,
  Typography,
} from '@material-ui/core';

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
      <Container maxWidth="md">
        <main>
          <Box m={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/blog">
                Back to blog
              </Link>
              <Typography color="textPrimary">{article.title}</Typography>
            </Breadcrumbs>
          </Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Article #{article.id} {article.title}
          </Typography>
          <img src={article.image} alt={article.title} />
          {article.content.map((text, index) => {
            return (
              <Box pt={2} pb={2} key={`${text}${index}`}>
                <Typography variant="body1" gutterBottom>
                  {text}
                </Typography>
              </Box>
            );
          })}
          <Typography variant="body2" gutterBottom>
            Author: {article.author}
          </Typography>
          <Typography variant="body2" gutterBottom>
            From: {article.author_company}
          </Typography>
        </main>
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:8085/article/${params.slug}`);
  const article = await res.json();

  const pageName = `Blog | Article ${article.id}`;

  const meta = {
    title: `Blog | #${article.id} ${article.title}`,
    description: article.description,
  };

  return {
    props: {
      article,
      pageName,
      meta,
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
