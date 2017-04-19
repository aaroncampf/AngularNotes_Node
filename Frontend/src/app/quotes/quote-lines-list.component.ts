import {Component, Input, OnInit} from '@angular/core';
import {QuoteLine} from './quote.model';

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
				<td class="col-xs-4">{{line.id}}</td>
				<td class="col-xs-4">{{line.unit}}</td>
				<td class="col-xs-4">{{line.cost | currency:'USD':true:'2.2'}}</td>
			</tr>
		</tbody>
	</table>
	`
})

export class QuoteListComponent implements OnInit {
	@Input()
	public quoteID: number;
	public quoteLines: QuoteLine[] = [];
	public ngOnInit(): void {
	}
}