import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';

import { Classroom } from './classroom.component';
import { Chat } from './chat/chat.component'

import { MaterialModule } from '@angular/material';
import { ClassroomService, CourseService, PopupService, ChatService, GroupService } from '../_services/index';

export const routes = [
  {path: '', component: Classroom, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    Classroom,
    Chat
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
    PopupService,
    ChatService,
    GroupService
  ]
})
export default class FormModule {
  static routes = routes;
}
