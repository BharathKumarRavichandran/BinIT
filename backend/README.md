# BinIT-API

### Prerequisites
Check [Digital Ocean](https://www.digitalocean.com/) site for installing the following prerequisites :
* Install npm.
* Install node (preferably, version - 11.10.0).
* Install MongoDB.
* Install Solc compiler: `npm install -g solc`
* Install [Geth](https://geth.ethereum.org/). 
* Install Truffle: `npm install -g truffle`
* Install Ganache: `npm install -g ganache-cli`

### Installation
* Clone/download this repository.
* Go to the project root directory in terminal.
* Install the dependencies :
    ```
    $ npm install
    ```
* Copy contents of file `.env.example` to a new file `.env`.
* Fill `.env` fields appropriately.

### How to run :
* Clone/download this repository.
* [Install](#Installation) the application.
* Start Ganache: `ganache-cli` 
* Run the application: `node src/server.js`

### Troubleshooting :
* If you face node version incompatibilites or getting some weird errors, try installing the packages again and run the application using node version `11.10.0`
* Use `nvm` if you want to switch to different `node` version.