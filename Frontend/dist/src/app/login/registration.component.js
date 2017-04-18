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
var socket_service_1 = require("../services/socket.service");
var email_regex_1 = require("../regex/email.regex");
var ng2_toastr_1 = require("ng2-toastr");
var router_1 = require("@angular/router");
var registration_service_1 = require("../services/registration.service");
var data_share_service_1 = require("../services/data-share.service");
var RegistrationComponent = (function () {
    function RegistrationComponent(socketService, registrationService, router, toastr, dataShare) {
        this.socketService = socketService;
        this.registrationService = registrationService;
        this.router = router;
        this.toastr = toastr;
        this.dataShare = dataShare;
        this.user = {};
        this.password = '';
        this.passwordToMatch = '';
        this.nameControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.passwordControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.passwordMatchControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.emailControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(email_regex_1.EmailRegEx)]);
        this.phoneControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(255)]);
        this.passwordGroup = new forms_1.FormGroup({
            passwordControl: this.passwordControl,
            passwordMatchControl: this.passwordMatchControl
        });
        this.registrationGroup = new forms_1.FormGroup({
            emailControl: this.emailControl,
            phoneControl: this.phoneControl
        });
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        this.dataShare.isNavVisible(false);
    };
    //todo Server REF
    RegistrationComponent.prototype.registerUser = function (user, password, server) {
        var _this = this;
        if (server === void 0) { server = 'localhost:1729'; }
        var formData = {};
        formData.username = user.userName;
        formData.email = user.email;
        formData.password = password;
        //todo Formdata commign back empty
        this.registrationService.register({})
            .subscribe(function (response) { return response; });
        this.socketService.responseSocket('register.user', formData, server)
            .subscribe(function (res) { return _this.toastr.success('registered' + res); });
    };
    ;
    RegistrationComponent.prototype.loginGuest = function () {
    };
    ;
    RegistrationComponent.prototype.passMatch = function () {
        if (this.password === this.passwordToMatch) {
            this.passMatched = true;
        }
        else {
            this.passMatched = false;
        }
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: 'RegistrationComponent',
        template: "\n\t\t<h2>Registration</h2>\n\t\t<form [formGroup]=\"registrationGroup\">\n\t\t\t<input-component [(model)]=\"user.userName\" [control]=\"nameControl\"\n\t\t\t\t\t\t\t placeholder=\"Your Name Please\"></input-component>\n\t\t\t<input-component [(model)]=\"user.email\" [control]=\"emailControl\"\n\t\t\t\t\t\t\t placeholder=\"Your Email Please\"></input-component>\n\t\t</form>\n\t\t<input class=\"col-xs-9\" [class.invalid]=\"!passMatched && password.length < 7\" type=\"password\"\n\t\t\t   [(ngModel)]=\"password\" (ngModelChange)=\"passMatch(password, passwordToMatch)\"\n\t\t\t   placeholder=\"Choose A Password\" [formControl]=\"passwordControl\"/>\n\t\t<input class=\"col-xs-9\" [class.invalid]=\"!passMatched && passwordToMatch.length < 7\" type=\"password\"\n\t\t\t   [(ngModel)]=\"passwordToMatch\" (ngModelChange)=\"passMatch(password, passwordToMatch)\"\n\t\t\t   placeholder=\"Re-Enter The Password\" [formControl]=\"passwordMatchControl\"/>\n\t\t<button (click)=\"registerUser(user, password)\" class=\"btn btn-large\" type=\"button\"\n\t\t\t\t[disabled]=\"!passMatched || password.length < 7 || passwordToMatch.length < 7\"\n\t\t\t\t[class.disabled]=\"!passMatched || password.length < 7 || passwordToMatch.length < 7\">Register\n\t\t</button>\n\t\t<button class=\"btn btn-large\" type=\"button\" (click)=\"loginGuest()\">Proceed as Guest</button>\n\t"
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService,
        registration_service_1.RegistrationService,
        router_1.Router,
        ng2_toastr_1.ToastsManager,
        data_share_service_1.DataShareService])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map