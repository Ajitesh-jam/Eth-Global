import { StateMachine } from "@stackr/sdk/machine";

import * as genesisState from "../../genesis-state.json";
import { skinOwners} from "./state";
import { transitions } from "./transitions";


const machine = new StateMachine({
  id: "SkinOwners",
  stateClass:skinOwners,
  initialState: genesisState.state,
  on: transitions,
});

export { machine };


