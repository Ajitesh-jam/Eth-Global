import { MicroRollup } from "@stackr/sdk";
import { stackrConfig } from "../../stackr.config";
import { machine } from "./machine";
import { UpdateCounterSchema } from "./schemas";

const mru = await MicroRollup({
  config: stackrConfig,
  actionSchemas: [UpdateCounterSchema],
  stateMachines: [machine],
});

await mru.init();
import { Playground } from "@stackr/sdk/plugins";
 
// const rollup = await MicroRollup({
//     config: stackrConfig,
//     actionSchemas: [], // Action Schemas of the rollup.
//     stateMachines: [machine],
// });
 
// await rollup.init();


 
// Playground.init(rollup); 



export { mru };


