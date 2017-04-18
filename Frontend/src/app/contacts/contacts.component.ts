import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from './contact.model';
import {ContactsService} from './contacts.service';
import {DataShareService} from '../common/services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr'
import {EmailRegEx} from '../common/regex/email.regex';

@Component({
	selector: 'contact-details-component',
	template: `
		<h4>Contact Details</h4>
	`,
})

export class ContactsComponent implements OnInit{
	public ngOnInit() {
	}

}