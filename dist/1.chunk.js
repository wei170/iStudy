webpackJsonpac__name_([1],{

/***/ "./node_modules/angular2-modal/esm/angular2-modal.module.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_index__ = __webpack_require__("./node_modules/angular2-modal/esm/providers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_tokens__ = __webpack_require__("./node_modules/angular2-modal/esm/models/tokens.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_index__ = __webpack_require__("./node_modules/angular2-modal/esm/components/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_index__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/index.js");






class ModalModule {
    /**
     * Returns a ModalModule pre-loaded with a list of dynamically inserted components.
     * Since dynamic components are not analysed by the angular compiler they must register manually
     * using entryComponents, this is an easy way to do it.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     * @returns {{ngModule: ModalModule, providers: {provide: OpaqueToken, useValue: Array<Type|any[]>, multi: boolean}[]}}
     */
    static withComponents(entryComponents) {
        return {
            ngModule: ModalModule,
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ANALYZE_FOR_ENTRY_COMPONENTS"], useValue: entryComponents, multi: true }
            ]
        };
    }
    /**
     * Returns a NgModule for use in the root Module.
     * @param entryComponents A list of dynamically inserted components (dialog's).
     * @returns ModuleWithProviders
     */
    static forRoot(entryComponents) {
        return {
            ngModule: ModalModule,
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__overlay_index__["b" /* Overlay */],
                { provide: __WEBPACK_IMPORTED_MODULE_3__models_tokens__["a" /* OverlayRenderer */], useClass: __WEBPACK_IMPORTED_MODULE_2__providers_index__["b" /* DOMOverlayRenderer */] },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["EVENT_MANAGER_PLUGINS"], useClass: __WEBPACK_IMPORTED_MODULE_2__providers_index__["c" /* DOMOutsideEventPlugin */], multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ANALYZE_FOR_ENTRY_COMPONENTS"], useValue: entryComponents || [], multi: true }
            ]
        };
    }
}
/* harmony export (immutable) */ exports["a"] = ModalModule;

ModalModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                declarations: [
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["a" /* ModalOverlay */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["b" /* SwapComponentDirective */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["c" /* CSSBackdrop */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["d" /* CSSDialogContainer */],
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["c" /* OverlayDialogBoundary */],
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["d" /* OverlayTarget */],
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["e" /* DefaultOverlayTarget */]
                ],
                exports: [
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["c" /* CSSBackdrop */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["d" /* CSSDialogContainer */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["b" /* SwapComponentDirective */],
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["c" /* OverlayDialogBoundary */],
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["d" /* OverlayTarget */],
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["e" /* DefaultOverlayTarget */]
                ],
                entryComponents: [
                    __WEBPACK_IMPORTED_MODULE_5__overlay_index__["a" /* ModalOverlay */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["c" /* CSSBackdrop */],
                    __WEBPACK_IMPORTED_MODULE_4__components_index__["d" /* CSSDialogContainer */]
                ]
            },] },
];
/** @nocollapse */
ModalModule.ctorParameters = [];
//# sourceMappingURL=angular2-modal.module.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/components/base-dynamic-component.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__framework_createComponent__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/createComponent.js");



const BROWSER_PREFIX = ['webkit', 'moz', 'MS', 'o', ''];
function register(eventName, element, cb) {
    BROWSER_PREFIX.forEach(p => {
        element.addEventListener(p ? p + eventName : eventName.toLowerCase(), cb, false);
    });
}
/**
 * A base class for supporting dynamic components.
 * There are 3 main support areas:
 * 1 - Easy wrapper for dynamic styling via CSS classes and inline styles.
 * 2 - Easy wrapper for interception of transition/animation end events.
 * 3 - Easy wrapper for component creation and injection.
 *
 * Dynamic css is done via direct element manipulation (via renderer), it does not use change detection
 * or binding. This is to allow better control over animation.
 *
 * Animation support is limited, only transition/keyframes END even are notified.
 * The animation support is needed since currently the angular animation module is limited as well and
 * does not support CSS animation that are not pre-parsed and are not in the styles metadata of a component.
 *
 * Capabilities: Add/Remove styls, Add/Remove classes, listen to animation/transition end event,
 * add components
 */
class BaseDynamicComponent {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    activateAnimationListener() {
        if (this.animationEnd)
            return;
        this.animationEnd = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        this.animationEnd$ = this.animationEnd.asObservable();
        register('TransitionEnd', this.el.nativeElement, (e) => this.onEnd(e));
        register('AnimationEnd', this.el.nativeElement, (e) => this.onEnd(e));
    }
    /**
     * Set a specific inline style on the overlay host element.
     * @param prop The style key
     * @param value The value, undefined to remove
     * @returns {ModalOverlay}
     */
    setStyle(prop, value) {
        this.renderer.setElementStyle(this.el.nativeElement, prop, value);
        return this;
    }
    forceReflow() {
        this.el.nativeElement.offsetWidth;
    }
    addClass(css, forceReflow = false) {
        css.split(' ')
            .forEach(c => this.renderer.setElementClass(this.el.nativeElement, c, true));
        if (forceReflow)
            this.forceReflow();
    }
    removeClass(css, forceReflow = false) {
        css.split(' ')
            .forEach(c => this.renderer.setElementClass(this.el.nativeElement, c, false));
        if (forceReflow)
            this.forceReflow();
    }
    ngOnDestroy() {
        if (this.animationEnd && !this.animationEnd.closed) {
            this.animationEnd.complete();
        }
    }
    myAnimationEnd$() {
        return this.animationEnd$
            .filter(e => e.target === this.el.nativeElement);
    }
    /**
     * Add a component, supply a view container ref.
     * Note: The components vcRef will result in a sibling.
     * @param component The component to add
     * @param vcRef The container to add to
     * @param bindings Bindings to use (added on top of the ViewContainerRef)
     * @returns {Promise<ComponentRef<any>>}
     */
    _addComponent(instructions) {
        const cmpRef = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__framework_createComponent__["a" /* createComponent */])(instructions);
        cmpRef.changeDetectorRef.detectChanges();
        return cmpRef;
    }
    onEnd(event) {
        if (!this.animationEnd.closed) {
            this.animationEnd.next(event);
        }
    }
}
/* harmony export (immutable) */ exports["a"] = BaseDynamicComponent;

//# sourceMappingURL=base-dynamic-component.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/components/css-backdrop.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_dynamic_component__ = __webpack_require__("./node_modules/angular2-modal/esm/components/base-dynamic-component.js");


/**
 * Represents the modal backdrop shaped by CSS.
 */
class CSSBackdrop extends __WEBPACK_IMPORTED_MODULE_1__base_dynamic_component__["a" /* BaseDynamicComponent */] {
    constructor(el, renderer) {
        super(el, renderer);
        this.activateAnimationListener();
        const style = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
}
/* harmony export (immutable) */ exports["a"] = CSSBackdrop;

CSSBackdrop.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'css-backdrop',
                host: {
                    '[attr.class]': 'cssClass',
                    '[attr.style]': 'styleStr'
                },
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: ``
            },] },
];
/** @nocollapse */
CSSBackdrop.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
];
//# sourceMappingURL=css-backdrop.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/components/css-dialog-container.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_dynamic_component__ = __webpack_require__("./node_modules/angular2-modal/esm/components/base-dynamic-component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");



/**
 * A component that acts as a top level container for an open modal window.
 */
class CSSDialogContainer extends __WEBPACK_IMPORTED_MODULE_1__base_dynamic_component__["a" /* BaseDynamicComponent */] {
    constructor(dialog, el, renderer) {
        super(el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
}
/* harmony export (immutable) */ exports["a"] = CSSDialogContainer;

CSSDialogContainer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'css-dialog-container',
                host: {
                    'tabindex': '-1',
                    'role': 'dialog'
                },
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: `<ng-content></ng-content>`
            },] },
];
/** @nocollapse */
CSSDialogContainer.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref__["a" /* DialogRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
];
//# sourceMappingURL=css-dialog-container.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/components/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__swap_component_directive__ = __webpack_require__("./node_modules/angular2-modal/esm/components/swap-component.directive.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_dynamic_component__ = __webpack_require__("./node_modules/angular2-modal/esm/components/base-dynamic-component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_backdrop__ = __webpack_require__("./node_modules/angular2-modal/esm/components/css-backdrop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_dialog_container__ = __webpack_require__("./node_modules/angular2-modal/esm/components/css-dialog-container.js");
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__swap_component_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__base_dynamic_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__css_backdrop__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__css_dialog_container__["a"]; });




//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/components/swap-component.directive.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");

// <template [dynCmp]="myCmp" [dynCmpBindings]="myBindings"></template>
// <template [dynCmp]="ctx.component" [dynCmpBindings]="ctx.bindings" [dynCmpProjectables]="ctx.projectableNodes"></template>
class SwapComponentDirective {
    constructor(cfr, vcRef, tRef) {
        this.cfr = cfr;
        this.vcRef = vcRef;
        this.tRef = tRef;
        this.onCreate = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"](false);
    }
    set swapCmp(component) {
        this.component = component;
        this.vcRef.clear();
        if (this.component) {
            let injector = this.swapCmpInjector || this.vcRef.parentInjector;
            if (Array.isArray(this.swapCmpBindings) && this.swapCmpBindings.length > 0) {
                injector = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].fromResolvedProviders(this.swapCmpBindings, injector);
            }
            const cmpRef = this.vcRef.createComponent(this.cfr.resolveComponentFactory(component), this.vcRef.length, injector, this.swapCmpProjectables);
            cmpRef.changeDetectorRef.detectChanges();
            this.onCreate.emit(cmpRef);
        }
    }
}
/* harmony export (immutable) */ exports["a"] = SwapComponentDirective;

SwapComponentDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[swapCmp]'
            },] },
];
/** @nocollapse */
SwapComponentDirective.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"], },
];
SwapComponentDirective.propDecorators = {
    'swapCmpBindings': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'swapCmpInjector': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'swapCmpProjectables': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'onCreate': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    'swapCmp': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
};
//# sourceMappingURL=swap-component.directive.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/framework/createComponent.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony export (immutable) */ exports["a"] = createComponent;

function createComponent(instructions) {
    let injector = getInjector(instructions);
    return instructions.vcRef.createComponent(injector.get(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ComponentFactoryResolver"]).resolveComponentFactory(instructions.component), instructions.vcRef.length, injector, instructions.projectableNodes);
}
function getInjector(instructions) {
    const ctxInjector = instructions.injector || instructions.vcRef.parentInjector;
    return Array.isArray(instructions.bindings) && instructions.bindings.length > 0 ?
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].fromResolvedProviders(instructions.bindings, ctxInjector) : ctxInjector;
}
//# sourceMappingURL=createComponent.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/framework/fluent-assign.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["c"] = privateKey;
/* harmony export (immutable) */ exports["d"] = setAssignMethod;
/* harmony export (immutable) */ exports["b"] = setAssignAlias;
const PRIVATE_PREFIX = '$$';
const RESERVED_REGEX = /^(\$\$).*/;
function validateMethodName(name) {
    if (!name) {
        throw new Error(`Illegal method name. Empty method name is not allowed`);
    }
    else if (name in this) {
        throw new Error(`A member name '${name}' already defined.`);
    }
}
/**
 * Returns a list of assigned property names (non private)
 * @param subject
 * @returns {string[]}
 */
function getAssignedPropertyNames(subject) {
    return Object.getOwnPropertyNames(subject)
        .filter(name => RESERVED_REGEX.test(name))
        .map(name => name.substr(2));
}
function privateKey(name) {
    return PRIVATE_PREFIX + name;
}
function objectDefinePropertyValue(obj, propertyName, value) {
    Object.defineProperty(obj, propertyName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value
    });
}
/**
 * Given a FluentAssign instance, apply all of the supplied default values so calling
 * instance.toJSON will return those values (does not create a setter function)
 * @param instance
 * @param defaultValues
 */
