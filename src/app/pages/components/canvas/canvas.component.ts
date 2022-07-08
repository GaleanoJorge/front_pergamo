import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit, OnChanges {
  @ViewChild('stage') canvas: ElementRef<HTMLCanvasElement>;
  public context: CanvasRenderingContext2D;
  @Input() public arrayElements: any;
  @Input() public elementAct: any = null;
  @Input() public export: boolean = false;
  @Input() public sizeCanvas: any;
  @Output() exportImage = new EventEmitter<any>();
  @Output() updateJson = new EventEmitter<any>();

  constructor() { }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    let self = this;
    this.context.canvas.addEventListener('mousemove', (evt) => {
      if (self.elementAct !== null) {
        let mousePos = this.oMousePos(this.context.canvas,evt)
        self.elementAct.x = mousePos.x-10;
        self.elementAct.y = mousePos.y-10;
        self.arrayElements[self.elementAct.pos].x = self.elementAct.x
        self.arrayElements[self.elementAct.pos].y = self.elementAct.y
        self.drawCanvas();
      }
    })

    this.context.canvas.addEventListener('mouseup', (evt) => {
      this.updateObj()
      self.elementAct = null
    })
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (!changedProp.isFirstChange()) {
        if (changedProp.currentValue === true) {
          this.exportPng();
        } else {
          this.canvas.nativeElement.width = this.sizeCanvas.width;
          this.canvas.nativeElement.height = this.sizeCanvas.height;
          this.drawCanvas();
        }
      }
    }
  }

  oMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return { // devuelve un objeto
      x: Math.round(evt.clientX - rect.left),
      y: Math.round(evt.clientY - rect.top)
    };
  }

  selectElement(element,pos) {
    this.elementAct = {
      item: this.arrayElements[pos],
      pos: pos
    };
  }

  async loadImage(url){
    return new Promise((resolve,reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (err) => reject(err));
      img.src = url;
      if(img.complete && img.naturalHeight !== 0){
        resolve(img)
      }
    })
  }

  async drawCanvas(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    let image:any;
    if (this.arrayElements !== undefined) {
      for (var i = 0; i < this.arrayElements.length; i++) {
        let self = this;
        let j = i;
        switch(this.arrayElements[i].type){
          case 'background':
            try {
              image = await this.loadImage(self.arrayElements[i].value)
              this.context.globalCompositeOperation = 'destination-over'
              self.context.drawImage(image,
                self.arrayElements[j].x,
                self.arrayElements[j].y,
                this.context.canvas.width,
                this.context.canvas.height
              );
              this.context.globalCompositeOperation = 'source-over'
            } catch (error) {
              this.context.globalCompositeOperation = 'source-over'
              continue
            }
            break;
          case 'backgroundColor':
            // Render a slayer in white like background
            this.context.globalCompositeOperation = 'destination-over'
            this.context.fillStyle = self.arrayElements[i].value
            this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
            this.context.globalCompositeOperation = 'source-over'
            this.context.fillStyle = '#000';
            break;
          case 'signature':
          case 'image':
            try {
             image = await this.loadImage(self.arrayElements[i].value)
             self.context.drawImage(image,
               self.arrayElements[j].x,
               self.arrayElements[j].y,
               self.arrayElements[i].width === undefined ? 150 : self.arrayElements[i].width,
               self.arrayElements[i].height === undefined ? 150 : self.arrayElements[i].height,
             );
            } catch (error) {
              continue
            }
            break;
          case 'text':
          default:
            this.context.fillStyle = this.arrayElements[i].color !== undefined ? this.arrayElements[i].color :'#000';
            this.context.font = `${this.arrayElements[i].bold === undefined || this.arrayElements[i].bold ? 'bold ':''}${
              this.arrayElements[i].size !== undefined ? `${this.arrayElements[i].size}px` : '24px'
            } ${this.arrayElements[i].font === undefined ? 'sans-serif' :this.arrayElements[i].font}`;
            this.context.fillText(this.arrayElements[i].value,
              this.arrayElements[i].centerAlign === undefined
              || !this.arrayElements[i].centerAlign ?
              this.arrayElements[i].x :
              (this.context.canvas.width-this.context.measureText(this.arrayElements[i].value).width)/2,
              this.arrayElements[i].y
            );
            this.context.fillStyle = "#000000"
            break
        }
      }
    }
  }

  exportPng() {
    this.exportImage.emit(this.canvas.nativeElement.toDataURL("image/png"))
  }

  updateObj() {
    this.updateJson.emit(this.arrayElements)
  }

}
