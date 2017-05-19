//
// import {User} from '../../users/user.model';
// import {Store} from '@ngrx/store';
//
// export const stateReducer = (storeInstance: Store, direction?, steps?): User => {
// 	storeInstance.select('user').subscribe(stateMap => {
// 		const state = stateMap.values[stateMap.values.length - 1].type;
// 				 state.payload.user;
// 	const getStateSlice = (stateSeek, currentState) => {
// 	switch (stateSeek) {
// 			case'forward':
// 				if ((position + steps) > (res.length - Math.abs(position))) {
// 					return res[position + steps];
// 				}
// 				break;
// 			case'back':
// 				if ((position - steps) > 0) {
// 					return res[position - steps];
// 				}
// 				break;
// 			default:
// 				return ({[key]: res[res.length - 1]});
// 		}
// }