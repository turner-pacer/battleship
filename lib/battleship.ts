import { Position } from "./board.ts";

class BattleShip {
  private _size: number;
  private positions: string[] = [];
  private hitStatus: Map<string, boolean> = new Map();

  private constructor(size: number) {
    this._size = size;
  }

  public static create(size: number): BattleShip | Error {
    if(size <= 0) {
      return new WrongSizedError("negative size");
    }

    return new BattleShip(size);
  }

  get size() {
    return this._size;
  }

  public placeOn(
    positions: Position[],
  ) {
    positions.forEach((pos) => {
      this.positions.push(String(pos));
    });
  }

  public isSunk(): boolean {
    return this.positions.every((pos) => {
      return this.hitStatus.get(pos);
    });
  }

  public attacked(pos: Position): AttackedStatus {
    if (this.positions.includes(String(pos))) {
      this.hitStatus.set(String(pos), true);
      return AttackedStatus.Hit;
    }

    return AttackedStatus.Miss;
  }
}

class WrongSizedError extends Error{}

enum AttackedStatus {
  Hit = "hit",
  Miss = "miss",
}

export { AttackedStatus, BattleShip };
