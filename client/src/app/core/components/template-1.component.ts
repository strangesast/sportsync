import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as d3 from 'd3';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { bindCallback } from 'rxjs/observable/bindCallback';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'app-template-1',
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
    <div>
      <label for="text-color">Color</label>
      <input id="text-color" type="color" formControlName="color"/>
    </div>
    <div>
      <label for="text">Text</label>
      <input id="text" formControlName="text" type="text"/>
    </div>
    <div>
      <label for="grid">Grid?</label>
      <input formControlName="grid" type="checkbox"/>
    </div>
    <div>
      <label for="size.width">Width</label>
      <input type="number" formControlName="width"/>
      <label for="size.height">Height</label>
      <input type="number" formControlName="height"/>
    </div>
  </form>
  <div class="canvas-container">
    <canvas #out class="hidden" [width]="width/10" [height]="height/10"></canvas>
    <canvas
      #canvas
      class="pixelated"
      [width]="width"
      [height]="height">
    </canvas>
    <!--
    <canvas
      #filter
      [width]="width"
      [height]="height">
    </canvas>
    -->
    <svg [attr.width]="width" [attr.height]="height" *ngIf="grid$ | async">
      <defs>
        <mask maskUnits="userSpaceOnUse" id="fade">
          <rect fill="white" width="100%" height="100%"/>
          <circle fill="black" r="4" cx="4" cy="5"/>
        </mask>
      </defs>
      <pattern id="circles" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect mask="url(#fade)" width="10" height="10"/>
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#circles)"/>
    </svg>
  </div>
  `,
  styles: [
  `
 .canvas-container {
    position: relative;
  }

  canvas, svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  canvas.hidden {
    display: none;
  }

  canvas.pixelated {
    image-rendering: pixelated;
  }
  `
  ]
})
export class Template1Component implements AfterViewInit {
  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef;
  // @ViewChild('filter', { read: ElementRef }) filter: ElementRef;
  @ViewChild('out', { read: ElementRef }) out: ElementRef;

  fontSizes = {
    'font9x18':  { width: 9,  base: 18, adj: 0,    x: -1.0, y: -3.6 },
    'font6x12':  { width: 6,  base: 12, adj: 0,    x:  0.0, y: -3.4 },
    'font10x20': { width: 10, base: 20, adj: 0,    x: -1.0, y: -3.0 },
    // 'font5x7':   { width: 5,  base: 7,  adj: 0.45, x: -1.1, y:  0.2 },
    'font6x13O': { width: 6,  base: 13, adj: 0,    x: -1.0, y: -1.6 },
    'font4x6':   { width: 4,  base: 6,  adj: 0,    x:  0.0, y: -0.2 },
    // 'font5x8':   { width: 5,  base: 8,  adj: 0.80, x: -1.0, y: -1.0 },
    // 'font6x10':  { width: 6,  base: 10, adj: 2.60, x:  0.2, y: -1.1 }
  };

  fonts = Object.keys(this.fontSizes);

  public socket: WebSocket = new WebSocket('ws://192.168.1.4:3000/socket');

  open$ = fromEvent(this.socket, 'open');
  message$ = fromEvent(this.socket, 'message');
  close$ = fromEvent(this.socket, 'close');
  error$ = fromEvent(this.socket, 'error');

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

  grid$ = this.form.get('grid')
    .valueChanges
    .pipe(
      startWith(this.form.get('grid').value),
      shareReplay(1),
    );

  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    const color$ = this.form.get('color').valueChanges.pipe(
      startWith(this.form.get('color').value),
      debounceTime(50),
      shareReplay(1),
    );

    const gridUpdates = this.size$.switchMap(size => this.grid$.map(grid => {
      /*
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
      */
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

    const contentUpdates = this.size$.switchMap(size => {
      const grd = this.ctx.createLinearGradient(0, 0, size.width, 0);
      let red = d3.color('red');
      red = d3.hsl(0, 100, 50);
      red.opacity = 0.8;
      const blue = d3.color('blue');

      blue.opacity = 0.2;
      grd.addColorStop(0, red as any);
      grd.addColorStop(0.5, blue as any);
      grd.addColorStop(1, red as any);
      return font$.switchMap(font => {
        this.ctx.textAlign = 'start';
        this.ctx.textBaseline = 'top';
        const fontSize = this.fontSizes[font];
        this.ctx.font = `${ fontSize.base + fontSize.adj }px ${ font}`;
        return combineLatest(color$, text$).map(([color, text]) => {
          // this.ctx.clearRect(0, 0, size.width, size.height);

          this.ctx.fillStyle = 'black';
          this.ctx.fillRect(0, 0, size.width, size.height);

          this.ctx.fillStyle = grd;
          this.ctx.fillRect(0, 0, size.width, size.height);

          this.ctx.fillStyle = color;
          this.ctx.fillText(text, fontSize.x, fontSize.y);
        });
      });
    });

    this.form.valueChanges.pipe(
      withLatestFrom(this.size$),
      debounceTime(100)
    ).switchMap(([value, size]) => {
      const image = new Image();
      image.src = this.canvas.nativeElement.toDataURL();
      return fromEvent(image, 'load').switchMap(() => {
        this.out.nativeElement.getContext('2d').drawImage(image, 0, 0, size.width, size.height);
        const fn = (canvas, cb) => {
          canvas.toBlob(cb);
        };
        return bindCallback(fn)(this.out.nativeElement);
      });
    }).pipe(distinctUntilChanged()).subscribe(data => {
      this.socket.send(data);
    });

    merge(gridUpdates, contentUpdates).subscribe();
  }

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {}
}
