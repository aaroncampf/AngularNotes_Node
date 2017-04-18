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
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var InputRestComponent = (function () {
    function InputRestComponent(http) {
        this.http = http;
        this.placeholder = '';
        this.control = new forms_1.FormControl;
        this.changeModel = new core_1.EventEmitter();
    }
    InputRestComponent.prototype.update = function (updateValue, id) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        var updateObj = this.currentModel;
        updateObj[this.propKey] = this.model;
        return this.http.put(this.apiPath + id, JSON.stringify(updateObj), options)
            .map(function (res) { return res; })
            .catch(function (err) { return _this.handleError(err); });
    };
    InputRestComponent.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.err || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return rxjs_1.Observable.throw(errMsg);
    };
    InputRestComponent.prototype.updateTrigger = function () {
        if (!!this.idNumber) {
            this.update(this.model, this.idNumber).subscribe(function (res) { return console.log(res); });
        }
    };
    return InputRestComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputRestComponent.prototype, "idNumber", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputRestComponent.prototype, "apiPath", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputRestComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputRestComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputRestComponent.prototype, "propKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], InputRestComponent.prototype, "control", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputRestComponent.prototype, "currentModel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputRestComponent.prototype, "model", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputRestComponent.prototype, "changeModel", void 0);
InputRestComponent = __decorate([
    core_1.Component({
        selector: 'input-rest-component',
        template: "\n\t\t<div class=\"row\">\n\t\t\t<div *ngIf=\"!!label\" class=\"col-xs-2 pull-left\">\n\t\t\t\t<strong>{{label}}</strong>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!!label\" class=\"col-xs-10\">\n\t\t\t\t<input (blur)=\"updateTrigger()\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model\"\n\t\t\t\t\t   [formControl]=\"control\"\n\t\t\t\t\t   [placeholder]=\"placeholder\"/>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!label\" class=\"col-xs-12\">\n\t\t\t\t<input (blur)=\"updateTrigger()\" type=\"text\" class=\"form-control\" [(ngModel)]=\"model\"\n\t\t\t\t\t   [formControl]=\"control\"\n\t\t\t\t\t   [placeholder]=\"placeholder\"/>\n\t\t\t</div>\n\t\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], InputRestComponent);
exports.InputRestComponent = InputRestComponent;
//# sourceMappingURL=input-rest.component.js.map