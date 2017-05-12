import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	 public canActivate(): boolean {
		return true;
	}

	public canActivateChild(): boolean {
		return false;
	}

}