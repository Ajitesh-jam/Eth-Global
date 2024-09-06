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
const OwnerSchema =  {
  Waddress: SolidityType.ADDRESS,  // Assuming SolidityType.ADDRESS is correct for an address
  skins: SolidityType.BYTES32,  // Assuming SolidityType.UINT_ARRAY is appropriate for an array of numbers
};

// Define the main action schema
export const UpdateSkinSchema = new ActionSchema("update-New", {
  
  //Owner: OwnerSchema,  // Use the Owner schema here
  timestamp: SolidityType.UINT,
  skinAdd:SolidityType.UINT
  
});

