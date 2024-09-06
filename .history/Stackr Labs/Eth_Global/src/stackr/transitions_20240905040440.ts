import { STF, Transitions } from "@stackr/sdk/machine";
import {  skinOwners } from "./state";

const addSkin: STF<skinOwners> = {
  handler: ({ state, emit }) => {
    // Push a new owner object into the state array
    state.push({Waddress:"Ajiesh",skins:[1]});
    
    emit({ name: "New skin with id 1 is added", value: state });
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



