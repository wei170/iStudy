//import 'messenger/build/js/messenger.js';
import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications'
// declare var jQuery: any;
// declare var Messenger: any;

@Injectable()
export class AlertService {
    // success(message: string) {
    //     Messenger().post({
    //         message: message,
    //         type: 'success',
    //         showCloseButton: true
    //     });
    //     return false;
    // }

    // error(message: string) {
    //     let i;

    //     i = 0;

    //     Messenger().run({
    //         errorMessage: 'Error destroying alien planet',
    //         successMessage: 'Alien planet destroyed!',
    //         action: function(opts): any {
    //         if (++i < 3) {
    //             return opts.error({
    //             status: 500,
    //             readyState: 0,
    //             responseText: 0
    //             });
    //         } else {
    //             return opts.success();
    //         }
    //         }
    //     });
    //     return false;
    // }

    // info(message: string) {
    //   let msg = Messenger().post({
    //     message: message,
    //     actions: {
    //       cancel: {
    //         label: 'cancel launch',
    //         action: function(): any {
    //           return msg.update({
    //             message: 'Thermonuclear war averted',
    //             type: 'success',
    //             actions: false
    //           });
    //         }
    //       }
    //     }
    //   });

    //   return false;
    // }
    constructor( private _service: NotificationsService ) {}

    success(message: string = "Oh yeah!") {
        this._service.success("Success", message, {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true     
        })
    }

    successWT(title:string, message: string = "Oh yeah!") {
        this._service.success(title, message, {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true     
        })
    }

    error(message: string = "There is an error!") {
        this._service.error("Error", message, {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
        })
    }

    info(message: string = "Ther is an info") {
        this._service.info("Info", message, {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
        })
    }
}
