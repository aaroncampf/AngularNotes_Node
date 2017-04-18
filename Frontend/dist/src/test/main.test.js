"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
// import {QuoteListComponent} from '../app/components/quote-lines-list.component';
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var notes_component_1 = require("../app/components/notes.component");
// import {angular1Providers} from '@angular/upgrade/static/src/static/angular1_providers';
var i = 'RdEV';
describe("QuoteListComponent " + i, function () {
    beforeEach('I am before each!', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [notes_component_1.NotesComponent],
            providers: []
        });
    });
    afterEach('I am after each', function () {
        testing_1.getTestBed().resetTestingModule();
    });
    it('It should receive a quote from QuotesService', function () {
        var fixture = testing_1.TestBed.createComponent(notes_component_1.NotesComponent);
        console.log(fixture.detectChanges());
        // const h2 = fixture.debugElement.query(By.css('h2'));
        // expect(h2.nativeElement.textContent).to.equal('Value: 0');
        console.log('34 test', typeof _this.quoteID);
        expect(typeof _this.quoteID).to.Be.a('number');
    });
    // 	it('It should receive an array of QuoteLines from the QuotesService', () => {
    // 		const fixture = TestBed.createComponent(QuoteListComponent);
    // 		fixture.detectChanges();
    // 		const h2 = fixture.debugElement.query(By.css('h2'));
    // 		expect(h2.nativeElement.textContent).to.equal('Value: 1');
    // 	});
    // 	it('should invoke onIncrementClick when the user clicks the increment button', () => {
    // 		const fixture = TestBed.createComponent(QuoteListComponent
    // );
    // 		const onIncrementClick = spy(fixture.componentInstance, 'onIncrementClick');
    // 		const button = fixture.debugElement.query(By.css('.increment'));
    // 		button.triggerEventHandler('click', {});
    // 		expect(onIncrementClick.called).to.equal(true);
    // 	});
    // 	/* snip */
});
var FakeDataShareService = (function () {
    function FakeDataShareService() {
    }
    return FakeDataShareService;
}());
exports.FakeDataShareService = FakeDataShareService;
var FakeNotesService = (function () {
    function FakeNotesService() {
    }
    return FakeNotesService;
}());
exports.FakeNotesService = FakeNotesService;
//# sourceMappingURL=main.test.js.map