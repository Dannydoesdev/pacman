// Grid 5 x 5

//  4 X X X X X 
//  3 X X X X X
//  2 X X X X X
//  1 X X X X X
//  0 X X X X X
//    0 1 2 3 4

// (0,0) = starts at South West cornet
// X = A valid Pacman location

// Available commands:
// PLACE X,Y,F
// MOVE
// LEFT
// RIGHT
// REPORT

// PLACE will put the Pacman on the grid in positon X,Y and facing NORTH,SOUTH, EAST or WEST.
// Only PLACE will start the game (anything before this is disregarded)
// MOVE = 1 unit forward in the direction pacman is facing
// LEFT &  RIGHT = turn pacman 90 degrees w/o moving
// REPORT outputs co-ordinates
// Pacman can't move out of bounds, anything that would push him out is disregarded

//ex:
// PLACE 0,0,NORTH
// MOVE
// REPORT

// Output: 0,1,NORTH

// Approach:
// Assume cmds are strings in an array (can change later)
// Always keep track of location - iterate values based on 'move' commands
// Always keep track of direction - denote that LEFT and RIGHT corresponds to compass directions
// Calculate direction based on 'MOVE' commands - iterate one or other value up
// 4 and 0 are max values - once hit, disregards MOVE commands that would iterate further 

const pacManGame = (commands) => {

  if (!commands) { console.log('No commands receive'); return }
  
  let started = false;
  let coordsX = null;
  let coordsY = null;
  let direction = '';
  let compass = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let output = '';

  commands.map((command) => {
    // check for PLACE command & start game - if already stared, restart
    if (command.startsWith('PLACE')) {

      if (started) {
        console.log(`Restarting at ${command}`);
      } else {
        // Start game
        console.log('Starting Game!')
        started = true;
      }

      // remove the word PLACE & split by comma
      let placeCoords = command.slice(6).split(',')
     
      // If invalid placement - return
      if (parseInt(placeCoords[0]) >= 5 || parseInt(placeCoords[0]) <= -1
        || parseInt(placeCoords[1] >= 5 || parseInt(placeCoords[1]) <= -1)) {
        
        console.log('Pacman cant start there')
        return

        }

      coordsX = parseInt(placeCoords[0])
      coordsY = parseInt(placeCoords[1])

      direction = placeCoords[2]
     
      console.log(`Starting at (${coordsX},${coordsY}) facing ${direction}`)
    }

    // if the game hasn't started - ignore command
    if (!started) {

      console.log(`${command} ignored`);
      return

    }

    if (command == 'RIGHT') {

      let newDirectionIndex = (compass.indexOf(direction) + 1)

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == 4) { newDirectionIndex = 0 };

      let newDirection = compass[newDirectionIndex];
      direction = newDirection;

    } else if ((command == 'LEFT')) {

      let newDirectionIndex = (compass.indexOf(direction) - 1)

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == -1){newDirectionIndex = 3}

      // Update direction to newDirection (based on incremented index)
      let newDirection = compass[newDirectionIndex];
      direction = newDirection;
    }

    if (command == 'MOVE') {
      if (direction == 'NORTH') {

        coordsY >= 4 ? console.log('Pacman cant go further that way') : coordsY++;

      } else if (direction == 'EAST') {

        coordsX >= 4 ? console.log('Pacman cant go further that way') : coordsX++;

      } else if (direction == 'SOUTH') {

        coordsY <= 0 ? console.log('Pacman cant go further that way') : coordsY--;

      } else if (direction == 'WEST') {

        coordsX <= 0 ? console.log('Pacman cant go further that way') : coordsX--;
      }
    }

    if (command == 'REPORT') {
      if (coordsX === null || coordsY === null) {
        console.log('no valid placement - resetting output')
        output = '';
      } else {
        output = `${coordsX},${coordsY},${direction}`;
      }
    }
  
  })
  console.log(`Output: ${output}`)
  return output

}


let testCommands1 = ['MOVE', 'PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
let testCommands2 = ['MOVE', 'PLACE 0,0,NORTH', 'LEFT', 'REPORT'];
let testCommands3 = ['MOVE', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'];
let testCommands4 = ['MOVE', 'PLACE 1,2,EAST', 'RIGHT', 'RIGHT', 'LEFT', 'RIGHT', 'LEFT', 'REPORT'];
let testCommands5 = ['MOVE', 'PLACE 1,2,EAST', 'RIGHT', 'RIGHT', 'RIGHT', 'RIGHT', 'PLACE 3,2,NORTH', 'RIGHT', 'LEFT', 'LEFT', 'LEFT', 'LEFT', 'LEFT', 'REPORT'];
let testCommands6 = ['MOVE', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE',
  'MOVE', 'LEFT', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'REPORT'];
let testCommands7 = ['MOVE', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE',
  'MOVE', 'LEFT', 'MOVE', 'MOVE', 'PLACE 6,9,EAST', 'MOVE', 'MOVE', 'MOVE', 'REPORT', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'];
let testCommands8 = ['PLACE 0,0,EAST', 'MOVE', 'PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
let testCommands9 = ['PLACE -1,0,NORTH', 'MOVE', 'REPORT'];
let testCommands10 = ['MOVE', 'PLACE 0,1,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE',
'MOVE', 'LEFT', 'MOVE', 'MOVE', 'PLACE 6,9,EAST', 'MOVE', 'MOVE', 'MOVE', 'REPORT']

console.log('\n---GAME 1---\n')
pacManGame(testCommands1)
console.log('\n---GAME 2---\n')
pacManGame(testCommands2)
console.log('\n---GAME 3---\n')
pacManGame(testCommands3)
console.log('\n---GAME 4---\n')
pacManGame(testCommands4)
console.log('\n---GAME 5---\n')
pacManGame(testCommands5)
console.log('\n---GAME 6---\n')
pacManGame(testCommands6)
console.log('\n---GAME 7---\n')
pacManGame(testCommands7)
console.log('\n---GAME 8---\n')
pacManGame(testCommands8)
console.log('\n---GAME 9---\n')
pacManGame(testCommands9)
console.log('\n---GAME 10---\n')
pacManGame(testCommands10)