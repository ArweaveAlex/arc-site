# Creating a pool from the CLI.

To create a pool you must complete the following steps:

1. **Install arcpool**
2. **Initiate the pool**
3. **Configure the pool**
4. **Create the pool**
5. **Fund the pool**

### 1. Install arcpool

**arcpool** requires [NodeJS (v18+)](https://nodejs.org/en/download/) [NPM](https://www.npmjs.com/package/npm) and [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installed.

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

### 2. Initiate the pool

In your terminal / command prompt, you will create a directory for the pool configuration and wallets. This directory can be named anything you want. You will also choose an ID that will be used to identify the pool on your local machine.

For the purposes of this documentation, the following values will be used as an examples for the directory name and Pool ID:

Directory name: **alex-test**

Pool ID: **russia_ukraine_conflict**

#### Pool nitiation steps

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
   arcpool init <POOL_ID>
   ```
   Example: **arcpool init russia_ukraine_conflict**

The result of these steps will generate a file named: **pools.json**

This file is the main pool configuration and should not be deleted. You will be making many edits to this file and it will
be used every time you run any mining processes.

### 3. Configure the pool

Below is a screenshot of the **pools.json** file that has been initiated that now needs to be configured.

![](https://arweave.net/bDYwoBuP7Ty9lDIhrfNolVZ-cBaI-OzzAKkV64Y74Mo)

#### Pool Configuration Steps

1. Open **pools.json** in your text editor

2. Modify the following values **(Note: The following values are the only values that need to modified at this time, there are many other values in this file that either never need to be modified or should be modified at a later point)**

- **state.title**: The title of your pool.
- **state.description**: A long description of your pool. This description will appear on the [pool details](https://alex.arweave.dev/#/pool/zIZXNTl-GtTDbO8eP8LpkHks5S5WhB4j82YX-N2RuGw) page of Alex., under the 'About' header. It can contain text and/or HTML.
- **state.briefDescription**: A brief description of your pool. This description will appear on the [home page](https://alex.arweave.dev) of Alex.
- **keywords**: A list of the main keywords to track in the mining process. This is the core driving data that instructs the mining programs of what to pull from mining sources such as Twitter, Wikipedia, Reddit, or Nostr
- **topics:** A list of one or more of the following topics
  - **History**, **Philosophy**, **International**, **Culture**, **Art**, **Music**, **News**, **Faith**, **Science**, **Spirituality**, **Sports**, **Business**, **Technology**, **Politics**, **Other**
- **controller.contribPercent**: A reward percentage of the contributions. This value can be from 0 - 100 and represents the total percentage of contributions that go to your control wallet for mining. If the value of **controller.contribPercent** is **10**, then **10%** of all contributions will go to your control wallet as a reward. This percentage will appear in the user interface to let contributors know how much of their contribution will go to the operator.
- **controller.pubkey**: The public key for the control wallet that the percentage of contributions declared in **controller.contribPercent** will be sent to.

### 4. Create the pool

To create a pool you will need to run one command with a few arguments passed in, including the name from when you initialized the pool, path to wallet you created, and a path to your pool header image.

```sh
arcpool create <POOL_ID> --control-wallet <PATH_TO_WALLET.json> --image <PATH_TO_IMAGE>
```

Example: **arcpool create russia_ukraine_conflict --control-wallet ../wallet.json --image ../pool-image.jpg**

Note the top of the logs for your pool wallets seed phrase. Inside your working directory should be a **wallets** directory. This is where your pool collection wallet is stored and should be kept safe, along with the seed phrase logged by the CLI. Write down your seed phrase.

**Do not give this to anyone. Without this you have no way to recover your wallet should anything happen.**

![](https://arweave.net/9at6rfK4Ej3XOsdE5FUMmv8PSiM55hwtUUZAG96fASA)

If your pool has been successfully created, you will see a URL log in your terminal / command prompt at the end of the pool creation process. You will now be able to see your pool on the [Alex. Pools Page](https://alex.arweave.dev/#/pools). Note that it may take some time for the pool to appear.

### 5. Fund the pool

At the end of the pool creation process the CLI program will ask if you want to contribute funds from your control wallet. This is recommended as it will allow you to begin mining immediately. When the prompt asks, enter a decimal amount of $AR less than what you have in your wallet and hit enter. The funding portion will take some time because it is waiting for the transactions to process on the blockchain. Wait for the program to finish.

If you decide to not fund the pool from your control wallet, you will need contributions to start mining. This can be a small amount to get started just to trigger the CLI to start transferring your funds to your pools Bundlr instance. We will only need to do this once and as more contributions are made it will be updated automatically as we run the mining service.

Find and navigate to your pool on the [Alex. Pools Page](https://alex.arweave.dev/#/pools) and click the contribute button. Contribute a small amount of $$AR to your collection and wait for that contribution to display in the UI. Once that has registered the funds to the pool, go back to your terminal and run:

```sh
arcpool fund <POOL_ID>
```

Example: **arcpool fund russia_ukraine_conflict**

Output Screenshot:

![](https://arweave.net/z02hcBqrVeNbjYDIgyMImJVNv77QoSl2h73q0eksnwM)

Please note that funding a Bundlr instance can take up to 30 minutes. To check the status of the funding you can use the command:

```sh
arcpool balance <POOL_ID>
```

Example: **arcpool balance russia_ukraine_conflict**

Output Screenshot:

![](https://arweave.net/K2WdwCIYaKtipmGEQJrcn5flTMlwMgmYGJrycv9VAhU)

Once you see that you have Bundlr funds you can proceed to the mining processes.
