"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var InputComponent = (function () {
    function InputComponent() {
        this.placeholder = '';
        this.control = new forms_1.FormControl;
        this.modelChange = new core_1.EventEmitter();
    }
    return InputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "password", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], InputComponent.prototype, "control", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputComponent.prototype, "modelChange", void 0);
InputComponent = __decorate([
    core_1.Component({
        selector: 'input-component',
        template: "\n\t<div class=\"row\">\n\t\t<div *ngIf=\"!!label\" class=\"col-xs-3\">\n\t\t\t<strong>{{label}}</strong>\n\t\t</div>\n\t\t<div *ngIf=\"!!label\" class=\"col-xs-9\">\n\t\t\t<input type=\"text\" class=\"form-control\" [ngModel]=\"model\" (blur)=\"modelChange.emit($event.target.value)\" [formControl]=\"control\" [placeholder]=\"placeholder\"/>\n\t\t</div>\n\t\t<div *ngIf=\"!label\" class=\"col-xs-12\">\n\t\t\t <input type=\"text\" class=\"form-control\" [ngModel]=\"model\" (blur)=\"modelChange.emit($event.target.value)\" [formControl]=\"control\" [placeholder]=\"placeholder\"/>\n\t\t</div>\n\t</div>\n\t"
    })
], InputComponent);
exports.InputComponent = InputComponent;
//# sourceMappingURL=input.component.js.map