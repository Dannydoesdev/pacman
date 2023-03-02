// require('./pacman.ts')
import { pacManGame } from "./pacman";

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
    const commands = ['PLACE 1,1,WEST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'MOVE', 'REPORT'];
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
    const commands = ['MOVE', 'PLACE 1,2,EAST', 'LEFT','MOVE', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should ignore commands that move Pacman off the grid', () => {
    const expectedOutput = '4,4,NORTH';
    const commands = ['PLACE 3,3,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('Should not PLACE Pacman out of grid', () => {
    const expectedOutput = '';
    const commands = ['PLACE 5,0,EAST', 'MOVE', 'MOVE', 'PLACE 3,-1,NORTH', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });
  
  test('Should be able to turn full circles', () => {
    const expectedOutput = '3,2,NORTH';
    const commands = ['PLACE 1,2,EAST', 'RIGHT', 'RIGHT', 'RIGHT', 'RIGHT', 'PLACE 3,2,NORTH', 'RIGHT', 'LEFT', 'LEFT', 'LEFT', 'LEFT', 'LEFT', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('should restart the game if another PLACE command is issued', () => {
    const expectedOutput = '0,1,NORTH';
    const commands = ['PLACE 0,0,EAST', 'MOVE', 'PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expectedOutput);
  });

  test('should return undefined if no commands issues', () => {
    const expectedOutput = undefined;
    const result = pacManGame();
    expect(result).toEqual(expectedOutput);
  });

});
