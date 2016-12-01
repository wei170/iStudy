import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { TooltipModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ROUTES }       from './layout.routes';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { Navbar } from './navbar/navbar.component';
import { ChatSidebar } from './chat-sidebar/chat-sidebar.component';
import { ChatMessage } from './chat-sidebar/chat-message/chat-message.component';
import { SearchPipe } from './pipes/search.pipe';
import { NotificationLoad } from './notifications/notifications-load.directive';
import { Notifications } from './notifications/notifications.component';

// iStudy
import { ProfileService, UserService, FriendService, AlertService, PopupService } from '../_services/index';
import { AuthGuard } from '../_guards/index'
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    ROUTES,
    FormsModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  declarations: [
    Layout,
    Sidebar,
    Navbar,
    ChatSidebar,
    SearchPipe,
    Notifications,
    NotificationLoad,
    ChatMessage

    // Guocheng's work
  ],
  providers: [
    ProfileService,
    UserService,
    FriendService,
    AlertService,
    AuthGuard,
    PopupService

    // Other dev npm files
  ]
})
export default class LayoutModule {
}
