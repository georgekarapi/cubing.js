import { Alg } from "./Alg";
import { experimentalAlgCubingNetLink } from "./url";

describe("experimentalAlgCubingNetLink", () => {
  it("experimentalAlgCubingNetLink to generate proper URLs", () => {
    expect(
      experimentalAlgCubingNetLink({ alg: Alg.fromString("R U R'") }),
    ).toEqual("https://alg.cubing.net/?alg=R_U_R-");
  });
});
