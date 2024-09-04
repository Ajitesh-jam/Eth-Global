// import { StateMachine } from "@stackr/sdk/machine";

// import * as genesisState from "../../genesis-state.json";
// import { CounterState } from "./state";
// import { transitions } from "./transitions";

// const machine = new StateMachine({
//   id: "counter",
//   stateClass: CounterState,
//   initialState: genesisState.state,
//   on: transitions,
// });

// export { machine };


import { BytesLike, State, StateMachine } from "@stackr/sdk/machine"; 
 
export class CounterState extends State<number> { 
  constructor(state: number) {
    super(state);
  }
 
  getRootHash(): BytesLike {
    return solidityPackedKeccak256(["uint256"], [this.state]);
  }
}