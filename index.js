const { Client } = require('discord.js-selfbot-v13');
require('dotenv').config();
const { handleVoiceStateUpdate, afkInVoiceChannel, leaveVoiceChannel } = require('./commands/voice');
const { handleGeneralCommands } = require('./commands/general');
const { handleInfoCommands } = require('./commands/info');
const { AdminsUsers } = require('./config');

const client = new Client();

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

client.on('ready', () => {
    console.log(`Client logged in as ${client.user.username}`);

    client.user.setPresence({
        activities: [{
            name: 'Zerexxx SelfBot',
            type: 'STREAMING',
            url: 'https://www.youtube.com/watch?v=zuegQmMdy8M'
        }],
        status: 'idle'
    });

    console.log('Status set to Streaming!');
});

client.on('voiceStateUpdate', (oldState, newState) => {
    try {
        handleVoiceStateUpdate(oldState, newState);
    } catch (error) {
        console.error('Error in voiceStateUpdate:', error);
    }
});

client.on('messageCreate', async (msg) => {
    try {
        if (msg.author.bot || !AdminsUsers.includes(msg.author.id)) return;

        const content = msg.content.toLowerCase();
        handleGeneralCommands(msg, content);
        handleInfoCommands(msg, content);
    } catch (error) {
        console.error('Error handling message:', error);
    }
});

client.login(process.env.TOKEN).catch((error) => {
    console.error('Error logging in:', error);
});
