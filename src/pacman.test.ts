import { pacManGame } from './pacman';

describe('Pacman Game', () => {
  test('Move forward once facing NORTH', () => {
    const expectedOutput = '0,1,NORTH';
    const commands = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Turn left and move forward once facing EAST', () => {
    const expectedOutput = '0,1,NORTH';
    const commands = ['PLACE 0,0,EAST', 'LEFT', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Not move out of bounds WEST and SOUTH', () => {
    const expectedOutput = '0,0,SOUTH';
    const commands = [
      'PLACE 1,1,WEST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'MOVE',
      'REPORT',
    ];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should not move if no PLACE command', () => {
    const expectedOutput = '';
    const commands = ['MOVE', 'LEFT', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should ignore commands before the first PLACE command', () => {
    const expectedOutput = '1,4,NORTH';
    const commands = [
      'MOVE',
      'PLACE 1,2,EAST',
      'LEFT',
      'MOVE',
      'MOVE',
      'REPORT',
    ];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should ignore commands that move Pacman off the grid', () => {
    const expectedOutput = '4,4,NORTH';
    const commands = [
      'PLACE 3,3,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'MOVE',
      'REPORT',
    ];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should not PLACE Pacman out of grid', () => {
    const expectedOutput = '';
    const commands = [
      'PLACE 5,0,EAST',
      'MOVE',
      'MOVE',
      'PLACE 3,-1,NORTH',
      'REPORT',
    ];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should be able to turn full circles', () => {
    const expectedOutput = '3,2,NORTH';
    const commands = [
      'PLACE 1,2,EAST',
      'RIGHT',
      'RIGHT',
      'RIGHT',
      'RIGHT',
      'PLACE 3,2,NORTH',
      'RIGHT',
      'LEFT',
      'LEFT',
      'LEFT',
      'LEFT',
      'LEFT',
      'REPORT',
    ];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('should restart the game if another PLACE command is issued', () => {
    const expectedOutput = '0,1,NORTH';
    const commands = [
      'PLACE 0,0,EAST',
      'MOVE',
      'PLACE 0,0,NORTH',
      'MOVE',
      'REPORT',
    ];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('should return undefined if no commands issues', () => {
    const expectedOutput = undefined;
    const result = pacManGame();
    expect(result).toEqual(expectedOutput);
  });

  test('Should console log correct journey placement in pacmanGrid', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const commands = [
      'PLACE 0,0,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'REPORT',
    ];

    pacManGame(commands);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Here is your journey from O to ❤:');
    expect(logSpy).toHaveBeenCalledWith('0  O - - X X');
    expect(logSpy).toHaveBeenCalledWith('1  X X ❤ X X');
    expect(logSpy).toHaveBeenCalledWith('   0 1 2 3 4');

    logSpy.mockRestore();
  });

  test('Should console log all logs correctly', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const commands = [
      'PLACE 0,1,NORTH',
      'PLACE 3,3,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'MOVE',
      'PLACE 6,8,EAST',
      'REPORT',
    ];

    pacManGame(commands);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('Starting Game!');
    expect(logSpy).toHaveBeenCalledWith('Starting at (0,1) facing NORTH');
    expect(logSpy).toHaveBeenCalledWith('Restarting at PLACE 3,3,EAST');
    expect(logSpy).toHaveBeenCalledWith('Pacman cant start at 6,8');
    expect(logSpy).toHaveBeenCalledWith('Pacman cant go further that way');
    expect(logSpy).toHaveBeenCalledWith('Output: 4,4,NORTH');

    logSpy.mockRestore();
  });

  test('Should console log no commands correctly', () => {
    const logSpy = jest.spyOn(global.console, 'log');

    pacManGame();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith('No commands received');

    logSpy.mockRestore();
  });
});
