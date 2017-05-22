import {Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';
@Component({
	selector: 'view-port',
	template: `
	<router-outlet></router-outlet>
	`
})
export class ViewComponent {
	constructor(
		public toastr: ToastsManager,
		public vcr: ViewContainerRef){
		this.toastr.setRootViewContainerRef(vcr);

	}
}