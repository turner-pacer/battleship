import { Board, BoardDirection } from "../lib/board.ts";
import { BattleShip } from "../lib/battleship.ts";
import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";

Deno.test("#placeShip - when there is oversize ship", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(100);
  const err = board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  assertEquals((<Error> err).message, "out of board");
});

Deno.test("#placeShip - when there is a wrong position", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(1);
  const err = board.placeShip(
    ship,
    [-1, 0],
    BoardDirection.Vertical,
  );

  assertEquals((<Error> err).message, "out of board");
});

Deno.test("#placeShip - when space is taken", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(1);
  board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  const err = board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  assertEquals((<Error> err).message, "space taken");
});

Deno.test("#placeShip - with a legit request", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(1);
  const err = board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  assertEquals(err, undefined);
});

Deno.test("locate - with a legit request", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(1);
  board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  const locatedShip = board.locate([0, 0])

  assertEquals(locatedShip, ship);
});

Deno.test("locate - cannot locate a ship", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(1);
  board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  const locatedShip = board.locate([0, 1])

  assertEquals(locatedShip, undefined);
});

Deno.test("locate - can locate a ship with a larger size", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(3);
  board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  let locatedShip = board.locate([0, 2])
  assertEquals(locatedShip, ship);

  locatedShip = board.locate([0, 1])
  assertEquals(locatedShip, ship);

  locatedShip = board.locate([0, 3])
  assertEquals(locatedShip, undefined);
});

Deno.test("locate - cannot locate a oversize ship", () => {
  const board = new Board();
  const ship = <BattleShip> BattleShip.create(100);
  board.placeShip(
    ship,
    [0, 0],
    BoardDirection.Vertical,
  );

  const locatedShip = board.locate([0, 0])
  assertEquals(locatedShip, undefined);
});