function applyDefaultValues(instance, defaultValues) {
    Object.getOwnPropertyNames(defaultValues)
        .forEach(name => instance[privateKey(name)] = defaultValues[name]);
}
/**
 * Create a function for setting a value for a property on a given object.
 * @param obj The object to apply the key & setter on.
 * @param propertyName The name of the property on the object
 * @param writeOnce If true will allow writing once (default: false)
 *
 * Example:
 * let obj = new FluentAssign<any>;
 * setAssignMethod(obj, 'myProp');
 * obj.myProp('someValue');
 * const result = obj.toJSON();
 * console.log(result); //{ myProp: 'someValue' }
 *
 *
 * let obj = new FluentAssign<any>;
 * setAssignMethod(obj, 'myProp', true); // applying writeOnce
 * obj.myProp('someValue');
 * obj.myProp('someValue'); // ERROR: Overriding config property 'myProp' is not allowed.
 */
function setAssignMethod(obj, propertyName, writeOnce = false) {
    validateMethodName.call(obj, propertyName);
    const key = privateKey(propertyName);
    objectDefinePropertyValue(obj, propertyName, (value) => {
        if (writeOnce && this.hasOwnProperty(key)) {
            throw new Error(`Overriding config property '${propertyName}' is not allowed.`);
        }
        obj[key] = value;
        return obj;
    });
}
/**
 * Create a function for setting a value that is an alias to an other setter function.
 * @param obj The object to apply the key & setter on.
 * @param propertyName The name of the property on the object
 * @param srcPropertyName The name of the property on the object this alias points to
 * @param hard If true, will set a readonly property on the object that returns
 *        the value of the source property. Default: false
 *
 * Example:
 * let obj = new FluentAssign<any> ;
 * setAssignMethod(obj, 'myProp');
 * setAssignAlias(obj, 'myPropAlias', 'myProp');
 * obj.myPropAlias('someValue');
 * const result = obj.toJSON();
 * console.log(result); //{ myProp: 'someValue' }
 * result.myPropAlias // undefined
 *
 *
 * let obj = new FluentAssign<any> ;
 * setAssignMethod(obj, 'myProp');
 * setAssignAlias(obj, 'myPropAlias', 'myProp', true); // setting a hard alias.
 * obj.myPropAlias('someValue');
 * const result = obj.toJSON();
 * console.log(result); //{ myProp: 'someValue' }
 * result.myPropAlias // someValue
 */
function setAssignAlias(obj, propertyName, srcPropertyName, hard = false) {
    validateMethodName.call(obj, propertyName);
    objectDefinePropertyValue(obj, propertyName, (value) => {
        obj[srcPropertyName](value);
        return obj;
    });
    if (hard === true) {
        const key = privateKey(propertyName), srcKey = privateKey(srcPropertyName);
        Object.defineProperty(obj, key, {
            configurable: false,
            enumerable: false,
            get: () => obj[srcKey]
        });
    }
}
/**
 * Represent a fluent API factory wrapper for defining FluentAssign instances.
 */
class FluentAssignFactory {
    constructor(fluentAssign) {
        this._fluentAssign =
            fluentAssign instanceof FluentAssign ? fluentAssign : new FluentAssign();
    }
    /**
     * Create a setter method on the FluentAssign instance.
     * @param name The name of the setter function.
     * @param defaultValue If set (not undefined) set's the value on the instance immediately.
     * @returns {FluentAssignFactory}
     */
    setMethod(name, defaultValue = undefined) {
        setAssignMethod(this._fluentAssign, name);
        if (defaultValue !== undefined) {
            this._fluentAssign[name](defaultValue);
        }
        return this;
    }
    /**
     * The FluentAssign instance.
     * @returns {FluentAssign<T>}
     */
    get fluentAssign() {
        return this._fluentAssign;
    }
}
/* harmony export (immutable) */ exports["e"] = FluentAssignFactory;

/**
 * Represent an object where every property is a function representing an assignment function.
 * Calling each function with a value will assign the value to the object and return the object.
 * Calling 'toJSON' returns an object with the same properties but this time representing the
 * assigned values.
 *
 * This allows setting an object in a fluent API manner.
 * Example:
 let fluent = new FluentAssign<any>(undefined, ['some', 'went']);
 fluent.some('thing').went('wrong').toJSON();
 // { some: 'thing', went: 'wrong' }
 */
class FluentAssign {
    /**
     *
     * @param defaultValues An object representing default values for the underlying object.
     * @param initialSetters A list of initial setters for this FluentAssign.
     * @param baseType the class/type to create a new base. optional, {} is used if not supplied.
     */
    constructor(defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        if (Array.isArray(defaultValues)) {
            defaultValues.forEach(d => applyDefaultValues(this, d));
        }
        else if (defaultValues) {
            applyDefaultValues(this, defaultValues);
        }
        if (Array.isArray(initialSetters)) {
            initialSetters.forEach(name => setAssignMethod(this, name));
        }
        if (baseType) {
            this.__fluent$base__ = baseType;
        }
    }
    /**
     * Returns a FluentAssignFactory<FluentAssign<T>> ready to define a FluentAssign type.
     * @param defaultValues An object representing default values for the instance.
     * @param initialSetters A list of initial setters for the instance.
     * @returns {FluentAssignFactory<T>}
     */
    static compose(defaultValues = undefined, initialSetters = undefined) {
        return FluentAssign.composeWith(new FluentAssign(defaultValues, initialSetters));
    }
    /**
     * Returns a FluentAssignFactory<Z> where Z is an instance of FluentAssign<?> or a derived
     * class of it.
     * @param fluentAssign An instance of FluentAssign<?> or a derived class of FluentAssign<?>.
     * @returns {any}
     */
    static composeWith(fluentAssign) {
        return new FluentAssignFactory(fluentAssign);
    }
    toJSON() {
        return getAssignedPropertyNames(this)
            .reduce((obj, name) => {
            const key = privateKey(name);
            // re-define property descriptors (we dont want their value)
            let propDesc = Object.getOwnPropertyDescriptor(this, key);
            if (propDesc) {
                Object.defineProperty(obj, name, propDesc);
            }
            else {
                obj[name] = this[key];
            }
            return obj;
        }, this.__fluent$base__ ? new this.__fluent$base__() : {});
    }
}
/* harmony export (immutable) */ exports["a"] = FluentAssign;

//# sourceMappingURL=fluent-assign.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/framework/utils.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["d"] = extend;
/* harmony export (immutable) */ exports["e"] = arrayUnion;
/* harmony export (immutable) */ exports["b"] = supportsKey;
/* unused harmony export toStyleString */
/* harmony export (immutable) */ exports["c"] = noop;
/**
 * Simple object extend
 * @param m1
 * @param m2
 * @returns {{}}
 */
function extend(m1, m2) {
    var m = {};
    for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
            m[attr] = m1[attr];
        }
    }
    for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
            m[attr] = m2[attr];
        }
    }
    return m;
}
/**
 * Simple, not optimized, array union of unique values.
 * @param arr1
 * @param arr2
 * @returns {T[]|any[]|any[][]|any[]}
 */
function arrayUnion(arr1, arr2) {
    return arr1
        .concat(arr2.filter(v => arr1.indexOf(v) === -1));
}
/**
 * Returns true if the config supports a given key.
 * @param key
 * @returns {boolean}
 */
function supportsKey(keyCode, config) {
    if (!Array.isArray(config))
        return config === null ? false : true;
    return config.indexOf(keyCode) > -1;
}
/**
 * Given an object representing a key/value map of css properties, returns a valid css string
 * representing the object.
 * Example:
 * console.log(toStyleString({
 *     position: 'absolute',
 *     width: '100%',
 *     height: '100%',
 *     top: '0',
 *     left: '0',
 *     right: '0',
 *     bottom: '0'
 * }));
 * // position:absolute;width:100%;height:100%;top:0;left:0;right:0;bottom:0
 * @param obj
 * @returns {string}
 */
function toStyleString(obj) {
    return Object.getOwnPropertyNames(obj)
        .map(k => `${k}:${obj[k]}`)
        .join(';');
    // let objStr = JSON.stringify(obj);
    // return objStr.substr(1, objStr.length - 2)
    //     .replace(/,/g, ';')
    //     .replace(/"/g, '');
}
class PromiseCompleter {
    constructor() {
        this.promise = new Promise((res, rej) => {
            this.resolve = res;
            this.reject = rej;
        });
    }
}
/* harmony export (immutable) */ exports["a"] = PromiseCompleter;

function noop() { }
//# sourceMappingURL=utils.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_fluent_assign__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/fluent-assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__framework_createComponent__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/createComponent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_errors__ = __webpack_require__("./node_modules/angular2-modal/esm/models/errors.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_tokens__ = __webpack_require__("./node_modules/angular2-modal/esm/models/tokens.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_index__ = __webpack_require__("./node_modules/angular2-modal/esm/providers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_overlay_context__ = __webpack_require__("./node_modules/angular2-modal/esm/models/overlay-context.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__overlay_index__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_modal_context__ = __webpack_require__("./node_modules/angular2-modal/esm/models/modal-context.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_modal_open_context__ = __webpack_require__("./node_modules/angular2-modal/esm/models/modal-open-context.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_index__ = __webpack_require__("./node_modules/angular2-modal/esm/components/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular2_modal_module__ = __webpack_require__("./node_modules/angular2-modal/esm/angular2-modal.module.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "privateKey", function() { return __WEBPACK_IMPORTED_MODULE_0__framework_fluent_assign__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "setAssignMethod", function() { return __WEBPACK_IMPORTED_MODULE_0__framework_fluent_assign__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "setAssignAlias", function() { return __WEBPACK_IMPORTED_MODULE_0__framework_fluent_assign__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FluentAssignFactory", function() { return __WEBPACK_IMPORTED_MODULE_0__framework_fluent_assign__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "FluentAssign", function() { return __WEBPACK_IMPORTED_MODULE_0__framework_fluent_assign__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "extend", function() { return __WEBPACK_IMPORTED_MODULE_1__framework_utils__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "PromiseCompleter", function() { return __WEBPACK_IMPORTED_MODULE_1__framework_utils__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "arrayUnion", function() { return __WEBPACK_IMPORTED_MODULE_1__framework_utils__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "createComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__framework_createComponent__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "DialogBailOutError", function() { return __WEBPACK_IMPORTED_MODULE_3__models_errors__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "DialogRef", function() { return __WEBPACK_IMPORTED_MODULE_4__models_dialog_ref__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "DROP_IN_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_5__models_tokens__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OverlayRenderer", function() { return __WEBPACK_IMPORTED_MODULE_5__models_tokens__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "Modal", function() { return __WEBPACK_IMPORTED_MODULE_6__providers_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "DOMOverlayRenderer", function() { return __WEBPACK_IMPORTED_MODULE_6__providers_index__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "overlayConfigFactory", function() { return __WEBPACK_IMPORTED_MODULE_7__models_overlay_context__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OverlayContext", function() { return __WEBPACK_IMPORTED_MODULE_7__models_overlay_context__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OverlayContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_7__models_overlay_context__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalOverlay", function() { return __WEBPACK_IMPORTED_MODULE_8__overlay_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OverlayDialogBoundary", function() { return __WEBPACK_IMPORTED_MODULE_8__overlay_index__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OverlayTarget", function() { return __WEBPACK_IMPORTED_MODULE_8__overlay_index__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "Overlay", function() { return __WEBPACK_IMPORTED_MODULE_8__overlay_index__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "DEFAULT_VALUES", function() { return __WEBPACK_IMPORTED_MODULE_9__models_modal_context__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalContext", function() { return __WEBPACK_IMPORTED_MODULE_9__models_modal_context__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_9__models_modal_context__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalOpenContext", function() { return __WEBPACK_IMPORTED_MODULE_10__models_modal_open_context__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalOpenContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_10__models_modal_open_context__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "SwapComponentDirective", function() { return __WEBPACK_IMPORTED_MODULE_11__components_index__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "BaseDynamicComponent", function() { return __WEBPACK_IMPORTED_MODULE_11__components_index__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CSSBackdrop", function() { return __WEBPACK_IMPORTED_MODULE_11__components_index__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(exports, "CSSDialogContainer", function() { return __WEBPACK_IMPORTED_MODULE_11__components_index__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalModule", function() { return __WEBPACK_IMPORTED_MODULE_12__angular2_modal_module__["a"]; });













