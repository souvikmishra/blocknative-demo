# Blocknative Demo

## Developing

- Install dependencies with `npm install` (or `pnpm install` or `yarn`)
- Create a `.env` file and use the [walletconnect project ID](https://cloud.reown.com)
- Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

> [!NOTE]
> For my testing I had used Polygon chain with Safe wallet (through walletconnect). If you want to add more chains you can do so by editing the [web3onboard.ts](src/lib/web3onboard.ts)

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
