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
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var QuoteService = (function () {
    function QuoteService(http) {
        this.http = http;
    }
    QuoteService.prototype.getQuotes = function () {
        return this.http.get('http://angularnotes-angularbros.azurewebsites.net/api/Quotes')
            .map(function (response) { return response.json(); })
            .catch(function (err) { return err; });
    };
    QuoteService.prototype.getQuote = function (id) {
        return this.http.get("http://angularnotes-angularbros.azurewebsites.net/api/Quotes/" + id)
            .map(function (response) { return response.json(); })
            .catch(function (err) { return err; });
    };
    QuoteService.prototype.getCompanyQuotes = function (id) {
        return this.http.get("http://angularnotes-angularbros.azurewebsites.net/api/Quotes?CompanyID=" + id)
            .map(function (response) { return response.json(); })
            .catch(function (err) { return err; });
    };
    QuoteService.prototype.createQuote = function (quote, companyId) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://angularnotes-angularbros.azurewebsites.net/api/Quotes?CompanyID=" + companyId, JSON.stringify(quote), options)
            .map(function (response) { return response.json(); })
            .catch(function (err) { return _this.handleError(err); });
    };
    QuoteService.prototype.getQuoteLines = function (quoteId) {
        var _this = this;
        return this.http.get("http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines?QuoteID=" + quoteId)
            .map(function (response) {
            console.log('getQuoteLines', response.json());
            return response.json();
        })
            .catch(function (err) { return _this.handleError(err); });
    };
    QuoteService.prototype.updateQuote = function (quote) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put("http://angularnotes-angularbros.azurewebsites.net/api/Quotes/" + quote.ID, JSON.stringify(quote), options)
            .map(function (response) { return response; })
            .catch(function (err) { return _this.handleError(err); });
    };
    QuoteService.prototype.createQuoteLine = function (quoteLine, quote) {
        var _this = this;
        var headers = new http_1.Headers({
            'content-type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post("http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines?QuoteID=" + quote.ID, JSON.stringify(quoteLine), options)
            .map(function (response) { return response; })
            .catch(function (err) { return _this.handleError(err); });
    };
    QuoteService.prototype.updateQuoteLine = function (quoteLine) {
        var _this = this;
        console.log('quotesLine service Update', quoteLine);
        var headers = new http_1.Headers({
            'content-type': 'application/json',
        });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put("http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines/" + quoteLine.ID, JSON.stringify(quoteLine), options)
            .map(function (response) { return response; })
            .catch(function (err) { return _this.handleError(err); });
    };
    QuoteService.prototype.deleteQuote = function (quoteId) {
        return this.http.delete("http://angularnotes-angularbros.azurewebsites.net/api/Quotes/" + quoteId)
            .map(function (response) { return response.json(); })
            .catch(function (err) { return err; });
    };
    QuoteService.prototype.deleteQuoteLine = function (quoteId) {
        return this.http.delete("http://angularnotes-angularbros.azurewebsites.net/api/QuoteLines/" + quoteId)
            .map(function (response) { return response.json(); })
            .catch(function (err) { return err; });
    };
    QuoteService.prototype.handleError = function (error) {
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
    return QuoteService;
}());
QuoteService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuoteService);
exports.QuoteService = QuoteService;
//# sourceMappingURL=quotes.service.js.map