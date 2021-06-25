import { AttackedStatus, BattleShip } from "../lib/battleship.ts";

import { assertEquals } from "https://deno.land/std@0.99.0/testing/asserts.ts";

Deno.test(".create - wrong size", () => {
  const ship = BattleShip.create(0);

  assertEquals((<Error> ship).message, "negative size");
});

Deno.test(".create - right size", () => {
  const ship = BattleShip.create(1);

  assertEquals((<BattleShip> ship).size, 1);
});

Deno.test("#placedOn #attacked", () => {
  const ship = <BattleShip> BattleShip.create(1);

  ship.placeOn([[1, 1]]);

  let status = ship.attacked([1, 0]);
  assertEquals(status, AttackedStatus.Miss);
  status = ship.attacked([1, 1]);
  assertEquals(status, AttackedStatus.Hit);
});

Deno.test("#placedOn #isSunk", () => {
  const ship = <BattleShip> BattleShip.create(2);

  ship.placeOn([[1, 1], [1, 2]]);
  assertEquals(ship.isSunk(), false)

  let status = ship.attacked([1, 1]);
  assertEquals(status, AttackedStatus.Hit);

  assertEquals(ship.isSunk(), false)

  status = ship.attacked([1, 2]);
  assertEquals(status, AttackedStatus.Hit);

  assertEquals(ship.isSunk(), true)
});
