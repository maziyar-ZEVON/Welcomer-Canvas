const Discord = require('discord.js');


const config = require('./config.json')


const client = new Discord.Client();


const Canvas = require("canvas");

client.once('ready', () => {
    console.log('Ready!');
});

client.on('guildMemberAdd', async member => {
    let welcomeChannel = client.channels.cache.get("CHANNEL ID")
    if (welcomeChannel) {
        let background = await Canvas.loadImage("BACKGROUND LINK");
        let avatar = await Canvas.loadImage(
          member.user.displayAvatarURL({ format: "png" })
        );
        let canvas = Canvas.createCanvas(800, 300);
        let ctx = canvas.getContext("2d");
        ctx.patternQuality = "bilinear";
        ctx.filter = "bilinear";
        ctx.antialias = "subpixel";
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.drawImage(background, 0, 0, 800, 300);
        ctx.font = "bold 35px Sans";
        ctx.fontSize = "72px";
        ctx.fillStyle = "#6134DA";
        ctx.textAlign = "center";
        ctx.fillText(member.user.username, 545, 177);
        ctx.font = "bold 16px Sans";
        ctx.fontSize = "72px";
        ctx.fillStyle = "#6134DA";
        ctx.textAlign = "center";
        ctx.fillText(`${member.guild.memberCount} Members`, 580, 200);
        ctx.beginPath();
        ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatar, 36, 21, 260, 260);

        let file = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
        setTimeout(() => {
            welcomeChannel.send(`**${member.user.username}** Hi | Welcome To **${member.guild.name}** Server!`, file);
        }, 2000);
    } else {
        console.log("Err")
    }
})
client.login(config.token);

