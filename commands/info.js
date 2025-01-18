function handleInfoCommands(msg, content) {
    try {
        const guild = msg.guild;

        switch (content) {
            case 'serverinfo':
                const response = `**Server Info**\n` +
                    `**Name:** ${guild.name}\n` +
                    `**ID:** ${guild.id}\n` +
                    `**Owner:** <@${guild.ownerId}>\n` +
                    `**Created:** ${guild.createdAt.toDateString()}\n` +
                    `**Member Count:** ${guild.memberCount}`;
                msg.channel.send(response);
                break;

            case 'userinfo':
                msg.channel.send(`**Username:** ${msg.author.username}\n**ID:** ${msg.author.id}`);
                break;

            case 'avatar':
                msg.channel.send(msg.author.displayAvatarURL({ dynamic: true, size: 512 }));
                break;
        }
    } catch (error) {
        console.error('Error in info command:', error);
        msg.channel.send('❌ Error retrieving information.');
    }
}

module.exports = {
    handleInfoCommands
};
