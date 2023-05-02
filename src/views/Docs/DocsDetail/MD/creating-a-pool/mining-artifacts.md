# Mining artifacts

### Configure Twitter API Keys

- Get Twitter API credentials [here](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/api-key-and-secret). (Get elevated access for better mining, but not mandatory)
- Enter credentials into **twitterApiKeys**
  - **consumer_key** = **API key** in the Twitter developer platform
  - **consumer_secret** = **Secret** in the Twitter developer platform
  - **token** = **Access Token** in the Twitter developer platform
  - **token_secret** = **Access Token Secret** in the Twitter developer platform
  - **bearer_token** = **Bearer Token** in the Twitter developer platform
  - **clarifaiApiKey** if you plan to use content moderation on tweets in the mining process, you can get an api key from [Clarifai](https://www.clarifai.com/) and put it here. This will filter out explicit content from being mined into the pool. This is a bit expensive and unnecessary in most situations but if you are finding a lot of explicit content in the pool it may be of value to you.

### Configure Reddit API Keys

- **redditApiKeys** login or create a Reddit account and then get API access [here](https://www.reddit.com/prefs/apps)
- Use **username** and **password** from Reddit
- Insert **appId** and **appSecret** received from Reddit

> **Before Mining:** double check the **keywords** in the **pools.json** to prevent unwanted artifacts in your pool.

The mining process can begin in the directory containing the **pools.json** by running these commands.

### Twitter

**Mine tweets (runs 100 tweets at a time)**

```sh
arcpool mine POOL_NAME --source twitter
```

**Mine all tweets based on user and tag**

For example: mine all tweets with "@thealexarchive #TOPIC"

```sh
arcpool mine POOL_NAME --source twitter --method mention --mention-tag "@thealexarchive #TOPIC"
```

**Mine all tweets ever from a particular user**

For example: mine all tweets from SBF_FTX

- Do not include the @ in the **--username value**

```sh
arcpool mine POOL_NAME --source twitter --method user --username SBF_FTX
```

### Wikipedia

**Mine a single Wikipedia article related to the given `keywords` in config**

```sh
arcpool mine POOL_NAME --source wikipedia
```

### Reddit

**Mine Reddit posts by search term**

```sh
arcpool mine wildlife --source reddit --method search --search-term america
```

**Mine Reddit posts by subreddit**

```sh
arcpool mine wildlife --source reddit --method subreddit --subreddit webdev
```

**Mine Reddit posts by username**

```sh
arcpool mine wildlife --source reddit --method user --username exampleusername
```

### Nostr

**Mine common Nostr threads for posts related to the keywords**

```sh
arcpool mine <POOL_ID> --source nostr
```

## Checking mining process

After a few minutes of mining you can navigate back to your pool on Alex and see that the artifact count is growing and contributors are having artifacts minted to their addresses as expected.

## Daemon mode mining

If you wish to continually run a mining process, use daemon mode by passing the **--d** flag to any of the above mining commands. Daemon mode is built on top of pm2.

#### Mine tweets into the pool from above, still runs for 20 seconds but the daemon mode will continue restarting the program infinetly. Note the **--d** flag.

```sh
arcpool mine POOL_NAME --source twitter --d
```

**To view all the daemon mode mining processes:**

```sh
arcpool dlist
```

Expected Output:

![](https://arweave.net/jPx7l8816lKYpf4sstSKRtKVUV7cAXWFqlIglIjcFJQ)

**Stop a pools daemon process by name:**

```sh
arcpool dstop --dname POOL_NAME
```

**To view logs for the mining processes install pm2:**

```sh
npm install --global pm2
```

**Stream the logs:**

```sh
pm2 logs
```