//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/dialog-ref-stack.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
const BASKET_GROUP = {};
/**
 * A dumb stack implementation over an array.
 */
class DialogRefStack {
    constructor() {
        this._stack = [];
        this._stackMap = new Map();
    }
    get length() {
        return this._stack.length;
    }
    push(dialogRef, group) {
        if (this._stack.indexOf(dialogRef) === -1) {
            this._stack.push(dialogRef);
            this._stackMap.set(dialogRef, group || BASKET_GROUP);
        }
    }
    /**
     * Push a DialogRef into the stack and manage it so when it's done
     * it will automatically kick itself out of the stack.
     * @param dialogRef
     */
    pushManaged(dialogRef, group) {
        this.push(dialogRef, group);
        dialogRef.onDestroy.subscribe(() => this.remove(dialogRef));
    }
    pop() {
        const dialogRef = this._stack.pop();
        this._stackMap.delete(dialogRef);
        return dialogRef;
    }
    /**
     * Remove a DialogRef from the stack.
     * @param dialogRef
     */
    remove(dialogRef) {
        let idx = this.indexOf(dialogRef);
        if (idx > -1) {
            this._stack.splice(idx, 1);
            this._stackMap.delete(dialogRef);
        }
    }
    index(index) {
        return this._stack[index];
    }
    indexOf(dialogRef) {
        return this._stack.indexOf(dialogRef);
    }
    groupOf(dialogRef) {
        return this._stackMap.get(dialogRef);
    }
    groupBy(group) {
        let arr = [];
        if (group) {
            this._stackMap.forEach((value, key) => {
                if (value === group) {
                    arr.push(key);
                }
            });
        }
        return arr;
    }
    groupLength(group) {
        let count = 0;
        if (group) {
            this._stackMap.forEach((value, key) => {
                if (value === group) {
                    count++;
                }
            });
        }
        return count;
    }
}
/* harmony export (immutable) */ exports["a"] = DialogRefStack;

//# sourceMappingURL=dialog-ref-stack.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/dialog-ref.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_errors__ = __webpack_require__("./node_modules/angular2-modal/esm/models/errors.js");



/**
 * API to an open modal window.
 */
class DialogRef {
    constructor(overlay, context) {
        this.overlay = overlay;
        this.context = context;
        this._resultDeferred = new __WEBPACK_IMPORTED_MODULE_1__framework_utils__["a" /* PromiseCompleter */]();
        this._onDestroy = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        this.onDestroy = this._onDestroy.asObservable();
    }
    /**
     * A Promise that is resolved on a close event and rejected on a dismiss event.
     * @returns {Promise<T>|any|*|Promise<any>}
     */
    get result() {
        return this._resultDeferred.promise;
    }
    /**
     * Set a close/dismiss guard
     * @param g
     */
    setCloseGuard(guard) {
        this.closeGuard = guard;
    }
    /**
     *  Close the modal with a return value, i.e: result.
     */
    close(result = null) {
        const _close = () => {
            this.destroy();
            this._resultDeferred.resolve(result);
        };
        this._fireHook('beforeClose')
            .then(value => value !== true && _close())
            .catch(_close);
    }
    /**
     *  Close the modal without a return value, i.e: cancelled.
     *  This call is automatically invoked when a user either:
     *  - Presses an exit keyboard key (if configured).
     *  - Clicks outside of the modal window (if configured).
     *  Usually, dismiss represent a Cancel button or a X button.
     */
    dismiss() {
        const _dismiss = () => {
            this.destroy();
            this._resultDeferred.promise.catch(() => { });
            this._resultDeferred.reject();
        };
        this._fireHook('beforeDismiss')
            .then(value => value !== true && _dismiss())
            .catch(_dismiss);
    }
    /**
     * Gracefully close the overlay/dialog with a rejected result.
     * Does not trigger canDestroy on the overlay.
     */
    bailOut() {
        if (this.destroyed !== true) {
            this.destroyed = true;
            this._onDestroy.next(null);
            this._onDestroy.complete();
            this._resultDeferred.reject(new __WEBPACK_IMPORTED_MODULE_2__models_errors__["a" /* DialogBailOutError */]());
        }
    }
    destroy() {
        if (this.destroyed !== true) {
            this.destroyed = true;
            if (typeof this.overlayRef.instance.canDestroy === 'function') {
                this.overlayRef.instance.canDestroy()
                    .catch(() => { })
                    .then(() => this._destroy());
            }
            else {
                this._destroy();
            }
        }
    }
    _destroy() {
        this._onDestroy.next(null);
        this._onDestroy.complete();
        this.overlayRef.destroy();
    }
    _fireHook(name) {
        const gurad = this.closeGuard, fn = gurad && typeof gurad[name] === 'function' && gurad[name];
        return Promise.resolve(fn ? fn.call(gurad) : false);
    }
}
/* harmony export (immutable) */ exports["a"] = DialogRef;

//# sourceMappingURL=dialog-ref.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/errors.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
class DialogBailOutError extends Error {
    constructor(value) {
        super();
        if (!value) {
            value = 'Dialog was forced to close by an unknown source.';
        }
        this.message = value;
    }
}
/* harmony export (immutable) */ exports["a"] = DialogBailOutError;

//# sourceMappingURL=errors.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/modal-context.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_context__ = __webpack_require__("./node_modules/angular2-modal/esm/models/overlay-context.js");



const DEFAULT_VALUES = {};
/* harmony export (immutable) */ exports["c"] = DEFAULT_VALUES;

const DEFAULT_SETTERS = [
    'message'
];
class ModalContext extends __WEBPACK_IMPORTED_MODULE_2__overlay_context__["a" /* OverlayContext */] {
}
/* harmony export (immutable) */ exports["a"] = ModalContext;

/**
 * A core context builder for a modal window instance, used to define the context upon
 * a modal choose it's behaviour.
 */
class ModalContextBuilder extends __WEBPACK_IMPORTED_MODULE_2__overlay_context__["b" /* OverlayContextBuilder */] {
    constructor(defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__framework_utils__["d" /* extend */])(DEFAULT_VALUES, defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__framework_utils__["e" /* arrayUnion */])(DEFAULT_SETTERS, initialSetters || []), baseType);
    }
}
/* harmony export (immutable) */ exports["b"] = ModalContextBuilder;

ModalContextBuilder.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
ModalContextBuilder.ctorParameters = [
    null,
    { type: Array, },
    null,
];
//# sourceMappingURL=modal-context.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/modal-open-context.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_index__ = __webpack_require__("./node_modules/angular2-modal/esm/providers/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_context__ = __webpack_require__("./node_modules/angular2-modal/esm/models/modal-context.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");



const DEFAULT_SETTERS = [
    'component'
];
class ModalOpenContext extends __WEBPACK_IMPORTED_MODULE_1__modal_context__["a" /* ModalContext */] {
}
/* harmony export (immutable) */ exports["a"] = ModalOpenContext;

/**
 * A Modal Context that knows about the modal service, and so can open a modal window on demand.
 * Use the fluent API to configure the preset and then invoke the 'open' method to open a modal
 * based on the context.
 */
class ModalOpenContextBuilder extends __WEBPACK_IMPORTED_MODULE_1__modal_context__["b" /* ModalContextBuilder */] {
    constructor(defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(defaultValues || {}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__framework_utils__["e" /* arrayUnion */])(DEFAULT_SETTERS, initialSetters || []), baseType);
    }
    /**
     * Hook to alter config and return bindings.
     * @param config
     */
    $$beforeOpen(config) {
        return [];
    }
    /**
     * Open a modal window based on the configuration of this config instance.
     * @param viewContainer If set opens the modal inside the supplied viewContainer
     * @returns Promise<DialogRef>
     */
    open(viewContainer) {
        let context = this.toJSON();
        if (!(context.modal instanceof __WEBPACK_IMPORTED_MODULE_0__providers_index__["a" /* Modal */])) {
            return Promise.reject(new Error('Configuration Error: modal service not set.'));
        }
        let overlayConfig = {
            context: context,
            viewContainer: viewContainer,
            bindings: typeof this.$$beforeOpen === 'function' && this.$$beforeOpen(context)
        };
        return context.modal.open(context.component, overlayConfig);
    }
}
/* harmony export (immutable) */ exports["b"] = ModalOpenContextBuilder;

//# sourceMappingURL=modal-open-context.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/overlay-context.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_fluent_assign__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/fluent-assign.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");
/* harmony export (immutable) */ exports["c"] = overlayConfigFactory;



const DEFAULT_VALUES = {
    inElement: false,
    isBlocking: true,
    keyboard: [27],
    supportsKey: function supportsKey(keyCode) {
        return this.keyboard.indexOf(keyCode) > -1;
    }
};
/* unused harmony export DEFAULT_VALUES */

const DEFAULT_SETTERS = [
    'inElement',
    'isBlocking',
    'keyboard'
];
class OverlayContext {
    normalize() {
        if (this.isBlocking !== false)
            this.isBlocking = true;
        if (this.keyboard === null) {
            this.keyboard = [];
        }
        else if (typeof this.keyboard === 'number') {
            this.keyboard = [this.keyboard];
        }
        else if (!Array.isArray(this.keyboard)) {
            this.keyboard = DEFAULT_VALUES.keyboard;
        }
    }
}
/* harmony export (immutable) */ exports["a"] = OverlayContext;

/**
 * A core context builder for a modal window instance, used to define the context upon
 * a modal choose it's behaviour.
 */
class OverlayContextBuilder extends __WEBPACK_IMPORTED_MODULE_1__framework_fluent_assign__["a" /* FluentAssign */] {
    constructor(defaultValues = undefined, initialSetters = undefined, baseType = undefined) {
        super(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__framework_utils__["d" /* extend */])(DEFAULT_VALUES, defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__framework_utils__["e" /* arrayUnion */])(DEFAULT_SETTERS, initialSetters || []), baseType || OverlayContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    /**
     * Returns an new OverlayConfig with a context property representing the data in this builder.
     * @param base A base configuration that the result will extend
     * @returns OverlayConfig
     */
    toOverlayConfig(base) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__framework_utils__["d" /* extend */])(base || {}, {
            context: this.toJSON()
        });
    }
}
/* harmony export (immutable) */ exports["b"] = OverlayContextBuilder;

OverlayContextBuilder.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
OverlayContextBuilder.ctorParameters = [
    null,
    { type: Array, },
    null,
];
/**
 * A helper to create an `OverlayConfig` on the fly.
 * Since `OverlayConfig` requires context it means a builder is needed, this process had some boilerplate.
 * When a quick, on the fly overlay config is needed use this helper to avoid that boilerplate.
 *
 * A builder is used as an API to allow setting the context and providing some operations around the modal.
 * When a developers knows the context before hand we can skip this step, this is what this factory is for.
 *
 * @param context The context for the modal
 * @param baseContextType Optional. The type/class of the context. This is the class used to init a new instance of the context
 * @param baseConfig A base configuration that the result will extend
 * @returns {OverlayConfig}
 */
function overlayConfigFactory(context, baseContextType, baseConfig) {
    return new OverlayContextBuilder(context, undefined, baseContextType).toOverlayConfig(baseConfig);
}
//# sourceMappingURL=overlay-context.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/tokens.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return DROP_IN_TYPE; });
var DROP_IN_TYPE;
(function (DROP_IN_TYPE) {
    DROP_IN_TYPE[DROP_IN_TYPE["alert"] = 0] = "alert";
    DROP_IN_TYPE[DROP_IN_TYPE["prompt"] = 1] = "prompt";
    DROP_IN_TYPE[DROP_IN_TYPE["confirm"] = 2] = "confirm";
})(DROP_IN_TYPE || (DROP_IN_TYPE = {}));
class OverlayRenderer {
}
/* harmony export (immutable) */ exports["a"] = OverlayRenderer;

