import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
@Component({
	selector: `data-loading-screen`,
	template: `
		<div *ngIf="!remove" class="loading-wrapper" [class.data-ready]="!!dataReady" >
				<div class="diamonds">
				<div class="diamond diamond-1"></div>
				<div class="diamond diamond-2"></div>
				<div class="diamond diamond-3"></div>
				<div class="diamond diamond-4"></div>
			</div>
		</div>
	`,
})

export class DiamondLoaderComponent implements OnChanges, OnInit {
	@Input()
	public dataReady: boolean = false;
	public remove: boolean = false;

	public ngOnInit(): void {
	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		if (simpleChanges.dataReady && simpleChanges.dataReady.currentValue === true) {
			console.log('hit onChange', simpleChanges);
			setTimeout(() => {
				this.remove = true;
			}, 1000)
		}
	}


}