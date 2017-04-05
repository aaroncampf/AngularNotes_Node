"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var settings_component_1 = require("../src/app/components/settings.component");
describe('BannerComponent (inline template)', function () {
    var comp;
    var fixture;
    var de;
    var el;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [settings_component_1.SettingsComponent]
        });
        fixture = testing_1.TestBed.createComponent(settings_component_1.SettingsComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
        el = de.nativeElement;
    });
});
