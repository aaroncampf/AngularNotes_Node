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
var companies_service_1 = require("../services/companies.service");
var contact_service_1 = require("../services/contact.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var router_1 = require("@angular/router");
var SidePanelComponent = (function () {
    function SidePanelComponent(toastr, router, companyService, contactService) {
        this.toastr = toastr;
        this.router = router;
        this.companyService = companyService;
        this.contactService = contactService;
        this.currentContact = {};
        this.currentCompany = {};
        this.currentContactChange = new core_1.EventEmitter();
        this.currentCompanyChange = new core_1.EventEmitter();
    }
    SidePanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyService.getCompanies()
            .subscribe(function (companies) {
            _this.companies = companies;
            _this.companies.sort();
        });
        this.contactService.getContacts()
            .subscribe(function (contacts) {
            _this.contacts = contacts;
            _this.contacts.sort();
        });
    };
    SidePanelComponent.prototype.createNewCompany = function () {
        var _this = this;
        this.router.navigate(['/company']);
        this.companyService.createCompany()
            .subscribe(function (company) {
            _this.toastr.success('Company Successfully Created! Please provide a name.');
            _this.currentCompany = company;
            _this.currentCompanyChange.emit(company);
            _this.companies.push(_this.currentCompany);
            _this.contacts = [];
        });
    };
    SidePanelComponent.prototype.createNewContact = function (companyId) {
        var _this = this;
        this.contactService.createContact(companyId)
            .subscribe(function (contactID) {
            _this.toastr.success('Success! Please provide a name.');
            _this.currentContact = { ID: contactID._body };
            console.log('create current', _this.currentContact);
            _this.currentContactChange.emit(_this.currentContact);
            var temp = _this.contacts;
            _this.contacts = [];
            _this.contacts.push(_this.currentContact);
            temp.push(_this.currentContact);
            _this.contacts = temp;
            _this.router.navigate(['/contact']);
        });
    };
    SidePanelComponent.prototype.onSelectCompany = function (company) {
        var _this = this;
        if (!this.currentCompany.ID) {
            this.currentCompany = company;
            this.currentCompanyChange.emit(company);
            this.contactService.getCompanyContacts(company.ID)
                .subscribe(function (contacts) { return _this.contacts = contacts; });
        }
        else {
            this.currentCompany = {};
            this.currentCompanyChange.emit({});
            this.onSelectContact({});
            this.contactService.getContacts()
                .subscribe(function (contacts) { return _this.contacts = contacts; });
        }
    };
    SidePanelComponent.prototype.onSelectContact = function (contact) {
        if (!this.currentContact.ID) {
            this.currentContact = contact;
            this.currentContactChange.emit(contact);
        }
        else {
            this.currentContact = {};
            this.currentContactChange.emit({});
        }
    };
    SidePanelComponent.prototype.removeContact = function (contact) {
        var _this = this;
        this.currentContact = {};
        this.currentContactChange.emit({});
        this.contactService.deleteContact(contact.ID)
            .subscribe(function () {
            _this.toastr.warning('Removed ' + contact.Name);
            _this.contactService.getContacts()
                .subscribe(function (contacts) { return _this.contacts = contacts; });
        }, function (error) { return _this.toastr.error('There Are Notes Related to ' + contact.Name + 'Please delete them first.'); });
    };
    SidePanelComponent.prototype.removeCompany = function (company) {
        var _this = this;
        this.companyService.deleteCompany(company.ID)
            .subscribe(function () {
            _this.toastr.warning('Removed ' + company.Name);
            _this.currentCompany = {};
            _this.companyService.getCompanies()
                .subscribe(function (companies) { return _this.companies = companies; });
        }, function (error) { return _this.toastr.error('Oh no! Something went wrong with removing ' + company.Name + ' please try again later.'); });
    };
    return SidePanelComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SidePanelComponent.prototype, "currentContactChange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SidePanelComponent.prototype, "currentCompanyChange", void 0);
SidePanelComponent = __decorate([
    core_1.Component({
        selector: 'side-panel',
        template: "\n\t<div class=\"row\">\n\t\t<button class=\"btn btn-block\"(click)=\"createNewCompany()\">Add Company</button>\n\t\t<div class=\"selection-row\" [class.active]=\"currentCompany.ID === company.ID\" [class.collapsed]=\"currentCompany.ID && currentCompany.ID !== company.ID\" *ngFor=\"let company of companies\">\n\t\t\t<div (click)=\"onSelectCompany(company)\" class=\"col-xs-10\" >{{company.Name}}</div>\n\t\t\t<i class=\"glyphicon glyphicon-remove pull-right col-xs-2\" (click)=\"removeCompany(company)\"></i>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<button class=\"btn btn-block\" [disabled]=\"!currentCompany.ID\" [class.disabled]=\"!currentCompany.ID\" (click)=\"createNewContact(currentCompany.ID)\">Add Contact</button>\n\t\t<div class=\"selection-row\" [class.active]=\"currentContact.ID === contact.ID\" [class.collapsed]=\"currentContact.ID && currentContact.ID !== contact.ID\" *ngFor=\"let contact of contacts\">\n\t\t\t<div class=\"col-xs-10\" (click)=\"onSelectContact(contact)\">{{contact.Name}}</div>\n\t\t\t<i class=\"glyphicon glyphicon-remove col-xs-2\" (click)=\"removeContact(contact)\"></i>\n\t\t</div>\n\t</div>\n\t\n\t"
    }),
    __metadata("design:paramtypes", [ng2_toastr_1.ToastsManager,
        router_1.Router,
        companies_service_1.CompanyService,
        contact_service_1.ContactService])
], SidePanelComponent);
exports.SidePanelComponent = SidePanelComponent;
//# sourceMappingURL=side-panel.component.js.map