//# sourceMappingURL=tokens.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/models/vc-ref-store.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
const vcRefCollection = {};
function getVCRef(key) {
    return vcRefCollection[key] ? vcRefCollection[key].slice() : [];
}
function setVCRef(key, vcRef) {
    if (!vcRefCollection.hasOwnProperty(key)) {
        vcRefCollection[key] = [];
    }
    vcRefCollection[key].push(vcRef);
}
function delVCRef(key, vcRef) {
    if (!vcRef) {
        vcRefCollection[key] = [];
    }
    else {
        const coll = vcRefCollection[key] || [], idx = coll.indexOf(vcRef);
        if (idx > -1) {
            coll.splice(idx, 1);
        }
    }
}
/**
 * A Simple store that holds a reference to ViewContainerRef instances by a user defined key.
 * This, with the OverlayTarget directive makes it easy to block the overlay inside an element
 * without having to use the angular query boilerplate.
 * @type {{
 *  getVCRef: (function(string): ViewContainerRef),
 *  setVCRef: (function(string, ViewContainerRef): void),
 *  delVCRef: (function(string): void)
 *  }}
 */
const vcRefStore = { getVCRef, setVCRef, delVCRef };
/* harmony export (immutable) */ exports["a"] = vcRefStore;

//# sourceMappingURL=vc-ref-store.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/overlay/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overlay_directives__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/overlay.directives.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_component__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/overlay.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_service__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/overlay.service.js");
/* harmony reexport (binding) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__overlay_directives__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__overlay_directives__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__overlay_directives__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__overlay_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__overlay_service__["a"]; });



//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/overlay/overlay.component.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_index__ = __webpack_require__("./node_modules/angular2-modal/esm/components/index.js");




/**
 * Represents the modal overlay.
 */
class ModalOverlay extends __WEBPACK_IMPORTED_MODULE_3__components_index__["a" /* BaseDynamicComponent */] {
    constructor(dialogRef, vcr, el, renderer) {
        super(el, renderer);
        this.dialogRef = dialogRef;
        this.vcr = vcr;
        this.activateAnimationListener();
    }
    /**
     * @internal
     */
    getProjectables(content, bindings) {
        let nodes;
        if (typeof content === 'string') {
            nodes = [[this.renderer.createText(null, `${content}`)]];
        }
        else if (content instanceof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) {
            nodes = [
                this.dialogRef.overlay.defaultViewContainer
                    .createEmbeddedView(content, { dialogRef: this.dialogRef }).rootNodes
            ];
        }
        else {
            nodes = [this.embedComponent({ component: content, bindings: bindings }).rootNodes];
        }
        return nodes;
    }
    embedComponent(config) {
        return this.vcr.createEmbeddedView(this.template, {
            $implicit: config
        });
    }
    addComponent(type, bindings = [], projectableNodes = []) {
        return super._addComponent({
            component: type,
            vcRef: this.innerVcr,
            bindings,
            projectableNodes
        });
    }
    fullscreen() {
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            'z-index': 1500
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    insideElement() {
        const style = {
            position: 'absolute',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        Object.keys(style).forEach(k => this.setStyle(k, style[k]));
    }
    /**
     * Define an element that click inside it will not trigger modal close.
     * Since events bubble, clicking on a dialog will bubble up to the overlay, a plugin
     * must define an element that represent the dialog, the overlay will make sure no to close when
     * it was clicked.
     * @param element
     */
    setClickBoundary(element) {
        let target;
        const elListener = event => target = event.target;
        const docListener = event => {
            if (this.dialogRef.context.isBlocking || !this.dialogRef.overlay.isTopMost(this.dialogRef)) {
                return;
            }
            let current = event.target;
            // on click, this will hit.
            if (current === target)
                return;
            // on mouse down -> drag -> release the current might not be 'target', it might be
            // a sibling or a child (i.e: not part of the tree-up direction). It might also be a release
            // outside the dialog... so we compare to the boundary element
            do {
                if (current === element) {
                    return;
                }
            } while (current.parentNode && (current = current.parentNode));
            this.dialogRef.dismiss();
        };
        this.dialogRef.onDestroy.subscribe(() => {
            element.removeEventListener('click', elListener, false);
            element.removeEventListener('touchstart', elListener, false);
            document.removeEventListener('click', docListener, false);
            document.removeEventListener('touchend', docListener, false);
        });
        setTimeout(() => {
            element.addEventListener('mousedown', elListener, false);
            element.addEventListener('touchstart', docListener, false);
            document.addEventListener('click', docListener, false);
            document.addEventListener('touchend', docListener, false);
        });
    }
    /**
     * Temp workaround for animation where destruction of the top level component does not
     * trigger child animations. Solution should be found either in animation module or in design
     * of the modal component tree.
     * @returns {Promise<void>}
     */
    canDestroy() {
        const completer = new __WEBPACK_IMPORTED_MODULE_1__framework_utils__["a" /* PromiseCompleter */]();
        if (!Array.isArray(this.beforeDestroyHandlers)) {
            completer.resolve();
        }
        else {
            // run destroy notification but protect against halt.
            let id = setTimeout(() => {
                id = null;
                completer.reject();
            }, 1000);
            const resolve = () => {
                if (id === null)
                    return;
                clearTimeout(id);
                completer.resolve();
            };
            Promise.all(this.beforeDestroyHandlers.map(fn => fn()))
                .then(resolve)
                .catch(resolve);
        }
        return completer.promise;
    }
    /**
     * A handler running before destruction of the overlay
     * use to delay destruction due to animation.
     * This is part of the workaround for animation, see canDestroy.
     *
     * NOTE: There is no guarantee that the listeners will fire, use dialog.onDestory for that.
     * @param fn
     */
    beforeDestroy(fn) {
        if (!this.beforeDestroyHandlers) {
            this.beforeDestroyHandlers = [];
        }
        this.beforeDestroyHandlers.push(fn);
    }
    documentKeypress(event) {
        // check that this modal is the last in the stack.
        if (!this.dialogRef.overlay.isTopMost(this.dialogRef))
            return;
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__framework_utils__["b" /* supportsKey */])(event.keyCode, this.dialogRef.context.keyboard)) {
            this.dialogRef.dismiss();
        }
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.dialogRef.destroyed !== true) {
            // if we're here the overlay is destroyed by an external event that is not user invoked.
            // i.e: The user did no call dismiss or close and dialogRef.destroy() did not invoke.
            // this will happen when routing or killing an element containing a blocked overlay (ngIf)
            // we bail out, i.e gracefully shutting down.
            this.dialogRef.bailOut();
        }
    }
}
/* harmony export (immutable) */ exports["a"] = ModalOverlay;

ModalOverlay.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'modal-overlay',
                host: {
                    '(body:keydown)': 'documentKeypress($event)'
                },
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: `<template #innerView></template>
<template #template let-ctx>
    <template [swapCmp]="ctx.component" [swapCmpBindings]="ctx.bindings" [swapCmpProjectables]="ctx.projectableNodes"></template>
</template>
`
            },] },
];
/** @nocollapse */
ModalOverlay.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref__["a" /* DialogRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
];
ModalOverlay.propDecorators = {
    'innerVcr': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['innerView', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] },] },],
    'template': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['template',] },],
};
//# sourceMappingURL=overlay.component.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/overlay/overlay.directives.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_vc_ref_store__ = __webpack_require__("./node_modules/angular2-modal/esm/models/vc-ref-store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_service__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/overlay.service.js");




/**
 * A directive use to signal the overlay that the host of this directive
 * is a dialog boundary, i.e: over click outside of the element should close the modal
 * (if non blocking)
 */
class OverlayDialogBoundary {
    constructor(el, dialogRef) {
        if (dialogRef && el.nativeElement) {
            dialogRef.overlayRef.instance.setClickBoundary(el.nativeElement);
        }
    }
}
/* harmony export (immutable) */ exports["a"] = OverlayDialogBoundary;

OverlayDialogBoundary.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[overlayDialogBoundary]'
            },] },
];
/** @nocollapse */
OverlayDialogBoundary.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_1__models_dialog_ref__["a" /* DialogRef */], },
];
class OverlayTarget {
    constructor(vcRef) {
        this.vcRef = vcRef;
    }
    set targetKey(value) {
        this._targetKey = value;
        if (value) {
            __WEBPACK_IMPORTED_MODULE_2__models_vc_ref_store__["a" /* vcRefStore */].setVCRef(value, this.vcRef);
        }
    }
    ngOnDestroy() {
        if (this._targetKey) {
            __WEBPACK_IMPORTED_MODULE_2__models_vc_ref_store__["a" /* vcRefStore */].delVCRef(this._targetKey, this.vcRef);
        }
    }
}
/* harmony export (immutable) */ exports["b"] = OverlayTarget;

OverlayTarget.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[overlayTarget]'
            },] },
];
/** @nocollapse */
OverlayTarget.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], },
];
OverlayTarget.propDecorators = {
    'targetKey': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"], args: ['overlayTarget',] },],
};
const noop = () => { };
class DefaultOverlayTarget {
    constructor(overlay, vcRef) {
        this.overlay = overlay;
        overlay.defaultViewContainer = vcRef;
    }
    ngOnDestroy() {
        this.overlay.defaultViewContainer = undefined;
    }
}
/* harmony export (immutable) */ exports["c"] = DefaultOverlayTarget;

DefaultOverlayTarget.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[defaultOverlayTarget]'
            },] },
];
/** @nocollapse */
DefaultOverlayTarget.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_3__overlay_service__["a" /* Overlay */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], },
];
//# sourceMappingURL=overlay.directives.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/overlay/overlay.service.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_tokens__ = __webpack_require__("./node_modules/angular2-modal/esm/models/tokens.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref_stack__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref-stack.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_vc_ref_store__ = __webpack_require__("./node_modules/angular2-modal/esm/models/vc-ref-store.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");





const _stack = new __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref_stack__["a" /* DialogRefStack */]();
class Overlay {
    constructor(_modalRenderer) {
        this._modalRenderer = _modalRenderer;
    }
    get stackLength() {
        return _stack.length;
    }
    /**
     * Check if a given DialogRef is the top most ref in the stack.
     * TODO: distinguish between body modal vs in element modal.
     * @param dialogRef
     * @returns {boolean}
     */
    isTopMost(dialogRef) {
        return _stack.indexOf(dialogRef) === _stack.length - 1;
    }
    stackPosition(dialogRef) {
        return _stack.indexOf(dialogRef);
    }
    groupStackLength(dialogRef) {
        return _stack.groupLength(_stack.groupOf(dialogRef));
    }
    /**
     * Creates an overlay and returns a dialog ref.
     * @param config instructions how to create the overlay
     * @param group A token to associate the new overlay with, used for reference (stacks usually)
     * @returns {DialogRef<T>[]}
     */
    open(config, group) {
        let viewContainer = config.viewContainer, containers = [];
        if (typeof viewContainer === 'string') {
            containers = __WEBPACK_IMPORTED_MODULE_3__models_vc_ref_store__["a" /* vcRefStore */].getVCRef(viewContainer);
        }
        else if (Array.isArray(viewContainer)) {
            containers = viewContainer;
        }
        else if (viewContainer) {
            containers = [viewContainer];
        }
        if (!containers || !containers[0]) {
            if (!this.defaultViewContainer) {
                throw new Error('Default view container not set. Add the "defaultOverlayTarget" directive ' +
                    'to the application root component template (e.g: <span defaultOverlayTarget></span>. ' +
                    'You can also set it manually using the "Overlay" service "defaultViewContainer" property.');
            }
            containers = [this.defaultViewContainer];
        }
        return containers
            .map(vc => this.createOverlay(config.renderer || this._modalRenderer, vc, config, group));
    }
    createOverlay(renderer, vcRef, config, group) {
        if (config.context) {
            config.context.normalize();
        }
        let dialog = new __WEBPACK_IMPORTED_MODULE_4__models_dialog_ref__["a" /* DialogRef */](this, config.context || {});
        dialog.inElement = config.context && !!config.context.inElement;
        let cmpRef = renderer.render(dialog, vcRef, config.injector);
        Object.defineProperty(dialog, 'overlayRef', { value: cmpRef });
        _stack.pushManaged(dialog, group);
        return dialog;
    }
}
/* harmony export (immutable) */ exports["a"] = Overlay;

