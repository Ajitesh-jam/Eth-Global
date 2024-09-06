import { State } from "@stackr/sdk/machine";
import { solidityPackedKeccak256 } from "ethers";


export type Owner = {
  address: string;
  skins: number[];
 
}[];

export class skinOwners extends State<Owner> {
  public OwnerSkins:Owner;

  constructor(state: Owner) {
    super(state);
    this.OwnerSkins=state;
  }


  getRootHash() {
    return solidityPackedKeccak256(["uint256"], [this.state]);
  }
}



