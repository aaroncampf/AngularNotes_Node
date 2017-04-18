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
var socket_service_1 = require("./socket.service");
var CryptoJs = require("crypto-js");
var auth_service_1 = require("./auth.service");
var rxjs_1 = require("rxjs");
var RegistrationService = (function () {
    function RegistrationService(socketService, authService) {
        this.socketService = socketService;
        this.authService = authService;
        this.crypto = CryptoJs;
    }
    RegistrationService.prototype.register = function (formData) {
        var body = this.hash(formData.password);
        return rxjs_1.Observable.of(this.socketService.responseSocket('user.registration', body, 'localhost:1729')
            .subscribe(function (response) {
            return response;
        }));
    };
    RegistrationService.prototype.hash = function (clearText) {
        var _this = this;
        this.socketService.responseSocket('auth.hashKey', {}, 'localhost:3591')
            .subscribe(function (key) {
            _this.crypto.HmacSHA1(clearText, key);
        });
    };
    return RegistrationService;
}());
RegistrationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [socket_service_1.SocketService, auth_service_1.AuthService])
], RegistrationService);
exports.RegistrationService = RegistrationService;
//# sourceMappingURL=registration.service.js.map