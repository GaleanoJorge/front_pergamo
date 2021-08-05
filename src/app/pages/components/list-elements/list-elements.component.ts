import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-list-elements',
  templateUrl: './list-elements.component.html',
  styleUrls: ['./list-elements.component.scss']
})
export class ListElementsComponent implements OnInit {

  @Input() public arrayElements: any;
  @Input() public disabled: boolean = true;
  @Output() elementAct = new EventEmitter<any>();
  @Output() changePositions = new EventEmitter<any>();
  @Output() draggableParent = new EventEmitter<any>();
  @Output() hidden = new EventEmitter<any>();
  @Input() public elementVal:any = null
  public formEditMode: FormGroup;
  public editMode:any = null;
  public fonts:any = []
  public colorInput: string = '#000000';

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.fonts = ['sans-serif', 'times', 'courier', 'symbol']
    this.formEditMode = this.formBuilder.group({
      color: ['#000000', [Validators.required]],
      size: [24, [Validators.required]],
      bold: [true, [Validators.required]],
      centerAlign: [false, [Validators.required]],
      font: ['sans-serif',[Validators.required]],
      width: [0, [Validators.required]],
      height: [0, [Validators.required]],
    })
  }

  changeComplete(event) {
    this.formEditMode.controls['color'].setValue(event.color.hex);
  }

  changeObject(val){
    this.arrayElements = val.map((element,key) => ({...element,pos:key}))
    this.changePositions.emit(this.arrayElements)
  }

  removeElement(index){
    this.changePositions.emit(this.arrayElements.filter((m,i) => i !== index))
  }
  selectElement(element,i) {
    this.elementAct.emit(element === null ? null : { element: element, pos: i })
  }

  filterElements(element) {
    return element.type !== "background"
  }

  changeEdit(element){
    this.formEditMode.controls['size'].setValue(element.size !== undefined ? element.size : 24)
    this.formEditMode.controls['bold'].setValue(element.bold !== undefined ? element.bold : true)
    this.formEditMode.controls['centerAlign'].setValue(element.centerAlign !== undefined ? element.centerAlign : false)
    this.formEditMode.controls['font'].setValue(element.font !== undefined ? element.font : 'sans-serif')
    this.formEditMode.controls['width'].setValue(element.width !== undefined ? element.width : 150)
    this.formEditMode.controls['height'].setValue(element.height !== undefined ? element.height : 150)
    this.editMode = element
    this.hidden.emit(true)
  }

  closeEdit(){
    this.hidden.emit(false)
    this.editMode = null
  }

  saveEdit(){
    this.hidden.emit(false)
    this.changePositions.emit(this.arrayElements.map((m,key) => {
      if(key === this.editMode.pos){
        switch (this.editMode.type) {
          case 'signature':
          case 'image':
            return {
              ...m,
              width:this.formEditMode.get('width').value,
              height:this.formEditMode.get('height').value
            }
          case 'text':
          default:
            return {
              ...m,
              'size':this.formEditMode.get('size').value,
              'color':this.formEditMode.get('color').value,
              'font':this.formEditMode.get('font').value,
              'bold':this.formEditMode.get('bold').value,
              'centerAlign':this.formEditMode.get('centerAlign').value
            }
        }
      }
      return m
    }))
    this.editMode = null
  }

}
