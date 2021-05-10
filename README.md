# NextJS Onboarding

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

- `start` - start API server (port :8081)

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
