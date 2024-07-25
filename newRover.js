class newRover{
    constructor(position){
        this.position = position;
        this.mode = 'NORMAL';
        this.generatorWatts = 110;
    }

   

    receiveMessage(message){
        let msgHandler = {
            message: message.name,
            results: []
        }
        let  Results = {
            completed: false,
            roverStatus: {
                position: this.position,
                mode: this.mode,
                generatorWatts: this.generatorWatts
            }
        }

        for(let i = 0; i < message.commands.length; i++){
            msgHandler.results.push(Results);

        }

        return msgHandler;
    }

}

module.exports = newRover;