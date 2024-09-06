// import { ActionSchema, AllowedInputTypes } from "@stackr/sdk";
// import { HDNodeWallet } from "ethers";

// export const signMessage = async (
//   wallet: HDNodeWallet,
//   schema: ActionSchema,
//   payload: AllowedInputTypes
// ) => {
//   const signature = await wallet.signTypedData(
//     schema.domain,
//     schema.EIP712TypedData.types,
//     payload
//   );
//   return signature;
// };


import { ActionSchema, AllowedInputTypes } from "@stackr/sdk";
import { Wallet } from "ethers";

// Modify the signMessage function to accept a private key
export const signMessage = async (
  privateKey: string,
  schema: ActionSchema,
  payload: AllowedInputTypes
) => {
  // Create a wallet from the private key
  const wallet = new Wallet(privateKey);

  // Sign the message using the wallet
  const signature = await wallet.signTypedData(
    schema.domain,
    schema.EIP712TypedData.types,
    payload
  );
  
  return signature;
};
