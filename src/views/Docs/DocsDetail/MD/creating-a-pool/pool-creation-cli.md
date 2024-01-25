# Creating a pool from the CLI.

To create a pool you must complete the following steps:

1. **Install arcpool**
2. **Initiate the pool**
3. **Configure the pool**
4. **Create the pool**
5. **Fund the pool**

### 1. Install arcpool

**arcpool** requires [NodeJS (v18)](https://nodejs.org/en/download/) [NPM](https://www.npmjs.com/package/npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

To install arcpool globally on your machine, run the following:

```sh
npm install --global arcpool
```

To test for a successful installation, run the following:

```sh
arcpool help
```

Expected Output:

```
Usage: arcpool [command] [arguments]

Commands
balance <pool> (Check the Arweave and Turbo balance for the pool wallet)
create <pool> (Create a pool using pools.json)
    Arguments
    --control-wallet <wallet-path> (Specifies a wallet to use in the pool creation)
    --image <image-path> (Specifies an image to use for pool)
dlist (List all daemon mining processes)
dstop <daemon> (Stop a daemon mining process by name)
    Arguments
    --dname <daemon> (Specifies the daemon name to stop)
evolve <pool> (Evolve the pool contract)
help (Display help text)
init <pool> (Initialize pools.json)
mine <pool> (Mine artifacts for a given pool)
    Arguments
    --source <all / files / twitter / wikipedia / reddit / news-api / gnews / nostr> (Specifies the data source)
      Suboptions
      files
          --path <path> (Specifies a file or directory path to upload)
          --meta-file <meta-path> (Specifies a metadata file config for uploads)
          --clear (Clear local files that have been uploaded)
      reddit
          --method <search-term / subreddit / username> (Archiving method)
              --search-term <term> (Search term)
              --subreddit <subreddit> (Subreddit)
              --username <username> (Username)
      twitter
          --method <mention-tag / username> (Archiving method)
              --mention-tag <mention-tag> (Mention tag)
              --username <username> (User account)
          --content-moderation (Use content moderation on twitter mining)
    --d (Run the miner as a daemon process)
topics <pool> (Set the pool topics in pool state)
    Arguments
    --topic-values <topics> (Comma separated list of topics)
```

### 2. Initiate the pool

In your terminal / command prompt, you will create a directory for the pool configuration and wallets. This directory can be named anything you want. You will also choose an ID that will be used to identify the pool on your local machine.

For the purposes of this documentation, the following values will be used as an examples for the directory name and Pool ID:

Directory name: **alex-test**

Pool ID: **russia_ukraine_conflict**

#### Pool initiation steps

**Remember in each step to replace the appropriate values with your own personal values**

1. Create the directory
   ```sh
   mkdir <DIR_NAME>
   ```
   Example: **mkdir alex-test**
2. Change into the directory that you created
   ```sh
   cd <DIR_NAME>
   ```
   Example: **cd alex-test**
3. Create the pool configuration file
   ```sh
   arcpool init <pool>
   ```
   Example: **arcpool init russia_ukraine_conflict**

The result of these steps will generate a file named: **pools.json**

This file is the main pool configuration and should not be deleted. You will be making many edits to this file and it will
be used every time you run any mining processes.

### 3. Configure the pool

Below is a example of the **pools.json** file that has been initiated that now needs to be configured.

```
{
    "Test-Pool": {
        "appType": "Alex-Archiving-Pool-v1.5",
        "tradeable": true,
        "contracts": {
            "pool": {
                "id": "",
                "src": ""
            }
        },
        "state": {
            "owner": {
                "pubkey": "",
                "info": ""
            },
            "controller": {
                "pubkey": "",
                "contribPercent": 0
            },
            "title": "Pool Title",
            "description": "Paragraph/HTML Markup",
            "briefDescription": "Short Pool Description",
            "image": "",
            "timestamp": "",
            "ownerMaintained": false
        },
        "walletPath": "",
        "walletKey": null,
        "keywords": [
            "keyword"
        ],
        "topics": [
            "History"
        ],
        "twitterApiKeys": {
            "consumer_key": "",
            "consumer_secret": "",
            "token": "",
            "token_secret": "",
            "bearer_token": ""
        },
        "clarifaiApiKey": "",
        "redditApiKeys": {
            "username": "",
            "password": "",
            "appId": "",
            "appSecret": ""
        },
        "newsApiKey": "",
        "gNewsApiKey": "",
        "nostr": {
            "relays": [
                {
                    "socket": "wss://relay.damus.io"
                },
                {
                    "socket": "wss://nos.lol"
                },
                {
                    "socket": "wss://nostr.relayer.se"
                },
                {
                    "socket": "wss://relay.current.fyi"
                },
                {
                    "socket": "wss://nostr.bitcoiner.social"
                },
                {
                    "socket": "wss://relay.nostr.info"
                },
                {
                    "socket": "wss://nostr.fmt.wiz.biz"
                }
            ]
        }
    }
}
```

#### Pool Configuration Steps

1. Open **pools.json** in your text editor

2. Modify the following values **(Note: The following values are the only values that need to modified at this time, there are many other values in this file that either never need to be modified or should be modified at a later point)**

- **tradeable**: If set to true, artifact sponsorships in this pool can be bought and sold via the UCM.
- **state.title**: The title of your pool.
- **state.description**: A long description of your pool. This description will appear on the [pool details](https://alex.arweave.dev/#/pool/zIZXNTl-GtTDbO8eP8LpkHks5S5WhB4j82YX-N2RuGw) page of Alex., under the 'About' header. It can contain text and/or HTML.
- **state.briefDescription**: A brief description of your pool. This description will appear on the [home page](https://alex.arweave.dev) of Alex.
- **keywords**: A list of the main keywords to track in the mining process. This is the core driving data that instructs the mining programs of what to pull from mining sources such as Twitter, Wikipedia, Reddit, or Nostr
- **topics:** A list of one or more of the following topics
  - **History**, **Philosophy**, **International**, **Culture**, **Art**, **Music**, **News**, **Faith**, **Science**, **Spirituality**, **Sports**, **Business**, **Technology**, **Politics**, **Other**
- **controller.contribPercent**: A reward percentage of the contributions. This value can be from 0 - 100 and represents the total percentage of contributions that go to your control wallet for mining. If the value of **controller.contribPercent** is **10**, then **10%** of all contributions will go to your control wallet as a reward. This percentage will appear in the user interface to let contributors know how much of their contribution will go to the operator.
- **controller.pubkey**: The public key for the control wallet that the percentage of contributions declared in **controller.contribPercent** will be sent to.

### 4. Create the pool

To create a pool you will need to run one command with a few arguments passed in, including the name from when you initialized the pool, path to your Arweave wallet, and a path to your pool header image.

```sh
arcpool create <pool> --control-wallet <PATH_TO_WALLET.json> --image <PATH_TO_IMAGE>
```

Example: **arcpool create russia_ukraine_conflict --control-wallet ../wallet.json --image ../pool-image.jpg**

Note the top of the logs for your pool wallets seed phrase. Inside your working directory should be a **wallets** directory. This is where your pool collection wallet is stored and should be kept safe, along with the seed phrase logged by the CLI. Write down your seed phrase.

**Do not give this to anyone. Without this you have no way to recover your wallet should anything happen.**

```
***Write the following seed phrase down***

this will be your pool wallet seed phrase do not give it out

***THERE IS NO WAY TO RECOVER YOUR SEED PHRASE SO WRITE IT DOWN AND KEEP IT OUT OF OTHERS HANDS***
```

If your pool has been successfully created, you will see a URL log in your terminal / command prompt at the end of the pool creation process. You will now be able to see your pool on the [Alex. Pools Page](https://alex.arweave.dev/#/pools). Note that it may take some time for the pool to appear.

### View pool balances

To see how many credits are in the pool wallet for mining:

```sh
arcpool balance <pool>
```

### Evolve the pool contract

If a new pool contract source is deployed and a contract evolve is required, this can be done with the following command:

```sh
arcpool evolve <pool>
```
