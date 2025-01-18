const state = require('../state');

function handleGeneralCommands(msg, content) {
    try {
        switch (content) {
            case 'ping':
                const latency = Date.now() - msg.createdTimestamp;
                const shardLatency = msg.client.ws.ping;
                msg.channel.send(`🏓 **Message Latency:** ${latency}ms\n🔄 **Shard Latency:** ${shardLatency}ms`);
                break;

            case 'help':
                msg.channel.send(getHelpMessage());
                break;

            case 'follow':
                state.follower = state.follower ? null : msg.author.id;
                msg.channel.send(state.follower ? '🔄 Follow mode enabled.' : '⛔ Follow mode disabled.');
                break;

            case 'uptime':
                const uptime = process.uptime();
                msg.channel.send(`⏰ **Uptime:** ${Math.floor(uptime / 60)} minutes`);
                break;
        }
    } catch (error) {
        console.error('Error in general command:', error);
        msg.channel.send('❌ Error processing command.');
    }
}

function getHelpMessage() {
    return `
**Admin Commands:**
- \`say [message]\` - Makes the bot say something in the channel.
- \`ping\` - Replies with latency details.
- \`fuckoff\` - Leaves the voice channel.
- \`stay\` - AFK in current voice channel.
- \`follow\` - Toggles follow mode.
- \`uptime\` - Shows bot uptime.
- \`serverinfo\` - Displays server info.
- \`userinfo\` - Displays user info.
- \`avatar\` - Displays avatar.
- \`help\` - Shows this message.`;
}

module.exports = {
    handleGeneralCommands
};
