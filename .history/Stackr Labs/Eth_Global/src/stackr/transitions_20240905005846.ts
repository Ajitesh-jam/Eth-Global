import { STF, Transitions } from "@stackr/sdk/machine";
import {  skinOwners } from "./state";

const addSkin: STF<skinOwners> = {
  handler: ({ state, emit }) => {
    state += 1;
    emit({ name: "ValueAfterIncrement", value: state });
    return state;
  },



};

const decrement: STF<skinOwners> = {
  handler: ({ state, emit }) => {
    state -= 1;
    emit({ name: "ValueAfterDecrement", value: state });
    return state;
  },


  
};

export const transitions: Transitions<skinOwners> = {
  addSkin,
  decrement,
};



