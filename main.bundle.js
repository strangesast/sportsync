webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/core/components/template-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uuid_v4__ = __webpack_require__("../../../../uuid/v4.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_dom_WebSocketSubject__ = __webpack_require__("../../../../rxjs/_esm5/observable/dom/WebSocketSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__template_viewer_canvas_component__ = __webpack_require__("../../../../../src/app/core/components/template-viewer-canvas.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models__ = __webpack_require__("../../../../../src/app/core/models/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TemplateFormComponent = /** @class */ (function () {
    function TemplateFormComponent(fb) {
        this.fb = fb;
        this.destroyed$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["b" /* Subject */]();
        this.gridTypes = __WEBPACK_IMPORTED_MODULE_7__models__["c" /* GridTypes */];
        this.gridTypeValues = __WEBPACK_IMPORTED_MODULE_7__models__["b" /* GridTypeValues */];
        this.fonts = Object.keys(__WEBPACK_IMPORTED_MODULE_7__models__["a" /* FontSizes */]);
        this.form = this.fb.group({
            template: this.fb.group({
                size: this.fb.group({
                    width: [128, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
                    height: [32, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
                }),
                elements: this.fb.array([]),
            }),
            gridType: [__WEBPACK_IMPORTED_MODULE_7__models__["c" /* GridTypes */].None],
            background: ['#000000'],
        });
        this.socket$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_observable_dom_WebSocketSubject__["a" /* WebSocketSubject */]("ws://192.168.1.4:3000/socket");
        this.messages$ = this.socket$;
        this.addElement();
    }
    Object.defineProperty(TemplateFormComponent.prototype, "template", {
        get: function () {
            return this.form.get('template');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateFormComponent.prototype, "gridType", {
        get: function () {
            return this.form.get('gridType');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateFormComponent.prototype, "elements", {
        get: function () {
            return this.template.get('elements');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateFormComponent.prototype, "background", {
        get: function () {
            return this.form.get('background');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateFormComponent.prototype, "size", {
        get: function () {
            return this.template.get('size');
        },
        enumerable: true,
        configurable: true
    });
    TemplateFormComponent.prototype.addElement = function () {
        this.elements.push(this.fb.group({
            _id: __WEBPACK_IMPORTED_MODULE_2_uuid_v4__(),
            x: [0],
            y: [0],
            text: ['New Element', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            color: ['#FFFFFF'],
            font: ['font9x18'],
        }));
    };
    TemplateFormComponent.prototype.removeElement = function (index) {
        this.elements.removeAt(index);
    };
    TemplateFormComponent.prototype.handleImage = function (obs) {
        obs.subscribe(console.log.bind(console));
    };
    TemplateFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form.valueChanges.pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["a" /* debounceTime */])(100), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["f" /* switchMap */])(function () {
            return _this.canvasViewer.getImage().pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["h" /* tap */])(function (data) {
                _this.socket$.next(data);
            }));
        }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["g" /* takeUntil */])(this.destroyed$)).subscribe();
    };
    TemplateFormComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_6__template_viewer_canvas_component__["a" /* TemplateViewerCanvasComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__template_viewer_canvas_component__["a" /* TemplateViewerCanvasComponent */])
    ], TemplateFormComponent.prototype, "canvasViewer", void 0);
    TemplateFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-template-form',
            template: "\n  <mat-tab-group>\n    <mat-tab label=\"svg\">\n      <app-template-viewer-svg\n        [size]=\"size.value\"\n        [gridType]=\"gridType.value\"\n        [elements]=\"elements\"\n        [background]=\"background.value\">\n      </app-template-viewer-svg>\n    </mat-tab>\n    <mat-tab label=\"canvas\">\n      <app-template-viewer-canvas\n        [size]=\"size.value\"\n        [elements]=\"elements\">\n      </app-template-viewer-canvas>\n    </mat-tab>\n  </mat-tab-group>\n  <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n    <mat-accordion>\n      <mat-expansion-panel>\n        <mat-expansion-panel-header>\n          Display Settings\n        </mat-expansion-panel-header>\n        <div>\n          <mat-radio-group formControlName=\"gridType\">\n            <mat-radio-button *ngFor=\"let type of gridTypeValues\" [value]=\"gridTypes[type]\">{{ type }}</mat-radio-button>\n          </mat-radio-group>\n        </div>\n        <div>\n          <mat-radio-group formControlName=\"background\">\n            <mat-radio-button value=\"#000000\">Dark</mat-radio-button>\n            <mat-radio-button value=\"#FFFFFF\">Light</mat-radio-button>\n          </mat-radio-group>\n        </div>\n      </mat-expansion-panel>\n    </mat-accordion>\n    <div formGroupName=\"template\">\n      <mat-accordion>\n        <mat-expansion-panel formGroupName=\"size\">\n          <mat-expansion-panel-header>\n            Board Size\n          </mat-expansion-panel-header>\n          <div>\n            <label>Board Size</label>\n            <mat-form-field>\n              <input matInput type=\"number\" placeholder=\"Width\" formControlName=\"width\" min=\"0\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput type=\"number\" placeholder=\"Height\" formControlName=\"height\" min=\"0\">\n            </mat-form-field>\n          </div>\n        </mat-expansion-panel>\n      </mat-accordion>\n      <mat-accordion formArrayName=\"elements\">\n        <mat-expansion-panel *ngFor=\"let element of elements.controls; let i=index; trackBy: element?.value._id\" [formGroupName]=\"i\">\n          <mat-expansion-panel-header>\n            <label>Element {{ i + 1 }}</label>\n          </mat-expansion-panel-header>\n          <div>\n            <mat-form-field>\n              <input matInput type=\"text\" placeholder=\"Text\" formControlName=\"text\">\n            </mat-form-field>\n            <label>Color</label>\n            <input formControlName=\"color\" type=\"color\">\n            <mat-form-field>\n              <mat-select placeholder=\"Font\" formControlName=\"font\">\n                <mat-option *ngFor=\"let font of fonts\" [attr.font-family]=\"font\" [value]=\"font\">\n                  {{ font }}\n                </mat-option>\n              </mat-select>\n            </mat-form-field>\n          </div>\n          <div>\n            <mat-form-field>\n              <input matInput type=\"number\" placeholder=\"x\" step=\"1\" formControlName=\"x\">\n            </mat-form-field>\n            <mat-form-field>\n              <input matInput type=\"number\" placeholder=\"y\" step=\"1\" formControlName=\"y\">\n            </mat-form-field>\n          </div>\n          <mat-action-row>\n            <button type=\"button\" mat-button (click)=\"removeElement(i)\">Remove</button>\n          </mat-action-row>\n        </mat-expansion-panel>\n      </mat-accordion>\n      <div class=\"buttons\">\n        <button type=\"button\" mat-raised-button (click)=\"addElement()\">Add Element</button>\n      </div>\n    </div>\n  </form>\n  ",
            styles: [
                "\n    :host {\n      font-family: Roboto, \"Helvetica Neue\", sans-serif;\n    }\n    mat-radio-button {\n      margin: 4px;\n    }\n    .buttons {\n      margin: 10px 0;\n    }\n    mat-accordion {\n      display: block;\n      margin-bottom: 16px;\n    }\n    "
            ],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]])
    ], TemplateFormComponent);
    return TemplateFormComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/components/template-viewer-canvas.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateViewerCanvasComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__ = __webpack_require__("../../../../rxjs/_esm5/ReplaySubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TemplateViewerCanvasComponent = /** @class */ (function () {
    function TemplateViewerCanvasComponent(fb, ref) {
        var _this = this;
        this.fb = fb;
        this.ref = ref;
        this.elements$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_ReplaySubject__["a" /* ReplaySubject */](1);
        this.destroyed$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["b" /* Subject */]();
        this.elementsUpdatesSub = this.elements$.pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["f" /* switchMap */])(function (elements) { return elements.valueChanges.pipe(Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["e" /* startWith */])(elements.value)); }), Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["a" /* debounceTime */])(50), Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["h" /* tap */])(function () { return _this.draw({}); }), Object(__WEBPACK_IMPORTED_MODULE_7_rxjs_operators__["g" /* takeUntil */])(this.destroyed$)).subscribe();
        this.fontSizes = {
            'font9x18': { width: 9, base: 18, adj: 0, x: -1.0, y: -3.6 },
            'font6x12': { width: 6, base: 12, adj: 0, x: 0.0, y: -3.4 },
            'font10x20': { width: 10, base: 20, adj: 0, x: -1.0, y: -3.0 },
            // 'font5x7':   { width: 5,  base: 7,  adj: 0.45, x: -1.1, y:  0.2 },
            'font6x13O': { width: 6, base: 13, adj: 0, x: -1.0, y: -1.6 },
            'font4x6': { width: 4, base: 6, adj: 0, x: 0.0, y: -0.2 },
        };
        this.fonts = Object.keys(this.fontSizes);
        this.background = '#000000';
        this.size = { width: 0, height: 0 };
    }
    TemplateViewerCanvasComponent.prototype.ngAfterViewInit = function () {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.draw();
    };
    TemplateViewerCanvasComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.elements) {
            this.elements$.next(changes.elements.currentValue);
        }
        this.draw(changes);
    };
    TemplateViewerCanvasComponent.prototype.draw = function (changes) {
        var ctx = this.ctx;
        if (!ctx) {
            return;
        }
        var _a = this.size, width = _a.width, height = _a.height;
        if (!changes || changes.size) {
            var scale = 10;
            this.canvas.nativeElement.width = width * scale;
            this.canvas.nativeElement.height = height * scale;
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(10, 10);
        ctx.fillStyle = this.background || '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        for (var _i = 0, _b = this.elements.value; _i < _b.length; _i++) {
            var element = _b[_i];
            var fontSize = this.fontSizes[element.font];
            ctx.textAlign = 'start';
            ctx.textBaseline = 'top';
            ctx.font = fontSize.base + fontSize.adj + "px " + element.font;
            ctx.fillStyle = element.color;
            ctx.fillText(element.text, (element.x || 0) + fontSize.x, (element.y || 0) + fontSize.y);
        }
    };
    TemplateViewerCanvasComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    TemplateViewerCanvasComponent.prototype.getImage = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            var image = new Image();
            var _a = _this.size, width = _a.width, height = _a.height;
            _this.out.nativeElement.setAttribute('width', width);
            _this.out.nativeElement.setAttribute('height', height);
            image.onload = function () {
                _this.out.nativeElement.getContext('2d').drawImage(image, 0, 0, width, height);
                var fn = function (canvas, cb) {
                    canvas.toBlob(cb);
                };
                _this.out.nativeElement.toBlob(function (blob) {
                    observer.next(blob);
                    observer.complete();
                });
            };
            image.src = _this.canvas.nativeElement.toDataURL();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('canvas', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TemplateViewerCanvasComponent.prototype, "canvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('out', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TemplateViewerCanvasComponent.prototype, "out", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], TemplateViewerCanvasComponent.prototype, "background", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */])
    ], TemplateViewerCanvasComponent.prototype, "elements", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], TemplateViewerCanvasComponent.prototype, "size", void 0);
    TemplateViewerCanvasComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-template-viewer-canvas',
            template: "\n  <canvas\n    #out\n    class=\"hidden\">\n  </canvas>\n  <canvas\n    #canvas\n    class=\"pixelated\">\n  </canvas>\n  ",
            styles: [
                "\n  :host {\n    display: block;\n  }\n  canvas.hidden {\n    display: none;\n  }\n  canvas.pixelated {\n    image-rendering: pixelated;\n  }\n  "
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */]])
    ], TemplateViewerCanvasComponent);
    return TemplateViewerCanvasComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/components/template-viewer-svg.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateViewerSVGComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__ = __webpack_require__("../../../../rxjs/_esm5/observable/from.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operators__ = __webpack_require__("../../../../rxjs/_esm5/operators.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models__ = __webpack_require__("../../../../../src/app/core/models/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TemplateViewerSVGComponent = /** @class */ (function () {
    function TemplateViewerSVGComponent(fb) {
        this.fb = fb;
        this.gridTypes = __WEBPACK_IMPORTED_MODULE_5__models__["c" /* GridTypes */];
        this.fontSizes = __WEBPACK_IMPORTED_MODULE_5__models__["a" /* FontSizes */];
        this.fonts = Object.keys(__WEBPACK_IMPORTED_MODULE_5__models__["a" /* FontSizes */]);
        this.size = { width: 0, height: 0 };
        this.background = '#FFFFFF';
    }
    TemplateViewerSVGComponent.prototype.resetTransform = function () {
        this.svgSelection.call(this.zoom.transform, __WEBPACK_IMPORTED_MODULE_2_d3__["e" /* zoomIdentity */]);
    };
    TemplateViewerSVGComponent.prototype.ngAfterViewInit = function () {
        var elements = this.elements;
        var svgSelection = __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](this.svg.nativeElement);
        this.svgSelection = svgSelection;
        var svg = this.svgSelection.select('g');
        var pt = this.svgSelection.node().createSVGPoint();
        var pos = [0, 0];
        var dragging = false;
        function addBounds(sel) {
            var _a = sel.node().getBBox(), width = _a.width, height = _a.height;
            sel.selectAll('rect')
                .data([null])
                .enter()
                .append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('fill', 'rgba(0, 0, 0, 0.1)')
                .attr('stroke', 'blue');
        }
        function removeBounds(sel) {
            sel.selectAll('rect').remove();
        }
        function zoomed() {
            svg.attr('transform', __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].transform);
        }
        var drag = __WEBPACK_IMPORTED_MODULE_2_d3__["a" /* drag */]()
            .on('start', function () {
            dragging = true;
            __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](this).call(addBounds);
        })
            .on('drag', function () {
            var _a = [__WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].x, __WEBPACK_IMPORTED_MODULE_2_d3__["b" /* event */].y], x = _a[0], y = _a[1];
            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            pos = [x, y];
            __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](this).attr('transform', "translate(" + x + "," + y + ")");
        })
            .on('end', function () {
            var _this = this;
            dragging = false;
            pos = pos.map(function (v) { return Math.round(v); });
            var x = pos[0], y = pos[1];
            var control = elements.controls.find(function (_control) { return _control.get('_id').value === _this.id; });
            control.patchValue({ x: x, y: y });
            __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](this).call(removeBounds);
        });
        this.zoom = __WEBPACK_IMPORTED_MODULE_2_d3__["d" /* zoom */]().on('zoom', zoomed);
        this.svgSelection.call(this.zoom);
        this.els.changes.pipe(
        // get list of dom elements
        Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* map */])(function (ql) { return ql.toArray(); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["e" /* startWith */])(this.els.toArray()), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* map */])(function (arr) { return arr.map(function (er) { return er.nativeElement; }); }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["e" /* startWith */])([]), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["d" /* pairwise */])(), 
        // get new elements
        Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["c" /* map */])(function (_a) {
            var a = _a[0], b = _a[1];
            return b.filter(function (el) { return a.indexOf(el) === -1; });
        }), Object(__WEBPACK_IMPORTED_MODULE_4_rxjs_operators__["b" /* flatMap */])(function (arr) { return Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_from__["a" /* from */])(arr); })).subscribe(function (el) {
            __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](el)
                .call(drag)
                .on('mouseenter', function () {
                if (!dragging) {
                    __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](this).call(addBounds);
                }
            })
                .on('mouseleave', function () {
                if (!dragging) {
                    __WEBPACK_IMPORTED_MODULE_2_d3__["c" /* select */](this).call(removeBounds);
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* ViewChild */])('svgElement'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TemplateViewerSVGComponent.prototype, "svg", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* ViewChildren */])('els'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* QueryList */])
    ], TemplateViewerSVGComponent.prototype, "els", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], TemplateViewerSVGComponent.prototype, "size", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Number)
    ], TemplateViewerSVGComponent.prototype, "gridType", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormArray */])
    ], TemplateViewerSVGComponent.prototype, "elements", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Object)
    ], TemplateViewerSVGComponent.prototype, "background", void 0);
    TemplateViewerSVGComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-template-viewer-svg',
            template: "\n  <svg\n    #svgElement\n    xmlns=\"http://www.w3.org/2000/svg\"\n    [attr.viewBox]=\"[0, 0, size.width || 0, size.height || 0].join(' ')\">\n    <defs>\n      <!-- grid -->\n      <pattern id=\"smallGrid\" width=\"1\" height=\"1\" patternUnits=\"userSpaceOnUse\">\n        <path d=\"M 1 0 L 0 0 0 1\" fill=\"none\" stroke=\"gray\" stroke-width=\"0.05\"/>\n      </pattern>\n      <pattern id=\"grid\" width=\"10\" height=\"10\" patternUnits=\"userSpaceOnUse\">\n        <rect width=\"10\" height=\"10\" fill=\"url(#smallGrid)\"/>\n        <path d=\"M 10 0 L 0 0 0 10\" fill=\"none\" stroke=\"gray\" stroke-width=\"0.1\"/>\n      </pattern>\n\n      <!-- dots -->\n      <pattern id=\"dots\" x=\"0\" y=\"0\" width=\"1\" height=\"1\" patternUnits=\"userSpaceOnUse\">\n        <rect fill=\"white\" width=\"1\" height=\"1\" x=\"0\" y=\"0\"/>\n        <circle stroke=\"none\" fill=\"black\" r=\"0.4\" cx=\"0.5\" cy=\"0.5\"/>\n      </pattern>\n      <mask id=\"circles-mask\" x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" patternUnits=\"userSpaceOnUse\">\n        <rect fill=\"url(#dots)\" width=\"100%\" height=\"100%\"/>\n      </mask>\n    </defs>\n    <g>\n      <text x=\"0\" y=\"-1\" font-size=\"10\" fill=\"#999\">Board 1</text>\n      <rect [attr.width]=\"size.width\" [attr.height]=\"size.height\" [attr.fill]=\"background\"/>\n      <g\n        #els\n        *ngFor=\"let element of elements.controls; trackBy: element?.value._id\"\n        [attr.id]=\"element.value._id\"\n        [attr.transform]=\"'translate(' + (element.value.x || 0) + ',' + (element.value.y || 0) + ')'\">\n        <text\n          [attr.transform]=\"fontSizes[element.value.font].adj\"\n          [attr.font-family]=\"element.value.font\"\n          [attr.font-size]=\"fontSizes[element.value.font].size\"\n          text-anchor=\"start\"\n          [attr.fill]=\"element.value.color\"\n          mask=\"url(#pattern-mask)\"\n          alignment-baseline=\"hanging\">\n          {{element.value.text}}\n        </text>\n      </g>\n      <rect\n        *ngIf=\"gridType == gridTypes.Dots\"\n        class=\"noselect\"\n        [attr.width]=\"size.width\"\n        [attr.height]=\"size.height\"\n        [attr.fill]=\"background\"\n        mask=\"url(#circles-mask)\"/>\n      <rect\n        *ngIf=\"gridType == gridTypes.Grid\"\n        class=\"noselect\"\n        [attr.width]=\"size.width\"\n        [attr.height]=\"size.height\"\n        fill=\"url(#grid)\"/>\n    </g>\n  </svg>\n  <div class=\"buttons\">\n    <button mat-raised-button type=\"button\" (click)=\"resetTransform()\">Reset Transform</button>\n  </div>\n    ",
            styles: [
                "\n    :host {\n      display: block;\n    }\n    .noselect {\n      user-select: none;\n      pointer-events: none;\n    }\n    svg g text {\n      cursor: pointer;\n    }\n    .buttons {\n      margin: 16px 0;\n    }\n    "
            ],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]])
    ], TemplateViewerSVGComponent);
    return TemplateViewerSVGComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/containers/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: "\n  <mat-sidenav-container>\n    <mat-sidenav></mat-sidenav>\n    <mat-sidenav-content>\n      <router-outlet></router-outlet>\n    </mat-sidenav-content>\n  </mat-sidenav-container>\n  ",
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/containers/template-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplatePageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TemplatePageComponent = /** @class */ (function () {
    function TemplatePageComponent() {
    }
    TemplatePageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-template-page',
            template: "\n  <mat-toolbar>\n    <span>Template Page</span>\n  </mat-toolbar>\n  <app-template-form></app-template-form>\n  ",
            styles: []
        })
    ], TemplatePageComponent);
    return TemplatePageComponent;
}());



