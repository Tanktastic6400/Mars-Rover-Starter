class Rover {
    constructor(position) {
        this.position = position;
        this.mode = 'NORMAL';
        this.generatorWatts = 110;
    }


    receiveMessage(message) {
        let msgHandler = {
            message: message.name,
            results: []
        };
        
        message.commands.forEach(command => {
            let result = {
                completed: false,
            }
            
            if (command.commandType === 'STATUS_CHECK'){
                result.completed = true;
            }
            else if (command.commandType === 'MODE_CHANGE'){
                result.completed = true;
                
                this.mode = command.value;
            }
            else if (command.commandType === 'MOVE' && this.mode === 'NORMAL') {

                result.completed = true;
                
    
                this.position = command.value;
            }
            
            result.roverStatus = {
                position: this.position,
                mode: this.mode,
                generatorWatts: this.generatorWatts
            };
            
            // push result after all command parsing, to remove multiple usages of .push(result)
            msgHandler.results.push(result);
          })
          
        return msgHandler;
    }
}

module.exports = Rover;