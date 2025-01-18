const { joinVoiceChannel } = require('@discordjs/voice');
const state = require('../state');

async function handleVoiceStateUpdate(oldState, newState) {
    try {
        if (state.follower && newState.id === state.follower && oldState.channelId !== newState.channelId) {
            if (state.connection) state.connection.destroy();

            state.connection = joinVoiceChannel({
                channelId: newState.channelId,
                guildId: newState.guild.id,
                adapterCreator: newState.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false,
            });
            console.log(`Connected to channel: ${newState.channelId}`);
        }
    } catch (error) {
        console.error('Error connecting to voice channel:', error);
    }
}

function afkInVoiceChannel(msg) {
    try {
        if (msg.member.voice.channel) {
            if (!state.connection) {
                state.connection = joinVoiceChannel({
                    channelId: msg.member.voice.channel.id,
                    guildId: msg.guild.id,
                    adapterCreator: msg.guild.voiceAdapterCreator,
                    selfDeaf: false,
                    selfMute: false,
                });
                msg.channel.send('🔊 AFK in voice channel.');
            }
        } else {
            msg.channel.send('⚠️ You must be in a voice channel to use this command.');
        }
    } catch (error) {
        console.error('Error joining voice channel:', error);
        msg.channel.send('❌ Error joining voice channel.');
    }
}

function leaveVoiceChannel(msg) {
    try {
        if (state.connection) {
            state.connection.destroy();
            msg.channel.send('👋 Left voice channel.');
            state.connection = null;
        } else {
            msg.channel.send('⚠️ Not connected to any voice channel.');
        }
    } catch (error) {
        console.error('Error leaving voice channel:', error);
        msg.channel.send('❌ Error leaving voice channel.');
    }
}

module.exports = {
    handleVoiceStateUpdate,
    afkInVoiceChannel,
    leaveVoiceChannel
};
