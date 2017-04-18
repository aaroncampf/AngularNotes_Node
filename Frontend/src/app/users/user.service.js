"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var io = require("socket.io-client");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.socket = io.connect('localhost:1729', {
            reconnection: true
        });
    }
    UserService.prototype.getSettings = function (id) {
        this.socket.connect('localhost:1729');
        this.socket.emit('get.user', id);
        return rxjs_1.Observable.of(this.socket.on('get.user', function (response) { return response; }, function (error) { return console.log('getSettings error', error); }));
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable()
], UserService);
exports.UserService = UserService;
