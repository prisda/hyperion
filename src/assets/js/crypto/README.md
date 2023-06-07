# Web3 Integration

This directory contains code to connect the client's site to the zkSync network for minting NFTs. All code related to this functionality exists within this directory, except for the addition of HTML tags to elements to enable button functions.

## Directory Structure

- `crypto/`

  - `assets/`
    - `abi.json`
    - `whitelist.json`
  - `auth.js`: Handles user login/logout
  - `config.js`: Specifies chainId, network details and contract address/abi,
  - `html.js`: Handles connecting logic to html elements
  - `whitelist.js`: Handles whitelist logic
