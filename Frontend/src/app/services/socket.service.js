"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var IO = require("socket.io-client");
var rxjs_1 = require("rxjs");
var SocketService = (function () {
    function SocketService() {
        this.io = IO;
    }
    SocketService.prototype.hotSocketCouple = function (path, body, modulePort) {
        var _this = this;
        this.io.connect(modulePort);
        return rxjs_1.Observable.of(function (res) {
            _this.io.emit(path, body);
            _this.io.on(path, function (response) {
                console.log(response);
                res(response);
            });
        });
    };
    return SocketService;
}());
SocketService = __decorate([
    core_1.Injectable()
], SocketService);
exports.SocketService = SocketService;
