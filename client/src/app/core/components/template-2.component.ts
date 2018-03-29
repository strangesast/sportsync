import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';
import * as d3 from 'd3';

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
        <label>Element {{ i + 1 }}</label>
        <mat-form-field>
          <input matInput type="text" placeholder="text" formControlName="text">
        </mat-form-field>
        <input formControlName="color" type="color">
        <mat-form-field>
          <mat-select placeholder="Font" formControlName="font">
            <mat-option *ngFor="let font of fonts" [attr.font-family]="font" [value]="font">
              {{ font }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button type="button" mat-button (click)="removeElement(i)">Remove</button>
      </div>
    </div>
    <button type="button" mat-raised-button (click)="addElement()">Add Element</button>
  </form>
  <svg #svgElement xmlns="http://www.w3.org/2000/svg"
    *ngIf="{ width: width$ | async, height: height$ | async } as size"
    [attr.viewBox]="[0, 0, size.width, size.height].join(' ')"
    [attr.width]="size.width * 10"
    [attr.height]="size.height * 10">
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
    <rect width="100%" height="100%" [attr.fill]="background.value"/>
    <g *ngFor="let element of elements.controls; trackBy: element?.value._id" #els>
      <text
        x="0"
        y="0"
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
      width="100%"
      height="100%"
      [attr.fill]="background.value"
      mask="url(#circles-mask)"/>
    <rect
      *ngIf="gridType.value == gridTypes.Grid"
      class="noselect"
      width="100%"
      height="100%"
      fill="url(#grid)"/>
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

  @ViewChildren('els') els: QueryList<any>;

  gridTypes = GridTypes;
  gridTypeValues = Object.keys(GridTypes).filter(k => !isNaN(Number(GridTypes[k])));

  fontSizes = {
    'font9x18': { size: 18 },
  };
  fonts = Object.keys(this.fontSizes);

  form = this.fb.group({
    size: this.fb.group({
      width: [128, Validators.required],
      height: [32, Validators.required],
    }),
    gridType: [this.gridTypes.None],
    background: ['#000000'],
    elements: this.fb.array([
      this.fb.group({
        _id: uuid(),
        text: ['Text', Validators.required],
        color: ['#FFFFFF'],
        font: ['font9x18'],
      })
    ]),
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

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit() {
    const svg = this.svg.nativeElement;

    let pos = [0, 0];
    function dragstarted(d) {
      const s = d3.select(this);
      const bbox = this.getBoundingClientRect();
      console.log([d3.event.x - bbox.x, d3.event.y - bbox.y]);
      s.classed('active', true);
      // console.log(d3.event.sourceEvent.target.getBoundingClientRect());
    }

    function dragged(d) {
      pos = [d3.event.x, d3.event.y];
      const [x, y] = pos;
      console.log(x.toFixed(4), y.toFixed(4), 'end');
      d3.select(this).attr('transform', `translate(${x},${y})`);
    }

    function dragended(d) {
      pos = pos.map(v => Math.round(v));
      const [x, y] = pos;
      d3.select(this)
        .attr('transform', `translate(${x},${y})`)
        .classed('active', false);
    }

    const drag = d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);

    this.els.changes.pipe(
      map(ql => ql.toArray()),
      startWith(this.els.toArray()),
      map(arr => arr.map((er: ElementRef) => er.nativeElement)),
      startWith([]),
      pairwise(),
      map(([a, b]) => b.filter(el => a.indexOf(el) === -1)),
      flatMap(arr => from(arr)),
    ).subscribe(el => {
      d3.select(el).call(drag);
    });
  }

  addElement() {
    this.elements.push(this.fb.group({
      _id: uuid(),
      text: ['New Element', Validators.required],
      color: ['#FFFFFF'],
      font: ['font9x18'],
    }));
  }

  removeElement(index) {
    this.elements.removeAt(index);
  }
}
