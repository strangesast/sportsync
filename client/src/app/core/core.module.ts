import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app.component';

import { TemplatePageComponent } from './containers/template-page.component';

import { TemplateViewerCanvasComponent } from './components/template-viewer-canvas.component';
import { TemplateViewerSVGComponent } from './components/template-viewer-svg.component';
import { TemplateFormComponent } from './components/template-form.component';

import { routes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    TemplatePageComponent,
    TemplateFormComponent,
    TemplateViewerSVGComponent,
    TemplateViewerCanvasComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class CoreModule { }
