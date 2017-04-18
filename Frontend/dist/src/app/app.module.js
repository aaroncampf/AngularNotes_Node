"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var ng2_toastr_1 = require("ng2-toastr");
var data_share_service_1 = require("./services/data-share.service");
var quotes_service_1 = require("./services/quotes.service");
var companies_service_1 = require("./services/companies.service");
var contact_service_1 = require("./services/contact.service");
var notes_service_1 = require("./services/notes.service");
var input_component_1 = require("./components/input.component");
var main_component_1 = require("./main/main.component");
var side_panel_component_1 = require("./components/side-panel.component");
var quotes_component_1 = require("./components/quotes.component");
var quote_printout_component_1 = require("./components/quote_printout.component");
var notes_component_1 = require("./components/notes.component");
var contact_details_component_1 = require("./components/contact-details.component");
var company_details_component_1 = require("./components/company-details.component");
var quote_details_component_1 = require("./components/quote-details.component");
var settings_component_1 = require("./components/settings.component");
var user_service_1 = require("./services/user.service");
var quote_lines_list_component_1 = require("./components/quote-lines-list.component");
var socket_service_1 = require("./services/socket.service");
var registration_component_1 = require("./login/registration.component");
var auth_service_1 = require("./services/auth.service");
var registration_service_1 = require("./services/registration.service");
var MAIN_ROUTES = [
    { path: '', children: [
            { path: 'registration', component: registration_component_1.RegistrationComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'company', component: company_details_component_1.CompanyDetailsComponent },
            { path: 'contact', component: contact_details_component_1.ContactDetailsComponent },
            { path: 'quotes', component: quotes_component_1.QuotesComponent },
            { path: 'quote-print', component: quote_printout_component_1.Quotes_Printout },
            { path: 'quote-details', component: quote_details_component_1.QuoteDetailsComponent },
            { path: 'notes', component: notes_component_1.NotesComponent },
            { path: '', redirectTo: '/registration', pathMatch: 'full' },
            { path: '**', component: registration_component_1.RegistrationComponent }
        ] },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            main_component_1.MainComponent,
            registration_component_1.RegistrationComponent,
            quote_details_component_1.QuoteDetailsComponent,
            side_panel_component_1.SidePanelComponent,
            contact_details_component_1.ContactDetailsComponent,
            quotes_component_1.QuotesComponent,
            quote_printout_component_1.Quotes_Printout,
            input_component_1.InputComponent,
            notes_component_1.NotesComponent,
            company_details_component_1.CompanyDetailsComponent,
            settings_component_1.SettingsComponent,
            quote_lines_list_component_1.QuoteListComponent
        ],
        imports: [
            animations_1.NoopAnimationsModule,
            animations_1.BrowserAnimationsModule,
            ng2_toastr_1.ToastModule.forRoot(),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(MAIN_ROUTES),
        ],
        providers: [
            companies_service_1.CompanyService,
            contact_service_1.ContactService,
            notes_service_1.NotesService,
            quotes_service_1.QuoteService,
            data_share_service_1.DataShareService,
            user_service_1.UserService,
            socket_service_1.SocketService,
            auth_service_1.AuthService,
            registration_service_1.RegistrationService
        ],
        schemas: [
            core_1.CUSTOM_ELEMENTS_SCHEMA
        ],
        bootstrap: [main_component_1.MainComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map