Overlay.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
Overlay.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_1__models_tokens__["a" /* OverlayRenderer */], },
];
//# sourceMappingURL=overlay.service.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/providers/dom-modal-renderer.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_createComponent__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/createComponent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_index__ = __webpack_require__("./node_modules/angular2-modal/esm/overlay/index.js");




class DOMOverlayRenderer {
    render(dialog, vcRef, injector) {
        const bindings = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolve([
            { provide: __WEBPACK_IMPORTED_MODULE_2__models_dialog_ref__["a" /* DialogRef */], useValue: dialog }
        ]);
        const cmpRef = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__framework_createComponent__["a" /* createComponent */])({
            component: __WEBPACK_IMPORTED_MODULE_3__overlay_index__["a" /* ModalOverlay */],
            vcRef,
            injector,
            bindings
        });
        if (dialog.inElement) {
            vcRef.element.nativeElement.appendChild(cmpRef.location.nativeElement);
        }
        else {
            document.body.appendChild(cmpRef.location.nativeElement);
        }
        return cmpRef;
    }
}
/* harmony export (immutable) */ exports["a"] = DOMOverlayRenderer;

DOMOverlayRenderer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
DOMOverlayRenderer.ctorParameters = [];
//# sourceMappingURL=dom-modal-renderer.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/providers/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_modal_renderer__ = __webpack_require__("./node_modules/angular2-modal/esm/providers/dom-modal-renderer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal__ = __webpack_require__("./node_modules/angular2-modal/esm/providers/modal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__outside_event_plugin__ = __webpack_require__("./node_modules/angular2-modal/esm/providers/outside-event-plugin.js");
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__dom_modal_renderer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__modal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__outside_event_plugin__["a"]; });



//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/providers/modal.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_dialog_ref__ = __webpack_require__("./node_modules/angular2-modal/esm/models/dialog-ref.js");


class UnsupportedDropInError extends Error {
    constructor(dropInName) {
        super();
        this.message = `Unsupported Drop-In ${dropInName}`;
    }
}
/* unused harmony export UnsupportedDropInError */

class Modal {
    constructor(overlay) {
        this.overlay = overlay;
    }
    alert() {
        throw new UnsupportedDropInError('alert');
    }
    prompt() {
        throw new UnsupportedDropInError('prompt');
    }
    confirm() {
        throw new UnsupportedDropInError('confirm');
    }
    /**
     * Opens a modal window inside an existing component.
     * @param content The content to display, either string, template ref or a component.
     * @param config Additional settings.
     * @returns {Promise<DialogRef>}
     */
    open(content, config) {
        config = config || {};
        try {
            let dialogs = this.overlay.open(config, this.constructor);
            if (dialogs.length > 1) {
                console.warn(`Attempt to open more then 1 overlay detected.
        Multiple modal copies are not supported at the moment, 
        only the first viewContainer will display.`);
            }
            // TODO:  Currently supporting 1 view container, hence working on dialogs[0].
            //        upgrade to multiple containers.
            return Promise.resolve(this.create(dialogs[0], content, config.bindings));
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    createBackdrop(dialogRef, BackdropComponent) {
        const b = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolve([{ provide: __WEBPACK_IMPORTED_MODULE_1__models_dialog_ref__["a" /* DialogRef */], useValue: dialogRef }]);
        return dialogRef.overlayRef.instance.addComponent(BackdropComponent, b);
    }
    createContainer(dialogRef, ContainerComponent, content, bindings) {
        const b = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolve([{ provide: __WEBPACK_IMPORTED_MODULE_1__models_dialog_ref__["a" /* DialogRef */], useValue: dialogRef }])
            .concat(bindings || []);
        let nodes = dialogRef.overlayRef.instance.getProjectables(content, b);
        return dialogRef.overlayRef.instance.addComponent(ContainerComponent, b, nodes);
    }
    /**
     * A helper function for derived classes to create backdrop & container
     * @param dialogRef
     * @param backdrop
     * @param container
     * @returns { backdropRef: ComponentRef<B>, containerRef: ComponentRef<C> }
     *
     * @deprecated use createBackdrop and createContainer instead
     */
    createModal(dialogRef, backdrop, container) {
        const b = __WEBPACK_IMPORTED_MODULE_0__angular_core__["ReflectiveInjector"].resolve([{ provide: __WEBPACK_IMPORTED_MODULE_1__models_dialog_ref__["a" /* DialogRef */], useValue: dialogRef }]);
        return {
            backdropRef: dialogRef.overlayRef.instance.addComponent(backdrop, b),
            containerRef: dialogRef.overlayRef.instance.addComponent(container, b)
        };
    }
}
/* harmony export (immutable) */ exports["a"] = Modal;

//# sourceMappingURL=modal.js.map

/***/ },

/***/ "./node_modules/angular2-modal/esm/providers/outside-event-plugin.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__framework_utils__ = __webpack_require__("./node_modules/angular2-modal/esm/framework/utils.js");
// heavily inspired by:
// http://www.bennadel.com/blog/3025-creating-custom-dom-and-host-event-bindings-in-angular-2-beta-6.htm


const eventMap = {
    clickOutside: 'click',
    mousedownOutside: 'mousedown',
    mouseupOutside: 'mouseup',
    mousemoveOutside: 'mousemove'
};
/**
 * An event handler factory for event handlers that bubble the event to a given handler
 * if the event target is not an ancestor of the given element.
 * @param element
 * @param handler
 * @returns {function(any): undefined}
 */
function bubbleNonAncestorHandlerFactory(element, handler) {
    return (event) => {
        let current = event.target;
        do {
            if (current === element) {
                return;
            }
        } while (current.parentNode && (current = current.parentNode));
        handler(event);
    };
}
class DOMOutsideEventPlugin {
    constructor() {
        // TODO: use DI factory for this.
        if (!document || typeof document.addEventListener !== 'function') {
            this.addEventListener = __WEBPACK_IMPORTED_MODULE_1__framework_utils__["c" /* noop */];
        }
    }
    supports(eventName) {
        return eventMap.hasOwnProperty(eventName);
    }
    addEventListener(element, eventName, handler) {
        const zone = this.manager.getZone();
        // A Factory that registers the event on the document, instead of the element.
        // the handler is created at runtime, and it acts as a propagation/bubble predicate, it will
        // bubble up the event (i.e: execute our original event handler) only if the event targer
        // is an ancestor of our element.
        // The event is fired inside the angular zone so change detection can kick into action.
        const onceOnOutside = () => {
            const listener = bubbleNonAncestorHandlerFactory(element, evt => zone.runGuarded(() => handler(evt)));
            // mimic BrowserDomAdapter.onAndCancel
            document.addEventListener(eventMap[eventName], listener, false);
            return () => document.removeEventListener(eventMap[eventName], listener, false);
        };
        // we run the event registration for the document in a different zone, this will make sure
        // change detection is off.
        // It turns out that if a component that use DOMOutsideEventPlugin is built from a click
        // event, we might get here before the event reached the document, causing a quick false
        // positive handling (when stopPropagation() was'nt invoked). To workaround this we wait
        // for the next vm turn and register.
        // Event registration returns a dispose function for that event, angular use it to clean
        // up after component get's destroyed. Since we need to return a dispose function
        // synchronously we have to put a wrapper for it since we will get it asynchronously,
        // i.e: after we need to return it.
        //
        return zone.runOutsideAngular(() => {
            let fn;
            setTimeout(() => fn = onceOnOutside(), 0);
            return () => fn();
        });
    }
    addGlobalEventListener(target, eventName, handler) {
        throw 'not supported';
    }
}
/* harmony export (immutable) */ exports["a"] = DOMOutsideEventPlugin;

DOMOutsideEventPlugin.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
];
/** @nocollapse */
DOMOutsideEventPlugin.ctorParameters = [];
//# sourceMappingURL=outside-event-plugin.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/bootstrap.module.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_container_component__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal-container.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message_modal_component__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/message-modal.component.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */






const providers = [
    { provide: __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["Modal"], useClass: __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* Modal */] },
    { provide: __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* Modal */], useClass: __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* Modal */] }
];
/* harmony export (immutable) */ exports["b"] = providers;

class BootstrapModalModule {
    static getProviders() {
        return providers;
    }
}
/* harmony export (immutable) */ exports["a"] = BootstrapModalModule;

BootstrapModalModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [__WEBPACK_IMPORTED_MODULE_2_angular2_modal__["ModalModule"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
                declarations: [
                    __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["c" /* BSModalFooter */],
                    __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["d" /* BSMessageModalTitle */],
                    __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["b" /* BSMessageModalBody */],
                    __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["a" /* BSMessageModal */],
                    __WEBPACK_IMPORTED_MODULE_4__modal_container_component__["a" /* BSModalContainer */]
                ],
                providers: providers,
                entryComponents: [
                    __WEBPACK_IMPORTED_MODULE_4__modal_container_component__["a" /* BSModalContainer */],
                    __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["a" /* BSMessageModal */]
                ]
            },] },
];
/** @nocollapse */
BootstrapModalModule.ctorParameters = [];
//# sourceMappingURL=bootstrap.module.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal_context__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal-context.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_container_component__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal-container.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_modal_component__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/message-modal.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__presets_message_modal_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/message-modal-preset.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__presets_one_button_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/one-button-preset.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__presets_two_button_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/two-button-preset.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modal__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bootstrap_module__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/bootstrap.module.js");
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalContext", function() { return __WEBPACK_IMPORTED_MODULE_0__modal_context__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_0__modal_context__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalContainer", function() { return __WEBPACK_IMPORTED_MODULE_1__modal_container_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSMessageModal", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSMessageModalBody", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalFooter", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSMessageModalTitle", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "MessageModalPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_3__presets_message_modal_preset__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalOpenContext", function() { return __WEBPACK_IMPORTED_MODULE_4_angular2_modal__["ModalOpenContext"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "ModalOpenContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_4_angular2_modal__["ModalOpenContextBuilder"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OneButtonPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_5__presets_one_button_preset__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "TwoButtonPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_6__presets_two_button_preset__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "PromptPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_6__presets_two_button_preset__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "Modal", function() { return __WEBPACK_IMPORTED_MODULE_7__modal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BootstrapModalModule", function() { return __WEBPACK_IMPORTED_MODULE_8__bootstrap_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "providers", function() { return __WEBPACK_IMPORTED_MODULE_8__bootstrap_module__["b"]; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */









//# sourceMappingURL=index.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/message-modal.component.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */


class BSMessageModalTitle {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    get titleHtml() {
        return this.context.titleHtml ? 1 : 0;
    }
}
/* harmony export (immutable) */ exports["d"] = BSMessageModalTitle;

BSMessageModalTitle.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'modal-title',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: `<div [ngClass]="context.headerClass" [ngSwitch]="titleHtml">
      <button *ngIf="context.showClose" type="button" class="close" 
              aria-label="Close" (click)="dialog.dismiss()">
          <span aria-hidden="true">×</span>
      </button>
      <div *ngSwitchCase="1" [innerHtml]="context.titleHtml"></div>
      <h3 *ngSwitchDefault class="modal-title">{{context.title}}</h3>
 </div>`
            },] },
];
/** @nocollapse */
BSMessageModalTitle.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
];
class BSMessageModalBody {
    constructor(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
}
/* harmony export (immutable) */ exports["b"] = BSMessageModalBody;

BSMessageModalBody.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'modal-body',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                styles: [`.form-group {
    margin-top: 10px;
  }`],
                template: `<div [ngClass]="context.bodyClass"> 
    <div [innerHtml]="context.message"></div>
      <div *ngIf="context.showInput" class="form-group">
        <input autofocus #input
            name="bootstrap" 
            type="text" 
            class="form-control"
            [value]="context.defaultValue"
            (change)="context.defaultValue = input.value"  
            placeholder="{{context.placeholder}}">
      </div>
    </div>
`
            },] },
];
/** @nocollapse */
BSMessageModalBody.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
];
/**
 * Represents the modal footer for storing buttons.
 */
