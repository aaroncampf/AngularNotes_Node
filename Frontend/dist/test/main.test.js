"use strict";
var testing_1 = require("@angular/core/testing");
var quote_lines_list_component_1 = require("../src/app/components/quote-lines-list.component");
var platform_browser_1 = require("@angular/platform-browser");
var chai_1 = require("chai");
var sinon_1 = require("sinon");
var i = 'RdEV';
describe("QuoteListComponent\n " + i, function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [quote_lines_list_component_1.QuoteListComponent
            ]
        });
    });
    afterEach(function () {
        testing_1.getTestBed().resetTestingModule();
    });
    it('should display 0 as initial value', function () {
        var fixture = testing_1.TestBed.createComponent(quote_lines_list_component_1.QuoteListComponent);
        fixture.detectChanges();
        var h2 = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        chai_1.expect(h2.nativeElement.textContent).to.equal('Value: 0');
    });
    it('should increment the value', function () {
        var fixture = testing_1.TestBed.createComponent(quote_lines_list_component_1.QuoteListComponent);
        fixture.detectChanges();
        var h2 = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        chai_1.expect(h2.nativeElement.textContent).to.equal('Value: 1');
    });
    it('should invoke onIncrementClick when the user clicks the increment button', function () {
        var fixture = testing_1.TestBed.createComponent(quote_lines_list_component_1.QuoteListComponent);
        var onIncrementClick = sinon_1.spy(fixture.componentInstance, 'onIncrementClick');
        var button = fixture.debugElement.query(platform_browser_1.By.css('.increment'));
        button.triggerEventHandler('click', {});
        chai_1.expect(onIncrementClick.called).to.equal(true);
    });
    /* snip */
});
//# sourceMappingURL=main.test.js.map