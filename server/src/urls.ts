// To connect to a public cluster, set `export LIVE=1` in your
// environment. By default, `LIVE=1` will connect to the devnet cluster.

import { clusterApiUrl, Cluster } from "@solana/web3.js";

const CLUSTER = process.env.CLUSTER || 'testnet';
const LIVE = process.env.LIVE || true;

function chooseCluster(): Cluster | undefined {
  if (!LIVE) return;
  switch (CLUSTER) {
    case "devnet":
    case "testnet":
    case "mainnet-beta": {
      return CLUSTER;
    }
  }
  return "devnet";
}

export const cluster = chooseCluster();

export const url =
  process.env.RPC_URL ||
  (LIVE ? clusterApiUrl(cluster, false) : "http://localhost:8899");

export const urlTls =
  process.env.RPC_URL ||
  (LIVE ? clusterApiUrl(cluster, true) : "http://localhost:8899");
