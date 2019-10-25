import { Asset } from './../model/Asset.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private assetList: Asset[] = [
    {
      serialNo: 1,
      name: 'Computer',
      company: 'HP',
      quantity: 10,
      isEdit: false
    },
    {
      serialNo: 2,
      name: 'Mouse',
      company: 'Lenovo',
      quantity: 15,
      isEdit: false
    },
    {
      serialNo: 3,
      name: 'CPU',
      company: 'Apple',
      quantity: 20,
      isEdit: false
    },
    {
      serialNo: 4,
      name: 'Monitor',
      company: 'Dell',
      quantity: 25,
      isEdit: false
    },
  ];

  constructor() { }

  getNewAsset(): Asset {
    return {
      serialNo: null,
      name: null,
      company: null,
      quantity: null,
      isEdit: false
    }
  }

  getAssets(): Asset[] {
    return this.assetList;
  }
  saveAsset(asset: Asset) {
    return this.assetList.push(asset);                 // to add new record end of the list
    // return this.assetList.splice(0, 0, asset);     // to add new record at top of the list
  }
  deleteAsset(index: number) {
    return this.assetList.splice(index, 1);
  }
}
