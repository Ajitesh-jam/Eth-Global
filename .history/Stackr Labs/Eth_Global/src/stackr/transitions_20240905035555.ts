import { STF, Transitions } from "@stackr/sdk/machine";
import {  skinOwners } from "./state";

const addSkin: STF<skinOwners> = {
  handler: ({ state, emit }) => {
    state.push({})
    emit({ name: "ValueAfterIncrement", value: state });
    return state;
  },



};

const decrement: STF<skinOwners> = {
  handler: ({ state, emit }) => {
    
    emit({ name: "ValueAfterDecrement", value: state });
    return state;
  },


  
};

export const transitions: Transitions<skinOwners> = {
  addSkin,
  decrement,
};



