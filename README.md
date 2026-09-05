A simple Discord selfbot built with Node.js and discord.js-selfbot-v13.

⚠️ Disclaimer: Selfbots automate a normal Discord user account and may violate Discord's Terms of Service. Use this project at your own risk and preferably only for testing/development purposes.

✨ Features
🎙️ Voice channel management
💤 AFK voice functionality
🚪 Leave voice channels
⚙️ General commands
ℹ️ Information commands
👑 Admin-only command access
🟢 Custom Discord presence
🛡️ Error handling for unhandled promises and exceptions
📁 Project Structure
Zerexxx-SelfBot/
│
├── commands/
│   ├── voice.js
│   ├── general.js
│   └── info.js
│
├── config.js
├── index.js
├── package.json
├── package-lock.json
├── .env
└── README.md
🚀 Installation
1. Clone the repository
git clone https://github.com/HauntPsy777/selfbot.git
cd selfbot
2. Install dependencies
npm install
3. Configure your environment

Create a .env file in the root directory:

TOKEN=YOUR_DISCORD_TOKEN

Never share your token or commit your .env file to GitHub.

Add this to .gitignore:

node_modules/
.env
⚙️ Configuration

The bot uses config.js to define authorized users.

Example:

const AdminsUsers = [
    'USER_ID_1',
    'USER_ID_2'
];

module.exports = {
    AdminsUsers
};

Only users whose Discord IDs are included in AdminsUsers can execute commands.

🎮 How It Works

When the client starts, it logs in using the token stored in .env.

Once connected, the client:

Displays the logged-in username.
Sets a custom streaming presence.
Listens for voice state changes.
Listens for new messages.
Checks whether the message author is an authorized admin.
Passes commands to the appropriate command handlers.
🟢 Presence

The current presence is configured as:

client.user.setPresence({
    activities: [{
        name: 'Zerexxx SelfBot',
        type: 'STREAMING',
        url: 'https://www.youtube.com/watch?v=zuegQmMdy8M'
    }],
    status: 'idle'
});

You can change:

Activity name
Activity type
Streaming URL
Online status
🎙️ Voice System

Voice-related events are handled through:

handleVoiceStateUpdate(oldState, newState);

The project also exposes:

afkInVoiceChannel
leaveVoiceChannel

These functions can be used to manage the user's voice-channel behavior.

💬 Message Handling

Messages are processed using:

client.on('messageCreate', async (msg) => {
    if (msg.author.bot || !AdminsUsers.includes(msg.author.id)) return;

    const content = msg.content.toLowerCase();

    handleGeneralCommands(msg, content);
    handleInfoCommands(msg, content);
});

This means:

Bot messages are ignored.
Unauthorized users are ignored.
Commands are converted to lowercase.
General and information commands are handled separately.
🛡️ Error Handling

The project includes global error handlers:

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
});

Voice and message handlers also use try/catch blocks to prevent individual errors from crashing the process.

▶️ Running the SelfBot

Start normally:

node index.js

Or, if you have a start script in package.json:

npm start
📦 Dependencies

Main dependencies:

discord.js-selfbot-v13
dotenv

Install them with:

npm install discord.js-selfbot-v13 dotenv
🔐 Security

Never upload your Discord token.

If your token becomes public:

Stop the application.
Log out/revoke the affected session as appropriate.
Obtain a new token if necessary.
Update your .env.

Do not place tokens directly inside JavaScript files.

📜 License

This project is intended for educational and experimental purposes.

Use it responsibly and in accordance with Discord's Terms of Service.
