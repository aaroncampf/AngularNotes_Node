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
var companies_service_1 = require("../services/companies.service");
var data_share_service_1 = require("../services/data-share.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var CompanyDetailsComponent = (function () {
    function CompanyDetailsComponent(companyService, selectService, toastr) {
        this.companyService = companyService;
        this.selectService = selectService;
        this.toastr = toastr;
        this.company = {};
        this.nameControl = new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.maxLength(255)]);
        this.cityControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(255)]);
        this.addressControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(255)]);
        this.zipControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(5)]);
        this.phoneControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(14)]);
        this.miscControl = new forms_1.FormControl('', [forms_1.Validators.maxLength(255)]);
        this.companyGroup = new forms_1.FormGroup({
            nameControl: this.nameControl,
            addressControl: this.addressControl,
            miscControl: this.miscControl,
            cityControl: this.cityControl,
            phoneControl: this.phoneControl,
            zipControl: this.zipControl,
        });
    }
    CompanyDetailsComponent.prototype.saveCompany = function (event, key) {
        if (this.companyGroup.invalid) {
            this.toastr.error('To save please provide a name', 'Oh no! ');
        }
        else {
            console.log(event, key);
            this.company[key] = event;
            this.companyService.updateCompany(this.company).subscribe(function (res) { return console.log(res); });
            console.log('saving', this.company);
        }
    };
    CompanyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectService.companySelected$.subscribe(function (company) {
            _this.company = company;
        });
    };
    return CompanyDetailsComponent;
}());
CompanyDetailsComponent = __decorate([
    core_1.Component({
        selector: 'company-component',
        template: "\n\t\t<div *ngIf=\"company.id\">\n\t\t\t<h4>Company Details</h4>\n\t\t\t<input-component (modelChange)=\"saveCompany($event, 'Name')\" [model]=\"company.Name\" label=\"Name\" [control]=\"nameControl\"></input-component>\n\t\t\t<input-component (modelChange)=\"saveCompany($event, 'Phone')\" [model]=\"company.Phone\" label=\"Phone\" [control]=\"phoneControl\"></input-component>\n\t\t\t<input-component (modelChange)=\"saveCompany($event, 'Address')\" [model]=\"company.Address\" label=\"Address\" [control]=\"addressControl\"></input-component>\n\t\t\t<input-component (modelChange)=\"saveCompany($event, 'City')\" [model]=\"company.City\" label=\"City\" [control]=\"cityControl\"></input-component>\n\t\t\t<input-component (modelChange)=\"saveCompany($event, 'Zip')\" [model]=\"company.Zip\" label=\"Zip\" [control]=\"zipControl\"></input-component>\n\t\t\t<quotes-component></quotes-component>\n\t\t</div>\n\t\t<div *ngIf=\"!company.id\">\n\t\t\t<h4>Please select a Company for it's details.</h4>\n\t\t</div>\n\t",
    }),
    __metadata("design:paramtypes", [companies_service_1.CompanyService,
        data_share_service_1.DataShareService,
        ng2_toastr_1.ToastsManager])
], CompanyDetailsComponent);
exports.CompanyDetailsComponent = CompanyDetailsComponent;
//# sourceMappingURL=company-details.component.js.map