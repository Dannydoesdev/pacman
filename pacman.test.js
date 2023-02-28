const pacManGame = require('./pacman')

describe('Pacman Game', () => {

  test('Move forward once facing NORTH', () => {
    const expected = '0,1,NORTH';
    const commands = ['PLACE 0,0,NORTH', 'MOVE', 'REPORT'];
    const result = pacManGame(commands);
    expect(result).toEqual(expected);
  });

});
