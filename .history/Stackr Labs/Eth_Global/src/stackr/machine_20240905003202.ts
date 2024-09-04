import { StateMachine } from "@stackr/sdk/machine";

import * as genesisState from "../../genesis-state.json";
import { CounterState } from "./state";
import { transitions } from "./transitions";

const machine = new StateMachine({
  id: "counter",
  stateClass: CounterState,
  initialState: genesisState.state,
  on: transitions,
});

export { machine };


import { State } from "@stackr/sdk/machine";
 
// provide the type of the state
export class MicroRollupState extends State<StateType> {
  constructor(state: StateType) {
    super(state);
  }
 
  getRootHash() {
    // implement the logic to get the root hash
  }
}