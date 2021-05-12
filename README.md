# NextJS Onboarding

## 07 Common component: Header, Dynamic meta

https://material-ui.com/components/menus/

`npm i @material-ui/icons`

### Common component

- Add `/components` folder for common components
- Import `<Header>` component in `_app` page
- Push dynamic properties to component (pageName and meta information)

## 06 Blog: Material UI, \_app, \_document

### Material UI Resources

https://material-ui.com/

https://material-ui.com/getting-started/installation/

`npm install @material-ui/core`

https://material-ui.com/getting-started/example-projects/

https://github.com/mui-org/material-ui/tree/master/examples/nextjs

### Custom \_app

https://nextjs.org/docs/advanced-features/custom-app

Next.js uses the `App` component to initialize page. You can override it with `_app` page

- Inject additional data into pages
- Add global CSS

https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js

### Custom \_document

https://nextjs.org/docs/advanced-features/custom-document

- `Document` is only rendered in the server
- `Document` currently does not support `getStaticProps` or `getServerSideProps`
  > Only reason you should be customizing `renderPage` is for usage with css-in-js libraries

### Add Material UI components

https://material-ui.com/components/container/

- `useStyles` hook: https://material-ui.com/styles/api/#returns-3

## 05 Blog: Article, dynamic routes, static paths, router

https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation

If a page has dynamic routes and use `getStaticProps` it needs to define a list of paths for pre-rendered pages.

`getStaticPath` function exist for that. It return object with:

- `paths`: array with params used in the each of page
- `fallback`: key for check exist new data

https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation

- `getStaticProps` (Static Generation): Fetch data at build time
- `incremental static regeneration (ISR)` with `getStaticProps`

https://nextjs.org/docs/api-reference/next/router#userouter

- Hook `useRouter` gives access to `router` object
  - `isFallback` key checks the current page for fallback mode
  - `push` method for cases where `next/link` is not enough

## 04 Blog: SSG, fetch API, meta info

https://nextjs.org/docs/basic-features/data-fetching

- `getStaticProps` (Static Generation): Fetch data at build time
- Return object with:
  - `props`: required object which will received by the page component
  - `revalidate`: optional amount in seconds for re-generation page

https://nextjs.org/docs/api-reference/next/head

- Can contain `title`, `meta` or any other elements for `<head>` block of page
- For example https://ogp.me/

## 03 Routing and /src folder

https://nextjs.org/docs/api-routes/introduction

- Files inside `pages/api` is mapped to `/api/\*`
- Server-side only bundles
- Masking URLs from external requests
- Using ENV variables on the server side

https://nextjs.org/docs/routing/introduction

- `pages/index.js` - `/`
- `pages/blog/index/js` - `/blog`
- `pages/blog/[article].js` - `/blog/:article`

https://nextjs.org/docs/advanced-features/src-directory

Directory `src/pages` is alternative to the root `pages` directory.

## 02 REST API for Blog

https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm

### Available scripts

- `start` - start API server (port :8085)

## 01 NextJS Create Next App

Node: v14.16.1 (required 10.13 or later)
Npm: 6.14.12

NextJS: 10.2

https://nextjs.org/docs/getting-started

`npx create-next-app`

### Available scripts

- `dev`- development mode
- `build` - build for production usage
- `start` - start production server

### What we get

- Automatic compilation and bundling (with webpack and babel)
- React fast refresh
- Static generation and server-side rendering of `./pages/`
- Static fie serving `./public` is mapped to `/`
