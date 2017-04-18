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
var quotes_service_1 = require("../services/quotes.service");
var data_share_service_1 = require("../services/data-share.service");
var router_1 = require("@angular/router");
var ng2_toastr_1 = require("ng2-toastr");
var QuoteDetailsComponent = (function () {
    function QuoteDetailsComponent(toastr, router, quoteService, dataShareService) {
        this.toastr = toastr;
        this.router = router;
        this.quoteService = quoteService;
        this.dataShareService = dataShareService;
        this.quote = {};
        this.newQuoteLine = {};
        this.quoteLines = [];
    }
    QuoteDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataShareService.quoteSelected$
            .subscribe(function (quote) {
            console.log('quote shared', quote);
            _this.quote = quote;
        });
        this.quoteService.getQuoteLines(this.quote.ID)
            .subscribe(function (quoteLines) {
            console.log('quoteLines', quoteLines);
            _this.quoteLines = quoteLines;
        });
    };
    QuoteDetailsComponent.prototype.removeLine = function (lineId) {
        var _this = this;
        this.quoteService.deleteQuoteLine(lineId)
            .subscribe(function () {
            _this.toastr.warning('Quote line Removed');
            _this.quoteService.getQuoteLines(_this.quote.ID)
                .subscribe(function (quoteLines) { return _this.quoteLines = quoteLines; });
        });
    };
    QuoteDetailsComponent.prototype.addLine = function (quoteLine) {
        var _this = this;
        this.quoteService.createQuoteLine(quoteLine, this.quote)
            .subscribe(function () {
            _this.newQuoteLine = {};
            _this.quoteService.getQuoteLines(_this.quote.ID)
                .subscribe(function (quoteLines) { return _this.quoteLines = quoteLines; });
        });
    };
    QuoteDetailsComponent.prototype.removeQuote = function (quoteID) {
        var _this = this;
        this.quoteService.deleteQuote(quoteID)
            .subscribe(function () {
            _this.toastr.warning('Quote Deleted');
            _this.router.navigate(['/quotes']);
        });
    };
    QuoteDetailsComponent.prototype.updateQuote = function (value, key, quote) {
        quote[key] = value;
        this.quoteService.updateQuote(quote)
            .subscribe(function (res) {
            console.log('update quote', res);
        });
    };
    QuoteDetailsComponent.prototype.updateQuoteLine = function (value, prop, quoteLine) {
        quoteLine[prop] = value;
        this.quoteService.updateQuoteLine(quoteLine)
            .subscribe(function () { });
    };
    return QuoteDetailsComponent;
}());
QuoteDetailsComponent = __decorate([
    core_1.Component({
        selector: 'quote-details-component',
        template: "\n\t<div class=\"row\">\n\t\t<div class=\"card\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<button type=\"button\" class=\"btn pull-left\" [routerLink]=\"['/quotes']\">Back</button>\n\t\t\t</div>\n\t\t\t<div class=\"quote-header\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<button type=\"button\" class=\"btn-danger pull-right\" (click)=\"removeQuote(quote.id)\">Delete</button>\n\t\t\t\t\t<div class=\"col-xs-6\">id: {{quote.id}}</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-xs-6\">date: {{quote.date | date: 'MM/dd/yyyy'}}</div>\n\t\t\t\t</div>\n\t\t\t\t<input-component label=\"Name\" [model]=\"quote.Name\" (modelChange)=\"updateQuote($event, 'Name', quote)\"></input-component>\n\t\t\t</div>\n\t\t\t<div *ngFor=\"let line of quoteLines\" class=\"quote-item\">\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<i class=\"glyphicon glyphicon-remove pull-right\" (click)=\"removeLine(line.id)\"></i>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<input-component class=\"col-xs-4\" label=\"Unit\" [model]=\"line.UNIT\" (modelChange)=\"updateQuoteLine($event, 'UNIT', line)\"></input-component>\n\t\t\t\t\t<input-component class=\"col-xs-4\" label=\"Cost\" [model]=\"line.COST\" (modelChange)=\"updateQuoteLine($event,'COST', line)\"></input-component>\n\t\t\t\t\t<input-component class=\"col-xs-4\" label=\"Desc.\" [model]=\"line.DESC\" (modelChange)=\"updateQuoteLine($event, 'DESC', line)\"></input-component>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"quote-item-add\">\n\t\t\t\t<input-component class=\"col-xs-12\" [(model)]=\"newQuoteLine.UNIT\" label=\"Unit\"></input-component>\t\n\t\t\t\t<input-component class=\"col-xs-12\" [(model)]=\"newQuoteLine.COST\" label=\"Cost\"></input-component>\t\n\t\t\t\t<input-component class=\"col-xs-12\" [(model)]=\"newQuoteLine.DESC\" label=\"Desc.\"></input-component>\n\t\t\t\t<button class=\"btn btn-block\" (click)=\"addLine(newQuoteLine)\">ADD LINE</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t"
    }),
    __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
        router_1.Router,
        quotes_service_1.QuoteService,
        data_share_service_1.DataShareService])
], QuoteDetailsComponent);
exports.QuoteDetailsComponent = QuoteDetailsComponent;
//# sourceMappingURL=quote-details.component.js.map