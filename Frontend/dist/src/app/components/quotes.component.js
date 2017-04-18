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
var forms_1 = require("@angular/forms");
var quote_model_1 = require("../models/quote.model");
var quotes_service_1 = require("../services/quotes.service");
var data_share_service_1 = require("../services/data-share.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var router_1 = require("@angular/router");
var QuotesComponent = (function () {
    function QuotesComponent(quoteService, dataShareService, router, toastr) {
        this.quoteService = quoteService;
        this.dataShareService = dataShareService;
        this.router = router;
        this.toastr = toastr;
        this.newQuote = quote_model_1.newQuote({});
        this.companies = [];
        this.selectedCompany = {};
        this.quotes = [];
        this.unitControl = new forms_1.FormControl('', []);
        this.costControl = new forms_1.FormControl('', []);
        this.descControl = new forms_1.FormControl('', []);
        this.lineGroup = new forms_1.FormGroup({
            unitControl: this.unitControl,
            costControl: this.costControl,
            descControl: this.descControl,
        });
        this.nameControl = new forms_1.FormControl('', []);
        this.emailControl = new forms_1.FormControl('', []);
        this.titleControl = new forms_1.FormControl('', []);
        this.positionControl = new forms_1.FormControl('', []);
        this.phoneControl = new forms_1.FormControl('', []);
        this.quotesGroup = new forms_1.FormGroup({
            name: this.nameControl,
            email: this.emailControl,
            position: this.positionControl,
            phone: this.phoneControl,
            title: this.titleControl
        });
    }
    QuotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataShareService.isNavVisible(true);
        this.dataShareService.companySelected$
            .subscribe(function (company) {
            _this.selectedCompany = company;
            if (_this.selectedCompany.ID) {
                _this.quoteService.getCompanyQuotes(_this.selectedCompany.ID)
                    .subscribe(function (quotes) { return _this.quotes = quotes; });
            }
            else {
                _this.quoteService.getQuotes()
                    .subscribe(function (quotes) { return _this.quotes = quotes; });
            }
        });
    };
    QuotesComponent.prototype.addLine = function (quote) {
        var _this = this;
        this.quoteService.updateQuote(quote)
            .subscribe(function () {
            _this.quoteService.getQuotes()
                .subscribe(function (quotes) { return _this.quotes; });
        });
    };
    QuotesComponent.prototype.onSelectQuote = function (quote) {
        this.dataShareService.sendQuote(quote);
        this.router.navigate(['/quote-details']);
    };
    QuotesComponent.prototype.addNewQuote = function () {
        var _this = this;
        this.quoteService.createQuote(this.newQuote, this.selectedCompany.ID)
            .subscribe(function (response) {
            _this.dataShareService.sendQuote(response);
            _this.router.navigate(['/quote-details']);
        });
    };
    QuotesComponent.prototype.navigateToPrint = function (quote) {
        if (!!this.selectedCompany) {
            this.dataShareService.sendQuote(quote);
            this.dataShareService.isNavVisible(false);
            this.router.navigate(['/quote-print']);
        }
        else {
            this.toastr.warning('Please select a company.');
        }
    };
    return QuotesComponent;
}());
QuotesComponent = __decorate([
    core_1.Component({
        selector: 'quotes-component',
        template: "\n\t<h4>{{ selectedCompany.Name || 'All' }} Quotes</h4>\n\t\t<button type=\"button\" class=\"btn btn-block\" (click)=\"addNewQuote()\" [disabled]=\"!selectedCompany.ID\" [class.disabled]=\"!selectedCompany.ID\">New Quote</button>\n\t\t<div *ngFor=\"let quote of quotes\" (click)=\"onSelectQuote(quote)\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<span class=\"col-xs-2\"><b>QID:</b> {{quote.ID}}</span>\n\t\t\t\t<span class=\"col-xs-4\"><b>Date:</b> {{quote.Date | date: 'MM/dd/yyyy'}}</span>\n\t\t\t\t<span class=\"col-xs-6\"><b>Name:</b> {{quote.Name}}</span>\n\t\t\t\t<quote-list-component [quoteID]=\"quote.ID\"></quote-list-component>\n\t\t\t\t<i class=\"glyphicon glyphicon-print pull-right\" (click)=\"navigateToPrint(quote)\"></i>\n\t\t\t</div>\n\t\t</div>\n\t",
    }),
    __metadata("design:paramtypes", [quotes_service_1.QuoteService,
        data_share_service_1.DataShareService,
        router_1.Router,
        ng2_toastr_1.ToastsManager])
], QuotesComponent);
exports.QuotesComponent = QuotesComponent;
//# sourceMappingURL=quotes.component.js.map