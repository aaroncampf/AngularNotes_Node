import {Component, Input, OnInit} from '@angular/core';
import {QuoteService} from '../services/quotes.service';
import {QuoteLine} from '../models/quotelines.model';
@Component({
	selector: 'quote-list-component',
	template: `
	<table class="table table-bordered table-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>UNIT</th>
				<th>COST</th>
			</tr>
		</thead>
		<tbody>
			<tr *ngFor="let line of quoteLines">
				<td class="col-xs-4">{{line.ID}}</td>
				<td class="col-xs-4">{{line.UNIT}}</td>
				<td class="col-xs-4">{{line.COST | currency:'USD':true:'2.2' }}</td>
			</tr>
		</tbody>
	</table>
	`
})

export class QuoteListComponent implements OnInit {
	@Input()
	public quoteID: number;
	public quoteLines: QuoteLine[];
	constructor(private quoteService: QuoteService){}
	public ngOnInit(): void {
		this.quoteService.getQuoteLines(this.quoteID)
			.subscribe(quoteLines => this.quoteLines = quoteLines);
	}
}