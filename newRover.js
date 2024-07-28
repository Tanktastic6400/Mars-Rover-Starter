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
       
        for(let i = 0; i < message.commands.length; i++){
            command = message.commands[i];
            

            if(command.commandType === "STATUS_CHECK"){
                
                currentStatus.completed = true;
                msgHandler.results.push(Object.create(currentStatus));

                //tmpStatus = null;
            }else if(command.commandType === "MODE_CHANGE"){
                currentStatus.completed = true;
                currentStatus.roverStatus.mode = command.value;
                msgHandler.results.push(Object.create(currentStatus));
                
                //tmpStatus = null;
            }else if(command.commandType === "MOVE"){
                
                if(currentStatus.roverStatus.mode ==='LOW_POWER'){
                    currentStatus.completed = false;
                    msgHandler.results.push(Object.create(currentStatus));
                    console.log("I am inside this loop");
                }else{
                    currentStatus.completed = true;
                    currentStatus.roverStatus.position = command.value;
                    msgHandler.results.push(Object.create(currentStatus));
                    
                }
                
                
            }

            Object.assign(this, currentStatus);
          

        }


        return msgHandler;
    }
}

module.exports = Rover;