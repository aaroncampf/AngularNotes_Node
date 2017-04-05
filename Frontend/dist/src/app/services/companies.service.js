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
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/http");
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
    }
    ;
    CompanyService.prototype.getCompanies = function () {
        var _this = this;
        return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/companies')
            .map(function (results) { return results.json(); })
            .catch(function (err) { return _this.handleError(err); });
    };
    // public getCompany(id: number): Observable<any> {
    // 	return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/companies/' + id)
    // 		.map(results => results.json())
    // 		.catch(err => this.handleError(err));
    // }
    CompanyService.prototype.updateCompany = function (company) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put("http://angularnotes-angularbros.azurewebsites.net/api/companies/" + company.ID, JSON.stringify(company), options)
            .map(function (res) {
            console.log('update', res.json());
            return res.json();
        })
            .catch(function (err) { return _this.handleError(err); });
    };
    CompanyService.prototype.createCompany = function () {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://angularnotes-angularbros.azurewebsites.net/api/companies', JSON.stringify({}), options)
            .map(function (res) {
            return res.json();
        })
            .catch(function (err) { return _this.handleError(err); });
    };
    CompanyService.prototype.deleteCompany = function (id) {
        var _this = this;
        return this.http.delete('http://angularnotes-angularbros.azurewebsites.net/api/companies/' + id)
            .map(function (results) { return results.json(); })
            .catch(function (err) { return _this.handleError(err); });
    };
    CompanyService.prototype.handleError = function (error) {
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
    return CompanyService;
}());
CompanyService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=companies.service.js.map