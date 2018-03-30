import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as uuid from 'uuid/v4';
import * as d3 from 'd3';
import { Selection, ZoomBehavior } from 'd3';

import { from } from 'rxjs/observable/from';
import { distinctUntilChanged, filter, flatMap, map, pairwise, pluck, startWith } from 'rxjs/operators';

import { GridTypes, GridTypeValues, FontSizes } from '../models';

@Component({
  selector: 'app-template-viewer-svg',
  template: `
  <svg
    #svgElement
    xmlns="http://www.w3.org/2000/svg"
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
      <rect [attr.width]="size.width" [attr.height]="size.height" [attr.fill]="background"/>
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
        *ngIf="gridType == gridTypes.Dots"
        class="noselect"
        [attr.width]="size.width"
        [attr.height]="size.height"
        [attr.fill]="background"
        mask="url(#circles-mask)"/>
      <rect
        *ngIf="gridType == gridTypes.Grid"
        class="noselect"
        [attr.width]="size.width"
        [attr.height]="size.height"
        fill="url(#grid)"/>
    </g>
  </svg>
  <button mat-raised-button type="button" (click)="resetTransform()">Reset Transform</button>
    `,
  styles: [
    `
    :host {
      display: block;
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
export class TemplateViewerSVGComponent implements AfterViewInit {
  @ViewChild('svgElement') svg: ElementRef;
  svgSelection: Selection<SVGElement, {}, HTMLElement, any>;
  zoom: ZoomBehavior<Element, {}>;

  @ViewChildren('els') els: QueryList<any>;

  gridTypes = GridTypes;

  fontSizes = FontSizes;
  fonts = Object.keys(FontSizes);

  @Input() size = { width: 0, height: 0 };

  @Input() gridType: GridTypes;

  @Input() elements: FormArray;

  @Input() background = '#FFFFFF';

  constructor(private fb: FormBuilder) {}

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
      // get list of dom elements
      map(ql => ql.toArray()),
      startWith(this.els.toArray()),
      map(arr => arr.map((er: ElementRef) => er.nativeElement)),
      startWith([]),
      pairwise(),
      // get new elements
      map(([a, b]) => b.filter(el => a.indexOf(el) === -1)),
      flatMap(arr => from(arr)),
    ).subscribe(el => {
      d3.select(el)
        .call(drag)
        .on('mouseenter', function() {
          console.log('enter');
        })
        .on('mouseleave', function() {
          console.log('leave');
        });
    });
  }
}
