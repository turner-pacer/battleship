import { Game } from "../lib/game.ts";
import { BoardDirection } from "../lib/board.ts";
import { AttackedStatus } from "../lib/battleship.ts";
import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";

Deno.test("#addBattleship - when there is oversize ship", () => {
  const game = new Game();
  const err = game.addBattleShip([0, 0], 100, BoardDirection.Vertical);

  assertEquals((<Error> err).message, "out of board");
});

Deno.test("#addBattleship - when there is a negative size ship", () => {
  const game = new Game();
  const err = game.addBattleShip([0, 0], -100, BoardDirection.Vertical);

  assertEquals((<Error> err).message, "negative size");
});

Deno.test("#addBattleship - when there is a wrong position", () => {
  const game = new Game();
  const err = game.addBattleShip([0, 100], 100, BoardDirection.Vertical);

  assertEquals((<Error> err).message, "out of board");
});

Deno.test("#addBattleship - when there is a ship taken the place", () => {
  const game = new Game();
  game.addBattleShip([0, 1], 1, BoardDirection.Vertical);
  const err = game.addBattleShip([0, 1], 1, BoardDirection.Vertical);

  assertEquals((<Error> err).message, "space taken");
});

Deno.test("#addBattleship - when everything is good", () => {
  const game = new Game();
  const err = game.addBattleShip([0, 1], 1, BoardDirection.Vertical);

  assertEquals(err, undefined);
});

Deno.test("#attacked - hit a ship", () => {
  const game = new Game();
  game.addBattleShip([0, 1], 1, BoardDirection.Vertical);

  const status = game.attacked([0, 1]);

  assertEquals(status, AttackedStatus.Hit);
});

Deno.test("#attacked - miss a ship", () => {
  const game = new Game();
  game.addBattleShip([0, 1], 1, BoardDirection.Vertical);

  const status = game.attacked([0, 2]);

  assertEquals(status, AttackedStatus.Miss);
});

Deno.test("#isLost - hit all ships", () => {
  const game = new Game();
  game.addBattleShip([0, 1], 1, BoardDirection.Vertical);

  game.attacked([0, 1]);

  assertEquals(game.isLost(), true);
});

Deno.test("#isLost - didn't hit all ships", () => {
  const game = new Game();
  game.addBattleShip([0, 1], 1, BoardDirection.Vertical);
  game.addBattleShip([0, 2], 1, BoardDirection.Vertical);

  game.attacked([0, 1]);

  assertEquals(game.isLost(), false);
});

Deno.test("#isLost - no ships", () => {
  const game = new Game();

  assertEquals(game.isLost(), false);
});
