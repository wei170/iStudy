/**
* plunker version
* (based on systemjs.config.js in angular.io)
* system configuration for angular 2 samples
* adjust as necessary for your application needs.
*/
(function (global) {
    System.config({
        // demo only! real code should not transpile in the browser
        transpiler: 'ts',
        typescriptoptions: {
            tsconfig: true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        paths: {
            'npm:': 'node_modules/',
        },
        // map tells the system loader where to look for things
        map: {
            // our app is within the app folder
            app: 'client',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

            // other libraries
            'rxjs':                       'npm:rxjs',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'ts':                         'npm:plugin-typescript@4.0.10/lib/plugin.js',
            'typescript':                 'npm:typescript@2.0.2/lib/typescript.js',
            'rmp-api':                    'npm:rmp-api/index.js'
        },
        // packages tells the system loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultextension: 'js'
            },
            rxjs: {
                defaultextension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultextension: 'js'
            },
        }
    });
})(this);
