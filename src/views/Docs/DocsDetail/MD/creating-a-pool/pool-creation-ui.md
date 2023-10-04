# Creating a pool from the UI

Start by connecting your wallet and filling out the pool information [here](https://alex.arweave.dev/#/pools/create).

Once you have created your pool and visit the individual Pool Manage Page located in the Pools tab in your account, you can now upload files to your pool. Please note that file metadata uploaded is permanent, so don’t forget to double check metadata.

## UI to CLI configuration

If you would like to use mining sources not supported in the user interface, then you can download your pool configuration **(pools.json)** file to your local. To do this you must visit the Pools tab in your account and locate the pool that you created.

After visiting that individual pool page, click **Download Pool Configuration** to download the **pools.json** file.

You will be prompted to enter a **Pool ID**. This identifier can be anything you want, and will be used by you to identify the pool in the CLI.

For example if you enter **Test-Pool** as the **Pool ID**, you will mine from this pool with the following command

```sh
arcpool mine Test-Pool --source files --path examplefile.jpg
```

Next, you will need to create a wallets directory in the same directory as the **pools.json** file that holds the wallet keyfile that owns the pool. You must then update the **walletPath** property in **pools.json** to point to that wallet. This step requires you to manually enter your wallet path for security purposes and must be completed in order to successfully mine in the CLI.

Once **pools.json** file is configured with the correct wallet information, follow the steps in [mining artifacts](https://alex.arweave.dev/#/docs/creating-a-pool/mining-artifacts) to archive from other sources.
