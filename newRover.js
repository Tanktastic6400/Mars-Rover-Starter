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
        }

        let currentStatus = {
            completed: false,
            roverStatus: {
                position: this.position,
                mode: this.mode,
                generatorWatts: this.generatorWatts
            }
        }

        let command;
        let tmpStatus;
        for(let i = 0; i < message.commands.length; i++){
            command = message.commands[i];
            tmpStatus = Object.create(currentStatus);

            if(command.commandType === "STATUS_CHECK"){
                
                tmpStatus.completed = true;
                msgHandler.results.push(tmpStatus);

                //tmpStatus = null;
            }else if(command.commandType === "MODE_CHANGE"){
                tmpStatus.completed = true;
                tmpStatus.roverStatus.mode = command.value;
                msgHandler.results.push(tmpStatus);

                //tmpStatus = null;
            }else if(command.commandType === "MOVE"){
                
                if(tmpStatus.roverStatus.mode ==='LOW_POWER'){
                    tmpStatus.completed = false;
                    msgHandler.results.push(tmpStatus);
                    
                }else{
                    tmpStatus.completed = true;
                    tmpStatus.roverStatus.position = command.value;
                    msgHandler.results.push(tmpStatus);
                    
                }
                
                
            }

            Object.assign(this, tmpStatus);
          

        }


        return msgHandler;
    }
}

module.exports = Rover;