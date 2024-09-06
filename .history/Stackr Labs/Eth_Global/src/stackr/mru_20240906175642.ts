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
export { mru };

import { Playground } from "@stackr/sdk/plugins";
 
const rollup = await MicroRollup({
    config: stackrConfig,
    actionSchemas: [], // Action Schemas of the rollup.
    stateMachines: [machine],
});
 
await rollup.init();
 
Playground.init(rollup); 
// const playground = Playground.init(rollup);
// playground.addGetMethod("/custom/state", (_req, res) => {
//   return res.json({ state: pointsMachine?.state }); 
// }); 

