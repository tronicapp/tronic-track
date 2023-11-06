# Tronic Receiver

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd tronic-receiver
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd tronic-receiver
pnpm dev
```

Open Questions:
1. Open source or not?
2. What CDN will host scripts?
3. Publishing to npm. Needs org and setup.
