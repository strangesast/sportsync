import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';
import * as d3 from 'd3';
import { Selection, ZoomBehavior } from 'd3';

// import 'rxjs/add/operator/startWith';
import { from } from 'rxjs/observable/from';
import { distinctUntilChanged, filter, flatMap, map, pairwise, pluck, startWith } from 'rxjs/operators';

enum GridTypes {
  None,
  Dots,
  Grid,
}

@Component({
  selector: 'app-template-2',
  template: `
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <label>Board Size</label>
    <div formGroupName="size">
      <mat-form-field>
        <input matInput type="number" placeholder="Width" formControlName="width" min="0">
      </mat-form-field>
      <mat-form-field>
        <input matInput type="number" placeholder="Height" formControlName="height" min="0">
      </mat-form-field>
    </div>
    <div>
      <mat-radio-group formControlName="gridType">
        <mat-radio-button *ngFor="let type of gridTypeValues" [value]="gridTypes[type]">{{ type }}</mat-radio-button>
      </mat-radio-group>
    </div>
    <div>
      <mat-radio-group formControlName="background">
        <mat-radio-button value="#000000">Dark</mat-radio-button>
        <mat-radio-button value="#FFFFFF">Light</mat-radio-button>
      </mat-radio-group>
    </div>
    <div formArrayName="elements">
      <div *ngFor="let element of elements.controls; let i=index; trackBy: element?.value._id" [formGroupName]="i">
        <div>
          <label>Element {{ i + 1 }}</label>
          <mat-form-field>
            <input matInput type="text" placeholder="text" formControlName="text">
          </mat-form-field>
        </div>
        <div>
          <label>Color</label>
          <input formControlName="color" type="color">
          <mat-form-field>
            <mat-select placeholder="Font" formControlName="font">
              <mat-option *ngFor="let font of fonts" [attr.font-family]="font" [value]="font">
                {{ font }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div>
          <mat-form-field>
            <input matInput type="number" placeholder="x" step="1" formControlName="x">
          </mat-form-field>
          <mat-form-field>
            <input matInput type="number" placeholder="y" step="1" formControlName="y">
          </mat-form-field>
        </div>
        <div>
          <button type="button" mat-button (click)="removeElement(i)">Remove</button>
        </div>
      </div>
    </div>
    <button type="button" mat-raised-button (click)="addElement()">Add Element</button>
  </form>
  <button mat-raised-button type="button" (click)="resetTransform()">Reset Transform</button>
  <svg #svgElement xmlns="http://www.w3.org/2000/svg"
    *ngIf="{ width: width$ | async, height: height$ | async } as size"
    [attr.viewBox]="[0, 0, size.width || 0, size.height || 0].join(' ')">
    <defs>
      <!-- grid -->
      <pattern id="smallGrid" width="1" height="1" patternUnits="userSpaceOnUse">
        <path d="M 1 0 L 0 0 0 1" fill="none" stroke="gray" stroke-width="0.05"/>
      </pattern>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="url(#smallGrid)"/>
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.1"/>
      </pattern>

      <!-- dots -->
      <pattern id="dots" x="0" y="0" width="1" height="1" patternUnits="userSpaceOnUse">
        <rect fill="white" width="1" height="1" x="0" y="0"/>
        <circle stroke="none" fill="black" r="0.4" cx="0.5" cy="0.5"/>
      </pattern>
      <mask id="circles-mask" x="0" y="0" width="100%" height="100%" patternUnits="userSpaceOnUse">
        <rect fill="url(#dots)" width="100%" height="100%"/>
      </mask>
    </defs>
    <g>
      <text x="0" y="-1" font-size="10" fill="#999">Board 1</text>
      <rect [attr.width]="size.width" [attr.height]="size.height" [attr.fill]="background.value"/>
      <g
        #els
        *ngFor="let element of elements.controls; trackBy: element?.value._id"
        [attr.id]="element.value._id"
        [attr.transform]="'translate(' + (element.value.x || 0) + ',' + (element.value.y || 0) + ')'">
        <text
          [attr.transform]="fontSizes[element.value.font].adj"
          [attr.font-family]="element.value.font"
          [attr.font-size]="fontSizes[element.value.font].size"
          text-anchor="start"
          [attr.fill]="element.value.color"
          mask="url(#pattern-mask)"
          alignment-baseline="hanging">
          {{element.value.text}}
        </text>
      </g>
      <rect
        *ngIf="gridType.value == gridTypes.Dots"
        class="noselect"
        [attr.width]="size.width"
        [attr.height]="size.height"
        [attr.fill]="background.value"
        mask="url(#circles-mask)"/>
      <rect
        *ngIf="gridType.value == gridTypes.Grid"
        class="noselect"
        [attr.width]="size.width"
        [attr.height]="size.height"
        fill="url(#grid)"/>
    </g>
  </svg>
    `,
  styles: [
    `
    :host {
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }
    mat-radio-button {
      margin: 4px;
    }
    .noselect {
      user-select: none;
      pointer-events: none;
    }
    svg g text {
      cursor: pointer;
    }
    `
  ],
})
export class Template2Component implements AfterViewInit {
  @ViewChild('svgElement') svg: ElementRef;
  svgSelection: Selection<SVGElement, {}, HTMLElement, any>;
  zoom: ZoomBehavior<Element, {}>;

