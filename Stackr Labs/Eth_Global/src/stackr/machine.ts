import { StateMachine } from "@stackr/sdk/machine";

import * as genesisState from "../../genesis-state.json";
import { skinOwner} from "./state";
import { transitions } from "./transitions";


const machine = new StateMachine({
  id: "SkinOwner",
  stateClass:skinOwner,
  initialState: genesisState.state,
  on: transitions,
});

export { machine };


