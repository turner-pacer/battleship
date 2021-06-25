import { BattleShip } from "./battleship.ts";

class Board {
  private readonly boardSize = 10;
  private posToShip = new Map<string, BattleShip>();

  public locate(pos: Position): BattleShip | undefined {
    return this.posToShip.get(String(pos));
  }

  public placeShip(
    battleship: BattleShip,
    pos: Position,
    direction: BoardDirection,
  ): Error | void {
    const positions = this.requestSpace(pos, direction, battleship.size);

    if (positions instanceof Error) {
      return positions;
    }

    battleship.placeOn(positions);

    positions.forEach((pos) => {
      this.posToShip.set(String(pos), battleship);
    });
  }

  private requestSpace(
    pos: Position,
    direction: BoardDirection,
    size: number,
  ): Position[] | Error {
    const positions: Position[] = [];

    for (let i = 0; i < size; i++) {
      let x, y = 0;
      switch (direction) {
        case BoardDirection.Vertical: {
          x = pos[0];
          y = pos[1] + i;
          break;
        }

        case BoardDirection.Horizontal: {
          x = pos[0] + i;
          y = pos[1];
          break;
        }
      }
      if (this.isOutOfBound([x, y])) {
        return new OutOfBoardError("out of board");
      }
      if (this.posToShip.get(String([x, y]))) {
        return new SpaceTakenError("space taken");
      }

      positions.push([x, y]);
    }

    return positions;
  }

  private isOutOfBound(pos: Position): boolean {
    return pos[0] < 0 || pos[0] >= this.boardSize || pos[1] < 0 ||
      pos[1] >= this.boardSize;
  }
}

class OutOfBoardError extends Error {}
class SpaceTakenError extends Error {}

enum BoardDirection {
  Vertical,
  Horizontal,
}

export type Position = [number, number];

export { Board, BoardDirection };
