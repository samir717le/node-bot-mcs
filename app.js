const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear } = goals;
const { Vec3 } = require('vec3');
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
  res.send('bot started')
})

app.listen(3000)
const bot = mineflayer.createBot({
  host: 'localhost', // Minecraft server IP
  port: 25565,       // Minecraft server port
  username: 'Bot'    // Minecraft username
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