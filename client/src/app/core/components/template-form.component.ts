import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import * as uuid from 'uuid/v4';

import { GridTypes, GridTypeValues } from '../models';

@Component({
  selector: 'app-template-form',
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
    <button type="button" mat-raised-button (click)="handleImage(canvas.getImage())">Save Image</button>
  </form>
  <app-template-viewer-svg
    [size]="size.value"
    [gridType]="gridType.value"
    [elements]="elements"
    [background]="background.value">
  </app-template-viewer-svg>
  <app-template-viewer-canvas
    #canvas
    [size]="size.value"
    [elements]="elements">
  </app-template-viewer-canvas>
  `,
  styles: [
    `
    host {
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }
    mat-radio-button {
      margin: 4px;
    }
    `
  ],
})
export class TemplateFormComponent {

  gridTypes = GridTypes;
  gridTypeValues = GridTypeValues;

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
    gridType: [GridTypes.Grid],
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

  get size() {
    return this.form.get('size');
  }

  constructor(private fb: FormBuilder) {
    this.addElement();
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

  handleImage(obs) {
    obs.subscribe(console.log.bind(console));
  }
}
