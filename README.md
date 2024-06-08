## Node Bot MCS
# Bot for Minecraft server 
A bot make for minecraft server 

# Depend on
MineFlayer


Mineflayer-pathfinder


express


# install 
using NPM Pkg
```
npm i node-bot-mcs
```
Using Github Pkg
```
npm i @samir717le/node-bot-mcs
```
# How to use
```
const bot = require('mcsbot');

const options = {
  host: 'localhost', # Ip Address Of server
  port: 25565, #Port of server
  username: 'Bot' # Bot Name
};

bot(options);
```
