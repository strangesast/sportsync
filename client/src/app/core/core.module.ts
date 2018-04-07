import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app.component';

import { TemplatePageComponent } from './containers/template-page.component';
import { TemplateListComponent } from './containers/template-list.component';

import { TemplateViewerCanvasComponent } from './components/template-viewer-canvas.component';
import { TemplateViewerSVGComponent } from './components/template-viewer-svg.component';
import { TemplateFormComponent } from './components/template-form.component';

import { TemplatesLoadGuard } from './guards/templates-load.guard';
import { TemplateLoadGuard } from './guards/template-load.guard';

import { BoardTemplateService } from './services/board-template.service';

import { routes } from './routes';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    TemplatePageComponent,
    TemplateFormComponent,
    TemplateViewerSVGComponent,
    TemplateViewerCanvasComponent,
    TemplateListComponent,
  ],
  providers: [
    TemplatesLoadGuard,
    TemplateLoadGuard,
    BoardTemplateService,
  ],
  bootstrap: [AppComponent]
})
export class CoreModule { }
