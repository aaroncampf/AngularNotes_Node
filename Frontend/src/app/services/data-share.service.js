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
var DataShareService = (function () {
    function DataShareService() {
        this.activeCompanySource = new rxjs_1.BehaviorSubject({});
        this.activeContactSource = new rxjs_1.BehaviorSubject({});
        this.activeQuoteSource = new rxjs_1.BehaviorSubject({});
        this.activeNavVisibleSource = new rxjs_1.BehaviorSubject(true);
        this.companySelected$ = this.activeCompanySource.asObservable();
        this.contactSelected$ = this.activeContactSource.asObservable();
        this.quoteSelected$ = this.activeQuoteSource.asObservable();
        this.navVisible$ = this.activeNavVisibleSource.asObservable();
    }
    DataShareService.prototype.sendCompany = function (company) {
        this.activeCompanySource.next(company);
    };
    DataShareService.prototype.sendContact = function (contact) {
        this.activeContactSource.next(contact);
    };
    DataShareService.prototype.sendQuote = function (quote) {
        this.activeQuoteSource.next(quote);
    };
    DataShareService.prototype.isNavVisible = function (state) {
        this.activeNavVisibleSource.next(state);
    };
    return DataShareService;
}());
DataShareService = __decorate([
    core_1.Injectable()
], DataShareService);
exports.DataShareService = DataShareService;
