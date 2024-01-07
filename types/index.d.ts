// @todo don't duplicate this from Core
interface IStore {
	[key: string]: string | any;
	actions?: any;
	getters?: any;
	mutations?: any;
	state?: any;
}
