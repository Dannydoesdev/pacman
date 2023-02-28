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

  let started = false;
  let coordsX = 0;
  let coordsY = 0;
  let direction = '';
  let compass = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let moves = ['LEFT', 'RIGHT'];


  commands.map((command) => {
    console.log(command)
    // check for PLACE command & start game - if already stared, ignore
    if (command.startsWith('PLACE')) {

      if (started) {
        console.log(`${command} ignored`);
        return
      }

      // Start game
      console.log('Starting Game!')
      started = true;

      // remove the word PLACE & split by comma
      let placeCoords = command.slice(6).split(',')
     
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

      console.log('Turning right')
      console.log(`Initial index ${compass.indexOf(direction)}`)
      let newDirectionIndex = (compass.indexOf(direction) + 1)
      console.log(`New index = ${newDirectionIndex}`)

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == 4) { newDirectionIndex = 0 };

      let newDirection = compass[newDirectionIndex];
      direction = newDirection;
      console.log(`New direction ${newDirection}`);

    } else if ((command == 'LEFT')) {

      console.log('Turning left')
      console.log(`Initial index ${compass.indexOf(direction)}`)

      let newDirectionIndex = (compass.indexOf(direction) - 1)

      console.log(`New index = ${newDirectionIndex}`)

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == -1){newDirectionIndex = 3}

      // Update direction to newDirection (based on incremented index)
      let newDirection = compass[newDirectionIndex];
      direction = newDirection;

      console.log(`New direction ${newDirection}`);
    }

    if (command == 'MOVE') {
      if (direction == 'NORTH') {
        console.log(`Moving North - current co-ordinates (${coordsX},${coordsY})`)
        coordsY >= 4 ? console.log('Pacman cant go further that way') : coordsY++;
        console.log(`Moved North - new co-ordinates (${coordsX},${coordsY})`)
      } else if (direction == 'EAST') {

        console.log(`Moving East - current co-ordinates (${coordsX},${coordsY})`)
        coordsX >= 4 ? console.log('Pacman cant go further that way') : coordsX++;
        console.log(`Moved East - new co-ordinates (${coordsX},${coordsY})`)

      } else if (direction == 'SOUTH') {

        console.log(`Moving South - current co-ordinates (${coordsX},${coordsY})`)
        coordsY <= 0 ? console.log('Pacman cant go further that way') : coordsY--;
        console.log(`Moved South - new co-ordinates (${coordsX},${coordsY})`)

      } else if (direction == 'WEST') {

        console.log(`Moving West - current co-ordinates (${coordsX},${coordsY})`)
        coordsX <= 0 ? console.log('Pacman cant go further that way') : coordsX--;
        console.log(`Moved West - new co-ordinates (${coordsX},${coordsY})`)

      }

    }

    if (command == 'REPORT') {
      console.log(`Output: ${coordsX},${coordsY},${direction}`)
    }

  })
  // console.log(`Ending at (${coordsX},${coordsY}) facing ${direction}`)

}

// NOTES
// Extra Place commands are allowed:
// The first valid command to Pacman is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command.

// PLACE must check for invalid coordinates
// Pacman must not move off the grid during movement. This also includes the initial placement of Pacman.

let testCommands1 = ['MOVE', 'PLACE 0,0,NORTH', 'MOVE', 'REPORT']
let testCommands2 = ['MOVE', 'PLACE 0,0,NORTH', 'LEFT', 'REPORT']
let testCommands3 = ['MOVE', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT']
let testCommands4 = ['MOVE', 'PLACE 1,2,EAST', 'RIGHT', 'RIGHT', 'LEFT', 'RIGHT', 'LEFT', 'REPORT']
let testCommands5 = ['MOVE', 'PLACE 1,2,EAST', 'RIGHT', 'RIGHT', 'RIGHT', 'RIGHT', 'PLACE 3,2,NORTH', 'RIGHT', 'LEFT', 'LEFT', 'LEFT', 'LEFT', 'LEFT', 'REPORT']
let testCommands6 = ['MOVE', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'MOVE', 'MOVE',
  'MOVE', 'LEFT', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'MOVE', 'REPORT']



console.log('\n---GAME 1---\n')
pacManGame(testCommands1)
console.log('\n---GAME 2---\n')
pacManGame(testCommands2)
console.log('\n---GAME 3---\n')
pacManGame(testCommands3)
// console.log('\n---GAME 4---\n')
// pacManGame(testCommands4)
// console.log('\n---GAME 5---\n')
// pacManGame(testCommands5)
// console.log('\n---GAME 6---\n')
// pacManGame(testCommands6)