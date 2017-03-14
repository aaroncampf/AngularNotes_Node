import {Component, ViewContainerRef, OnInit} from '@angular/core';
import '../styles/main.scss';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'main',
	template: `
	<div class="container">
	 	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
			<ul class="nav nav-tabs nav-justified">
				<li>
					<button class="btn">Menu</button>
				</li>
				<li>
					<input type="search" />
				</li>
				<li>
					<button class="btn">Options</button>
				</li>
			</ul>
			<ul class="nav nav-tabs nav-justified">
				 <li ngClass="active:tab === CONTACTS">
					 <a class="tab" [routerLink]="[CONTACTS]">
					 	<tab-heading>Contacts</tab-heading>
					</a>
				 </li>
				 <li ngClass="active:tab === QUOTES">
					 <a [routerLink]="[QUOTES]">
						 <tab-heading>Quotes</tab-heading>
					</a>
				 </li>
			</ul>
		</div>
		<div class="">
				<select>
					<option>Company 1</option>
				</select>
		</div>
		<div class="tab-pane" role="tabpanel">
			<contacts-component></contacts-component>
			<quotes-component></quotes-component>
		</div>
	</div>
`
})
export class MainComponent implements OnInit {
	public get QUOTES(): string {
		return 'quotes';
	}
	public get CONTACTS(): string {
		return 'contacts.component.ts';
	}
	public tab: string;

	constructor(private route: ActivatedRoute) {

	}

	public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
		})
	}


}
