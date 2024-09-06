import { ActionSchema, SolidityType } from "@stackr/sdk";



export const UpdateCounterSchema = new ActionSchema("update-New", {
  timestamp: SolidityType.UINT,

  Owner = {
    Waddress: string;
    skins: number[];
  };

});
