import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './containers/app.component';

import { TemplatePageComponent } from './containers/template-page.component';

import { Template1Component } from './components/template-1.component';
import { Template2Component } from './components/template-2.component';

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
    Template1Component,
    Template2Component,
    TemplatePageComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class CoreModule { }
