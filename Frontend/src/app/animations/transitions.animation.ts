import {animate, state, style, transition, trigger} from '@angular/core';

export function liftOffTransitions() {

	return liftOff();
}

function liftOff(){
	return trigger('contentState', [
		state('in', style({
			opacity: '1',
			transform: 'translateY(0%) scale(1)',
		})),
		state('out', style({
			opacity: '0',
			transform: 'translateY(0%) scale(2)',
		})),
		transition('out => in', animate('400ms, ease-out')),
		transition('in => out', animate('400ms, ease-in')),
		transition('void => in', [
			style({transform: 'translateX(100%)', opacity: 0}),
			animate('400ms, ease-out'),
		]),
		transition('in => void', [
			animate(200, style({transform: 'translateX(-100%) scale(0)'}))
		])
	])
}

export function slideTransitions() {
	return slide();
}

function slide() {
	return trigger('contentState', [
		state('in', style({
			opacity: '1',
			transform: 'translateY(0%)'
		})),
		state('out', style({
			opacity: '0',
			transform: 'translateY(200%)'
		})),
		transition('void => in', [
			style({transform: 'translateY(-100%)'}),
			animate('400ms, ease-out'),
		]),
		transition('in => out', [
			// style({transform: 'translateY(-200%)'}),
			animate('400ms, ease-in'),
		])
	])
}