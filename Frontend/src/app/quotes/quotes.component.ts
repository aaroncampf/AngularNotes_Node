import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Company} from '../companies/company.model';
import {newQuote, Quote} from './quote.model';
import {QuotesService} from './quotes.service';
import {DataShareService} from '../common/services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {QuoteLine} from './quotelines.model';
import {Router} from '@angular/router';

@Component({
	selector: 'quotes-component',
	template: `
		<h1>quotes</h1>
	`,
})

export class QuotesComponent implements OnInit {

	public ngOnInit(): void {

	}
}