// index.js

const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear } = goals;
const { Vec3 } = require('vec3');
const express = require('express');

function createBotAndServer(options) {
  const app = express();

  const bot = mineflayer.createBot({
    host: options.host || 'localhost',
    port: options.port || 25565,
    username: options.username || 'Bot'
  });

  bot.loadPlugin(pathfinder);

  bot.on('spawn', () => {
    console.log('Bot has spawned');

    const defaultMove = new Movements(bot);
    bot.pathfinder.setMovements(defaultMove);

    const targetPos = new Vec3(10, 64, 10); // Example coordinates for the bot to move to
    bot.pathfinder.setGoal(new GoalNear(targetPos.x, targetPos.y, targetPos.z, 1));
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    bot.chat(`Hello ${username}, you said: ${message}`);
    
    // Move to a specific location when a certain message is received
    if (message === 'move') {
      const targetPos = new Vec3(100, 64, 100); // New coordinates for the bot to move to
      bot.pathfinder.setGoal(new GoalNear(targetPos.x, targetPos.y, targetPos.z, 1));
    }
  });

  bot.on('goal_reached', () => {
    console.log('Bot has reached the goal');
  });

  app.get('/', function (req, res) {
    res.send('Hello World. Bot started.');
  });

  app.listen(3000, () => {
    console.log('Express server listening on port 3000');
  });

  return { bot, app };
}

module.exports = mcsbot;
