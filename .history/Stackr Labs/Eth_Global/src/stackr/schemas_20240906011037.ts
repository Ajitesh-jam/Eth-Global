// import { ActionSchema, SolidityType } from "@stackr/sdk";



// export const UpdateCounterSchema = new ActionSchema("update-New", {
//   timestamp: SolidityType.UINT,

//   Owner = {
//     Waddress: string;
//     skins: number[];
//   };

// });
import { ActionSchema, SolidityType } from "@stackr/sdk";

// Define the Owner type separately as an object schema
const OwnerSchema = new ActionSchema("Owner", {
  Waddress: SolidityType.ADDRESS,  // Assuming SolidityType.ADDRESS is correct for an address
  skins: SolidityType.UINT_ARRAY,  // Assuming SolidityType.UINT_ARRAY is appropriate for an array of numbers
});

// Define the main action schema
export const UpdateCounterSchema = new ActionSchema("update-New", {
  timestamp: SolidityType.UINT,  // Assuming the timestamp is a UINT in Solidity
  Owner: OwnerSchema,  // Use the Owner schema here
});