class BSModalFooter {
    constructor(dialog) {
        this.dialog = dialog;
    }
    onClick(btn, $event) {
        $event.stopPropagation();
        btn.onClick(this, $event);
    }
}
/* harmony export (immutable) */ exports["c"] = BSModalFooter;

BSModalFooter.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'modal-footer',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: `<div [ngClass]="dialog.context.footerClass">
    <button *ngFor="let btn of dialog.context.buttons;"
            [ngClass]="btn.cssClass"
            (click)="onClick(btn, $event)">{{btn.caption}}</button>
</div>`
            },] },
];
/** @nocollapse */
BSModalFooter.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
];
/**
 * A Component representing a generic bootstrap modal content element.
 *
 * By configuring a MessageModalContext instance you can:
 *
 *  Header:
 *      - Set header container class (default: modal-header)
 *      - Set title text (enclosed in H3 element)
 *      - Set title html (overrides text)
 *
 *  Body:
 *      - Set body container class.  (default: modal-body)
 *      - Set body container HTML.
 *
 *  Footer:
 *      - Set footer class.  (default: modal-footer)
 *      - Set button configuration (from 0 to n)
 */
class BSMessageModal {
    constructor(dialog) {
        this.dialog = dialog;
    }
}
/* harmony export (immutable) */ exports["a"] = BSMessageModal;

BSMessageModal.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'modal-content',
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: `<modal-title></modal-title><modal-body></modal-body><modal-footer></modal-footer>`
            },] },
];
/** @nocollapse */
BSMessageModal.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
];
//# sourceMappingURL=message-modal.component.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/modal-container.component.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */


class BSModalContainer extends __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["BaseDynamicComponent"] {
    constructor(dialog, el, renderer) {
        super(el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
}
/* harmony export (immutable) */ exports["a"] = BSModalContainer;

BSModalContainer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                selector: 'bs-modal-container',
                host: {
                    'tabindex': '-1',
                    'role': 'dialog',
                    'class': 'modal fade',
                    'style': 'position: absolute; display: block'
                },
                encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                template: `<div [ngClass]="dialog.context.dialogClass" 
      [class.modal-lg]="dialog.context.size == \'lg\'"
      [class.modal-sm]="dialog.context.size == \'sm\'">
  <div class="modal-content" style="display:block" role="document" overlayDialogBoundary>
    <ng-content></ng-content>
  </div>    
</div>`
            },] },
];
/** @nocollapse */
BSModalContainer.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
];
//# sourceMappingURL=modal-container.component.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/modal-context.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */

const DEFAULT_VALUES = {
    dialogClass: 'modal-dialog',
    showClose: false
};
const DEFAULT_SETTERS = [
    'dialogClass',
    'size',
    'showClose'
];
class BSModalContext extends __WEBPACK_IMPORTED_MODULE_0_angular2_modal__["ModalOpenContext"] {
    normalize() {
        if (!this.dialogClass) {
            this.dialogClass = DEFAULT_VALUES.dialogClass;
        }
        super.normalize();
    }
}
/* harmony export (immutable) */ exports["a"] = BSModalContext;

class BSModalContextBuilder extends __WEBPACK_IMPORTED_MODULE_0_angular2_modal__["ModalOpenContextBuilder"] {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])(DEFAULT_VALUES, defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["arrayUnion"])(DEFAULT_SETTERS, initialSetters || []), baseType || BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
}
/* harmony export (immutable) */ exports["b"] = BSModalContextBuilder;

//# sourceMappingURL=modal-context.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/modal.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_combineLatest__ = __webpack_require__("./node_modules/rxjs/add/operator/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_container_component__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal-container.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bootstrap_presets_one_button_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/one-button-preset.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bootstrap_presets_two_button_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/two-button-preset.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */






class Modal extends __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["Modal"] {
    constructor(overlay) {
        super(overlay);
    }
    alert() {
        return new __WEBPACK_IMPORTED_MODULE_4__bootstrap_presets_one_button_preset__["a" /* OneButtonPresetBuilder */](this, { isBlocking: false });
    }
    prompt() {
        return new __WEBPACK_IMPORTED_MODULE_5__bootstrap_presets_two_button_preset__["b" /* PromptPresetBuilder */](this, { isBlocking: true, keyboard: null });
    }
    confirm() {
        return new __WEBPACK_IMPORTED_MODULE_5__bootstrap_presets_two_button_preset__["a" /* TwoButtonPresetBuilder */](this, { isBlocking: true, keyboard: null });
    }
    create(dialogRef, content, bindings) {
        const backdropRef = this.createBackdrop(dialogRef, __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["CSSBackdrop"]);
        const containerRef = this.createContainer(dialogRef, __WEBPACK_IMPORTED_MODULE_3__modal_container_component__["a" /* BSModalContainer */], content, bindings);
        let overlay = dialogRef.overlayRef.instance;
        let backdrop = backdropRef.instance;
        let container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (!document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
        }
        if (dialogRef.inElement) {
            backdrop.setStyle('position', 'absolute');
        }
        backdrop.addClass('modal-backdrop fade', true);
        backdrop.addClass('in');
        container.addClass('in');
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(() => {
            const completer = new __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["PromiseCompleter"]();
            backdrop.removeClass('in');
            container.removeClass('in');
            backdrop.myAnimationEnd$()
                .combineLatest(container.myAnimationEnd$(), (s1, s2) => [s1, s2])
                .subscribe(sources => {
                this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('modal-open');
                completer.resolve();
            });
            return completer.promise;
        });
        return dialogRef;
    }
}
/* harmony export (immutable) */ exports["a"] = Modal;

Modal.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
];
/** @nocollapse */
Modal.ctorParameters = [
    { type: __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["Overlay"], },
];
//# sourceMappingURL=modal.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/presets/message-modal-preset.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_modal_component__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/message-modal.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_context__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/modal-context.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */



const DEFAULT_VALUES = {
    component: __WEBPACK_IMPORTED_MODULE_1__message_modal_component__["a" /* BSMessageModal */],
    headerClass: 'modal-header',
    bodyClass: 'modal-body',
    footerClass: 'modal-footer'
};
const DEFAULT_SETTERS = [
    'headerClass',
    'title',
    'titleHtml',
    'bodyClass',
    'footerClass'
];
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
class MessageModalPresetBuilder extends __WEBPACK_IMPORTED_MODULE_2__modal_context__["b" /* BSModalContextBuilder */] {
    constructor(defaultValues=undefined, initialSetters=undefined, baseType=undefined) {
        super(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({ buttons: [] }, DEFAULT_VALUES), defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["arrayUnion"])(DEFAULT_SETTERS, initialSetters || []), baseType);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["setAssignAlias"])(this, 'body', 'message', true);
    }
    addButton(css, caption, onClick) {
        let btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        let key = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["privateKey"])('buttons');
        this[key].push(btn);
        return this;
    }
}
/* harmony export (immutable) */ exports["a"] = MessageModalPresetBuilder;

//# sourceMappingURL=message-modal-preset.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/presets/one-button-preset.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_modal_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/message-modal-preset.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */


/**
 * A Preset for a classic 1 button modal window.
 */
class OneButtonPresetBuilder extends __WEBPACK_IMPORTED_MODULE_1__message_modal_preset__["a" /* MessageModalPresetBuilder */] {
    constructor(modal, defaultValues=undefined) {
        super(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary'
        }, defaultValues || {}), [
            'okBtn',
            'okBtnClass'
        ]);
    }
    $$beforeOpen(config) {
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true));
        return super.$$beforeOpen(config);
    }
}
/* harmony export (immutable) */ exports["a"] = OneButtonPresetBuilder;

//# sourceMappingURL=one-button-preset.js.map

/***/ },

/***/ "./node_modules/angular2-modal/plugins/bootstrap/presets/two-button-preset.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__("./node_modules/angular2-modal/esm/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_modal_preset__ = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/presets/message-modal-preset.js");
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.0-beta.14
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */


/** Common two button preset */
class AbstractTwoButtonPresetBuilder extends __WEBPACK_IMPORTED_MODULE_1__message_modal_preset__["a" /* MessageModalPresetBuilder */] {
    constructor(modal, defaultValues=undefined, initialSetters=[]) {
        super(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary',
            cancelBtn: 'Cancel',
            cancelBtnClass: 'btn btn-default'
        }, defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["arrayUnion"])([
            'okBtn',
            'okBtnClass',
            'cancelBtn',
            'cancelBtnClass',
        ], initialSetters));
    }
    $$beforeOpen(config) {
        this.addButton(config.cancelBtnClass, config.cancelBtn, (cmp, $event) => cmp.dialog.dismiss());
        return super.$$beforeOpen(config);
    }
}
/* unused harmony export AbstractTwoButtonPresetBuilder */

/**
 * A Preset for a classic 2 button modal window.
 */
class TwoButtonPresetBuilder extends AbstractTwoButtonPresetBuilder {
    constructor(modal, defaultValues=undefined) {
        super(modal, defaultValues);
    }
    $$beforeOpen(config) {
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(true));
        return super.$$beforeOpen(config);
    }
}
/* harmony export (immutable) */ exports["a"] = TwoButtonPresetBuilder;

class PromptPresetBuilder extends AbstractTwoButtonPresetBuilder {
    constructor(modal, defaultValues=undefined) {
        super(modal, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({ showInput: true, defaultValue: '' }, defaultValues || {}), ['placeholder', 'defaultValue']);
    }
    $$beforeOpen(config) {
        this.addButton(config.okBtnClass, config.okBtn, (cmp, $event) => cmp.dialog.close(cmp.dialog.context.defaultValue));
        return super.$$beforeOpen(config);
    }
}
/* harmony export (immutable) */ exports["b"] = PromptPresetBuilder;

//# sourceMappingURL=two-button-preset.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/combineLatest.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var combineLatest_1 = __webpack_require__("./node_modules/rxjs/operator/combineLatest.js");
Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ },

/***/ "./node_modules/rxjs/add/operator/filter.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var filter_1 = __webpack_require__("./node_modules/rxjs/operator/filter.js");
Observable_1.Observable.prototype.filter = filter_1.filter;
//# sourceMappingURL=filter.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/combineLatest.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var none = {};
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
/* tslint:enable:max-line-length */
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
}());
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(none);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
        var result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.CombineLatestSubscriber = CombineLatestSubscriber;
//# sourceMappingURL=combineLatest.js.map

/***/ },

/***/ "./node_modules/rxjs/operator/filter.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctKey}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
        this.predicate = predicate;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ },

/***/ "./src/app/_services/alert.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
//import 'messenger/build/js/messenger.js';
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var angular2_notifications_1 = __webpack_require__("./node_modules/angular2-notifications/components.js");
// declare var jQuery: any;
// declare var Messenger: any;
var AlertService = (function () {
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
    function AlertService(_service) {
        this._service = _service;
    }
    AlertService.prototype.success = function (message) {
        if (message === void 0) { message = "Oh yeah!"; }
        this._service.success("Success", message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
        });
    };
    AlertService.prototype.successWT = function (title, message) {
        if (message === void 0) { message = "Oh yeah!"; }
        this._service.success(title, message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
        });
    };
    AlertService.prototype.error = function (message) {
        if (message === void 0) { message = "There is an error!"; }
        this._service.error("Error", message, {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
        });
    };
    AlertService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_notifications_1.NotificationsService !== 'undefined' && angular2_notifications_1.NotificationsService) === 'function' && _a) || Object])
    ], AlertService);
    return AlertService;
    var _a;
}());
exports.AlertService = AlertService;


