import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import * as uuid from 'uuid/v4';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { debounceTime, switchMap, takeUntil, tap } from 'rxjs/operators';

import { TemplateViewerCanvasComponent } from './template-viewer-canvas.component';
import { FontSizes, GridTypes, GridTypeValues } from '../models';

@Component({
  selector: 'app-template-form',
  template: `
  <mat-tab-group>
    <mat-tab label="svg">
      <app-template-viewer-svg
        [size]="size.value"
        [gridType]="gridType.value"
        [elements]="elements"
        [background]="background.value">
      </app-template-viewer-svg>
    </mat-tab>
    <mat-tab label="canvas">
      <app-template-viewer-canvas
        [size]="size.value"
        [elements]="elements">
      </app-template-viewer-canvas>
    </mat-tab>
  </mat-tab-group>
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
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
    <div formGroupName="template">
      <div formGroupName="size">
        <label>Board Size</label>
        <mat-form-field>
          <input matInput type="number" placeholder="Width" formControlName="width" min="0">
        </mat-form-field>
        <mat-form-field>
          <input matInput type="number" placeholder="Height" formControlName="height" min="0">
        </mat-form-field>
      </div>
      <mat-accordion formArrayName="elements">
        <mat-expansion-panel *ngFor="let element of elements.controls; let i=index; trackBy: element?.value._id" [formGroupName]="i">
          <mat-expansion-panel-header>
            <label>Element {{ i + 1 }}</label>
          </mat-expansion-panel-header>
          <div>
            <mat-form-field>
              <input matInput type="text" placeholder="Text" formControlName="text">
            </mat-form-field>
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
          <mat-action-row>
            <button type="button" mat-button (click)="removeElement(i)">Remove</button>
          </mat-action-row>
        </mat-expansion-panel>
      </mat-accordion>
      <div class="buttons">
        <button type="button" mat-raised-button (click)="addElement()">Add Element</button>
      </div>
    </div>
  </form>
  `,
  styles: [
    `
    :host {
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }
    mat-radio-button {
      margin: 4px;
    }
    .buttons {
      margin: 10px 0;
    }
    `
  ],
})
export class TemplateFormComponent implements OnDestroy, OnInit {
  destroyed$ = new Subject();

  @ViewChild(TemplateViewerCanvasComponent) canvasViewer: TemplateViewerCanvasComponent;

  gridTypes = GridTypes;
  gridTypeValues = GridTypeValues;

  fonts = Object.keys(FontSizes);

  form = this.fb.group({
    template: this.fb.group({
      size: this.fb.group({
        width: [128, Validators.required],
        height: [32, Validators.required],
      }),
      elements: this.fb.array([]),
    }),
    gridType: [GridTypes.None],
    background: ['#000000'],
  });

  socket$ = new WebSocketSubject(`ws://192.168.1.4:3000/socket`);

  messages$ = this.socket$;

  get template() {
    return this.form.get('template');
  }

  get gridType() {
    return this.form.get('gridType') as FormControl;
  }

  get elements() {
    return this.template.get('elements') as FormArray;
  }

  get background() {
    return this.form.get('background') as FormControl;
  }

  get size() {
    return this.template.get('size');
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

  ngOnInit() {
    this.form.valueChanges.pipe(
      debounceTime(100),
      switchMap(() =>
        this.canvasViewer.getImage().pipe(
          tap(data => {
            this.socket$.next(data);
          }),
        ),
      ),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
