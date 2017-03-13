import {Component, ViewContainerRef} from '@angular/core';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
	<div class="container">
	 	<div class="navbar navbar-default navbar-fixed-bottom" role="navigation">
			<ul class="nav nav-tabs nav-justified">
				 <li>
					 <a role="link" class="btn" [routerLink]="[RESUME]">Résumé</a>
				 </li>
				 <li>
					 <a role="link" class="btn" [routerLink]="[ABOUT]">About</a>
				 </li>
			</ul>
		</div>
		<router-outlet></router-outlet>
	</div>
`
})
export class MainComponent {
	public get ABOUT(): string {
		return 'about';
	}
	public get RESUME(): string {
		return 'resume';
	}
}
