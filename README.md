# BasicBot0 Info

# Basics:
Currently, the Twitch Bot is very simple. It acts like StreamLabs and NightBot, as you can add commands which will create an input and an output. Whenever somebody says an input, it will respond with the output.

# Commands:
To create a command, you must be a moderator or up (broadcaster). To do so, use !command add (input) (output). The input must contain no spaces, but the output can be as long as you want. It is recommended to give the bot moderator so that it is able to send the same message multiple times in a row without being limited. Most people tend to put a “!” as a prefix before commands, though it is not required. To remove a command, simply do !command remove (input). You do not need to type in the output, only the input, as that is considered the name of the command. To edit the output of a command, do !command edit (input) (new output). As commands have different permission levels, with the default being moderator or up, to change it so a command is able to be used by anybody, you can use “!command edit (input) perms: all”. If you wish to make it moderator or up, do “!command edit (input) perms: mod”. For broadcasters only, do “!command edit (input) perms: broadcaster”. If you wish to disable the command, you can do “!command edit (input) perms: null”. 

Additionally, commands can have special characters that make it say something different. For example, if you put the term “${user}” in an output, it will replace that with the name of whoever uses the command. If you use the term “${random1-20}”, it will replace it with a random number from 1 to 20. You can change the range of the randomness by replacing the two numbers. It will break if you have more than one random in the same output, so don’t do that. You can have as many “${user}” as you want, though.

# Special stuff:
If you set the input of a command as “firstMessage” (case sensitive), when a person sends their first message in the chat, it will automatically activate. This hasn’t been tested though, so use at your own risk. To make it work better, change the permissions of this to “null”. Random currently does not work in firstMessage commands.
