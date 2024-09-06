import { StateMachine } from "@stackr/sdk/machine";

import * as genesisState from "../../genesis-state.json";
import { skinOwners} from "./state";
import { transitions } from "./transitions";

const machine = new StateMachine({
  id: "skinOwners",
  stateClass: skinOwners,
  initialState: [genesisState.array.map((item) => ({ Waddress: item.Waddress, skins: item.skins }))],
  on: transitions,
});

export { machine };


