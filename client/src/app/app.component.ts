import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { debounceTime, distinctUntilChanged, pluck, map, tap, throttleTime, shareReplay, startWith, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <div *ngFor="let font of fonts">
    <p class="{{ font }}">{{ font }}</p>
  </div>
  <form [formGroup]="form">
    <select formControlName="font">
      <option
        *ngFor="let font of fonts"
        [value]="font">
        {{ font }}
      </option>
    </select>
    <label for="text-color">Color</label>
    <input id="text-color" type="color" formControlName="color"/>
    <label for="text">Text</label>
    <input id="text" formControlName="text" type="text"/>
    <label for="grid">Grid?</label>
    <input formControlName="grid" type="checkbox"/>
    <div>
      <label for="size.width">Width</label>
      <input type="number" formControlName="width"/>
      <label for="size.height">Height</label>
      <input type="number" formControlName="height"/>
    </div>
  </form>
  <div class="canvas-container">
    <canvas
      #canvas
      class="pixelated"
      [width]="width"
      [height]="height">
    </canvas>
    <canvas
      #filter
      [width]="width"
      [height]="height">
    </canvas>
    <canvas #out [width]="width/10" [height]="height/10"></canvas>
  </div>
  `,
  styles: [
  `
  .font9x18 {
    font-family: font9x18;
  }
  .font6x12 {
    font-family: font6x12;
  }
  .font10x20 {
    font-family: font10x20;
  }
  .font5x7 {
    font-family: font5x7;
  }
  .font6x13O {
    font-family: font6x13O;
  }
  .font4x6 {
    font-family: font4x6;
  }
  .font5x8 {
    font-family: font5x8;
  }
  .font6x10 {
    font-family: font6x10;
  }

  .canvas-container {
    position: relative;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }

  canvas.pixelated {
    image-rendering: pixelated;
  }
  `
  ]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef;
  @ViewChild('filter', { read: ElementRef }) filter: ElementRef;
  @ViewChild('out', { read: ElementRef }) out: ElementRef;

  fontSizes = {
    'font9x18':  { width: 9,  base: 18, adj: 0,    x: -1.0, y: -3.6 },
    'font6x12':  { width: 6,  base: 12, adj: 0,    x:  0.0, y: -3.4 },
    'font10x20': { width: 10, base: 20, adj: 0,    x: -1.0, y: -3.0 },
    'font5x7':   { width: 5,  base: 7,  adj: 0.45, x: -1.1, y:  0.2 },
    'font6x13O': { width: 6,  base: 13, adj: 0,    x: -1.0, y: -1.6 },
    'font4x6':   { width: 4,  base: 6,  adj: 0,    x:  0.0, y: -0.2 },
    'font5x8':   { width: 5,  base: 8,  adj: 0.80, x: -1.0, y: -1.0 },
    'font6x10':  { width: 6,  base: 10, adj: 2.60, x:  0.2, y: -1.1 }
  };

  fonts = Object.keys(this.fontSizes);

  public form = this.fb.group({
    color: ['#FFFFFF'],
    font: [this.fonts[0], Validators.required],
    text: ['Text', Validators.required],
    grid: true,
    width: [128, Validators.required],
    height: [32, Validators.required],
  });

  width;
  height;

  size$ = combineLatest(
    this.form.get('width').valueChanges.pipe(
      startWith(this.form.get('width').value),
      distinctUntilChanged()
    ),
    this.form.get('height').valueChanges.pipe(
      startWith(this.form.get('height').value),
      distinctUntilChanged()
    )
  ).pipe(
    tap(([width, height]) => {
      this.width = width * 10;
      this.height = height * 10;
      this.ref.detectChanges();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(10, 10);
    }),
    map(([width, height]) => ({ width, height })),
    shareReplay(1)
  );

  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    const color$ = this.form.get('color').valueChanges.pipe(
      startWith(this.form.get('color').value),
      debounceTime(100),
      shareReplay(1),
    );

    const grid$ = this.form.get('grid')
      .valueChanges
      .pipe(
        startWith(this.form.get('grid').value),
        shareReplay(1),
      );

    const gridUpdates = this.size$.switchMap(size => grid$.map(grid => {
      const ctx = this.filter.nativeElement.getContext('2d');
      ctx.clearRect(0, 0, size.width * 10, size.height * 10);
      if (grid) {
        for (let i = 0; i < size.width + 1; i++) {
          ctx.beginPath();
          ctx.moveTo(i * 10, 0);
          ctx.lineTo(i * 10, size.height * 10);
          ctx.stroke();
        }
        for (let i = 0; i < size.height + 1; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * 10);
          ctx.lineTo(size.width * 10, i * 10);
          ctx.stroke();
        }
      }
    }));

    const font$ = this.form.get('font')
      .valueChanges
      .pipe(
        startWith(this.form.get('font').value),
        shareReplay(1),
      );

    const text$ = this.form.get('text')
      .valueChanges
      .pipe(
        startWith(this.form.get('text').value),
        shareReplay(1),
      );

    const contentUpdates = this.size$.switchMap(size => font$.switchMap(font => {
      this.ctx.textAlign = 'start';
      this.ctx.textBaseline = 'top';
      const fontSize = this.fontSizes[font];
      this.ctx.font = `${ fontSize.base + fontSize.adj }px ${ font}`;
      return combineLatest(color$, text$).map(([color, text]) => {
        this.ctx.clearRect(0, 0, size.width, size.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, size.width, size.height);
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, fontSize.x, fontSize.y);
      });
    }));

    this.form.valueChanges.pipe(
      withLatestFrom(this.size$),
      debounceTime(1000)
    ).switchMap(([value, size]) => {
      const image = new Image();
      image.src = this.canvas.nativeElement.toDataURL();
      return fromEvent(image, 'load').map(() => {
        this.out.nativeElement.getContext('2d').drawImage(image, 0, 0, size.width, size.height);
        const data = this.out.nativeElement.toDataURL();
        return data;
      });
    }).subscribe(data => {
      console.log('data', data);
    });

    merge(gridUpdates, contentUpdates).subscribe();
  }

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {}
}
