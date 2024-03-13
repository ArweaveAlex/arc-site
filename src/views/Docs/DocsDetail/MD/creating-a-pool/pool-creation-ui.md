# Creating a pool from the UI

To start, connect your wallet and fill out the pool information [here](https://alex.arweave.dev/#/pools/create).

- Recommended pool banner image size: 16:9 aspect ratio, 1920 x 1080 pixels.

Once you've created your pool, visit the individual Pool Manage Page located in the Pools tab within your account. From here, you can begin uploading files to your pool.

## Setting artifact metadata from the UI

After uploading the files you wish to archive, proceed to create metadata:

- Click on the three dots located to the right of each file displayed.
- Select “Update Metadata”.

In the metadata section, you can fill out form fields with metadata that you'd like to attach to each specific artifact. Here is an example input:

- “Field: Date”
- “Value: 12.08.2023”

You can add as many metadata fields as needed to each artifact. Once you're finished, click "Save".

Finally, upload the files by selecting the green “Upload” button at the top of the Pool Management Page.

**Remember, file metadata uploaded is permanent. Double-check the metadata before uploading.**

## Creating artifact groups

Before uploading files, you have the option to create artifact groups:

- Click on the three dots located to the right of each file displayed.
- Select "Add to Groups”.
- Create and name the group.
- Create as many groups as needed and add each artifact to specific groups.

**Remember, artifact groups are permanent. Double-check the metadata before uploading.**

## UI to CLI configuration

If you would like to use mining sources not supported in the user interface, then you can download your pool configuration **(pools.json)** file to your local. To do this you must visit the Pools tab in your account and locate the pool that you created.

After visiting that individual pool page, click **Download Pool Configuration** to download the **pools.json** file.

### Create a Pool ID

You will be prompted to enter a **Pool ID**. This identifier can be anything you want, and will be used by you to identify the pool in the CLI.

For example if you enter **Test-Pool** as the **Pool ID**, you will mine from this pool with the following command

```sh
arcpool mine Test-Pool --source files --path examplefile.jpg
```

### Update the wallet directory

Next, you will need to create a wallets directory in the same directory as the **pools.json** file that holds the Arweave wallet keyfile that owns the pool. You must then update the **walletPath** property in **pools.json** to point to that wallet. This step requires you to manually enter your wallet path for security purposes and must be completed in order to successfully mine in the CLI.

Once **pools.json** file is configured with the correct wallet information, follow the steps in [mining artifacts](https://alex.arweave.dev/#/docs/creating-a-pool/mining-artifacts) to archive from other sources.
