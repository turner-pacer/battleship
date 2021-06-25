import { AttackedStatus, BattleShip } from "./battleship.ts";
import { Board, BoardDirection, Position } from "./board.ts";

class Game {
  private board: Board;
  private ships: BattleShip[] = [];

  constructor() {
    this.board = new Board();
  }

  public addBattleShip(
    pos: Position,
    size: number,
    direction: BoardDirection,
  ): Error | void {
    const ship = BattleShip.create(size);
    if (ship instanceof Error) {
      return <Error> ship;
    }
    const result = this.board.placeShip(ship, pos, direction);
    if (result) {
      return result;
    }
    this.ships.push(ship);
  }

  public attacked(pos: Position): AttackedStatus {
    const status = this.board.locate(pos)?.attacked(pos);
    if (status) {
      return status;
    }
    return AttackedStatus.Miss;
  }

  public isLost(): boolean {
    if (this.ships.length == 0) {
      return false;
    }
    return this.ships.every((ship) => {
      return ship.isSunk();
    });
  }
}

export { Game };