/***/ },

/***/ "./src/app/_services/authentication.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (email, password) {
        var url = 'users/login';
        var body = { "email": email, "password": password };
        return this.http.post(url, body)
            .map(function (response) {
            if (response.status < 200 || response.status >= 300) {
                response.json();
            }
            else {
                // login successful if there's a jwt token in the response
                var user = response.json();
                // console.log(response.headers.get('Auth'));
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', response.headers.get('Auth'));
                }
            }
        });
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a;
}());
exports.AuthenticationService = AuthenticationService;


/***/ },

/***/ "./src/app/_services/classroom.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var ClassroomService = (function () {
    function ClassroomService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }
    /**
     * JSON Format:
     * {
     * 	"userName": "..."
     * 	}
     */
    ClassroomService.prototype.getUserCourseList = function () {
        var url = '/course/get-class-list';
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        var body = { "userName": userName };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    /**
     * JSON Format:
     * {
     * 	"course": "course name"
     * 	"professor": "professor name"
     * }
     */
    ClassroomService.prototype.getAllStudents = function (courseName, professor) {
        var url = '/course/get-class-list';
        var userName = JSON.parse(localStorage.getItem('currentUser')).userName;
        var body = { "course": courseName, "professor": professor };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    ClassroomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ClassroomService);
    return ClassroomService;
    var _a;
}());
exports.ClassroomService = ClassroomService;


/***/ },

/***/ "./src/app/_services/course.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var CourseService = (function () {
    function CourseService(http) {
        this.http = http;
        this.apiUrl = 'https://api.purdue.io/odata';
        this.termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
    }
    /**************************************************
     * 				Class Searching
     **************************************************/
    CourseService.prototype.getAllMajors = function () {
        var filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        var abbrOrder = ')))&$orderby=Abbreviation%20asc';
        var detailedUrl = this.apiUrl + filterUrl + this.termId + abbrOrder;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getMajorCourses = function (majorId) {
        // todo: need to change later
        var filterUrl = '/Courses/?$filter=(Classes/any(c:%20c/Term/TermId%20eq%20';
        var major = '))%20and%20Subject/SubjectId%20eq%20' + majorId;
        var order = '&$orderby=Number%20asc';
        var detailedUrl = this.apiUrl + filterUrl + this.termId + major + order;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    //
    // getCoursesDetails(courseId: string) {
    //     var filterUrl = '/Classes?$filter=Course/CourseId%20eq%20';
    //     var midUrl = '%20and%20Term/TermId%20eq%20';
    //     var expand = '&$expand=Term,Sections($expand=Meetings($expand=Instructors,Room($expand=Building)))';
    //     var detailedUrl = this.apiUrl + filterUrl + courseId + midUrl + this.termId + expand;
    //     return this.http.get(detailedUrl)
    //         .map((res: Response) => res.json());
    // }
    /**************************************************
     * 				Classrooms
     **************************************************/
    /**
    * Join a class
    * JSON Format:
    * {
    * 	"course": "...",
    * 	"professor": "...",
    * 	"userName": "..."
    * }
    */
    CourseService.prototype.joinClass = function (courseName, professor, userName) {
        var url = '/course/join';
        var body = { "course": courseName, "professor": professor, "userName": userName };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getCourseDetails = function (courseName) {
        var url = '/course';
        var body = { "course": courseName };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getStudents = function (courseName, professor) {
        var url = '/course/students';
        var body = { "course": courseName, "professor": professor };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getNumOfStudents = function (courseName, professor) {
        var url = '/course/number-of-students';
        var body = { "course": courseName, "professor": professor };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService.prototype.getRMP = function (courseName, professor) {
        var url = '/course/get-RMP';
        var body = { "course": courseName, "professor": professor };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(url, body, { headers: headers }).map(function (res) { return res.json(); });
    };
    CourseService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], CourseService);
    return CourseService;
    var _a;
}());
exports.CourseService = CourseService;


/***/ },

/***/ "./src/app/_services/friend.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var FriendService = (function () {
    function FriendService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Auth', localStorage.getItem('token'));
    }
    /*********************** Get, Add, Request or Filter Friend ***********************/
    // get friend list
    FriendService.prototype.getFriends = function (username) {
        var url = 'users/get-friends';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // send friend request
    FriendService.prototype.sendFriendReq = function (senderName, receiverName) {
        var url = 'users/send-friend-request';
        var body = { "senderName": senderName, "receiverName": receiverName };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // get friend requests
    FriendService.prototype.getFriendReq = function (username) {
        var url = 'users/get-friend-requests';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // get friend invitations
    FriendService.prototype.getFriendInvitations = function (username) {
        var url = 'users/get-friend-invitations';
        var body = { "userName": username };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // Accept Or Decline Request
    // need to update info of status code
    FriendService.prototype.responseToRequest = function (user, sender, status_code) {
        var url = 'users/invitation-accept-or-not';
        var body = { "sender": sender, "receiver": user, "status_code": status_code };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    /**
    * JSON Format: {
    * 		"userName": "...",
    * 		"course": "...",
    * 		"professor": "...",
    * 		"preference" : {
    * 			"nationality": "...",
    * 			"hobby": "...",
    * 			"language": "..."
    * 		}
    */
    FriendService.prototype.filterStudents = function (preference, userName, course, professor) {
        var url = 'users/find-friends';
        var body = {
            "userName": userName,
            "course": course,
            "professor": professor,
            "preference": preference
        };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    /************* Delete Friend *************/
    FriendService.prototype.unFriend = function (murder, victim) {
        var url = 'users/delete-friend';
        var body = { "sender": murder, "receiver": victim };
        return this.http.post(url, body, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    FriendService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], FriendService);
    return FriendService;
    var _a;
}());
exports.FriendService = FriendService;


/***/ },

/***/ "./src/app/_services/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/_services/authentication.service.ts"));
__export(__webpack_require__("./src/app/_services/user.service.ts"));
__export(__webpack_require__("./src/app/_services/alert.service.ts"));
__export(__webpack_require__("./src/app/_services/profile.service.ts"));
__export(__webpack_require__("./src/app/_services/course.service.ts"));
__export(__webpack_require__("./src/app/_services/password.service.ts"));
__export(__webpack_require__("./src/app/_services/rmp.service.ts"));
__export(__webpack_require__("./src/app/_services/friend.service.ts"));
__export(__webpack_require__("./src/app/_services/classroom.service.ts"));
__export(__webpack_require__("./src/app/_services/popup.service.ts"));


/***/ },

/***/ "./src/app/_services/password.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var PasswordService = (function () {
    function PasswordService(http) {
        this.http = http;
    }
    PasswordService.prototype.verificationCheck = function (model) {
        var url = '/users/checkcode';
        var body = {
            "email": model.email,
            "verificationcode": model.verificationcode
        };
        return this.http.post(url, body);
    };
    PasswordService.prototype.forgotPassword = function (model) {
        var _this = this;
        var url = '/users/reset?email=' + model.email;
        var body = {
            "email": model.email
        };
        return this.http.post(url, body)
            .map(function (res) { return _this.extractData(res); });
    };
    PasswordService.prototype.resetPassword = function (model) {
        var _this = this;
        var url = '/users/newpassword';
        var body = {
            "email": model.email,
            "newpassword": model.newpassword
        };
        return this.http.put(url, body)
            .map(function (res) { return _this.extractData(res); });
    };
    PasswordService.prototype.extractData = function (res) {
        var body = res.json();
        localStorage.setItem('profile', JSON.stringify(body));
        return body.data || {};
    };
    PasswordService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], PasswordService);
    return PasswordService;
    var _a;
}());
exports.PasswordService = PasswordService;


/***/ },

/***/ "./src/app/_services/popup.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var bootstrap_1 = __webpack_require__("./node_modules/angular2-modal/plugins/bootstrap/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var PopupService = (function () {
    function PopupService(modal, profileService) {
        this.modal = modal;
        this.profileService = profileService;
        this.profile = {
            "extra": {
                "language": [],
                "hobby": []
            },
            "profile": {
                "major": "Unknown",
                "birthday": "",
                "nationality": "Unknown",
                "gender": "Unknown",
                "visibility": true,
            }
        };
    }
    PopupService.prototype.popUser = function (userName) {
        var _this = this;
        this.profileService.getProfile(userName).subscribe(function (data) { _this.profile = data; });
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('User Profile')
            .body("\n            <h4>{{userName}}</h4>\n            ")
            .open();
    };
    PopupService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof bootstrap_1.Modal !== 'undefined' && bootstrap_1.Modal) === 'function' && _a) || Object, (typeof (_b = typeof index_1.ProfileService !== 'undefined' && index_1.ProfileService) === 'function' && _b) || Object])
    ], PopupService);
    return PopupService;
    var _a, _b;
}());
exports.PopupService = PopupService;


/***/ },

/***/ "./src/app/_services/profile.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
    }
    /**
    * JSON Format: {
    * 		"userName": "...",
    * }
    */
    ProfileService.prototype.getProfile = function (userName) {
        var profileUrl = '/profile';
        var body = { "userName": userName };
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.post(profileUrl, body, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    /**
     * JSON Format: {
     * 		"userName": "...",
     * 		"major": "...",
     * 		"language": "...",
     * 		"birthday": "...",
     *		"hobby": "...",
     * 		"visibility": "..."
     * }
     */
    ProfileService.prototype.editProfile = function (userName, profile) {
        var url = '/profile/update';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        var body = {
            "userName": userName,
            "major": profile.profile.major,
            "visibility": profile.profile.visibility,
            "birthday": profile.profile.birthday,
            "gender": profile.profile.gender,
            "nation": profile.profile.nationality,
            "language": profile.extra.language,
            "hobby": profile.extra.hobby
        };
        console.log(body);
        return this.http.post(url, body, {
            headers: headers
        })
            .map(function (res) { return res.json(); });
    };
    ProfileService.prototype.getAllLanguages = function () {
        var url = '/profile/languages';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, { headers: headers }).map(function (res) { return res.json(); });
    };
    ProfileService.prototype.getAllHobbies = function () {
        var url = '/profile/hobbies';
        var headers = new http_1.Headers();
        headers.append('Auth', localStorage.getItem('token'));
        return this.http.get(url, { headers: headers }).map(function (res) { return res.json(); });
    };
    ProfileService.prototype.getAllMajors = function () {
        var apiUrl = 'http://api.purdue.io/odata';
        var termId = 'c543a529-fed4-4fd0-b185-bd403106b4ea';
        var filterUrl = '/Subjects/?$filter=(Courses/any(c:%20c/Classes/any(cc:%20cc/Term/TermId%20eq%20';
        var abbrOrder = ')))&$orderby=Abbreviation%20asc';
        var detailedUrl = apiUrl + filterUrl + termId + abbrOrder;
        return this.http.get(detailedUrl).map(function (res) { return res.json(); });
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ProfileService);
    return ProfileService;
    var _a;
}());
exports.ProfileService = ProfileService;


/***/ },

/***/ "./src/app/_services/rmp.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
__webpack_require__("./node_modules/rxjs/add/operator/map.js");
var RMPService = (function () {
    function RMPService(http) {
        this.http = http;
    }
    RMPService.prototype.getProfessorInfo = function (name) {
        var rmp_url = 'https://api.morph.io/chrisguags/ratemyprofessors/data.json';
        var params = {
            // Keep this key secret!
            key: 'xABz9pgTrRX6JVP6fGfI',
            query: "select * from 'data' where College = 'Purdue' and Name = '" + name + "'"
        };
        return this.http.get(rmp_url + '?' + $.param(params)).map(function (response) { return response.json(); });
    };
    RMPService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], RMPService);
    return RMPService;
    var _a;
}());
exports.RMPService = RMPService;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/_services/user.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/@angular/http/index.js");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.create = function (user) {
        return this.http.post('/users/', user).map(function (response) { return response.json(); });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
