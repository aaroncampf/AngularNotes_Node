import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
	selector: 'navbar-component',
	template: `
	<div class="row">
		<ul class="crm-nav-tabs">
			<li class="text-center" [class.selected]="companySelected" [class.active]="activeRoute === '/Companies'" role="tab">
				<a (click)="routeSelected.emit(['/Companies'])">Companies</a>
			</li>
			<li class="text-center" [class.selected]="contactSelected" [class.active]="activeRoute === '/Contacts'" role="tab">
				<a (click)="routeSelected.emit(['/Contacts'])">Contacts</a>
			</li>
			<li class="text-center" [class.selected]="quoteSelected" [class.active]="activeRoute === '/Quotes'" role="tab">
				<a (click)="routeSelected.emit(['/Quotes'])">Quotes</a>
			</li>
			<li class="text-center" [class.active]="activeRoute === '/Settings'" role="tab">
				<a (click)="routeSelected.emit(['/Settings'])">Settings</a>
			</li>
		</ul>
		<hr>
	</div>
	`

})
export class NavbarComponent implements OnChanges {
	@Input()
	public activeRoute: string = 'INIT';
	@Input()
	public companySelected: boolean = false;
	@Input()
	public contactSelected: boolean = false;
	@Input()
	public quoteSelected: boolean = false;
	@Output()
	public routeSelected: EventEmitter<any> = new EventEmitter<any>();

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		console.log(simpleChanges);
	}
}