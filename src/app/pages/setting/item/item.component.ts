import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../../models/item';
import { ItemBusinessService } from '../../../business-controller/item-business.service';
import { NbToastrService, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public itemForm: FormGroup;
  public isSubmitted = false;
  public messageError: string = null;
  public item: Item;
  public dialog;
  routes = [
    {
      name: "Items",
      route: "../../setting/items"
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public itemBS: ItemBusinessService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      route: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      icon: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      item: ['']
    });
    this.GetItems();
  }

  saveItem() {
    this.isSubmitted = true;
    if (!this.itemForm.invalid)
      if (this.item)
        this.itemBS.Update({
          id: this.item.id,
          role_id: 1,
          item_padre: this.itemForm.controls.item.value,
          nombre: this.itemForm.controls.name.value,
          ruta: this.itemForm.controls.route.value,
          icono: this.itemForm.controls.icon.value,
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetItems();
        }).catch(x => {
          this.messageError = x;
        });
      else
        this.itemBS.Save({
          role_id: 1,
          item_padre: this.itemForm.controls.item.value,
          nombre: this.itemForm.controls.name.value,
          ruta: this.itemForm.controls.route.value,
          icono: this.itemForm.controls.icon.value,
        }).then(x => {
          this.toastrService.success("", x.message);
          this.GetItems();
        }).catch(x => {
          this.messageError = x;
        });
  }

  ConfirmDelete(dialog: TemplateRef<any>) {
    this.dialog = this.dialogService.open(dialog);
  }

  DeleteItem() {
    this.dialog.close();
    if (this.item)
      this.itemBS.Delete(this.item.id).then(x => {
        this.toastrService.success("", x.message);
        this.GetItems();
      }).catch(x => {
        this.messageError = x;
      });
  }

  GetItems() {
    this.isSubmitted = false;
    this.itemBS.GetCollection().then(x => {
      this.messageError = null;
    }).catch(x => {
      this.messageError = x;
    });
  }
}
