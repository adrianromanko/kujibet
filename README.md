## Kujibet[![Build Status](https://github.com/adrianromanko/kujibet/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/adrianromanko/kujibet/actions/workflows/nodejs.yml/badge.svg?branch=main)

### Prerequisites

Solana CLI Tooling: https://docs.solana.com/cli/install-solana-cli-tools
For running this application you need to have [NodeJs](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/).
We recommend to use [NVM](https://github.com/creationix/nvm) for managing NodeJs versions
For NVM installation please refer to [manual](https://github.com/creationix/nvm#install--update-script)

### Install

```
npm install
```

### Run Server

_Note: If the cluster you connect to doesn't provide a faucet, you will need to supply the server with a payer key. (See 'Configuration' below)._

```
# Start local node
solana-test-validator

# Deploy program to local node
cd program
cargo build-bpf
solana program deploy target/deploy/solana_program.so --url localhost

# Connect to local node
cd server
npm run start:dev
```

#### Configuration

By default, the server will connect to a local node for RPC.

##### `PORT`

Set this option to specify the port for the API server. Default is 8080.

```
PORT=80 npm run start:dev
```

##### `RPC_URL`

Set this option to connect to a specific remote RPC API server.

```
RPC_URL=http://api.mainnet-beta.solana.com npm run start:dev
```

##### `LIVE`

Enable this option to connect to a remote cluster. The default cluster is devnet.

```
LIVE=true npm run start:dev
```

##### `CLUSTER`

Enable this option along with `LIVE=true` to connect to a specific remote cluster.

```
LIVE=true CLUSTER=devnet npm run start:dev
LIVE=true CLUSTER=testnet npm run start:dev
LIVE=true CLUSTER=mainnet-beta npm run start:dev
```

##### `DEPLOYED_PROGRAM_ADDRESS`

```
DEPLOYED_PROGRAM_ADDRESS=<BASE58 ENCODED ADDRESS> npm run start:dev
```
