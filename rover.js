class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      
   }//end of constructor
    

   receiveMessage(message){
      let msgHandler = {
         message: message.name,
         results: []
      }

      let Results = {
         completed: false,
         roverStatus: {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts
         }
      }
      //going to be used in for loop to store whole commands
      let command;
     
      
      for(let i = 0; i < message.commands.length; i++){
         command = message.commands[i];

         if(command.commandType === 'STATUS_CHECK'){
            Results.completed = true;
            msgHandler.results.push(Results);
          
            

         }else if(command.commandType === 'MODE_CHANGE'){
            Results.completed = true;
            Results.roverStatus.mode = command.value;
            
            msgHandler.results.push(Results);
           
            

           //Results.completed = false;
         }else if(command.commandType === 'MOVE'){
            
            if(Results.roverStatus.mode === 'LOW_POWER'){
               Results.completed = false;
               msgHandler.results.push(Results);
               

            }else if(Results.roverStatus.mode === 'NORMAL'){
               Results.completed = true;
               Results.roverStatus.position = command.value;
               
               msgHandler.results.push(Results);
            }
           
         }//end of else if   

     

      }//end of for
      //console.log("out of loop: " + Results.completed);
      

      return msgHandler;
   }



}//end of class

module.exports = Rover;