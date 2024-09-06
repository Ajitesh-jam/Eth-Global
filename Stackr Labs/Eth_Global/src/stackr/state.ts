import { State } from "@stackr/sdk/machine";
import { solidityPackedKeccak256 } from "ethers";


//will keep track of users skin
export class skinOwner extends State<number[]> {

  constructor(state: number[]) {
    super(state); 
  }


  getRootHash() {
    return solidityPackedKeccak256(["uint256[]"], [this.state]);
  }
}