/***/ }),

/***/ "../../../../../src/app/core/core.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoreModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__material_material_module__ = __webpack_require__("../../../../../src/app/material/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__containers_app_component__ = __webpack_require__("../../../../../src/app/core/containers/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__containers_template_page_component__ = __webpack_require__("../../../../../src/app/core/containers/template-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_template_viewer_canvas_component__ = __webpack_require__("../../../../../src/app/core/components/template-viewer-canvas.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_template_viewer_svg_component__ = __webpack_require__("../../../../../src/app/core/components/template-viewer-svg.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_template_form_component__ = __webpack_require__("../../../../../src/app/core/components/template-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__routes__ = __webpack_require__("../../../../../src/app/core/routes.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["i" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__routes__["a" /* routes */]),
                __WEBPACK_IMPORTED_MODULE_4__material_material_module__["a" /* MaterialModule */],
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__containers_app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__containers_template_page_component__["a" /* TemplatePageComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_template_form_component__["a" /* TemplateFormComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_template_viewer_svg_component__["a" /* TemplateViewerSVGComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_template_viewer_canvas_component__["a" /* TemplateViewerCanvasComponent */],
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__containers_app_component__["a" /* AppComponent */]]
        })
    ], CoreModule);
    return CoreModule;
}());



/***/ }),

