const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
let testCommands = [new Command("MOVE", 6400), new Command("STATUS_CHECK")]
describe("Message class", function() {
    test("throws error if a name is NOT passed into the constructor as the first parameter", function(){
        expect(function() {new Message();}).toThrow(new Error("Name not provided"));
        });
    test("constructor sets name",function(){
        let tmp = new Message("This is a test message");
        expect(tmp.name).toBe("This is a test message");
    });
    test("constructor sets name",function(){
        let tmp = new Message("This is a test message",testCommands);
        expect(tmp.commands).toEqual(testCommands);
    });
    
});
