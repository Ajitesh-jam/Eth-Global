// import { State } from "@stackr/sdk/machine";
// import { solidityPackedKeccak256 } from "ethers";


// export type Owner = {
//   address: string;
//   skins: number[];
 
// }[];

// export class skinOwners extends State<number> {
//   public OwnerSkins:Owner;

//   constructor(state: Owner) {
//     super();
//     this.OwnerSkins=state;
//   }



 


//   // Here since the state is simple and doesn't need wrapping, we skip the transformers to wrap and unwrap the state

//   transformer() {
//     return {
//       wrap: () => this.state,
//       unwrap: (wrappedState: number) => wrappedState,
//     };
//   }


//   getRootHash() {
//     return solidityPackedKeccak256(["uint256"], [this.state]);
//   }
// }

import { State } from "@stackr/sdk/machine";
import { BytesLike, ZeroHash, solidityPackedKeccak256 } from "ethers";
import { MerkleTree } from "merkletreejs"; 
 
// Raw State
export type Leaves = {
  address: string;
  balance: number;
  nonce: number;
  allowances: {
    address: string;
    amount: number;
  }[];
}[];
 
// Wrapped State
export class MerkleTreeWrapper { 
  public merkleTree: MerkleTree; 
  public leaves: Leaves; 
 
  constructor(leaves: Leaves) { 
    this.merkleTree = this.createTree(leaves); 
    this.leaves = leaves; 
  } 
 
  createTree(leaves: Leaves) { 
    const hashedLeaves = leaves.map((leaf) => { 
      return solidityPackedKeccak256( 
        ["address", "uint256", "uint256"], 
        [leaf.address, leaf.balance, leaf.nonce] 
      ); 
    }); 
    return new MerkleTree(hashedLeaves); 
  } 
} 
 
export class ERC20 extends State<Leaves, MerkleTreeWrapper> {
  constructor(state: Leaves) {
    super(state);
  }
 
  transformer() { 
    return {
      wrap: () => {
        return new MerkleTreeWrapper(this.state); 
      },
      unwrap: (wrappedState: MerkleTreeWrapper) => {
        return wrappedState.leaves;
      },
    };
  }
 
  getRootHash(): BytesLike {
    if (this.state.length === 0) {
      return ZeroHash;
    }
    return this.transformer().wrap().merkleTree.getRoot();
  }
}


