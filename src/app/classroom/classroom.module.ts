import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';

import { Classroom } from './classroom.component';

import { MaterialModule } from '@angular/material';
import { ClassroomService, CourseService, PopupService } from '../_services/index';

export const routes = [
  {path: '', component: Classroom, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Classroom
  ],
  imports: [
    CommonModule,
    FormsModule,
    Select2Module,
    RouterModule.forChild(routes),
    MaterialModule.forRoot()
  ],
  providers: [
    ClassroomService, 
    CourseService,
    PopupService
  ]
})
export default class FormModule {
  static routes = routes;
}
