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
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var NotesService = (function () {
    function NotesService(http) {
        this.http = http;
    }
    NotesService.prototype.newNote = function (note, contactId) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=" + contactId, JSON.stringify(note), options)
            .map(function (res) { return res; })
            .catch(function (err) { return _this.handleError(err); });
    };
    NotesService.prototype.updateNote = function (note) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json'
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put("http://angularnotes-angularbros.azurewebsites.net/api/Notes/" + note.id, JSON.stringify(note), options)
            .map(function (res) { return res; })
            .catch(function (err) { return _this.handleError(err); });
    };
    NotesService.prototype.getNotes = function () {
        return this.http.get("http://angularnotes-angularbros.azurewebsites.net/api/Notes")
            .map(function (response) {
            return response.json();
        })
            .catch(function (err) { return err; });
    };
    NotesService.prototype.deleteNote = function (noteId) {
        return this.http.delete("http://angularnotes-angularbros.azurewebsites.net/api/Notes/" + noteId)
            .map(function (response) {
            return response.json();
        })
            .catch(function (err) { return err; });
    };
    NotesService.prototype.getContactNotes = function (id) {
        return this.http.get("http://angularnotes-angularbros.azurewebsites.net/api/Notes?ContactID=" + id)
            .map(function (response) {
            return response.json();
        })
            .catch(function (err) { return err; });
    };
    NotesService.prototype.handleError = function (error) {
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
    return NotesService;
}());
NotesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NotesService);
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map