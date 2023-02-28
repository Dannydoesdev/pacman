## Setup:

Grid 5 x 5

```
4 X X X X X 
3 X X X X X
2 X X X X X
1 X X X X X
0 X X X X X
  0 1 2 3 4
```

- (0,0) = starts at South West cornet
- X = A valid Pacman location

### Available commands:

```
PLACE X,Y,F
MOVE
LEFT
RIGHT
REPORT
```

## Rules and constrains: 

- PLACE will put the Pacman on the grid in positon X,Y and facing NORTH,SOUTH, EAST or WEST.
- Only PLACE will start the game (anything before this is disregarded)
- MOVE = 1 unit forward in the direction pacman is facing
- LEFT &  RIGHT = turn pacman 90 degrees w/o moving
- REPORT outputs co-ordinates
- Pacman can't move out of bounds, anything that would push him out is disregarded
- Multiple PLACE commands can be run & will re-place Pacmans (if they are in the correct position)
- Cannot PLACE Pacman in an invalid position

### Example:

```
PLACE 0,0,NORTH
MOVE
REPORT

Output: 0,1,NORTH
```



## Approach:
- Assume cmds are strings in an array (can change later)
- Always keep track of location - iterate values based on 'move' commands
- Always keep track of direction - denote that LEFT and RIGHT corresponds to compass directions
- Calculate direction based on 'MOVE' commands - iterate one or other value up
- 4 and 0 are max values - once hit, disregards MOVE commands that would iterate further 