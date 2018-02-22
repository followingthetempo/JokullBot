//importing the discord.js module
const discord = require('discord.js');
const config=require("./jokullconfig.json");
const prefix=config.prefix;
const ownerID=config.ownerID

//create an instance of discord 
const bot = new discord.Client();
var channelchat=false;
var guildListen,channelTalk,channelChat;

//Jokull log on
bot.on('ready',() => {
	console.log('Jokull has been activated!');
	bot.user.setGame('Writing research papers')
	//listen default: Harmonia Server
	guildListen = bot.guilds.find("name","Harmonia University");
//channellisten default: #bot
	channelListen = guildListen.channels.find("name","bot");
//chat default: #general-chat
	channelTalk = guildListen.channels.find("name","general-chat");
});
bot.login(config.token);
bot.on('message', message => {


// Variable defaults
//removing spaces
var nospace=message.content.replace(/ /g,""); 
//get the command and any arguments.
const args=message.content.slice(prefix.length).trim().split(/ +/g);
const command=args.shift().toLowerCase();

//tells people to not swear (doesn't consider cases where the cases may be all mixed up....)
if (nospace.indexOf("fuck") !== -1 || nospace.indexOf("FUCK")!== -1 || nospace.indexOf("shit") !== -1 || nospace.indexOf("SHIT") !== -1) {

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
  }else if (message.content.replace(/ /g,"").toUpperCase()==="hey jokull".replace(/ /g,"").toUpperCase()) {
  		message.channel.send("If algebraists like it, they put a ring on it.");

  	//tell fortune
  }else if (message.content.replace(/ /g,"").toUpperCase()==="what's my fortune".replace(/ /g,"").toUpperCase()) {
		var quotes=["No hope.", "I suppose you may become wealthy one day.",
		"Bleak.","Why are you asking me this? I'm not a psychic type!"];
		var random=Math.floor(Math.random()*quotes.length);
		message.channel.send(quotes[random]);

//ask question about colleague
}else if (nospace.indexOf("colleague") !== -1 || nospace.indexOf("COLLEAGUE") !== -1) {
		var colleagues=["Cherry","Mitzi","Marcin","Wulfric","Siri","Julien","Kitsune","Schwarz"];
		var random=Math.floor(Math.random()*colleagues.length);
		var colleague=colleagues[random];
		var phrase=[colleague+" for sure!","No doubt, "+colleague+".","It's definitely not "+colleague+"!",colleague+".","I have my doubts, but I think it's "+colleague,"The answer is simple: nobody!"];
		var random2=Math.floor(Math.random()*phrase.length);
		message.channel.send(phrase[random2]);

	//tell me i'm pretty
	}else if ((message.content.replace(/ /g,"").toUpperCase()==="tell me i'm pretty".replace(/ /g,"").toUpperCase()) ) {
		message.channel.send("no");

	//replies with a random emoji to indicate mood
	}else if (message.content.replace(/ /g,"").toUpperCase()==="what's your mood".replace(/ /g,"").toUpperCase() ) {
		var emojis=["<:wrongbinch:359876766858346509>","<:jokull2:370064811775492096>","<:jokull3:370064811821891584>","<:jokull1:370064811628953611>","<:AAAAAAA:359879736392024065>","<:mona:359878581700001794>","<:horror:371727607080943636>","<:angry:366017544345092096>","<:im_dying_squirtle:375447495167180800>","<:horror:371727607080943636>","<:angrydognoises:411003327137054721>","<:winky:405569333562179595>","<:medleythonk:403991823502016512>","<:mood:375726062795227136>","<:yellpo:413373717100625969>","<:donk:399430425216417794>"];
		var random=Math.floor(Math.random()*emojis.length);
		message.channel.send(emojis[random]);
	}

	if(message.content.indexOf(config.prefix) !== 0) {return;}

	if (command==="gossip") {
		var characters=["Mitzi","Marcin","Wulfric","Julien","Schwarz","Kitsune","Siri","Cherry"];
		var random=Math.floor(Math.random()*characters.length);
		var character=characters[random];
		var c2=characters.indexOf(character);
		var temp;
		for (var i=0; i<characters.length; i++) {
			if (characters[i]!=character) {
				temp[i]=characters[i];
			}
		}
		var phrases=["```I heard that "+character+" ripped their pants while teaching last week.```","```The other day, "+character+" was using the coffee machine and spilled coffee everywhere. They think that they got away, but I know the truth.```","```"+character+" has a wall in their office dedicated to photos of themselves. I don't blame them. They are quite good-looking.```","```"+character+" told me that they caught "+character+" lounging in their office, picking their nose the other day. I don't believe this one for a second.```","```Apparently "+character+" is a terrible cook, but made some of the faculty eat their food. Maybe it's a good thing I sat out of that meeting that one time...```"];
		var random2=Math.floor(Math.random()*phrases.length);
		message.channel.send("Hmm, rumours, huh? I don't like indulging, but I suppose I could tell you just one:");
		message.channel.send(phrases[random2]);
	}


});


