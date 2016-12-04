webpackJsonpac__name_([18],{

/***/ "./node_modules/ng2-table/components/ng-table-directives.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var ng_table_component_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table.component.js");
var ng_table_filtering_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-filtering.directive.js");
var ng_table_paging_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-paging.directive.js");
var ng_table_sorting_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-sorting.directive.js");
exports.NG_TABLE_DIRECTIVES = [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective];
//# sourceMappingURL=ng-table-directives.js.map

/***/ },

/***/ "./node_modules/ng2-table/components/ng-table-module.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var ng_table_component_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table.component.js");
var ng_table_filtering_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-filtering.directive.js");
var ng_table_paging_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-paging.directive.js");
var ng_table_sorting_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-sorting.directive.js");
var Ng2TableModule = (function () {
    function Ng2TableModule() {
    }
    Ng2TableModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective],
            exports: [ng_table_component_1.NgTableComponent, ng_table_filtering_directive_1.NgTableFilteringDirective, ng_table_paging_directive_1.NgTablePagingDirective, ng_table_sorting_directive_1.NgTableSortingDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2TableModule);
    return Ng2TableModule;
}());
exports.Ng2TableModule = Ng2TableModule;
//# sourceMappingURL=ng-table-module.js.map

/***/ },

/***/ "./node_modules/ng2-table/components/table/ng-table-filtering.directive.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
// import {setProperty} from 'angular2/ts/src/core/forms/directives/shared';
function setProperty(renderer, elementRef, propName, propValue) {
    renderer.setElementProperty(elementRef, propName, propValue);
}
var NgTableFilteringDirective = (function () {
    function NgTableFilteringDirective(element, renderer) {
        this.ngTableFiltering = {
            filterString: '',
            columnName: 'name'
        };
        this.tableChanged = new core_1.EventEmitter();
        this.element = element;
        this.renderer = renderer;
        // Set default value for filter
        setProperty(this.renderer, this.element, 'value', this.ngTableFiltering.filterString);
    }
    Object.defineProperty(NgTableFilteringDirective.prototype, "config", {
        get: function () {
            return this.ngTableFiltering;
        },
        set: function (value) {
            this.ngTableFiltering = value;
        },
        enumerable: true,
        configurable: true
    });
    NgTableFilteringDirective.prototype.onChangeFilter = function (event) {
        this.ngTableFiltering.filterString = event;
        this.tableChanged.emit({ filtering: this.ngTableFiltering });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTableFilteringDirective.prototype, "ngTableFiltering", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgTableFilteringDirective.prototype, "tableChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTableFilteringDirective.prototype, "config", null);
    __decorate([
        core_1.HostListener('input', ['$event.target.value']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NgTableFilteringDirective.prototype, "onChangeFilter", null);
    NgTableFilteringDirective = __decorate([
        core_1.Directive({ selector: '[ngTableFiltering]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], NgTableFilteringDirective);
    return NgTableFilteringDirective;
}());
exports.NgTableFilteringDirective = NgTableFilteringDirective;
//# sourceMappingURL=ng-table-filtering.directive.js.map

/***/ },

/***/ "./node_modules/ng2-table/components/table/ng-table-paging.directive.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var NgTablePagingDirective = (function () {
    function NgTablePagingDirective() {
        this.ngTablePaging = true;
        this.tableChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(NgTablePagingDirective.prototype, "config", {
        get: function () {
            return this.ngTablePaging;
        },
        set: function (value) {
            this.ngTablePaging = value;
        },
        enumerable: true,
        configurable: true
    });
    NgTablePagingDirective.prototype.onChangePage = function (event) {
        // Object.assign(this.config, event);
        if (this.ngTablePaging) {
            this.tableChanged.emit({ paging: event });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NgTablePagingDirective.prototype, "ngTablePaging", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgTablePagingDirective.prototype, "tableChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTablePagingDirective.prototype, "config", null);
    __decorate([
        core_1.HostListener('pagechanged', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NgTablePagingDirective.prototype, "onChangePage", null);
    NgTablePagingDirective = __decorate([
        core_1.Directive({ selector: '[ngTablePaging]' }), 
        __metadata('design:paramtypes', [])
    ], NgTablePagingDirective);
    return NgTablePagingDirective;
}());
exports.NgTablePagingDirective = NgTablePagingDirective;
//# sourceMappingURL=ng-table-paging.directive.js.map

/***/ },

/***/ "./node_modules/ng2-table/components/table/ng-table-sorting.directive.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var NgTableSortingDirective = (function () {
    function NgTableSortingDirective() {
        this.sortChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(NgTableSortingDirective.prototype, "config", {
        get: function () {
            return this.ngTableSorting;
        },
        set: function (value) {
            this.ngTableSorting = value;
        },
        enumerable: true,
        configurable: true
    });
    NgTableSortingDirective.prototype.onToggleSort = function (event) {
        if (event) {
            event.preventDefault();
        }
        if (this.ngTableSorting && this.column && this.column.sort !== false) {
            switch (this.column.sort) {
                case 'asc':
                    this.column.sort = 'desc';
                    break;
                case 'desc':
                    this.column.sort = '';
                    break;
                default:
                    this.column.sort = 'asc';
                    break;
            }
            this.sortChanged.emit(this.column);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTableSortingDirective.prototype, "ngTableSorting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTableSortingDirective.prototype, "column", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgTableSortingDirective.prototype, "sortChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NgTableSortingDirective.prototype, "config", null);
    __decorate([
        core_1.HostListener('click', ['$event', '$target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], NgTableSortingDirective.prototype, "onToggleSort", null);
    NgTableSortingDirective = __decorate([
        core_1.Directive({ selector: '[ngTableSorting]' }), 
        __metadata('design:paramtypes', [])
    ], NgTableSortingDirective);
    return NgTableSortingDirective;
}());
exports.NgTableSortingDirective = NgTableSortingDirective;
//# sourceMappingURL=ng-table-sorting.directive.js.map

/***/ },

/***/ "./node_modules/ng2-table/components/table/ng-table.component.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
var NgTableComponent = (function () {
    function NgTableComponent(sanitizer) {
        this.sanitizer = sanitizer;
        // Table values
        this.rows = [];
        // Outputs (Events)
        this.tableChanged = new core_1.EventEmitter();
        this.cellClicked = new core_1.EventEmitter();
        this.showFilterRow = false;
        this._columns = [];
        this._config = {};
    }
    Object.defineProperty(NgTableComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (conf) {
            if (!conf.className) {
                conf.className = 'table-striped table-bordered';
            }
            if (conf.className instanceof Array) {
                conf.className = conf.className.join(' ');
            }
            this._config = conf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgTableComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (values) {
            var _this = this;
            values.forEach(function (value) {
                if (value.filtering) {
                    _this.showFilterRow = true;
                }
                if (value.className && value.className instanceof Array) {
                    value.className = value.className.join(' ');
                }
                var column = _this._columns.find(function (col) { return col.name === value.name; });
                if (column) {
                    Object.assign(column, value);
                }
                if (!column) {
                    _this._columns.push(value);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    NgTableComponent.prototype.sanitize = function (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    Object.defineProperty(NgTableComponent.prototype, "configColumns", {
        get: function () {
            var sortColumns = [];
            this.columns.forEach(function (column) {
                if (column.sort) {
                    sortColumns.push(column);
                }
            });
            return { columns: sortColumns };
        },
        enumerable: true,
        configurable: true
    });
    NgTableComponent.prototype.onChangeTable = function (column) {
        this._columns.forEach(function (col) {
            if (col.name !== column.name && col.sort !== false) {
                col.sort = '';
            }
        });
        this.tableChanged.emit({ sorting: this.configColumns });
    };
    NgTableComponent.prototype.getData = function (row, propertyName) {
        return propertyName.split('.').reduce(function (prev, curr) { return prev[curr]; }, row);
    };
    NgTableComponent.prototype.cellClick = function (row, column) {
        this.cellClicked.emit({ row: row, column: column });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], NgTableComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], NgTableComponent.prototype, "config", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgTableComponent.prototype, "tableChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgTableComponent.prototype, "cellClicked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], NgTableComponent.prototype, "columns", null);
    NgTableComponent = __decorate([
        core_1.Component({
            selector: 'ng-table',
            template: "\n    <table class=\"table dataTable\" ngClass=\"{{config.className || ''}}\"\n           role=\"grid\" style=\"width: 100%;\">\n      <thead>\n        <tr role=\"row\">\n          <th *ngFor=\"let column of columns\" [ngTableSorting]=\"config\" [column]=\"column\" \n              (sortChanged)=\"onChangeTable($event)\" ngClass=\"{{column.className || ''}}\">\n            {{column.title}}\n            <i *ngIf=\"config && column.sort\" class=\"pull-right fa\"\n              [ngClass]=\"{'fa-chevron-down': column.sort === 'desc', 'fa-chevron-up': column.sort === 'asc'}\"></i>\n          </th>\n        </tr>\n      </thead>\n      <tbody>\n      <tr *ngIf=\"showFilterRow\">\n        <td *ngFor=\"let column of columns\">\n          <input *ngIf=\"column.filtering\" placeholder=\"{{column.filtering.placeholder}}\"\n                 [ngTableFiltering]=\"column.filtering\"\n                 class=\"form-control\"\n                 style=\"width: auto;\"\n                 (tableChanged)=\"onChangeTable(config)\"/>\n        </td>\n      </tr>\n        <tr *ngFor=\"let row of rows\">\n          <td (click)=\"cellClick(row, column.name)\" *ngFor=\"let column of columns\" [innerHtml]=\"sanitize(getData(row, column.name))\"></td>\n        </tr>\n      </tbody>\n    </table>\n  "
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], NgTableComponent);
    return NgTableComponent;
}());
exports.NgTableComponent = NgTableComponent;
//# sourceMappingURL=ng-table.component.js.map

/***/ },

/***/ "./node_modules/ng2-table/ng2-table.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var ng_table_component_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table.component.js");
var ng_table_filtering_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-filtering.directive.js");
var ng_table_paging_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-paging.directive.js");
var ng_table_sorting_directive_1 = __webpack_require__("./node_modules/ng2-table/components/table/ng-table-sorting.directive.js");
__export(__webpack_require__("./node_modules/ng2-table/components/table/ng-table.component.js"));
__export(__webpack_require__("./node_modules/ng2-table/components/table/ng-table-filtering.directive.js"));
__export(__webpack_require__("./node_modules/ng2-table/components/table/ng-table-paging.directive.js"));
__export(__webpack_require__("./node_modules/ng2-table/components/table/ng-table-sorting.directive.js"));
__export(__webpack_require__("./node_modules/ng2-table/components/ng-table-directives.js"));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [
        ng_table_component_1.NgTableComponent,
        ng_table_filtering_directive_1.NgTableFilteringDirective,
        ng_table_sorting_directive_1.NgTableSortingDirective,
        ng_table_paging_directive_1.NgTablePagingDirective
    ]
};
var ng_table_module_1 = __webpack_require__("./node_modules/ng2-table/components/ng-table-module.js");
exports.Ng2TableModule = ng_table_module_1.Ng2TableModule;
//# sourceMappingURL=ng2-table.js.map

/***/ },

/***/ "./src/app/profile/profile.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**          Post Links           **/\n/***********************************/\n.post-links {\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-links::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links > li {\n    float: left;\n    list-style: none; }\n    .post-links > li + li:before {\n      color: #999;\n      content: \"\\25cf\";\n      padding: 0 8px; }\n    .post-links > li > a {\n      text-decoration: none;\n      color: #999999; }\n      .post-links > li > a:hover {\n        color: #999999; }\n  .post-links.no-separator > li + li {\n    margin-left: 12px; }\n    .post-links.no-separator > li + li:before {\n      content: normal; }\n\n/***********************************/\n/**          Post Comments           **/\n/***********************************/\n.post-comments {\n  font-size: 0.875rem;\n  padding-left: 0; }\n  .post-comments::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-links + .post-comments {\n    margin-top: 0.5rem; }\n  .post-comments > li {\n    padding: 10px;\n    border-top: 1px solid #e7e7e7;\n    list-style: none; }\n    .post-comments > li::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .post-comments > li:last-child {\n      padding-bottom: 0; }\n  .post-comments p:last-child {\n    margin-bottom: 0; }\n  .post-comments .avatar {\n    margin-top: 1px; }\n  .post-comments .author {\n    margin-top: 0;\n    margin-bottom: 2px;\n    color: #7ca9dd; }\n  .post-comments .comment-body {\n    overflow: auto; }\n  .post-comments h6.author > small {\n    font-size: 11px; }\n  .widget > footer .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n\n/***********************************/\n/**           Post User           **/\n/***********************************/\n.post-user {\n  position: relative; }\n  .post-user::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .post-user img {\n    border: 3px solid white; }\n\n/***********************************/\n/**           Profile             **/\n/***********************************/\n.user-profile .label {\n  padding: 5px; }\n\n.post-user-profile {\n  margin-top: -75px; }\n  .post-user-profile .contacts {\n    display: block;\n    margin-top: 25px;\n    margin-left: -10px;\n    margin-right: -10px;\n    padding-left: 0;\n    text-align: center; }\n    .post-user-profile .contacts > li {\n      display: inline-block;\n      line-height: 2.2;\n      list-style: none;\n      text-align: left;\n      margin: 0 10px; }\n      @media (min-width: 992px) {\n        .post-user-profile .contacts > li {\n          width: 150px;\n          white-space: nowrap; } }\n      .post-user-profile .contacts > li > a {\n        color: #a2a2a2;\n        text-decoration: none; }\n        .post-user-profile .contacts > li > a:hover, .post-user-profile .contacts > li > a:focus {\n          color: #555555; }\n    .post-user-profile .contacts .fa {\n      font-size: 1.25rem;\n      vertical-align: middle; }\n\n.stats-row-profile .stat-item {\n  border-left: 0;\n  padding-left: 15px;\n  text-align: center; }\n  @media (min-width: 992px) {\n    .stats-row-profile .stat-item {\n      padding-right: 0; } }\n  .stats-row-profile .stat-item .value {\n    font-size: 28px;\n    font-weight: 300; }\n\n.activities h3 {\n  margin-left: 20px; }\n\n.activities .event {\n  margin-top: 1rem;\n  width: 100%; }\n\n.event {\n  background: #fff;\n  border-radius: 0.25rem;\n  padding: 20px 20px 0;\n  position: relative; }\n  .event .post-comments {\n    margin-left: -20px;\n    margin-right: -20px; }\n  .event > footer {\n    margin: 20px -20px 0;\n    padding: 10px 20px;\n    border-bottom-left-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem;\n    background-color: #f3f3f3; }\n    .event > footer::after {\n      content: \"\";\n      display: table;\n      clear: both; }\n    .event > footer .thumb {\n      margin-left: 10px; }\n\n.event-heading {\n  margin: 0 0 2px;\n  font-weight: 600; }\n  .event-heading > a {\n    text-decoration: none;\n    color: #7ca9dd; }\n  .event-heading > small {\n    font-weight: 600; }\n    .event-heading > small > a {\n      text-decoration: none;\n      color: #999999; }\n\n.event-map {\n  display: block;\n  height: 200px;\n  margin: 0 -20px -20px;\n  overflow: visible !important; }\n\n.event-image {\n  margin: 0 -20px -20px;\n  max-height: 260px;\n  overflow: hidden; }\n  .event-image > img {\n    max-width: 100%; }\n"

/***/ },

/***/ "./src/app/registration/class_registration.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var ClassRegistration = (function () {
    function ClassRegistration(alertService, courseService) {
        this.alertService = alertService;
        this.courseService = courseService;
        this.model = {};
        this.step = 0;
        this.majors = [];
        this.courses = [];
        this.sections = [];
        /* Table Part */
        this.columns = [
            { title: 'Number', name: 'Number' },
            { title: 'Title', name: 'Title' }
        ];
        this.rows = [];
        this.page = 1;
        this.itemsPerPage = 20;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
    }
    ClassRegistration.prototype.ngOnInit = function () {
        var _this = this;
        this.courseService.getAllMajors().subscribe(function (data) {
            // successfully search all majors
            for (var i = 0; i < data.value.length; i++) {
                _this.majors.push(data.value[i]);
            }
        });
    };
    ClassRegistration.prototype.searchCourse = function () {
        var _this = this;
        if (this.step === 0) {
            this.courseService.getMajorCourses(this.model.majorInfo.SubjectId).subscribe(function (data) {
                _this.step = 1;
                _this.courses = []; // empty the array first
                for (var i = 0; i < data.value.length; i++) {
                    _this.courses.push(data.value[i]);
                }
            }, function (error) {
                _this.alertService.error(error.err);
            });
        }
        else if (this.step >= 1) {
            this.courseName = this.model.majorInfo.Abbreviation + this.model.courseInfo.Number;
            this.courseService.getCourseDetails(this.courseName).subscribe(function (data) {
                _this.step = 2;
                _this.sections = data;
                _this.length = data.length;
                _this.onChangeTable(_this.config);
            }, function (error) {
                _this.alertService.error(error.err);
            });
        }
    };
    ClassRegistration.prototype.back = function () {
        this.step--;
    };
    ClassRegistration.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.courses; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    ClassRegistration.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    ClassRegistration.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        this.columns.forEach(function (column) {
            if (column.filtering) {
                filteredData = filteredData.filter(function (item) {
                    return item[column.name].match(column.filtering.filterString);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter(function (item) {
                return item[config.filtering.columnName].match(_this.config.filtering.filterString);
            });
        }
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name].toString().match(_this.config.filtering.filterString)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    };
    ClassRegistration.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.courses, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    ClassRegistration.prototype.onCellClick = function (data) {
        this.model.courseInfo = data.row;
        this.searchCourse();
    };
    ClassRegistration = __decorate([
        core_1.Component({
            selector: '[registration]',
            moduleId: module.i,
            template: __webpack_require__("./src/app/registration/class_registration.template.html"),
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _a) || Object, (typeof (_b = typeof index_1.CourseService !== 'undefined' && index_1.CourseService) === 'function' && _b) || Object])
    ], ClassRegistration);
    return ClassRegistration;
    var _a, _b;
}());
exports.ClassRegistration = ClassRegistration;


/***/ },

/***/ "./src/app/registration/class_registration.template.html":
/***/ function(module, exports) {

module.exports = "<ol class=\"breadcrumb\">\n\t<li class=\"breadcrumb-item\">YOU ARE HERE</li>\n\t<li class=\"active breadcrumb-item\">Registration</li>\n</ol>\n<h1 class=\"page-title\">Registration</h1>\n\n<div class=\"row\">\n\t<div class=\"col-lg-4\">\n\t\t<form role=\"form\" (ngSubmit)=\"f.form.valid && searchCourse()\" #f=\"ngForm\" novalidate>\n\t\t\t<div *ngIf=\"step === 0\">\n\t\t\t\t<label>Select Course Major</label>\n\t\t\t\t<select class=\"form-control form-group\" style=\"max-width: 100px\" [(ngModel)]=\"model.majorInfo\" name=\"majorInfo\" required>\n\t\t\t\t\t<option *ngFor=\"let major of majors\" [ngValue]=\"major\">\n\t\t\t\t\t{{major.Abbreviation}}\n\t\t\t\t\t</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div *ngIf=\"step >= 1\"  style=\"width:100%\">\n\t\t\t\t<ng-table [config]=\"config\"\n\t\t\t\t\t(tableChanged)=\"onChangeTable(config)\"\n\t\t\t\t\t(cellClicked)=\"onCellClick($event)\"\n\t\t\t\t\t[rows]=\"rows\" [columns]=\"columns\">\n\t\t\t\t</ng-table>\n\t\t\t\t<pagination *ngIf=\"config.paging\"\n\t\t\t\t\tclass=\"pagination-sm\"\n\t\t\t\t\t[(ngModel)]=\"page\" name=\"page\"\n\t\t\t\t\t[totalItems]=\"length\"\n\t\t\t\t\t[itemsPerPage]=\"itemsPerPage\"\n\t\t\t\t\t[maxSize]=\"maxSize\"\n\t\t\t\t\t[boundaryLinks]=\"true\"\n\t\t\t\t\t[rotate]=\"false\"\n\t\t\t\t\t(pageChanged)=\"onChangeTable(config, $event)\"\n\t\t\t\t\t(numPages)=\"numPages = $event\">\n\t\t\t\t</pagination>\n\t\t\t\t<pre *ngIf=\"config.paging\" class=\"card card-block card-header\">Page: {{page}} / {{numPages}}</pre>\n\t\t\t</div>\n\t\t\t<div class = \"form-group\">\n\t\t\t\t<button *ngIf=\"step < 2\" [disabled]=\"loading\" class=\"btn btn-primary\">Submit</button>\n\t\t\t\t<a *ngIf=\"step <= 2 && step > 0\" (click)=\"back()\">Back</a>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n\t<div class=\"col-lg-8\">\n\t\t<!-- your page content -->\n\t\t<courseDetails [sections]=\"sections\" [courseName]=\"courseName\" *ngIf=\"step === 2\"></courseDetails>\n\t</div>\n</div>\n"

/***/ },

/***/ "./src/app/registration/course_details.component.html":
/***/ function(module, exports) {

module.exports = "<section class=\"widget\"> \n\n    <h3>Sections</h3>         \n\t<div class=\"row panel-group event\">\n\t\t<div class=\"col-md-4 col-sm-6\" *ngFor=\"let section of sections; let i = index\">\n\t\t\t<div class=\"panel panel-section\">\n\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\tSection {{i+1}}\n\t\t\t\t</div>\n\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t<p>Professor: {{section.name}} </p>\n\t\t\t\t\t<button class = \"btn btn-primary\" (click)=\"joinClass(section.name)\"> Join this class</button>\n\t\t\t\t\t<button class=\"btn btn-secondary\"  (click)=\"getRMP(section.name)\" data-toggle=\"modal\" data-target=\"#myModal1\">\n\t\t\t\t\t\tProf. Rate\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"modal fade\" id=\"myModal1\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel1\" aria-hidden=\"true\">\n\t\t\t\t\t\t<div class=\"modal-dialog\">\n\t\t\t\t\t\t\t<div class=\"modal-content\">\n\t\t\t\t\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\n\t\t\t\t\t\t\t\t\t<h4 class=\"modal-title\" id=\"myModalLabel1\">Overall Quality Rating: {{rmp.rating}}</h4>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div *ngFor=\"let comment of rmp.comments\">\n\t\t\t\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t\t\t\t<b>User: {{comment.userName}}</b>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t\t\t\t{{comment.comment}}\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\n    <h3>Course Description</h3>\n\t<div class=\"event\">\n\t\t<footer>\n\t\t\t<p>There's no description about the this course yet :(</p>\n\t\t</footer>\n\t</div>\n\n    <h3>Comments</h3>\n\t<section class=\"event\">\n\t\t<h5 class=\"event-heading\"><a href=\"#\">Jessica Smith</a> <small>@jess</small></h5>\n\t\t<p class=\"text-muted\">February 22, 2014 at 01:59 PM</p>\n\t\t<p class=\"fs-mini\">\n\t\tCheck out this awesome photo I made in Italy last summer. Seems it was lost somewhere deep inside\n\t\tmy brand new HDD 40TB. Thanks god I found it!\n\t\t</p>\n\t\t<footer>\n\t\t\t<div class=\"clearfix\">\n\t\t\t\t<ul class=\"post-links mt-sm pull-left\">\n\t\t\t\t\t<li><a href=\"#\">1 hour</a></li>\n\t\t\t\t\t<li><a href=\"#\"><span class=\"text-danger\"><i class=\"fa fa-heart-o\"></i> Like</span></a></li>\n\t\t\t\t\t<li><a href=\"#\">Comment</a></li>\n\t\t\t\t</ul>\n\n\t\t\t\t<span class=\"thumb thumb-sm pull-right\">\n\t\t\t\t\t<a href=\"#\">\n\t\t\t\t\t\t<img class=\"img-circle\" src=\"assets/img/people/a1.jpg\">\n\t\t\t\t\t</a>\n\t\t\t\t</span>\n\t\t\t\t<span class=\"thumb thumb-sm pull-right\">\n\t\t\t\t\t<a href=\"#\"><img class=\"img-circle\" src=\"assets/img/people/a5.jpg\"></a>\n\t\t\t\t</span>\n\t\t\t\t<span class=\"thumb thumb-sm pull-right\">\n\t\t\t\t\t<a href=\"#\"><img class=\"img-circle\" src=\"assets/img/people/a3.jpg\"></a>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<ul class=\"post-comments mt-sm\">\n\t\t\t\t<li>\n\t\t\t\t\t<span class=\"thumb-xs avatar pull-left mr-sm\">\n\t\t\t\t\t\t<img alt=\"...\" class=\"img-circle\" src=\"assets/img/people/a1.jpg\">\n\t\t\t\t\t</span>\n\t\t\t\t\t<div class=\"comment-body\">\n\t\t\t\t\t\t<h6 class=\"author fs-sm fw-semi-bold\">Ignacio Abad <small>6 mins ago</small></h6>\n\t\t\t\t\t\t<p>Hey, have you heard anything about that?</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<span class=\"thumb-xs avatar pull-left mr-sm\">\n\t\t\t\t\t\t<img alt=\"...\" class=\"img-circle\" src=\"assets/img/avatar.png\">\n\t\t\t\t\t</span>\n\t\t\t\t\t<div class=\"comment-body\">\n\t\t\t\t\t\t<input class=\"form-control form-control-sm\" placeholder=\"Write your comment...\" type=\"text\">\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</footer>\n\t</section>\n\n\t<form action=\"#\" class=\"mt ng-untouched ng-pristine ng-valid\">\n\t\t<div class=\"form-group mb-0\">\n\t\t\t<label class=\"sr-only\" for=\"new-event\">New event</label>\n\t\t\t<textarea class=\"form-control\" id=\"new-event\" placeholder=\"Post something...\" rows=\"3\"></textarea>\n\t\t</div>\n\t\t<div class=\"btn-toolbar\">\n\t\t\t<div class=\"btn-group\">\n\t\t\t\t<a class=\"btn btn-sm btn-gray\" href=\"#\">\n\t\t\t\t\t<i class=\"fa fa-camera fa-lg\"></i>\n\t\t\t\t</a>\n\t\t\t\t<a class=\"btn btn-sm btn-gray\" href=\"#\">\n\t\t\t\t\t<i class=\"fa fa-map-marker fa-lg\"></i>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<button class=\"btn btn-danger btn-sm pull-right\" type=\"submit\">Post</button>\n\t\t</div>\n\t</form>\n\n</section>\n"

/***/ },

/***/ "./src/app/registration/course_details.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var CourseDetailsComponent = (function () {
    function CourseDetailsComponent(courseService, alertService) {
        this.courseService = courseService;
        this.alertService = alertService;
        this.rmp = {
            "rating": 0,
            "comments": []
        };
    }
    CourseDetailsComponent.prototype.joinClass = function (professor) {
        var _this = this;
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        this.courseService.joinClass(this.courseName, professor, userName).subscribe(function (data) {
            _this.alertService.success("Sucessfully join the class!");
        }, function (err) {
            _this.alertService.error(err);
        });
    };
    CourseDetailsComponent.prototype.getRMP = function (professor) {
        var _this = this;
        this.courseService.getRMP(this.courseName, professor).subscribe(function (data) {
            _this.rmp = data;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CourseDetailsComponent.prototype, "courseName", void 0);
    CourseDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.i,
            selector: 'courseDetails',
            template: __webpack_require__("./src/app/registration/course_details.component.html"),
            styles: [__webpack_require__("./src/app/profile/profile.style.scss"), __webpack_require__("./src/app/registration/course_details.style.css")],
            inputs: ['sections']
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof index_1.CourseService !== 'undefined' && index_1.CourseService) === 'function' && _a) || Object, (typeof (_b = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _b) || Object])
    ], CourseDetailsComponent);
    return CourseDetailsComponent;
    var _a, _b;
}());
exports.CourseDetailsComponent = CourseDetailsComponent;


/***/ },

/***/ "./src/app/registration/course_details.style.css":
/***/ function(module, exports) {

module.exports = ".event {\n    margin-bottom:20px\n}\n\n.panel-section {\n    color: #fff;\n    background-color: #666;\n    border-color: #000;\n}"

/***/ },

/***/ "./src/app/registration/registration.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var ng2_table_1 = __webpack_require__("./node_modules/ng2-table/ng2-table.js");
var ng2_bootstrap_1 = __webpack_require__("./node_modules/ng2-bootstrap/ng2-bootstrap.js");
var class_registration_component_1 = __webpack_require__("./src/app/registration/class_registration.component.ts");
var course_details_component_1 = __webpack_require__("./src/app/registration/course_details.component.ts");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
exports.routes = [
    { path: '', component: class_registration_component_1.ClassRegistration, pathMatch: 'full' }
];
var RegistrationModule = (function () {
    function RegistrationModule() {
    }
    RegistrationModule.routes = exports.routes;
    RegistrationModule = __decorate([
        core_1.NgModule({
            declarations: [
                // Components / Directives/ Pipes
                class_registration_component_1.ClassRegistration,
                course_details_component_1.CourseDetailsComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ng2_table_1.Ng2TableModule,
                ng2_bootstrap_1.PaginationModule,
                router_1.RouterModule.forChild(exports.routes),
            ],
            providers: [
                index_1.CourseService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RegistrationModule);
    return RegistrationModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegistrationModule;


/***/ }

});
//# sourceMappingURL=18.map