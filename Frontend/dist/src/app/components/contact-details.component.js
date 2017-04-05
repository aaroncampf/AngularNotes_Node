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
var forms_1 = require("@angular/forms");
var contact_service_1 = require("../services/contact.service");
var data_share_service_1 = require("../services/data-share.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var email_regex_1 = require("../regex/email.regex");
var ContactDetailsComponent = (function () {
    function ContactDetailsComponent(contactService, dataShareService, toastr) {
        this.contactService = contactService;
        this.dataShareService = dataShareService;
        this.toastr = toastr;
        this.contact = {};
        this.nameControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.positionControl = new forms_1.FormControl('', []);
        this.emailControl = new forms_1.FormControl('', [forms_1.Validators.pattern(email_regex_1.EmailRegEx)]);
        this.zipControl = new forms_1.FormControl('', []);
        this.phoneControl = new forms_1.FormControl('', []);
        this.miscControl = new forms_1.FormControl('', []);
        this.contactGroup = new forms_1.FormGroup({
            nameControl: this.nameControl,
            emailControl: this.emailControl,
            miscControl: this.miscControl,
            positionControl: this.positionControl,
            phoneControl: this.phoneControl,
        });
    }
    ContactDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataShareService.contactSelected$
            .subscribe(function (contact) { return _this.contact = contact; });
    };
    ContactDetailsComponent.prototype.saveContact = function (value, prop) {
        if (!this.contactGroup.invalid) {
            this.contact[prop] = value;
            this.contactService.updateContact(this.contact, +this.contact.ID)
                .subscribe(function () { });
        }
        else {
            this.toastr.error('Please provide a name', 'Can\'t Save');
        }
    };
    return ContactDetailsComponent;
}());
ContactDetailsComponent = __decorate([
    core_1.Component({
        selector: 'contact-details-component',
        template: "\n\t<div *ngIf=\"contact.ID\">\n\t\t<h4>Contact Details</h4>\n\t\t<input-component (modelChange)=\"saveContact($event, 'Name')\" label=\"Name\" [model]=\"contact.Name\" [control]=\"nameControl\"></input-component>\n\t\t<input-component (modelChange)=\"saveContact($event, 'Phone')\" label=\"Phone\" [model]=\"contact.Phone\" [control]=\"phoneControl\"></input-component>\n\t\t<input-component (modelChange)=\"saveContact($event, 'Email')\" label=\"Email\" [model]=\"contact.Email\" [control]=\"emailControl\"></input-component>\n\t\t<input-component (modelChange)=\"saveContact($event, 'Position')\" label=\"Position\" [model]=\"contact.Position\" [control]=\"positionControl\"></input-component>\n\t\t<notes-component></notes-component>\n\t</div>\n\t<div *ngIf=\"!contact.ID\">\n\t\t<h4>Please Select a contact for their details and notes.</h4>\n\t</div>\n\t",
    }),
    __metadata("design:paramtypes", [contact_service_1.ContactService,
        data_share_service_1.DataShareService,
        ng2_toastr_1.ToastsManager])
], ContactDetailsComponent);
exports.ContactDetailsComponent = ContactDetailsComponent;
//# sourceMappingURL=contact-details.component.js.map