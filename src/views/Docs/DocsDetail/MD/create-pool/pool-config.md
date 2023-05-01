# Configuring a pool

Create a directory for the pool configurations and wallets. Name the directory anything you want.

To create a pool you must do the following steps:

1. Initiate the pool
2. Configure the pool
3. Connect wallet client and create pool

### Initiate the pool

In the terminal you will create a directory for pool configurations and wallets.

1. Create directory

```sh
mkdir {DIRECTORY_NAME}
```

2. Change into the directory that you created

```sh
cd {DIRECTORY_NAME}
```

3.  Create a `pools.json` file.

```sh
arcpool init {POOL_ID}
```

> - {POOL_ID} refers to a string of your choosing which will identify the pool locally for the client.
> - This string is only used in CLI commands to identify which pool you are working with and this will not be visible on Alex.
> - You will edit this `pools.json` file and it will also be modified by the client so do not delete it after running the <strong>create </strong> and <strong>mine</strong> commands, unless you need to start over.

### Example:

```
mkdir alex-test
cd alex-test
arcpool init test-alex
```

### Edit the pool.json configuration

Below is the `pools.json` file that has been initiated that now needs to be configured.

```json
{
	"POOL_ID": {
		"appType": "Alex-Archiving-Pool-v1.4",
		"contracts": {
			"nft": {
				"id": "",
				"src": ""
			},
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
			"title": "Pool Title eg. Russia Ukraine War",
			"description": "Paragraph/HTML for long pool description",
			"briefDescription": "Paragraph/HTML for short pool description",
			"link": "",
			"rewards": "",
			"image": "",
			"timestamp": ""
		},
		"walletPath": "",
		"bundlrNode": "https://node2.bundlr.network",
		"keywords": ["keyword1", "keyword2"],
		"twitterApiKeys": {
			"consumer_key": "",
			"consumer_secret": "",
			"token": "",
			"token_secret": "",
			"bearer_token": ""
		},
		"clarifaiApiKey": "",
		"topics": ["history", "technology"],
		"redditApiKeys": {
			"username": "",
			"password": "",
			"appId": "",
			"appSecret": ""
		}
	}
}
```

Configure the `pools.json` file to generate your pool.

- `state.title` is the title of your pool on the [home page](https://alex.arweave.dev) of Alex.
- `state.description` is a long description of your pool on the [pool details](https://alex.arweave.dev/#/pool/zIZXNTl-GtTDbO8eP8LpkHks5S5WhB4j82YX-N2RuGw) page of Alex., under the 'About' header. It can contain text and/or HTML.
- `state.briefDescription` is a brief description of your pool on the [home page](https://alex.arweave.dev) of Alex.
- `keywords` is a list of the main keywords to track in the mining process. This is the core driving data that instructs the mining programs of what to pull from mining sources such as Twitter, Wikipedia, Reddit, or Nostr
- `topics` A list of more general topics the pool fits into these generate ANS110 Topic tags in the data. Examples: history, funny, humor, science.
- `controller.contribPercent` is a reward percentage of the contributions. This value can be from 0 - 100 and represents the total percentage of contributions that go to your control wallet for mining. If the value of `controller.contribPercent` is 10, then 10% of all contributions will go to your control wallet as a reward. This percentage will appear in the pool user interface to let contributors know how much of their contribution will go to the operator.
- `controller.pubkey` is the public key for the control wallet that the percentage of contributions declared in `controller.contribPercent` will be sent to.

### Configure Twitter API Keys

- Get Twitter API credentials [here](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/api-key-and-secret). (Get elevated access for better mining, but not mandatory)
- Enter credentials into `twitterApiKeys`
  - `consumer_key` = **API key** in the Twitter developer platform
  - `consumer_secret` = **Secret** in the Twitter developer platform
  - `token` = **Access Token** in the Twitter developer platform
  - `token_secret` = **Access Token Secret** in the Twitter developer platform
  - `bearer_token` = **Bearer Token** in the Twitter developer platform
  - `clarifaiApiKey` if you plan to use content moderation on tweets in the mining process, you can get an api key from [Clarifai](https://www.clarifai.com/) and put it here. This will filter out explicit content from being mined into the pool. This is a bit expensive and unnecessary in most situations but if you are finding a lot of explicit content in the pool it may be of value to you.

### Configure Reddit API Keys

- `redditApiKeys` login or create a Reddit account and then get API access [here](https://www.reddit.com/prefs/apps)
- Use `username` and `password` from Reddit
- Insert `appId` and `appSecret` received from Reddit

## Creating a pool

To create a pool you only need to run 1 command with a few arguments passed in, including the name from when you initialized the pool, path to wallet you created, and a path to your pool header image.

```sh
arcpool create <POOL_NAME> --control-wallet <PATH_TO_WALLET.json> --image <PATH_TO_IMAGE>
```

For example:

```sh
arcpool create init-test-alex --control-wallet ../wallet.json --image ../pool-image.jpg
```

Take note of the line at the top of the logs for your pool wallets seed phrase. Inside your working directory should be a `wallets` directory. This is where your pool collection wallet is stored and should be kept safe, along with the seed phrase logged by the CLI. Write down your seed phrase.

**Do not give this to anyone. Without this you have no way to recover your wallet should anything happen.**

    *** Write the following seed phrase down ***

     this will be your pool wallet seed phrase do not give out

    *** THERE IS NO WAY TO RECOVER YOUR SEED PHRASE SO WRITE IT DOWN AND KEEP IT OUT OF OTHERS HANDS ***

If your pool has been successfully created, you can now navigate to https://alex.arweave.dev/#/pools and view your new pool.

To add another pool, follow the same steps as above in the same directory with the `pools.json`

## Funding a pool wallet

At the end of the [creating a pool](#creating-a-pool) process the cli should ask you if you want to contribute funds from your control wallet. This is recommended as it will allow you to begin mining immediately. When the prompt asks, enter a decimal amount of AR less than what you have in your wallet and hit enter. The funding portion will take some time because it is waiting for the transactions to process on the blockchain. Wait for the program to finish.

If you decide to not fund the pool from your control wallet, you will need contributions to start mining. This can be a small amount to get started just to trigger the CLI to start transferring your funds to your pools Bundlr instance. We will only need to do this once and as more contributions are made it will be updated automatically as we run the mining service.

Find and navigate to your pool in [https://alex.arweave.dev/#/pools](https://alex.arweave.dev/#/pools) and click the contribute button. Contribute a small amount of $AR to your collection and wait for that contribution to display in the UI. Once that has registered the funds to the pool, go back to your terminal and run:

```sh
arcpool fund POOL_NAME
```

For example:

![](https://arweave.net/i5plrxbqSoSTMt0jL5LhZAND4CjUohRkSDjIezXaOZc)

Please note that funding a Bundlr instance can take up to 30 minutes. To check the status of the funding you can use the command:

```sh
arcpool balance POOL_NAME
```

![](https://arweave.net/BNHao7jhk061DOv9XErm5jcdOUUsB0UgNvmLXLJZEF8)

Once you see that you have Bundlr funds you can proceed to the mining process.
