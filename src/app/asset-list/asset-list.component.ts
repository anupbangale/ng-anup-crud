import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Asset } from './../model/Asset.model';
import { Component, OnInit } from '@angular/core';
import { AssetService } from '../services/asset.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit {
  assets: Asset[];
  assetsForm: FormGroup;
  asset: Asset;
  tempAsset: Asset;
  i: number = 1;

  constructor(
    private assetService: AssetService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.assets = this.assetService.getAssets();
    this.loadAsset();
    this.loadAssetForm();
  }

  loadAsset() {
    this.asset = this.assetService.getNewAsset();
  }
  loadAssetForm() {
    this.assetsForm = this.fb.group({
      assetName: new FormControl('', Validators.required),
      companyName: new FormControl('', Validators.required),
      quntity: new FormControl('', [
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
        Validators.pattern('^.{1,4}$')
      ])
    });
  }

  onEditClick(asst) {
    this.tempAsset = { ...asst };
    asst.isEdit = true;
    console.log('tempAsset--edit', this.tempAsset);

  }
  onUpdateClick(asst) {
    asst.isEdit = false;
    this.asset = { ...asst };
    this.loadAsset();
    this.showUpdateTost();
  }
  onDeleteClick(asst) {
    const index = this.assets.indexOf(asst);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.assetService.deleteAsset(index);
        this.showDeleteTost();
      },
      reject: () => {
        this.showRejectTost();
      }
    });
  }
  onCloseClick(asst) {
    asst.company = this.tempAsset.company;
    asst.isEdit = this.tempAsset.isEdit;
    asst.name = this.tempAsset.name;
    asst.quantity = this.tempAsset.quantity;
    asst.serialNo = this.asset.serialNo;
    this.asset = { ...this.tempAsset };
    this.showInfoTost();
  }
  onAddAsset() {
    let num = 4 + this.i;
    this.asset.serialNo = num;
    this.assetService.saveAsset(this.asset);
    this.showAddTost();
    this.loadAsset();
    this.loadAssetForm();
    this.i++;
  }

  showAddTost() {
    this.messageService.add({ severity: 'success', summary: 'Addition', detail: 'Asset added.' });
  }
  showDeleteTost() {
    this.messageService.add({ severity: 'info', summary: 'Delete', detail: 'Record Deleted.' });
  }
  showUpdateTost() {
    this.messageService.add({ severity: 'info', summary: 'Update', detail: 'Record updated.' });
  }
  showInfoTost() {
    this.messageService.add({ severity: 'error', summary: 'Info', detail: 'Registration cancelled.' });
  }
  showRejectTost() {
    this.messageService.add({ severity: 'warn', summary: 'Info', detail: 'You rejected.' });
  }

  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
