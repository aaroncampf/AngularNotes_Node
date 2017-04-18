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
var QuoteListComponent = (function () {
    function QuoteListComponent(quoteService) {
        this.quoteService = quoteService;
    }
    QuoteListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quoteService.getQuoteLines(this.quoteID)
            .subscribe(function (quoteLines) { return _this.quoteLines = quoteLines; });
    };
    return QuoteListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], QuoteListComponent.prototype, "quoteID", void 0);
QuoteListComponent = __decorate([
    core_1.Component({
        selector: 'quote-list-component',
        template: "\n\t<table class=\"table table-bordered table-striped\">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>ID</th>\n\t\t\t\t<th>UNIT</th>\n\t\t\t\t<th>COST</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t<tr *ngFor=\"let line of quoteLines\">\n\t\t\t\t<td class=\"col-xs-4\">{{line.ID}}</td>\n\t\t\t\t<td class=\"col-xs-4\">{{line.UNIT}}</td>\n\t\t\t\t<td class=\"col-xs-4\">{{line.COST | currency:'USD':true:'2.2'}}</td>\n\t\t\t</tr>\n\t\t</tbody>\n\t</table>\n\t"
    }),
    __metadata("design:paramtypes", [quotes_service_1.QuoteService])
], QuoteListComponent);
exports.QuoteListComponent = QuoteListComponent;
//# sourceMappingURL=quote-lines-list.component.js.map