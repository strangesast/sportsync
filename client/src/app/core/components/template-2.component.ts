import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

// import 'rxjs/add/operator/startWith';
import { distinctUntilChanged, map, pluck, startWith } from 'rxjs/operators';

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
      <div *ngFor="let element of elements.controls; let i=index" [formGroupName]="i">
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
  <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="width$ | async" [attr.height]="height$ | async">
    <defs>
      <!-- grid -->
      <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.5"/>
      </pattern>
      <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#smallGrid)"/>
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="1"/>
      </pattern>

      <!-- dots -->
      <pattern id="dots" x="0" y="0" width="10px" height="10px" patternUnits="userSpaceOnUse">
        <rect fill="white" width="10" height="10" x="0" y="0"/>
        <circle stroke="none" fill="black" r="4" cx="5" cy="5"/>
      </pattern>
      <mask id="circles-mask" x="0" y="0" width="100%" height="100%" patternUnits="userSpaceOnUse">
        <rect fill="url(#dots)" width="100%" height="100%"/>
      </mask>
    </defs>
    <rect width="100%" height="100%" [attr.fill]="background.value"/>
    <g *ngFor="let element of elements.controls">
      <text
        x="0"
        y="0"
        [attr.font-family]="element.value.font"
        font-size="180"
        text-anchor="start"
        [attr.fill]="element.value.color"
        mask="url(#pattern-mask)"
        alignment-baseline="hanging">
        {{element.value.text}}
      </text>
    </g>
    <rect
      *ngIf="gridType.value == gridTypes.Dots"
      width="100%"
      height="100%"
      [attr.fill]="background.value"
      mask="url(#circles-mask)"/>
    <rect
      *ngIf="gridType.value == gridTypes.Grid"
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
    `
  ],
})
export class Template2Component {
  gridTypes = GridTypes;
  gridTypeValues = Object.keys(GridTypes).filter(k => !isNaN(Number(GridTypes[k])));

  fonts = [
    'font9x18'
  ];

  form = this.fb.group({
    size: this.fb.group({
      width: [128, Validators.required],
      height: [32, Validators.required],
    }),
    gridType: [this.gridTypes.None],
    background: ['#FFFFFF'],
    elements: this.fb.array([
      this.fb.group({
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
    map(v => v * 10)
  );

  height$ = this.size.valueChanges.pipe(
    pluck('height'),
    startWith(this.size.value.height),
    distinctUntilChanged(),
    map(v => v * 10)
  );

  constructor(private fb: FormBuilder) {}

  addElement() {
    this.elements.push(this.fb.group({
      text: ['New Element', Validators.required],
      color: ['#FFFFFF'],
      font: ['font9x18'],
    }));
  }

  removeElement(index) {
    this.elements.removeAt(index);
  }
}
