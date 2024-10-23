# Create a Local Atlas Deployment for CafeLAutomation

This tutorial shows you how to use the `atlas deployments` command to create a local Atlas deployment for the CafeLAutomation project. In this tutorial, we will deploy a single-node replica set on your local computer to support CafeLAutomation operations. You can then manage your deployment and use Atlas Search and Atlas Vector Search to support the analytics and data-driven operations of CafeLAutomation.

## Supported OS for Local Atlas Deployments

| Operating System               | Operating System Version | Architecture  | Minimum CPU Cores | Minimum Free RAM (GB) |
|--------------------------------|--------------------------|---------------|------------------|-----------------------|
| MacOS                          | 13.2 and later           | x86-64, ARM   | 2                | 2                     |
| Red Hat Enterprise Linux / CentOS | 8, 9                  | x86-64, ARM   | 2                | 2                     |
| Ubuntu                         | 22.04, 24.04             | x86-64, ARM   | 2                | 2                     |
| Debian                         | 11, 12                  | x86-64, ARM   | 2                | 2                     |
| Amazon Linux                   | 2023                    | x86-64, ARM   | 2                | 2                     |
| Windows                        | 10, 11                  | x86           | 2                | 2                     |

## Complete the Prerequisites

Before you begin, complete the following prerequisites:

**Important**: For compatibility information for each prerequisite product, see the related installation pages.

### Install the Atlas CLI

Example (MacOS):
```sh
brew install mongodb-atlas-cli
```
To learn about the Atlas CLI install instructions for other operating systems, see [Install or Update the Atlas CLI](#).

### Install mongosh version 2.0 or later

Example (MacOS):
```sh
brew install mongosh
```
To learn about the mongosh install instructions for other operating systems, see [Install mongosh](#).

### (Optional) Install Compass version 1.39.4 or later

Example (MacOS):
```sh
brew install mongodb-compass
```
To learn about the Compass install instructions for other operating systems, see [Download and Install Compass](#).

### Install MongoDB Database Tools

Example (MacOS):
```sh
brew tap mongodb/brew && brew install mongodb-database-tools
```
To learn about the MongoDB Database Tools install instructions for other operating systems, see [Installing the Database Tools](#).

### Install Docker

- For MacOS or Windows, install Docker Desktop v4.31+.
- For Linux, install Docker Engine v27.0+.

**Note**: Docker requires a network connection for pulling and caching MongoDB images.

Podman v5.0+ is also supported for Linux RHEL versions.

## Create a Local Atlas Deployment

Use the `atlas deployments` command to create a local Atlas deployment for CafeLAutomation.

You can run this command in the following ways:

- **Interactive Mode (Default)**: the command prompts you for the deployment settings and provides default values.
- **Interactive Mode (Custom)**: the command prompts you for the deployment settings and lets you provide custom values.
- **Non-Interactive Mode**: you run the command with the specified options. The command does not prompt you to provide further values. To learn all of the actions that `atlas deployments` supports, see [atlas deployments](#).

### Interactive (Default)

1. Run the `atlas deployments` command in interactive mode.
   ```sh
   atlas deployments setup
   ```
2. Specify what to deploy.
   Example:
   ```
   Specify local - Local Database and press Enter.
   ? What would you like to deploy?  [Use arrows to move, type to filter, ? for more help]
   > local - Local Database
     atlas - Atlas Database
   ```

   **[Default Settings]**
   - Deployment Name: `local50`
   - MongoDB Version: `7.0`
   - Port: `27017`

3. Specify how to set up your local Atlas database.
   Example:
   ```
   Specify default - With default settings and press Enter.
   ? How do you want to setup your local MongoDB database?  [Use arrows to move, type to filter]
   > default - With default settings
     custom - With custom settings
     cancel - Cancel set up
   ```

   Creating your deployment `local50` [this might take several minutes]
   ```
   1/4: Downloading and completing configuration...
   2/4: Starting your local environment...
   3/4: Downloading MongoDB binaries to your local environment...
   4/4: Creating your deployment local50...
   Deployment created!
   Connection string: mongodb://localhost:27017/?directConnection=true
   ```

## Manage a Local Atlas Deployment

Use the `atlas deployments` command to manage a local Atlas deployment for CafeLAutomation. You can use the following commands for both local and cloud Atlas deployments. You can use `--type local` or `--type atlas` to run the command for local or cloud atlas deployments respectively.

1. **List the available deployments**
   ```sh
   atlas deployments list
   ```
   Example output:
   ```
   NAME        TYPE    MDB VER   STATE
   local50     LOCAL   7.0.1     IDLE
   local62     LOCAL   7.0.1     IDLE
   myLocalRs   LOCAL   7.0.1     IDLE
   myLocalRs1  LOCAL   7.0.1     IDLE
   ```

2. **Download and load the sample data**
   ```sh
   curl https://atlas-education.s3.amazonaws.com/sampledata.archive -o sampledata.archive
   mongorestore --archive=sampledata.archive --port={port-number}
   ```

3. **Connect to a deployment**
   ```sh
   atlas deployments connect
   ```

4. **Pause a deployment**
   ```sh
   atlas deployments pause
   ```

5. **Start a deployment**
   ```sh
   atlas deployments start
   ```

6. **Return the logs for the deployment**
   ```sh
   atlas deployments logs
   ```

7. **Delete a deployment**
   ```sh
   atlas deployments delete
   ```

## Use Atlas Search with a Local Atlas Deployment for CafeLAutomation

Use the `atlas deployments search indexes create` command to create an Atlas Search search index. You can then run Atlas Search queries. To learn more, see [Atlas Search](#).

You can run this command with local and cloud Atlas deployments. For detailed steps, see [Create an Atlas Search Index and Run a Query](#).

## Use Atlas Vector Search with a Local Atlas Deployment for CafeLAutomation

Use the `atlas deployments search indexes create` command to work with Atlas Vector Search. To learn more, see [How to Index Vector Embeddings for Vector Search](#).

You can run this command with local and cloud Atlas deployments. For detailed steps, see [Use Atlas Vector Search with an Atlas Deployment](#).

**Important**: To use the Atlas CLI with Atlas Vector Search, you must create an Atlas deployment with MongoDB 7.0.5 or later. If you created a local Atlas deployment with an earlier MongoDB version, you don't get the latest MongoDB version automatically. You must delete the earlier images and deployments, then create a new Atlas deployment.

## Supported Actions

To learn all of the actions that `atlas deployments` supports, see [atlas deployments](#).

## Troubleshoot Errors

To learn more about troubleshooting local Atlas deployment issues, see [Troubleshoot Local Atlas Deployment Issues](#).
