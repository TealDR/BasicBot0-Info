const tmi = require(`tmi.js`)
const config = require(`./config.json`)

var command = []

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));





const client = new tmi.Client({
    options: { debug: true, messagesLogLevel: "info" },
    connection: {
        reconnect: true,
        secure: true
    },

    identity: {
        username: `${process.env.TWITCH_USERNAME}`,
        password: `${process.env.TWITCH_OAUTH}`
    },
    channels: [`${process.env.TWITCH_CHANNEL}`]
});


client.connect().catch(console.error);




client.on('message', (channel, tags, message, self) => {
    if (self) return;

  
  if (tags["first-msg"] == true) {
    for (let i = 0; i < command.length; i++) {
      if (command[i].input.toLowerCase() == "firstMessage" && command[i].channel == channel) {
        if (command[i].input.includes("${user}")) {
          let newMessage = command[i].output.replace(/\${user}/g, `${tags.username}`)
          client.say(channel, newMessage)
          return
        }
        client.say(channel, command[i].output)
        return
      }
    }
  }
  
  
  let isMod = tags['user-type'] === 'mod'
  let isBroadcaster = channel.slice(1) === tags.username;
  var isModUp = isMod || isBroadcaster;


    if (message == `!dice`) {
      let rng = Math.floor(Math.random() * (20 - 1 + 1) + 1)
      client.say(channel, `${tags.username} rolled ${rng}!`)
    }

    
    

  
  
    for (let i = 0; i < command.length; i++) {
        if (message == command[i].input && command[i].channel == channel) {
          if (command[i].perms == "broadcaster") {
            if (!isBroadcaster) return
          }
          if (command[i].perms == "mods") {
            if (!isModUp) return
          }
          if (command[i].input.toLowerCase() == "firstmessage") {
            return
          }
          
          if (command[i].output.includes(`$` + `{`) && command[i].output.includes(`}`)) {
            let newMessage = command[i].output.replace(/\${user}/g, `${tags.username}`)

            
            //RNG
            if (command[i].output.includes(`$` + `{` + `random`) && command[i].output.includes(`}`)) {
              let thingy1 = command[i].output.indexOf(`$` + `{` + `random`) + 8
              let thingy2 = command[i].output.indexOf(`-`)
              let thingy3 = thingyforrando(i)
              let num1 = parseInt(command[i].output.substring(thingy1, thingy2))
              let num2 = parseInt(command[i].output.substring(thingy2 + 1, thingy3))
              if (!isNaN(command[i].output[thingy1])) {
                //if (!isNaN(command[i].output[thingy3])) {
                  let rng = Math.floor(Math.random() * (num2 - num1 + 1) + num1)
                  
                  newMessage = newMessage.replace(`${num1}`, '')
                  newMessage = newMessage.replace(`-${num2}`, '')
                  newMessage = newMessage.replace(/\${random/, `${rng}`)
                  newMessage = newMessage.replace(`${rng}` + `${num1}` + `}`, `${rng}`)
                  
                  client.say(channel, newMessage)
                  return
                //}
              }
            }


            
            client.say(channel, newMessage)
            return
          }
          client.say(channel, command[i].output)
          return
        }
      }


  
    
  if (isModUp || tags.username == "rllyepic2143") {
    if (message.startsWith(`${config.prefix}command `)) {
      let split = message.split(" ")

      
      if (split[1] == `add`) {
        console.log("Command added")
        let input = split[2]
        split.splice(0, 3)
        let output = split.join(' ')
          command.push({"channel": channel, "input": input, "output": output, "perms": "mods"})
        
        return
      }
      
      if (split[1] == `remove`) {
        console.log("Command removed")
        for (let i = 0; i < command.length; i++) {
          if (command[i].input == split[2] && command[i].channel == channel) {
            command.splice(i, 1)
            return
          }
        }
        return
      }

      if (split[1] == `edit`) {
        console.log("Command editted")
        
        for (let i = 0; i < command.length; i++) {
          if (command[i].input == split[2] && command[i].channel == channel) {
            if (!split[3] == "perms:") {
            //If doesn't include "perms: "
              split.splice(0, 3)
              let output = split.join(' ')
              command[i].output = output
            } else {
            //If includes "perms: "
              if (split[4] == "mods") {
                command[i].perms = "mods"
              }
              if (split[4] == "broadcaster") {
                command[i].perms = "broadcaster"
              }
              if (split[4] == "all") {
                command[i].perms = "all"
              }
              
            }
            return
          }
        }
        return
      }
    }
  }
  

});

function thingyforrando(thingy) {
  for (let i = 0; i < command[thingy].output.length; i++) {
    if (command[thingy].output[i] == `}`) {
      if (!isNaN(command[thingy].output[i - 1])) {
        return i
      }
    }
  }
}
