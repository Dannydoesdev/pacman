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

    // check for PLACE command & start game - if already stared, ignore
    if (command.startsWith('PLACE')) {
      started ? console.log('already started') : started = true
      console.log(started)

      // remove the word PLACE & split by comma
      let placeCoords = command.slice(6).split(',')
      // console.log(placeRemoval)
      coordsX = parseInt(placeCoords[0])
      coordsY = parseInt(placeCoords[1])
      direction = placeCoords[2]
      // let placeCoords = command.split(',')
      // console.log(placeCoords)
      console.log(`Starting at (${coordsX},${coordsY}) facing ${direction}`)
    } 
    // if the game hasn't started - ignore command
    if (!started) { return }

    if (command == 'RIGHT') {
      console.log(command)
      let newDirectionIndex = (compass.indexOf(direction) + 1)
      let newDirection = compass[newDirectionIndex]
      // console.log(newDirection)
      console.log(`New direction ${newDirection}`)
    } else if ((command == 'LEFT')) {
      let newDirectionIndex = (compass.indexOf(direction) - 1)
      let newDirection = compass[newDirectionIndex]
      // console.log(newDirection)
      console.log(`New direction ${newDirection}`)
    }
    
    console.log(command)
  })
  
// console.log(commands)

}

let testCommands1 = ['MOVE', 'PLACE 0,0,NORTH', 'MOVE', 'REPORT']
let testCommands2 = ['MOVE', 'PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT']

console.log('Game 1')
pacManGame(testCommands1)
console.log('Game 2')
pacManGame(testCommands2)