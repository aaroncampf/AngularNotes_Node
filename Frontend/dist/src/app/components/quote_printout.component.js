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
/**
 * Created by aaron on 3/17/2017.
 */
var core_1 = require("@angular/core");
var quote_line_fixture_1 = require("../models/quote-line.fixture");
var data_share_service_1 = require("../services/data-share.service");
var quotes_service_1 = require("../services/quotes.service");
var socket_service_1 = require("../services/socket.service");
var FIXTURE_ID_1 = require("../models/FIXTURE_ID");
/**
 * Displays a quote as a beautiful printout
 */
var Quotes_Printout = (function () {
    function Quotes_Printout(dataShareService, quoteService, socketService) {
        this.dataShareService = dataShareService;
        this.quoteService = quoteService;
        this.socketService = socketService;
        //TODO: Consider only using [Quote] and not the others
        //TODO: Find out how to order _QuoteLines by Display
        this._Quote = quote_line_fixture_1.QUOTE;
        this._Company = quote_line_fixture_1.COMPANY;
        this._QuoteLines = quote_line_fixture_1.QUOTE_LINES;
        this.settings = {};
        this._Contact = quote_line_fixture_1.CONTACT;
    }
    Quotes_Printout.prototype.ngOnInit = function () {
        var _this = this;
        console.log('hit');
        this.socketService.responseSocket('get.userById', { id: FIXTURE_ID_1.FIXTURE_USER_ID }, 'localhost:1729')
            .subscribe(function (response) {
            console.log('print response', response);
            _this.settings = response;
        });
        this.dataShareService.companySelected$
            .subscribe(function (company) { return _this._Company = company; });
        this.dataShareService.quoteSelected$
            .subscribe(function (quote) {
            _this._Quote = quote;
            _this.quoteService.getQuoteLines(quote.ID)
                .subscribe(function (quoteLines) { return _this._QuoteLines = quoteLines; });
        });
    };
    return Quotes_Printout;
}());
Quotes_Printout = __decorate([
    core_1.Component({
        selector: 'quotes-printout-component',
        template: "\n\t\t<h1 style=\"text-align: center;\">{{settings.companyName}}</h1>\n\t\t<p style=\"text-align: center;\">{{settings.address}}</p>\n\t\t<p style=\"text-align: center;\">{{settings.companyWeb}}</p>\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td style=\"text-align: center;\">Cell: {{settings.phone}}</td>\n\t\t\t\t<td style=\"text-align: center;\">Phone: {{settings.companyPhone}}</td>\n\t\t\t\t<td style=\"text-align: center;\">Fax: {{settings.companyFax}}</td>\n\t\t\t</tr>\n\t\t</table>\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t<b>TO:</b> {{_Company.Name}}<br>\n\t\t\t\t\t\t{{_Contact.Name}}<br>\n\t\t\t\t\t\t{{_Company.Address}}<br>\n\t\t\t\t\t\t{{_Company.Phone}}\n\t\t\t\t\t</p>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<table style=\"float:right\">\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th style=\"background-color:lightblue;text-align: center;\">Salesperson</th>\n\t\t\t\t\t\t\t<th style=\"background-color:lightblue;text-align: center;\">Email</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<td style=\"text-align: center;\">{{settings.name}}</td>\n\t\t\t\t\t\t\t<td style=\"text-align: center;\">{{settings.email}}</td>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</table>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t\t<br>\n\t\t<table class=\"table table-striped\">\n\t\t\t<caption style=\"text-align: center;\">{{_Quote.Name}}</caption>\n\t\t\t<tr>\n\t\t\t\t<th style=\"background-color: lightblue;text-align: center;\">Unit</th>\n\t\t\t\t<th style=\"background-color: lightblue;text-align: center;\">Description</th>\n\t\t\t\t<th style=\"background-color: lightblue;text-align: center;\">Cost</th>\n\t\t\t</tr>\n\t\t\t<tbody>\n\t\t\t<tr *ngFor=\"let Line of _QuoteLines\">\n\t\t\t\t<td style=\"text-align: center;\">{{Line.UNIT}}</td>\n\t\t\t\t<td style=\"text-align: center;\">{{Line.DESC}}</td>\n\t\t\t\t<td style=\"text-align: center;\">{{Line.COST}}</td>\n\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td>Supplies on Request</td>\n\t\t\t\t<td style=\"text-align: right;\">All prices subject to change without notice</td>\n\t\t\t</tr>\n\t\t</table>\n\t"
    })
    /**
     * Displays a quote as a mutha $!@#!@# beautiful printout
     */
    ,
    __metadata("design:paramtypes", [data_share_service_1.DataShareService,
        quotes_service_1.QuoteService,
        socket_service_1.SocketService])
], Quotes_Printout);
exports.Quotes_Printout = Quotes_Printout;
//# sourceMappingURL=quote_printout.component.js.map