/***/ "../../../../../src/app/core/models/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return GridTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GridTypeValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FontSizes; });
var GridTypes;
(function (GridTypes) {
    GridTypes[GridTypes["None"] = 0] = "None";
    GridTypes[GridTypes["Dots"] = 1] = "Dots";
    GridTypes[GridTypes["Grid"] = 2] = "Grid";
})(GridTypes || (GridTypes = {}));
var GridTypeValues = Object.keys(GridTypes).filter(function (k) { return !isNaN(Number(GridTypes[k])); });
var FontSizes = {
    'font9x18': { size: 18, adj: "translate(" + (0.01 - 1) + "," + (0.21 - 1) + ")" },
    'font6x12': { size: 12, adj: "translate(" + 0 + "," + -1.35 + ")" },
    'font10x20': { size: 20, adj: "translate(" + -1 + "," + 0.2 + ")" },
    'font6x13O': { size: 13, adj: "translate(" + 0 + "," + 0.4 + ") scale(1.0015)" },
    'font4x6': { size: 6, adj: "translate(" + 0 + "," + 0.8 + ") scale(1.001)" },
    'font5x7': { size: 7, adj: "translate(" + 0 + "," + 0.8 + ") scale(1.0005)" },
    'font5x8': { size: 8, adj: "translate(" + 0 + "," + 0.60 + ")" },
    'font6x10': { size: 10, adj: "translate(" + 0 + "," + 0.6 + ")" },
};


/***/ }),

/***/ "../../../../../src/app/core/routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__containers_template_page_component__ = __webpack_require__("../../../../../src/app/core/containers/template-page.component.ts");

var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'template' },
    { path: 'template', component: __WEBPACK_IMPORTED_MODULE_0__containers_template_page_component__["a" /* TemplatePageComponent */] },
];


/***/ }),

/***/ "../../../../../src/app/material/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MODULES = [
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MatButtonModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatCardModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCheckboxModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatFormFieldModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatInputModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatRadioModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatSelectModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatSidenavModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatToolbarModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MatTabsModule */],
    __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatExpansionModule */],
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModule */])({
            imports: MODULES,
            exports: MODULES,
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_core_core_module__ = __webpack_require__("../../../../../src/app/core/core.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_core_core_module__["a" /* CoreModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map