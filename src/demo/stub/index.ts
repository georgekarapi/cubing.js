// Stub file for testing.
// Feel free to add code here if you need a quick place to run some code, but avoid committing any changes.

import { Alg } from "../../cubing/alg";
import { TwistyPlayer } from "../../cubing/twisty";

const player = new TwistyPlayer({
  alg: new Alg("R U R'"),
});

document.body.appendChild(player);
