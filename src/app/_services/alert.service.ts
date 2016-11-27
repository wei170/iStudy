import { Directive, ElementRef, Input } from '@angular/core';
declare var jQuery: any;
declare var Messenger: any;

export class AlertService {

    constructor() {}

    ngOnInit() {
    }

    success(message: string) {
        Messenger().post({
            message: message,
            type: 'success',
            showCloseButton: true
        });
        return false;
    }

    error(message: string) {
        var i;
        Messenger().run({
            errorMessage: message,
            action: function(opts): any {
                if (++i < 3) {
                    return opts.error({
                    status: 500,
                    readyState: 0,
                    responseText: 0
                    });
                } else {
                    return opts.success();
                }
            }
        });
        return false;
    }

    info(message: string) {
      let msg = Messenger().post({
        message: 'Launching thermonuclear war...',
        actions: {
          cancel: {
            label: 'cancel launch',
            action: function(): any {
              return msg.update({
                message: 'Thermonuclear war averted',
                type: 'success',
                actions: false
              });
            }
          }
        }
      });

      return false;
    }
}
