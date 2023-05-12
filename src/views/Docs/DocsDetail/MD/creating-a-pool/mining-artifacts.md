# Mining artifacts

### Files and Documents

#### Renderer Supported File Types

**Any file type is supported for upload as an artifact, however the following types are supported by the User Interface. Any file types not in the following list can still be found in the site, however they will only be available for download.**

- Images: **JPG, PNG, SVG, GIF, WEBP, BMP**
- Ebooks: **EPUB**
- Audio: **WAV, M4A, MP3, OFF, FLAC**
- Videos: **MP4**
- Documents: **PDF, CSV, TXT**

**Mine a file**

```sh
arcpool mine <POOL_ID> --source files --path examplefile.jpg
```

**Mine a directory of files**

```sh
arcpool mine <POOL_ID> --source files --path ./exampledirectory
```

**Optionally you can add metadata to your files by creating a metadata file that contains a JSON array with entries as follows, name this file whatever you want it will be passed as an argument**

```json
[
	{
		"FileName": "examplefile.jpg",
		"ArtifactName": "test name",
		"ArtifactGroup": "Group1",
		"ArtifactGroupSequence": "1",
		"MetaData": {
			"ExampleMetaDataField1(whatever you want for example AddressWherePictureTaken)": "Here is some metadata about the file",
			"ExampleMetaDataField2": "Here is some more metadata about the file"
		}
	},
	{
		"FileName": "examplefile2.jpg",
		"ArtifactName": "test name 2",
		"ArtifactGroup": "Group2",
		"ArtifactGroupSequence": "1",
		"MetaData": {
			"ExampleMetaDataField1(whatever you want for example AddressWherePictureTaken)": "Here is some metadata about the file",
			"ExampleMetaDataField2": "Here is some more metadata about the file"
		}
	}
]
```

- Fill out the metadata file as follows
  - **FileName**: the only mandatory field which ties this entry in the file to the filename being mined
  - **ArtifactName**: an optional name for the artifact that will show up in Alex
  - **ArtifactGroup**: an optional grouping for the artifact, if multiple files have the same group they will be grouped together
  - **ArtifactGroupSequence**: an ordering within the group, the lower numbers will display first in Alex
  - **MetaData**: can be any data fields you want to be stored alongside the file.

**Mine a file with a metadata config**

```sh
arcpool mine <POOL_ID> --source files --path examplefile.jpg --meta-file ./metafile.json
```

**Mine a directory of files with a metadata config**

```sh
arcpool mine <POOL_ID> --source files --path ./exampledirectory --meta-file ./metafile.json
```

**Lastly, when sending a directory, arcpool will store a list of files already sent and not send duplicates, to send all files again, use the --clear option**

```sh
arcpool mine <POOL_ID> --source files --path ./exampledirectory --meta-file ./metafile.json --clear
```

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
arcpool mine <POOL_ID> --source twitter
```

**Mine all tweets based on user and tag**

For example: mine all tweets with "@thealexarchive #TOPIC"

```sh
arcpool mine <POOL_ID> --source twitter --method mention --mention-tag "@thealexarchive #TOPIC"
```

**Mine all tweets ever from a particular user**

For example: mine all tweets from SBF_FTX

- Do not include the @ in the **--username value**

```sh
arcpool mine <POOL_ID> --source twitter --method user --username SBF_FTX
```

### Wikipedia

**Mine a single Wikipedia article related to the given `keywords` in config**

```sh
arcpool mine <POOL_ID> --source wikipedia
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
arcpool mine <POOL_ID> --source twitter --d
```

**To view all the daemon mode mining processes:**

```sh
arcpool dlist
```

Expected Output:

![](https://arweave.net/jPx7l8816lKYpf4sstSKRtKVUV7cAXWFqlIglIjcFJQ)

**Stop a pools daemon process by name:**

```sh
arcpool dstop --dname <POOL_ID>
```

**To view logs for the mining processes install pm2:**

```sh
npm install --global pm2
```

**Stream the logs:**

```sh
pm2 logs
```
