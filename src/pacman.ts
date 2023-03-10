export function pacManGame(commands?: string[]) {
  if (!commands) {
    console.log('No commands receive');
    return;
  }

  let started = false;
  let coordsX: number | null = null;
  let coordsY: number | null = null;
  let direction: string = '';
  let compass: string[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let output: string = '';
  let pacManGrid: string[][] = [
    ['X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X'],
  ];

  for (const command of commands) {
    // check for PLACE command & start game - if already stared, restart
    if (command.startsWith('PLACE')) {
      if (started) {
        console.log(`Restarting at ${command}`);
      } else {
        // Start game
        console.log('Starting Game!');
        started = true;
      }

      // remove the word PLACE & split by comma
      let placeCoords = command.slice(6).split(',');

      // If invalid placement - return
      if (
        parseInt(placeCoords[0]) >= 5 ||
        parseInt(placeCoords[0]) <= -1 ||
        parseInt(placeCoords[1]) >= 5 ||
        parseInt(placeCoords[1]) <= -1
      ) {
        console.log(`Pacman cant start at ${placeCoords[0]},${placeCoords[1]}`);
        continue;
      }

      coordsX = parseInt(placeCoords[0]);
      coordsY = parseInt(placeCoords[1]);

      direction = placeCoords[2];

      console.log(`Starting at (${coordsX},${coordsY}) facing ${direction}`);
      pacManGrid[coordsY][coordsX] = 'O';
    }

    // if the game hasn't started - ignore command
    if (!started) {
      console.log(`${command} ignored`);
      continue;
    }

    if (command == 'RIGHT') {
      let newDirectionIndex = compass.indexOf(direction) + 1;

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == 4) {
        newDirectionIndex = 0;
      }

      let newDirection = compass[newDirectionIndex];
      direction = newDirection;

      continue;
    } else if (command == 'LEFT') {
      let newDirectionIndex = compass.indexOf(direction) - 1;

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == -1) {
        newDirectionIndex = 3;
      }

      // Update direction to newDirection (based on incremented index)
      let newDirection = compass[newDirectionIndex];
      direction = newDirection;
      continue;
    }

    if (command == 'MOVE' && coordsX !== null && coordsY !== null) {
      if (direction == 'NORTH') {
        coordsY >= 4
          ? console.log('Pacman cant go further that way')
          : coordsY++;
        pacManGrid[coordsY][coordsX] = '|';
      } else if (direction == 'EAST') {
        coordsX >= 4
          ? console.log('Pacman cant go further that way')
          : coordsX++;
        pacManGrid[coordsY][coordsX] = '-';
      } else if (direction == 'SOUTH') {
        coordsY <= 0
          ? console.log('Pacman cant go further that way')
          : coordsY--;
        pacManGrid[coordsY][coordsX] = '|';
      } else if (direction == 'WEST') {
        coordsX <= 0
          ? console.log('Pacman cant go further that way')
          : coordsX--;
        pacManGrid[coordsY][coordsX] = '-';
      }
      continue;
    }

    if (command == 'REPORT') {
      if (coordsX === null || coordsY === null) {
        // console.log('no valid placement - resetting output');
        output = '';
      } else {
        // pacManGrid[coordsY][coordsX] = '🥳'😁;
        pacManGrid[coordsY][coordsX] = '❤';
        output = `${coordsX},${coordsY},${direction}`;
      }
    }
  }

  console.log(`Output: ${output}`);

  // Log Pacmans steps visually in cmd line
  console.log('Here is your journey from O to ❤:');

  // reverse PacmanGrid arrays to correct iteration direction
  pacManGrid = pacManGrid.reverse();

  // count for Y axis output
  let count = 4;

  // loop over arrays and add spacing for better visualisation
  for (let singleArr of pacManGrid) {
    console.log(`${count}  ${singleArr.join(' ')}`);
    count--;
  }

  // count for X axis output
  console.log(`   0 1 2 3 4`);

  return output;
}

let testCommands1 = ['MOVE', 'PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
let testCommands2 = ['MOVE', 'PLACE 0,0,NORTH', 'LEFT', 'REPORT'];
let testCommands3 = [
  'MOVE',
  'PLACE 1,2,EAST',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'REPORT',
];
let testCommands4 = [
  'MOVE',
  'PLACE 1,2,EAST',
  'RIGHT',
  'RIGHT',
  'LEFT',
  'RIGHT',
  'LEFT',
  'REPORT',
];
let testCommands5 = [
  'MOVE',
  'PLACE 1,2,EAST',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'MOVE',
  'REPORT',
];
let testCommands6 = [
  'MOVE',
  'PLACE 1,2,EAST',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'REPORT',
];
let testCommands7 = [
  'MOVE',
  'PLACE 1,2,EAST',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'MOVE',
  'PLACE 6,9,EAST',
  'MOVE',
  'MOVE',
  'MOVE',
  'REPORT',
  'PLACE 1,2,EAST',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'REPORT',
];
let testCommands8 = [
  'PLACE 0,0,EAST',
  'MOVE',
  'PLACE 0,0,NORTH',
  'MOVE',
  'REPORT',
];

let testCommands9 = ['PLACE -1,0,NORTH', 'MOVE', 'REPORT'];
let testCommands10 = [
  'MOVE',
  'PLACE 0,1,EAST',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'MOVE',
  'LEFT',
  'MOVE',
  'MOVE',
  'PLACE 6,9,EAST',
  'MOVE',
  'MOVE',
  'MOVE',
  'REPORT',
];

console.log('\n---GAME 1---\n');
pacManGame(testCommands1);
console.log('\n---GAME 2---\n');
pacManGame(testCommands2);
console.log('\n---GAME 3---\n');
pacManGame(testCommands3);
console.log('\n---GAME 4---\n');
pacManGame(testCommands4);
console.log('\n---GAME 5---\n');
pacManGame(testCommands5);
console.log('\n---GAME 6---\n');
pacManGame(testCommands6);
console.log('\n---GAME 7---\n');
pacManGame(testCommands7);
console.log('\n---GAME 8---\n');
pacManGame(testCommands8);
console.log('\n---GAME 9---\n');
pacManGame(testCommands9);
console.log('\n---GAME 10---\n');
pacManGame(testCommands10);

// Test 10000 steps performance

// const testCommands = [
//   'LEFT',
//   'RIGHT',
//   'MOVE',
//   'PLACE 0,0,NORTH',
//   'PLACE 3,3,WEST',
// ];

// const commandsArray = new Array(100000).fill('').map(() => {
//   const randomIndex = Math.floor(Math.random() * testCommands.length);
//   return testCommands[randomIndex];
// });

// Call the commands array and measure the elapsed time

// const start = performance.now();
// pacManGame(commandsArray);
// const end = performance.now();
// const elapsed = end - start;
// console.log(`Elapsed time: ${elapsed} ms`);