  @ViewChildren('els') els: QueryList<any>;

  gridTypes = GridTypes;
  gridTypeValues = Object.keys(GridTypes).filter(k => !isNaN(Number(GridTypes[k])));

  fontSizes = {
    'font9x18': { size: 18, adj: `translate(${ 0.01 - 1 },${ 0.21 - 1 })` },
    'font6x12': { size: 12, adj: `translate(${ 0 },${ -1.35 })` },
    'font10x20': { size: 20, adj: `translate(${ -1 },${ 0.2 })` },
    'font6x13O': { size: 13, adj: `translate(${ 0 },${ 0.4 }) scale(1.0015)` },
    'font4x6': { size: 6, adj: `translate(${ 0 },${ 0.8 }) scale(1.001)` },
    'font5x7': { size: 7, adj: `translate(${ 0 },${ 0.8 }) scale(1.0005)` },
    'font5x8': { size: 8, adj: `translate(${ 0 },${ 0.60 })` },
    'font6x10': { size: 10, adj: `translate(${ 0 },${ 0.6 })` },
  };
  fonts = Object.keys(this.fontSizes);

  form = this.fb.group({
    size: this.fb.group({
      width: [128, Validators.required],
      height: [32, Validators.required],
    }),
    gridType: [this.gridTypes.Grid],
    background: ['#000000'],
    elements: this.fb.array([]),
  });

  get gridType() {
    return this.form.get('gridType') as FormControl;
  }

  get elements() {
    return this.form.get('elements') as FormArray;
  }

  get background() {
    return this.form.get('background') as FormControl;
  }

  size = this.form.get('size');

  width$ = this.size.valueChanges.pipe(
    pluck('width'),
    startWith(this.size.value.width),
    distinctUntilChanged(),
  );

  height$ = this.size.valueChanges.pipe(
    pluck('height'),
    startWith(this.size.value.height),
    distinctUntilChanged(),
  );

  constructor(private fb: FormBuilder) {
    this.addElement();
  }

  resetTransform() {
    this.svgSelection.call(this.zoom.transform, d3.zoomIdentity);
  }

  ngAfterViewInit() {
    const elements = this.elements;

    const svgSelection = d3.select(this.svg.nativeElement);
    this.svgSelection = svgSelection;
    const svg = this.svgSelection.select('g');

    const pt = (this.svgSelection.node() as any).createSVGPoint();

    let pos = [0, 0];
    function dragstarted(d) {
      d3.select(this).classed('active', true);
    }

    function dragged(d) {
      let [x, y] = [d3.event.x, d3.event.y];
      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }
      pos = [x, y];
      d3.select(this).attr('transform', `translate(${x},${y})`);
    }

    function dragended(d) {
      pos = pos.map(v => Math.round(v));
      const [x, y] = pos;
      const control = elements.controls.find(_control => _control.get('_id').value === this.id);
      control.patchValue({ x, y });
      d3.select(this).classed('active', false);
    }

    function zoomed() {
      svg.attr('transform', d3.event.transform);
    }

    const drag = d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
    this.zoom = d3.zoom().on('zoom', zoomed);
    this.svgSelection.call(this.zoom);

    this.els.changes.pipe(
      map(ql => ql.toArray()),
      startWith(this.els.toArray()),
      map(arr => arr.map((er: ElementRef) => er.nativeElement)),
      startWith([]),
      pairwise(),
      map(([a, b]) => b.filter(el => a.indexOf(el) === -1)),
      flatMap(arr => from(arr)),
    ).subscribe(el => {
      const s = d3.select(el);
      s.call(drag);
    });
  }

  addElement() {
    this.elements.push(this.fb.group({
      _id: uuid(),
      x: [0],
      y: [0],
      text: ['New Element', Validators.required],
      color: ['#FFFFFF'],
      font: ['font9x18'],
    }));
  }

  removeElement(index) {
    this.elements.removeAt(index);
  }
}
