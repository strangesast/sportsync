import {
  AfterViewInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Input,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as d3 from 'd3';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

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
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'app-template-viewer-canvas',
  template: `
  <canvas
    #out
    class="hidden">
  </canvas>
  <canvas
    #canvas
    class="pixelated">
  </canvas>
  `,
  styles: [
  `
  :host {
    display: block;
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
export class TemplateViewerCanvasComponent implements AfterViewInit, OnChanges, OnDestroy {

  elements$ = new Subject<FormArray>();
  destroyed$ = new Subject();

  elementsUpdatesSub = this.elements$.pipe(
    switchMap((elements: FormArray) => elements.valueChanges),
    debounceTime(50),
    tap(() => this.draw({})),
    takeUntil(this.destroyed$),
  ).subscribe();

  @ViewChild('canvas', { read: ElementRef }) canvas: ElementRef;
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

  @Input() background = '#FFFFFF';
  @Input() elements: FormArray;

  @Input() size = { width: 0, height: 0 };

  private ctx: CanvasRenderingContext2D;

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw();
  }

  constructor(private fb: FormBuilder, private ref: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.draw(changes);
  }

  draw(changes?: SimpleChanges) {
    if (changes && changes.elements) {
      this.elements$.next(changes.elements.currentValue);
    }

    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    const { width, height } = this.size;

    if (!changes || changes.size) {
      const scale = 10;
      this.canvas.nativeElement.setAttribute('width', width * scale);
      this.canvas.nativeElement.setAttribute('height', height * scale);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(10, 10);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = this.background || '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    for (const control of this.elements.controls) {
      ctx.textAlign = 'start';
      ctx.textBaseline = 'top';
      const font = control.get('font').value;
      const fontSize = this.fontSizes[font];
      ctx.font = `${ fontSize.base + fontSize.adj }px ${ font }`;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      const color = control.get('color').value;
      ctx.fillStyle = color;
      const text = control.get('text').value;
      ctx.fillText(text, (control.get('x').value || 0) + fontSize.x, (control.get('y').value || 0) + fontSize.y);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getImage() {
    return Observable.create(observer => {
      const image = new Image();
      const { width, height } = this.size;
      this.out.nativeElement.setAttribute('width', width);
      this.out.nativeElement.setAttribute('height', height);
      image.onload = () => {
        this.out.nativeElement.getContext('2d').drawImage(image, 0, 0, width, height);
        const fn = (canvas, cb) => {
          canvas.toBlob(cb);
        };
        this.out.nativeElement.toBlob(blob => {
          observer.next(blob);
          observer.complete();
        });
      };
      image.src = this.canvas.nativeElement.toDataURL();
    });
  }
}
