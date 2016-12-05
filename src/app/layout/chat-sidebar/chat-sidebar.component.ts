import { Component, OnInit, ElementRef } from '@angular/core';
import { ChatService, FriendService } from '../../_services/index';
declare var jQuery: any;
declare var Hammer: any;

@Component({
  selector: '[chat-sidebar]',
  templateUrl: './chat-sidebar.template.html'
})
export class ChatSidebar implements OnInit {
  conversations: ChatService;
  newMessage: string = '';
  chatMessageOpened: boolean = false;
  friendList: any[];
  activeFriendName: string;
  $el: any;

  constructor(el: ElementRef, private friendService: FriendService) {
    this.conversations = new ChatService();
    this.$el = jQuery(el.nativeElement);
  }

  openConversation(f): void {
    this.activeFriendName = f.userName;
            console.log(this.activeFriendName);
    this.chatMessageOpened = true;
  }

  deactivateLink(e): void {
    jQuery(e.currentTarget).removeClass('active').find('.badge').remove();
  }

  initChatSidebarScroll(): void {
    let $sidebarContent = jQuery('.chat-sidebar-contacts', this.$el);
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      width: '',
      size: '4px'
    });
  }

  enableSwipeCollapsing(): void {
    let $chatContainer = jQuery('layout');
    let chatSidebarSwipe = new Hammer(document.getElementById('content-wrap'));

    chatSidebarSwipe.on('swipeleft', () => {
      if ($chatContainer.is('.nav-collapsed')) {
        $chatContainer.addClass('chat-sidebar-opened');
      }
    });

    chatSidebarSwipe.on('swiperight', () => {
      setTimeout(() => {
        if ($chatContainer.is('.chat-sidebar-opened')) {
          $chatContainer.removeClass('chat-sidebar-opened');
        }
      });
    });
  }

  ngOnInit(): void {
    this.friendService.getFriends(JSON.parse(localStorage.getItem('currentUser')).userName).subscribe(
      data => { 
        this.friendList = data;
        this.activeFriendName = this.friendList[0].userName;
      }
    );

    jQuery('layout').addClass('chat-sidebar-container');

    if ('ontouchstart' in window) {
      this.enableSwipeCollapsing();
    }

    jQuery(window).on('sn:resize', this.initChatSidebarScroll.bind(this));
    this.initChatSidebarScroll();
  }
}
