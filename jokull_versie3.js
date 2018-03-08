//importing the discord.js module
const discord = require('discord.js');
const config=require("./jokullconfig.json");
const prefix=config.prefix;
const colleagueArray=config.colleagueArr
const ownerID=config.ownerID

//create an instance of discord 
const bot = new discord.Client();
var channelchat=false;
var guildListen,channelTalk,channelChat;

//Jokull log on
bot.on('ready',() => {
    console.log('Jokull has been activated!');
    bot.user.setGame('Writing research papers');

//listen default: Harmonia Server
guildListen = bot.guilds.find("name","Harmonia University");
//channellisten default: #bot
channelListen = guildListen.channels.find("name","bot");
//chat default: #general-chat
channelTalk = guildListen.channels.find("name","general-chat");
});
bot.login(config.token);

//extra functions
//gcd function
function gcd(a,b) {
    if (!b) {
        return a;
    }
    return gcd(b,a%b);
}

//random generator function
function randomgen(value) {
    return (Math.floor(Math.random()*value));
}
//checking strings
function stringcheck(string) {
    return string.replace(/ /g,"");
}

bot.on('message', message => {
// Variable defaults

//message bypass spaces+cases
var msg = message.content.replace(/ /g,"").toLowerCase();
//get the command and any arguments.
const args=message.content.slice(prefix.length).trim().split(/ +/g);
const command=args.shift().toLowerCase();

//tells people to not swear (doesn't consider cases where the cases may be all mixed up....)
if (msg.indexOf("fuck") !== -1 || msg.indexOf("FUCK")!== -1 || msg.indexOf("shit") !== -1 || msg.indexOf("SHIT") !== -1) {

    message.channel.send("Please watch your language.")

}

//Echo feature
else if ( message.content.indexOf("+echo")!==-1){
        //only stormfull can do this
        if (message.author.id != config.ownerID){
            message.channel.send("Sorry, I can't do that for you.");
            return;
        }
        message.react("👍");
        msg = message.content.slice(6);
        var msgarr = msg.split(' ');

        switch(msgarr[0]){

        //turn echo on/off
        case 'on':
        channelchat = true;
        message.channel.send("Hello! I am now able to echo.")
        .then(message => message.delete(3000));
        break;
        
        case 'off':
        channelchat = false;
        message.channel.send("That will be all. Echo function turned off.")
        .then(message => message.delete(3000));
        break;

        //toggle the channel listen/talk settings
        case 'listen':
        msg = msg.slice(7);
            // Channel to listen
            if (msgarr[1] === 'to'){
                channelListen = guildListen.channels.find('name',msg.slice(3));
                message.channel.send("I will be listening to " + msg.slice(3) + ".")
                .then(message => message.delete(3000));
            }
            // Channel to talk
            else if (msgarr[1] === 'from'){
                channelTalk = guildListen.channels.find('name',msg.slice(5));
                message.channel.send("I will be talking in " + msg.slice(5) + ".")
                .then(message => message.delete(3000));
            }
            // Guild server
            else if (msgarr[1] === 'in'){
                guildListen = client.guilds.find('name',msg.slice(3));
                message.channel.send("I will be in " + msg.slice(3) + ".")
                .then(message => message.delete(3000));
            }
            break;
        }

        message.delete(3000);
    }


  // Echo check
  else if (message.channel == channelListen && channelchat){
    if (message.author.id != config.ownerID)  return;
    channelTalk.send(message.content);
    message.delete(0);


    //classic jokull greeting
  }else if (msg === stringcheck("hey jokull")) {
    message.channel.send("If algebraists like it, they put a ring on it.");

    //tell fortune
  }else if (msg === stringcheck("what's my fortune")) {
    var quotes=["No hope.", "I suppose you may become wealthy one day.",
    "Bleak.","Why are you asking me this? I'm not a psychic type!"];
    var random=Math.floor(Math.random()*quotes.length);
    message.channel.send(quotes[random]);

//ask question about colleague
}else if (msg.indexOf("colleague") !== -1 || msg.indexOf("COLLEAGUE") !== -1) {
    var colleague=colleagueArray[randomgen(colleagueArray.length)];
    var phrase=[colleague+" for sure!","No doubt, "+colleague+".","It's definitely not "+colleague+"!",colleague+".","I have my doubts, but I think it's "+colleague,"The answer is simple: nobody!"];
    var random2=Math.floor(Math.random()*phrase.length);
    message.channel.send(phrase[random2]);

    //tell me i'm pretty
}else if (msg === stringcheck("tell me i'm pretty")) {
    message.channel.send("no");

    //replies with a random emoji to indicate mood
}else if ( msg === stringcheck("what's your mood") ) {
    var emojis=["<:wrongbinch:359876766858346509>","<:jokull2:370064811775492096>","<:jokull3:370064811821891584>","<:jokull1:370064811628953611>","<:AAAAAAA:359879736392024065>","<:mona:359878581700001794>","<:horror:371727607080943636>","<:angry:366017544345092096>","<:im_dying_squirtle:375447495167180800>","<:horror:371727607080943636>","<:angrydognoises:411003327137054721>","<:winky:405569333562179595>","<:medleythonk:403991823502016512>","<:mood:375726062795227136>","<:yellpo:413373717100625969>","<:donk:399430425216417794>"];
    var random=Math.floor(Math.random()*emojis.length);
    message.channel.send(emojis[random]);
}

    //these commands require a prefix.
if(message.content.indexOf(config.prefix) !== 0) {
    return;
}
    //a juicy gossip
if (command ==="gossip") {
    var colleague=colleagueArray[randomgen(colleagueArray.length)];
    var colleague2;
    var equal=true;

    while (equal) {
        if ((colleague2=colleagueArray[randomgen(colleagueArray.length)])!=colleague) {
            equal=false;
        }else{
            colleague2=colleagueArray[randomgen(colleagueArray.length)];
        }

    }

    var phrases=["```I heard that "+colleague+" ripped their pants while teaching last week.```","```The other day, "+colleague+" was using the coffee machine and spilled coffee everywhere. They think that they got away, but I know the truth.```","```"+colleague+" has a wall in their office dedicated to photos of themselves. I don't blame them. They are quite good-looking.```","```"+colleague+" told me that they caught "+colleague2+" lounging in their office, picking their nose the other day. I don't believe this one for a second.```","```Apparently "+colleague+" is a terrible cook, but made some of the faculty eat their food. Maybe it's a good thing I sat out of that meeting that one time...```"];
    var random2=Math.floor(Math.random()*phrases.length);
    message.channel.send("Hmm, rumours, huh? I don't like indulging, but I suppose I could tell you just one:");
    message.channel.send(phrases[random2]);

} else if (command === "pickmeup") {
    var quotes=["Your endeavours have paid off today. Now take the moment to chill out and relax.", "You're doing great. Keep it up! You'll get far.",
    "Life's tough, but you've made it this far. Don't lose sight now!","If something's troubling you, take a break. Refresh yourself."];
    var random=Math.floor(Math.random()*quotes.length);
    message.reply(quotes[random]);

}else if (command === "math") {
    var math=["https://i.imgur.com/sK38EZt.jpg","https://i.imgur.com/6bgfsR1.jpg","https://i.imgur.com/NOlwlf6.jpg","https://i.imgur.com/5OJFb8R.jpg","https://i.imgur.com/xfzwAUI.jpg","https://i.imgur.com/tFXAfnx.jpg","https://i.imgur.com/eB8SykQ.jpg","https://i.imgur.com/G15VfVS.jpg","https://i.imgur.com/0KhlLru.jpg","https://i.imgur.com/GQh4bWc.jpg"];
    var random=Math.floor(Math.random()*math.length);
    message.channel.send({file: math[random]});

//calculates gcd
}else if (command === "gcd") {

    let n1=args[0];
    let n2=args[1];

    var a=Math.abs(n1);
    var b=Math.abs(n2);
    var gcdres=gcd(n1,n2);

    message.channel.send(gcdres);
    //grabs a link from the wiki

}else if (command === "wiki") {

    if (args.length<2||args===null) {
        message.channel.send("Please provide a first name and last name.");
    }
    else{
        let firstname=args[0].toLowerCase();
        let lastname=args[1].toLowerCase();
        const url="https://furria.net/wiki/sunnyverse/"
        var name=firstname+"_"+lastname
        
        message.channel.send(url+name);
    }

}else if (command==="help") {
    message.channel.send("```Hello! I see that you have asked me for the commands I know at the moment. Here they are:\n•+pickmeup: User receives positive vibes.\n•+math: Send a random math meme.\n•+wiki firstname lastname: Gets the Sunnyverse Wiki entry for that character.\n•+help: Show list of commands.\n•What's your mood: A random emoji is sent. It is presumably my current mood.\n•What's my fortune: I will tell you your fortune.```");
    }
}


)
;

