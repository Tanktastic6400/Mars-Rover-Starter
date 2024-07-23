class Message {
   // Write code here!
   //"Name not provided"
   constructor(name, commands){
      this.name = name;
      if(!name){
         throw Error('Name not provided');
      }
      this.commands = commands;
      
   }
}

module.exports = Message;