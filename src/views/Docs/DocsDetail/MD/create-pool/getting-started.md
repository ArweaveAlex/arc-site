# Getting Started

This documentation allows anyone to start their own pool and earn $AR. For a more high level overview of the Alex Archive, please visit our [about page](https://alex.arweave.dev/#/about).

## Requirements

`arcpool` requires [NodeJS (v18+)](https://nodejs.org/en/download/) [NPM](https://www.npmjs.com/package/npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

An Arweave web wallet with a small amount of $AR on it is needed to deploy your pool. You can get one here:

- [Arweave Wallet](https://docs.arweave.org/info/wallets/arweave-wallet)
- [ArConnect](https://arconnect.io)

## Installing Alex. CLI

To install arcpool run `npm install --global arcpool` in your terminal.

```sh
npm install --global arcpool
```

```
Usage: arcpool [commands] [options]

Options                                                     Description
--clear                                                     Clear local search index for pool
--content-moderation                                        Use content moderation on twitter mining
--control-wallet <wallet file>                              Specifies a wallet to use in the pool creation
--dname <string>                                            Specifies the daemon name to stop
--image <path to image file>                                Specifies an image to use for pool
--mention-tag <username>                                    Username for twitter or reddit with --method user
--method <user / mention / subreddit / search>              Subcategory within source such as user
--search-term <search term>                                 Search term to mine
--source <twitter / wikipedia / reddit>                     Specifies the data source
--subreddit <subreddit>                                     Subreddit to mine


Commands                                                    Description
balance <pool id>                                           Check the Bundlr and Arweave balance for the pool wallet
create <pool id>                                            Create a pool using pools.json
dlist                                                       list all daemon mining processes
dstop <daemon name>                                         Stop a daemon mining process by name
fund <pool id>                                              Fun the bundlr wallet for a pool
help                                                        Display help text
init <pool id>                                              Initialize pools.json
mine <pool id>                                              Mine artifacts for a given pool
```
