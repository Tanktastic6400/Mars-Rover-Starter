class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;

   }//end of constructor


   receiveMessage(message) {
      let msgHandler = {
         message: message.name,
         results: []
      }

      for (let command of message.commands) {
         switch (command.commandType) {
            case 'STATUS_CHECK':
               msgHandler.results.push({ completed: true, roverStatus: this });

               break;
            case 'MODE_CHANGE':
               this.mode = command.value;

               msgHandler.results.push({ completed: true, roverStatus: this });

               break;
            case 'MOVE':
               if (this.mode === 'LOW_POWER') {
                  msgHandler.results.push({ completed: false, roverStatus: this });
               }
               else {
                  this.position = command.value;

                  msgHandler.results.push({ completed: true, roverStatus: this });
               }

               break;
         }
      }

      return msgHandler;
   }
}//end of class

module.exports = Rover;