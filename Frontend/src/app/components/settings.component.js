"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FIXTURE_ID_1 = require("../models/FIXTURE_ID");
var SettingsComponent = (function () {
    function SettingsComponent(user, dataShareService, socketService) {
        this.user = user;
        this.dataShareService = dataShareService;
        this.socketService = socketService;
        this.userID = FIXTURE_ID_1.FIXTURE_USER_ID;
        this.userData = {};
        this.nameControl = new forms_1.FormControl('', []);
        this.emailControl = new forms_1.FormControl('', []);
        this.addressControl = new forms_1.FormControl('', []);
        this.phoneControl = new forms_1.FormControl('', []);
        this.companyNameControl = new forms_1.FormControl('', []);
        this.companyWebsiteControl = new forms_1.FormControl('', []);
        this.companyPhoneControl = new forms_1.FormControl('', []);
        this.cellPhoneControl = new forms_1.FormControl('', []);
        this.companyFaxControl = new forms_1.FormControl('', []);
        this.settingsGroup = new forms_1.FormGroup({
            nameControl: this.nameControl,
            emailControl: this.emailControl,
            addressControl: this.addressControl,
            phoneControl: this.phoneControl,
            companyNameControl: this.companyNameControl,
            companyWebsiteControl: this.companyWebsiteControl,
            companyPhoneControl: this.companyPhoneControl,
            cellPhoneControl: this.cellPhoneControl,
            companyFaxControl: this.companyFaxControl
        });
        this.savePath = 'post.user';
        this.getPath = 'get.userById';
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketService.hotSocketCouple(this.getPath, { id: FIXTURE_ID_1.FIXTURE_USER_ID }, 'localhost:1729')
            .subscribe(function (user) {
            console.log('USER', user);
            _this.userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone
            };
        }, function (error) { return console.log('error', error); });
        this.dataShareService.isNavVisible(false);
    };
    ;
    SettingsComponent.prototype.update = function (key, value) {
        console.log('value', value);
        // todo refoactor modulePort
        this.socketService.hotSocketCouple(this.savePath, { id: this.userData.id, attributes: (_a = {}, _a[key] = value, _a) }, 'localhost:1729')
            .subscribe(function (response) {
            console.log(response);
        });
        var _a;
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.dataShareService.isNavVisible(true);
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        selector: 'settings-component',
        template: "\n\t\t<button class=\"btn btn-default\" [routerLink]=\"['../']\">Back</button>\n\t\t<h4>User Settings</h4>\n\t\t<div class=\"col-xs-11\">\n\t\t\t<input-component label=\"Name\" [model]=\"userData.name\" (modelChange)=\"update('name', $event)\" [control]=\"nameControl\"></input-component>\n\t\t\t<input-component label=\"Email\" [model]=\"userData.email\" (modelChange)=\"update('email', $event)\"[control]=\"emailControl\"></input-component>\n\t\t\t<input-component label=\"Address\" [model]=\"userData.address\" (modelChange)=\"update('address', $event)\" [control]=\"addressControl\"></input-component>\n\t\t\t<input-component label=\"Phone\" [model]=\"userData.phone\" (modelChange)=\"update('phone', $event)\" [control]=\"phoneControl\"></input-component>\n\t\t</div>\n\t"
    })
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
