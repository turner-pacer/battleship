# Battleship Game

## Requirement

The task is to implement a Battleship state-tracker for a single player that must support the following logic:
- [x] Create a board
- [x] Add a battleship to the board
- [x] Take an “attack” at a given position, and report back whether the attack resulted in a hit or a miss
- [x] Return whether the player has lost the game yet (i.e. all battleships are sunk)

## Design

Implemented 3 domain models:
- `Game` to track game status and take operation input
- `Board` to define grid size and track related battleship objects
- `Battleship` to create a sized ship and react on attacking, as well as reporting its status

## How to run demo

### Prerequisite
- docker
- make

### how to run
- `make run`

### how to test
- `make test`


