import { StateMachine } from "@stackr/sdk/machine";

import * as genesisState from "../../genesis-state.json";
import { skinOwners} from "./state";
import { transitions } from "./transitions";

export type Owner = {
  Waddress: string;
  skins: number[];
 
}[];
const machine = new StateMachine({
  id: "skinOwners",
  stateClass:skinOwners,
  initialState: genesisState.array,
  on: transitions,
});

export { machine };


