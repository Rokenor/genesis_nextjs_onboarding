import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';

import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import theme from '../theme';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
  },
  media: {
    height: 300,
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
});

export default function Home({ query, posts }) {
  const classes = useStyles();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(query.search || '');
  const [articles, setArticles] = useState(posts.articles);

  const buttonHandler = (url) => {
    window.open(url, '_blank');
  };

  const inputHandler = (inputValue) => {
    setSearchValue(inputValue);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    router.push(`/?search=${searchValue}`);

    const res = await fetch(
      `https://free-news.p.rapidapi.com/v1/search?q=${searchValue}&lang=en`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '2d153f6745msh961abb88d3f496fp1a4fa1jsn8da5b702d4da',
          'x-rapidapi-host': 'free-news.p.rapidapi.com',
        },
      }
    );
    const data = await res.json();

    setArticles(data.articles);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h2" gutterBottom>
          Free News API Search
        </Typography>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <TextField
            id="standard-basic"
            label="Type here your request"
            defaultValue={searchValue}
            onKeyUp={(e) => inputHandler(e.target.value)}
          />
        </form>
        {!articles && articles.length === 0 ? (
          <Container maxWidth="md">
            <Box mt={4}>Articles list is empty... :(</Box>
          </Container>
        ) : (
          <>
            {articles.map((article) => {
              return (
                <Box mt={2} key={article._id}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={article.media}
                        title={article.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {article.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {article.summary}
                        </Typography>
                        <Box pt={2}>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Author: {article.author}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            Site: {article.clean_url}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => buttonHandler(article.link)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  let posts = { articles: [] };

  if (query.search) {
    const res = await fetch(
      `https://free-news.p.rapidapi.com/v1/search?q=${query.search}&lang=en`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '2d153f6745msh961abb88d3f496fp1a4fa1jsn8da5b702d4da',
          'x-rapidapi-host': 'free-news.p.rapidapi.com',
        },
      }
    );
    posts = await res.json();
  }

  const pageName = 'Free News API Example';

  const meta = {
    title: 'NextJS Onboarding: Free News API Example',
    description: 'Free News API Example Description',
  };

  return {
    props: {
      query,
      posts,
      pageName,
      meta,
    },
  };
}
