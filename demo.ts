import { Game } from "./game.ts"
import { BoardDirection } from "./board.ts"
import { AttackedStatus } from "./battleship.ts"

console.log("---- create game ----");
const game = new Game();
console.log("---- add ship 1 -----");
console.log("start at 0,0 with a size 3 vertical ship")
game.addBattleShip([0, 0], 3, BoardDirection.Vertical)
console.log("---- add ship 2 -----");
console.log("start at 7,7 with a size 3 horizontal ship")
game.addBattleShip([7, 7], 3, BoardDirection.Horizontal)
console.log("-brutal force attack-");
for(let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const status = game.attacked([i,j]);
    await Deno.stdout.write(new TextEncoder().encode(status == AttackedStatus.Miss ? "x" : "✓"));
  }
  console.log("");
}
console.log("---- game status ----");
console.log(game.isLost() ? "Lost" : "Onging")
