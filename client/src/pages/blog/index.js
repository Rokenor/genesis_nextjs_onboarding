import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 233,
    width: 350,
  },
});

export default function Blog({ articles }) {
  const router = useRouter();
  const classes = useStyles();

  const clickHandler = (url) => {
    router.push(url);
  };

  return (
    <>
      <Container maxWidth="md">
        <Box mt={4}>
          <Typography variant="h2" gutterBottom>
            Articles
          </Typography>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            {articles.map((article, index) => {
              const url = `/blog/${article.id}`;
              return (
                <Grid item xs key={article.id}>
                  <Card
                    className={classes.root}
                    onClick={() => clickHandler(url)}
                  >
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={article.image}
                        title={article.title}
                      />
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Article #{article.id}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          {article.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {article.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
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

  const pageName = 'Blog';

  const meta = {
    title: 'NextJS Wokrshop | Blog',
    description: 'Place for description of page...',
  };

  return {
    props: {
      articles,
      pageName,
      meta,
    },
    revalidate: 60,
  };
}
