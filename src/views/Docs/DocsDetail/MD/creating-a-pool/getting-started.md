# Getting Started

This documentation allows anyone to start their own pool and earn $AR. For a more high level overview of the Alex. Archive, please visit our [about page](https://alex.arweave.dev/#/about).

An Arweave web wallet is needed to deploy your pool. You can get one here:

- [Arweave Wallet](https://docs.arweave.org/info/wallets/arweave-wallet)
- [ArConnect](https://arconnect.io)

## Pool Creation Methods

1. **User Interface** - You can create a pool from the Alex. User Interface from the [Pool Creation Page](https://alex.arweave.dev/#/pools/create). Once you have created your pool and visit the individual Pool Manage Page located in the Pools tab in your account, you can then download your pool configuration file for any mining sources that require the CLI. Currently, you are able to archive files directly from the User Interface. Any other archiving sources will require the CLI.
2. **Alex. CLI (arcpool)** - The other pool creation option is to download and run our CLI Tool. Instructions for how to do this can be found below. All archiving sources are currently supported in the CLI.

#### Alex. CLI (arcpool)

**arcpool** requires [NodeJS (v18+)](https://nodejs.org/en/download/) [NPM](https://www.npmjs.com/package/npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

#### Installing Alex. CLI

To install arcpool globally on your machine, run the following:

```sh
npm install --global arcpool
```

To test for a successful installation, run the following:

```sh
arcpool help
```

Expected Output:

![](https://arweave.net/G0H0ODUr_P336-pXkjrG_7FBusFft3fgDT0XIfBAisk)
