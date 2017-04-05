import { getTestBed, TestBed } from '@angular/core/testing';
import { QuoteListComponent} from '../src/app/components/quote-lines-list.component';
import { By } from '@angular/platform-browser';
import { expect } from 'chai';
import { spy } from 'sinon';

let i: string = 'RdEV';
describe(`QuoteListComponent
 ${i}`, () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [QuoteListComponent
]
		});
	});

	afterEach(() => {
		getTestBed().resetTestingModule();
	});

	it('should display 0 as initial value', () => {
		const fixture = TestBed.createComponent(QuoteListComponent
);

		fixture.detectChanges();

		const h2 = fixture.debugElement.query(By.css('h2'));

		expect(h2.nativeElement.textContent).to.equal('Value: 0');
	});

	it('should increment the value', () => {
		const fixture = TestBed.createComponent(QuoteListComponent
);

		fixture.detectChanges();

		const h2 = fixture.debugElement.query(By.css('h2'));

		expect(h2.nativeElement.textContent).to.equal('Value: 1');
	});

	it('should invoke onIncrementClick when the user clicks the increment button', () => {
		const fixture = TestBed.createComponent(QuoteListComponent
);

		const onIncrementClick = spy(fixture.componentInstance, 'onIncrementClick');

		const button = fixture.debugElement.query(By.css('.increment'));

		button.triggerEventHandler('click', {});

		expect(onIncrementClick.called).to.equal(true);
	});

	/* snip */
});