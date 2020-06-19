# tiaan.dev

[![Netlify Status](https://api.netlify.com/api/v1/badges/33b9428e-d349-448e-8844-bde1dc41fb7a/deploy-status)](https://app.netlify.com/sites/tiaan-dev/deploys)

Website of [Tiaan du Plessis](https://github.com/tiaanduplessis). Built on [Eleventy](https://github.com/11ty/eleventy).

## Getting Started

Clone this Repository and navigate to the directory:

```
git clone https://github.com/tiaanduplessis/tiaan.dev my-blog-name && cd my-blog-name
```

Have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently. Afterwards you can proceed and install the dependencies:

```bash
npm install
```

Edit `_data/metadata.json` and run Eleventy:

```bash
npx eleventy
```

Or build and host locally for local development:

```bash
npx eleventy --serve
```

Or build automatically when a template changes:

```bash
npx eleventy --watch
```

Or in debug mode:

```
DEBUG=* npx eleventy
```

## License

Mozilla Public License Version 2.0