exports.UserService = UserService;


/***/ },

/***/ "./src/app/login/forgot_password.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\t<main id=\"content\" class=\"widget-login-container\" role=\"main\">\n\t<div class=\"row\">\n\t\t<div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\n\t\t\t<h5 class=\"widget-login-logo animated fadeInUp\">\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\n\t\t\t\tiStudy\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\n\t\t\t</h5>\n\t\t\t<section class=\"widget widget-login animated fadeInUp\">\n\t\t\t\t<header>\n\t\t\t\t\t<h3>Reset Password</h3>\n\t\t\t\t</header>\n\t\t\t\t<div class=\"widget-body\">\n\n\t\t\t\t\t<form class=\"login-form mt-lg\" (ngSubmit)=\"f.form.valid && forgotPassword()\" #f=\"ngForm\" novalidate>\n\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"!sent && !verified\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"model.email\" placeholder=\"Email\" required>\n                            <div *ngIf=\"f.submitted && !email\" class=\"help-block\">email is required</div>\n\t\t\t\t\t\t</div>\n\n                        <div class=\"form-group\" *ngIf=\"sent\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"email\" disabled=\"disabled\" id=\"disabled-input\" placeholder=\"{{model.email}}\" required>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"form-group\" *ngIf=\"sent && !verified\">\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"text\" name=\"password\" [(ngModel)]=\"model.verificationcode\" placeholder=\"Your Verification Code In Your Email\" required>\n                            <div *ngIf=\"f.submitted && !verificationcode\" class=\"help-block\">code is required</div>\n\t\t\t\t\t\t</div>\n\n                        <div class=\"form-group\" *ngIf=\"verified\">\n\t\t\t\t\t\t\t<input class=\"form-control\" type=\"password\" name=\"newpassword\" [(ngModel)]=\"model.newpassword\" placeholder=\"New Password\" required>\n                            <div *ngIf=\"f.submitted && !newpassword\" class=\"help-block\">password is required</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"clearfix\">\n\t\t\t\t\t\t\t<div class=\"btn-toolbar pull-xs-right m-t-1\">\n\t\t\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-inverse btn-sm\" type=\"submit\">Submit</button>\n\t\t\t\t\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n\t\t\t\t\t\t\t\t<button [routerLink]=\"['/login']\" class=\"btn btn-default btn-sm\">\n\t\t\t\t\t\t\t\t\tBack\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"row m-t-1\">\n                            <div class=\"col-md-6 pull-md-6\"></div>\n\t\t\t\t\t\t\t<div class=\"col-md-6 pull-md-6\">\n\t\t\t\t\t\t\t\t<a class=\"mr-n-lg\" [routerLink]=\"['/login/register']\">Don't have an account?</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</div>\n\t</main>\n\t<footer class=\"page-footer\">\n\t\t2016 &copy; iStudy Team\n\t</footer>\n</div>"

/***/ },

/***/ "./src/app/login/forgot_password.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var ForgotPassword = (function () {
    function ForgotPassword(router, passwordService, alertService) {
        this.router = router;
        this.passwordService = passwordService;
        this.alertService = alertService;
        this.model = {
            "email": "",
            "verificationcode": "",
            "newpassword": ""
        };
        this.sent = false;
        this.verified = false;
        this.loading = false;
    }
    ForgotPassword.prototype.ngOnInit = function () { };
    ForgotPassword.prototype.forgotPassword = function () {
        var _this = this;
        if (!this.sent) {
            this.passwordService.forgotPassword(this.model)
                .subscribe(function (data) {
                _this.sent = true;
                _this.loading = false;
                _this.alertService.success("Sent verification code to your email!");
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else if (this.sent && !this.verified) {
            this.passwordService.verificationCheck(this.model)
                .subscribe(function (data) {
                _this.verified = true;
                _this.loading = false;
                _this.alertService.success("Reset your password");
            }, function (error) {
                _this.alertService.error(error);
            });
        }
        else {
            this.passwordService.resetPassword(this.model)
                .subscribe(function (data) {
                _this.loading = false;
                _this.alertService.success("Successfully reset the password!");
                _this.router.navigate(['/login']);
            });
        }
    };
    ForgotPassword = __decorate([
        core_1.Component({
            moduleId: module.i,
            template: __webpack_require__("./src/app/login/forgot_password.component.html"),
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof index_1.PasswordService !== 'undefined' && index_1.PasswordService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object])
    ], ForgotPassword);
    return ForgotPassword;
    var _a, _b, _c;
}());
exports.ForgotPassword = ForgotPassword;


/***/ },

/***/ "./src/app/login/login.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Login = (function () {
    function Login(router, authenticationService, alertService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    Login.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
    };
    Login.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(function (data) {
            _this.router.navigate(['/app/dashboard']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            template: __webpack_require__("./src/app/login/login.template.html"),
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof index_1.AuthenticationService !== 'undefined' && index_1.AuthenticationService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object])
    ], Login);
    return Login;
    var _a, _b, _c;
}());
exports.Login = Login;


/***/ },

/***/ "./src/app/login/login.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var common_1 = __webpack_require__("./node_modules/@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/index.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var login_component_1 = __webpack_require__("./src/app/login/login.component.ts");
var register_component_1 = __webpack_require__("./src/app/login/register.component.ts");
var forgot_password_component_1 = __webpack_require__("./src/app/login/forgot_password.component.ts");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
exports.routes = [
    { path: '', component: login_component_1.Login, pathMatch: 'full' },
    { path: 'register', component: register_component_1.Register },
    { path: 'reset', component: forgot_password_component_1.ForgotPassword }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    LoginModule.routes = exports.routes;
    LoginModule = __decorate([
        core_1.NgModule({
            declarations: [
                login_component_1.Login,
                register_component_1.Register,
                forgot_password_component_1.ForgotPassword
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
            ],
            providers: [
                index_1.AlertService,
                index_1.AuthenticationService,
                index_1.UserService,
                index_1.PasswordService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginModule);
    return LoginModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginModule;


/***/ },

/***/ "./src/app/login/login.style.scss":
/***/ function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.login-page {\n  background-color: #ddd; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #818a91;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: 400; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-login {\n  padding: 30px; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h3, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: 400;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  background-color: #eceeef; }\n  .login-form .form-control:focus {\n    background-color: #ddd; }\n"

/***/ },

/***/ "./src/app/login/login.template.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\r\n\t<main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\r\n\t\t\t<h5 class=\"widget-login-logo animated fadeInUp\">\r\n\t\t\t\t<i class=\"fa fa-circle text-gray\"></i>\r\n\t\t\t\tiStudy\r\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\r\n\t\t\t</h5>\r\n\t\t\t<section class=\"widget widget-login animated fadeInUp\">\r\n\t\t\t\t<header>\r\n\t\t\t\t\t<h3>Login to iStudy</h3>\r\n\t\t\t\t</header>\r\n\t\t\t\t<div class=\"widget-body\">\r\n\r\n\t\t\t\t\t<form class=\"login-form mt-lg\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\" name=\"email\" [(ngModel)]=\"model.email\"placeholder=\"Email\" required>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"form-group\">\r\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"pswd\" type=\"password\" name=\"password\" [(ngModel)]=\"model.password\" placeholder=\"Password\" required>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"clearfix\">\r\n\t\t\t\t\t\t\t<div class=\"btn-toolbar pull-xs-right m-t-1\">\r\n\t\t\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-inverse btn-sm\" (click)=\"login()\">Login</button>\r\n\t\t\t\t\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n\t\t\t\t\t\t\t\t<button [routerLink]=\"['/login/reset']\" class=\"btn btn-default btn-sm\">\r\n\t\t\t\t\t\t\t\t\tReset Password\r\n\t\t\t\t\t\t\t\t</button>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class=\"row m-t-1\">\r\n\t\t\t\t\t\t\t<div class=\"col-md-6 push-md-6\">\r\n\t\t\t\t\t\t\t\t<div class=\"clearfix\">\r\n\t\t\t\t\t\t\t\t\t<div class=\"abc-checkbox widget-login-info pull-xs-right\">\r\n\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"checkbox1\" value=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t<label for=\"checkbox1\">Keep me signed in </label>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div class=\"col-md-6 pull-md-6\">\r\n\t\t\t\t\t\t\t\t<a class=\"mr-n-lg\" [routerLink]=\"['/login/register']\">Don't have an account?</a>\r\n\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</form>\r\n\t\t\t\t</div>\r\n\t\t\t</section>\r\n\t\t</div>\r\n\t</div>\r\n\t</main>\r\n\t<footer class=\"page-footer\">\r\n\t\t2016 &copy; iStudy Team\r\n\t</footer>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/login/register.component.html":
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\t<main id=\"content\" class=\"widget-login-container\" role=\"main\">\n\t<div class=\"row\">\n\t\t<div class=\"col-xl-4 col-md-6 col-xs-10 offset-xl-4 offset-md-3 offset-xs-1\">\n\t\t\t<h5 class=\"widget-login-logo animated fadeInUp\">\n\t\t\t\t<i class=\"fa fa-circle text-warning\"></i>\n\t\t\t\tiStudy\n\t\t\t\t<i class=\"fa fa-circle text-grey\"></i>\n\t\t\t</h5>\n\t\t\t<section class=\"widget widget-login animated fadeInUp\">\n\t\t\t\t<header>\n\t\t\t\t\t<h3>Create an Account</h3>\n\t\t\t\t</header>\n\t\t\t\t<div class=\"widget-body\">\n\t\t\t\t\t<form class=\"login-form mt-lg\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" name=\"email\" [(ngModel)]=\"model.userName\" placeholder=\"Username\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\" name=\"email\" [(ngModel)]=\"model.email\" placeholder=\"Email\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"pswd\" type=\"password\" name=\"password\" [(ngModel)]=\"model.password\" placeholder=\"Password\" required>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"clearfix\">\n\t\t\t\t\t\t\t<div class=\"btn-toolbar pull-xs-right m-t-1\">\n\t\t\t\t\t\t\t\t<button [disabled]=\"loading\" class=\"btn btn-inverse btn-sm\" (click)=\"register()\">Register</button>\n\t\t\t\t\t\t\t\t<img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n\t\t\t\t\t\t\t\t<button [routerLink]=\"['/login']\" class=\"btn btn-default btn-sm\">\n\t\t\t\t\t\t\t\t\tLogin\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</div>\n\t</div>\n\t</main>\n\t<footer class=\"page-footer\">\n\t\t2016 &copy; iStudy Team\n\t</footer>\n</div>\n"

/***/ },

/***/ "./src/app/login/register.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/index.js");
var index_1 = __webpack_require__("./src/app/_services/index.ts");
var Register = (function () {
    function Register(router, userService, alertService) {
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.model = {};
        this.loading = false;
    }
    Register.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(function (data) {
            // set success message and pass true paramater to persist the message after redirecting to the login page
            _this.alertService.success('Registration successful', true);
            _this.router.navigate(['/login']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    Register = __decorate([
        core_1.Component({
            selector: 'register',
            moduleId: module.i,
            template: __webpack_require__("./src/app/login/register.component.html"),
            styles: [__webpack_require__("./src/app/login/login.style.scss")],
            encapsulation: core_1.ViewEncapsulation.None,
            host: {
                class: 'login-page app'
            }
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof index_1.UserService !== 'undefined' && index_1.UserService) === 'function' && _b) || Object, (typeof (_c = typeof index_1.AlertService !== 'undefined' && index_1.AlertService) === 'function' && _c) || Object])
    ], Register);
    return Register;
    var _a, _b, _c;
}());
exports.Register = Register;


/***/ }

});
//# sourceMappingURL=1.map