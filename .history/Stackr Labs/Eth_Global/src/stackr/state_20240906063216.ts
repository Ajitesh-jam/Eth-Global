import { State } from "@stackr/sdk/machine";
import { solidityPackedKeccak256 } from "ethers";


export type Owner = {
  Waddress: string;
  skins: number[];
};

export class skinOwners extends State<number[]> {

  constructor(state: number[]) {
    super(state); 
  }

  getRootHash() {
    return solidityPackedKeccak256(["uint256[]"], [this.state]);
  }demle
}



