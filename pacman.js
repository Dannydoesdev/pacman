const pacManGame = (commands) => {
  if (!commands) {
    console.log('No commands receive');
    return;
  }

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
        return;
      }

      coordsX = parseInt(placeCoords[0]);
      coordsY = parseInt(placeCoords[1]);

      direction = placeCoords[2];

      console.log(`Starting at (${coordsX},${coordsY}) facing ${direction}`);
    };

    // if the game hasn't started - ignore command
    if (!started) {
      console.log(`${command} ignored`);
      return;
    };

    if (command == 'RIGHT') {
      let newDirectionIndex = compass.indexOf(direction) + 1;

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == 4) {
        newDirectionIndex = 0;
      };

      let newDirection = compass[newDirectionIndex];
      direction = newDirection;
    } else if (command == 'LEFT') {
      let newDirectionIndex = compass.indexOf(direction) - 1;

      // Check for directions going outside of compass array & reset
      if (newDirectionIndex == -1) {
        newDirectionIndex = 3;
      };

      // Update direction to newDirection (based on incremented index)
      let newDirection = compass[newDirectionIndex];
      direction = newDirection;
    };

    if (command == 'MOVE') {
      if (direction == 'NORTH') {
        coordsY >= 4
          ? console.log('Pacman cant go further that way')
          : coordsY++;
      } else if (direction == 'EAST') {
        coordsX >= 4
          ? console.log('Pacman cant go further that way')
          : coordsX++;
      } else if (direction == 'SOUTH') {
        coordsY <= 0
          ? console.log('Pacman cant go further that way')
          : coordsY--;
      } else if (direction == 'WEST') {
        coordsX <= 0
          ? console.log('Pacman cant go further that way')
          : coordsX--;
      };
    };

    if (command == 'REPORT') {
      if (coordsX === null || coordsY === null) {
        // console.log('no valid placement - resetting output');
        output = '';
      } else {
        output = `${coordsX},${coordsY},${direction}`;
      };
    };
  });

  console.log(`Output: ${output}`);
  return output;
};

module.exports = pacManGame;
