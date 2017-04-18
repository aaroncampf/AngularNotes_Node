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
var servers_map_1 = require("../models/servers.map");
var AuthService = (function () {
    function AuthService(socketService) {
        this.socketService = socketService;
    }
    //todo: Return Token
    AuthService.prototype.logIn = function (credentials, user) {
        this.socketService.responseSocket('auth.logIn', { credentials: credentials, user: user }, 'localhost:3591')
            .subscribe(function (response) { return response; });
    };
    AuthService.prototype.logOut = function (user) {
        this.socketService.responseSocket('auth.logOut', { user: user }, 'localhosr:3591')
            .subscribe(function (response) { return response; });
    };
    AuthService.prototype.isLoggedIn = function (user) {
        console.log('server map', servers_map_1.SERVER_MAP);
        this.socketService.responseSocket('auth.isLoggedIn', user, 'localhost:3591')
            .subscribe(function (res) {
            return res;
        });
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [socket_service_1.SocketService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map