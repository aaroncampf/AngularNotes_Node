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
var router_1 = require("@angular/router");
var data_share_service_1 = require("../services/data-share.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
require("../styles/main.scss");
var MainComponent = (function () {
    function MainComponent(toastr, vcr, router, dataShareService) {
        this.toastr = toastr;
        this.vcr = vcr;
        this.router = router;
        this.dataShareService = dataShareService;
        this.navVisible = true;
        this.CONTACT = 'contact';
        this.COMPANY = 'company';
        this.NOTES = 'notes';
        this.QUOTES = 'quotes';
        this.selectedCompany = {};
        this.selectedContact = {};
        this.toastr.setRootViewContainerRef(vcr);
    }
    MainComponent.prototype.routeTo = function (tab) {
        if (tab === 'contact' && !this.selectedContact.ID) {
            this.toastr.warning('Please chose a contact for their details.');
        }
        else {
            this.router.navigate(['/' + tab]);
            this.tab = tab;
        }
    };
    MainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataShareService.navVisible$
            .subscribe(function (state) { return _this.navVisible = state; });
        //this.tab = this.COMPANY;
        //this.router.navigate([this.COMPANY]);
        this.dataShareService.sendCompany(this.selectedCompany);
    };
    MainComponent.prototype.updateSelectedContact = function (contact) {
        this.tab = this.CONTACT;
        this.dataShareService.sendContact(contact);
        this.selectedContact = contact;
    };
    MainComponent.prototype.updateSelectedCompany = function (company) {
        this.dataShareService.sendCompany(company);
        this.selectedCompany = company;
    };
    return MainComponent;
}());
MainComponent = __decorate([
    core_1.Component({
        selector: 'main',
        template: "\n\t<div class='container'>\n\t\t<div *ngIf=\"!!navVisible\">\n\t\t\t<h4><b>AngularBro's Notes</b><small> with Angular</small></h4>\n\t\t\t<input type=\"search\" placeholder=\"search -WIP-\"/>\n\t\t\t<div class=\"col-sm-4 col-xs-12\">\n\t\t\t\t<side-panel (currentCompanyChange)=\"updateSelectedCompany($event)\" (currentContactChange)=\"updateSelectedContact($event)\"></side-panel>\n\t\t\t</div>\n\t\t</div>\n\t\t<div [class.col-sm-8]=\"!!navVisible\" class=\"col-xs-12\">\n\t\t\t<div *ngIf=\"!!navVisible\" class=\"row\">\n\t\t\t\t<ul class=\"nav nav-tabs\">\n\t\t\t\t\t<!--<li [class.active]=\"tab === COMPANY\">-->\n\t\t\t\t\t<li >\n\t\t\t\t\t\t<a class=\"tab\" routerLinkActive=\"active\" (click)=\"routeTo(COMPANY)\">\n\t\t\t\t\t\t\t<tab-heading>Company</tab-heading>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<!--<li [class.active]=\"tab === CONTACT\">-->\n\t\t\t\t\t<li routerLinkActive=\"active\">\n\t\t\t\t\t\t<a class=\"tab\" (click)=\"routeTo(CONTACT)\">\n\t\t\t\t\t\t\t<tab-heading>Contact</tab-heading>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li [class.active]=\"tab === NOTES\">\n\t\t\t\t\t\t<a class=\"tab\" (click)=\"routeTo(NOTES)\">\n\t\t\t\t\t\t\t<tab-heading>Notes</tab-heading>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li [class.active]=\"tab === QUOTES\">\n\t\t\t\t\t\t<a class=\"tab\" (click)=\"routeTo(QUOTES)\">\n\t\t\t\t\t\t\t<tab-heading>Quotes</tab-heading>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<router-outlet></router-outlet>\n\t\t</div>\n\t\t<i [routerLink]=\"['/settings']\" class=\"glyphicon glyphicon-cog pull-right\"></i>\n\t</div>\n\t",
    }),
    __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
        core_1.ViewContainerRef,
        router_1.Router,
        data_share_service_1.DataShareService])
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map