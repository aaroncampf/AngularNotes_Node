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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var socket_service_1 = require("../services/socket.service");
var email_regex_1 = require("../regex/email.regex");
var ng2_toastr_1 = require("ng2-toastr");
var SHA256 = require("crypto-js/sha256");
var router_1 = require("@angular/router");
var RegistrationComponent = (function () {
    function RegistrationComponent(socketService, router, toastr) {
        this.socketService = socketService;
        this.router = router;
        this.toastr = toastr;
        this.user = {};
        this.nameControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.passwordControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.passwordMatchControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.emailControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(email_regex_1.EmailRegEx)]);
        this.phoneControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(255)]);
        this.registrationGroup = new forms_1.FormGroup({
            passwordControl: this.passwordControl,
            passwordMatchControl: this.passwordMatchControl,
            emailControl: this.emailControl,
            phoneControl: this.phoneControl
        });
    }
    RegistrationComponent.prototype.registerUser = function (user, password, module) {
        var _this = this;
        var body = {
            hash: SHA256(password),
            model: user
        };
        this.socketService.hotSocketCouple('register.user', body, 'localhost:1729')
            .subscribe(function (res) {
            _this.toastr.success('registered' + res);
        });
    };
    ;
    RegistrationComponent.prototype.loginGuest = function () {
    };
    ;
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: 'Registration',
        template: "\t\t\n\t<h4>Welcome</h4>, please register or choose, \"Proceed as Guest\". \n\t<form [formGroup]=\"registrationGroup\" (ngSubmit)=\"registerUser(user, passwordControl.value)\">\n\t\t<input-component label=\"User Name\" [(model)]=\"user.name\" [control]=\"nameControl\" placeholder = \"Your Name Please\"></input-component>\n\t\t<input-component label=\"User Email\" [(model)]=\"user.email\" [control]=\"emailControl\" placeholder = \"Your Email Please\"></input-component>\n\t\t<input-component label=\"User Phone\" [(model)]=\"user.phone\" [control]=\"phoneControl\" placeholder = \"Your Phone Please\"></input-component>\n\t\t<input-component label=\"Choose Password\" [(model)]=\"password\" [control]=\"passwordControl\" placeholder = \"Choose a Password\"></input-component>\n\t\t<input-component label=\"Password Again\" [(model)]=\"passwordMatch\" [control]=\"passwordMatchControl\" placeholder = \"Re-Enter Password\"></input-component>\n\t\t<button class=\"btn btn-large\" type=\"button\" [disabled]=\"registrationGroup.invalid || passwordControl.value === passwordMatchControl.value\" [class.disabled]=\"registrationGroup.invalid || passwordControl.value === passwordMatchControl.value\">Register</button>\n\t\t<button class=\"btn btn-large\" type=\"reset\">Clear</button>\n\t\t<button class=\"btn btn-large\" type=\"button\" (click)=\"loginGuest()\">Proceed as Guest</button>\n\t</form>\n\t"
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService,
        router_1.Router,
        ng2_toastr_1.ToastsManager])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map