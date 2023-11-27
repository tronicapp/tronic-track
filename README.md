# Tronic Receiver

### Apps

- `docs`: a [Nextra](https://nextra.site) app that uses Nextra for docs.
- `docs-orig`: a [Next.js](https://nextjs.org) standard app for docs.
- `web`: a [Next.js](https://nextjs.org/) app that shows how to integrate tronic-track in React (via NPM)
- `standalone`: a set of vanilla js app that shows how to integrate tronic-track in React (via a script tag)
- `ui`: a stub React component library shared by both `web` and `docs` applications

### Packages
- `core`: the core functionality of tronic-track used by both packages/browser and packages/node
- `node`: for integrating tronic-track in a Node app such as Express / NestJS
- `browser`: for integrating tronic-track into a browser webapp.
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd tronic-track
yarn build
```

### Develop

To develop packages, run the following command:

```
cd tronic-track
yarn watch
```

The you can run the individual example apps. Consult each app's package.json for more info.
