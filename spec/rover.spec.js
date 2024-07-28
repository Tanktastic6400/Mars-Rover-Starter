const Rover = require('../newRover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
let moveAndCheckCmds = [new Command("MOVE", 0), new Command('STATUS_CHECK')];
let statusCheckCmd = [new Command("STATUS_CHECK")];
let modeChangeCmd = [new Command("MODE_CHANGE", 'LOW_POWER')];
let modeChangeCmd2 = [new Command("MODE_CHANGE", 'NORMAL')];
let noMoveTestCmd = [new Command("MODE_CHANGE", 'LOW_POWER'), new Command("MOVE", 600)];
let moveCmd = [new Command("MOVE", 7000)];

let moveAndCheckMsg = new Message("Move and Check status", moveAndCheckCmds);
let statusCheckMsg = new Message("Check Status", statusCheckCmd);
let modeChangeMsg = new Message("change the mode", modeChangeCmd);
let modeChangeMsg2 = new Message("change the mode back", modeChangeCmd2);
let noMoveTestMsg = new Message("test low power movement", noMoveTestCmd);
let moveMsg = new Message("testing moves positioning", moveCmd);

let testRover = new Rover(6400);

describe("Rover class", function() {
  //test 7
  test("constructor sets position and default values for mode and generatorWatts", function(){
    resetRoverDefaults(testRover);

    expect(testRover.position).toBe(6400);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });

  //test 8
  test("response returned by receiveMessage contains the name of the message", function(){
    resetRoverDefaults(testRover);

    expect(testRover.receiveMessage(moveAndCheckMsg).message).toBe(moveAndCheckMsg.name);
  });

  //test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    resetRoverDefaults(testRover);

    expect(testRover.receiveMessage(moveAndCheckMsg).results.length).toBe(2);
  });

  //test 10
  test("responds correctly to the status check command", function(){
    resetRoverDefaults(testRover);

    expect(testRover.receiveMessage(statusCheckMsg).results[0].roverStatus.position).toBe(6400);
    expect(testRover.receiveMessage(statusCheckMsg).results[0].roverStatus.mode).toBe('NORMAL');
    expect(testRover.receiveMessage(statusCheckMsg).results[0].roverStatus.generatorWatts).toBe(110);

  });

  //test 11
  test("responds correctly to the mode change command", function(){
      //check the completed property and rover mode for accuracy
      //either LOW_POWER or NORMAL
      resetRoverDefaults(testRover);

      let tmp = testRover.receiveMessage(modeChangeMsg).results[0];
      
      expect(tmp.completed).toBeTruthy();
    expect(tmp.roverStatus.mode).toBe('LOW_POWER');
    tmp = testRover.receiveMessage(modeChangeMsg2).results[0];
    expect(tmp.roverStatus.mode).toBe('NORMAL');

  });
  //test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    resetRoverDefaults(testRover);

      let tmp = testRover.receiveMessage(noMoveTestMsg).results[1];

      expect(tmp.roverStatus.position).toBe(6400);
      expect(tmp.completed).toBe(false);
    
  });
  
  
  //test 13
  test("responds with the position for the move command", function(){
    resetRoverDefaults(testRover);
    expect(testRover.receiveMessage(moveMsg).results[0].roverStatus.position).toBe(7000);

  });
  // 7 tests here!


function resetRoverDefaults(rover){
  rover.position = 6400;
  rover.mode = 'NORMAL';
  rover.generatorWatts = 110;
}
});
