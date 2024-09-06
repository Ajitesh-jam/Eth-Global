import { ActionConfirmationStatus } from "@stackr/sdk";
import { Wallet } from "ethers";
import { mru } from "./stackr/mru.ts";
import { UpdateCounterSchema } from "./stackr/schemas.ts";
import { signMessage } from "./utils.ts";

const main = async () => {
  const inputs = {
    timestamp: Date.now(),
   
    
    
    
  };

  // Create a random wallet
  const wallet = Wallet.createRandom();

  const signature = await signMessage(wallet, UpdateCounterSchema, inputs);
  const incrementAction = UpdateCounterSchema.actionFrom({
    inputs,
    signature,
    msgSender: wallet.address,
  });

  const ack = await mru.submitAction("updateNew", incrementAction);
  console.log(ack.hash);

  // leverage the ack to wait for C1 and access logs & error from STF execution
  const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
  console.log({ logs, errors });

  await submitNew();
};

main();

// Function to submit the "updateNew" action
const submitNew = async () => {
  console.log("Submit New ")
  const inputs = {
    timestamp:Date.now(),
  };
  const wallet = Wallet.createRandom();
  // Sign the message using the wallet and schema
  const signature = await signMessage(wallet, UpdateCounterSchema, inputs);
    // Create a random wallet


  // Create an action from the schema
  const incrementAction = UpdateCounterSchema.actionFrom({
    inputs,
    signature,
    msgSender: wallet.address,
  });

  // Submit the action to MRU
  const ack = await mru.submitAction("updateNew", incrementAction);
  console.log(`Action submitted: ${ack.hash}`);

  // Wait for the action confirmation
  const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
  console.log({ logs, errors });

  return ack;
};

// import { ActionConfirmationStatus } from "@stackr/sdk";
// import { Wallet } from "ethers";
// import { mru } from "./stackr/mru.ts";
// import { UpdateCounterSchema } from "./stackr/schemas.ts";
// import { signMessage } from "./utils.ts";

// // Define the submitNew function
// const submitNew = async () => {
//   console.log("Submit New");
//   const inputs = {
//     timestamp: Date.now(),
//   };

//   const wallet = Wallet.createRandom();
//   const signature = await signMessage(wallet, UpdateCounterSchema, inputs);
//   const incrementAction = UpdateCounterSchema.actionFrom({
//     inputs,
//     signature,
//     msgSender: wallet.address,
//   });

//   const ack = await mru.submitAction("updateNew", incrementAction);
//   console.log(ack.hash);

//   // Wait for C1 confirmation
//   const { logs, errors } = await ack.waitFor(ActionConfirmationStatus.C1);
//   console.log({ logs, errors });
// };

// // Attach submitNew to the global scope
// (globalThis as any).submitNew = submitNew;

// const main = async () => {
//   console.log("Main script executed. Now you can call submitNew() from the terminal.");
// };

// main();


