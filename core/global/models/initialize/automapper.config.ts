import {
	PlaceholderProfile,
} from '../../models';

export class AutomapperConfig {
	public static initialize() {
		PlaceholderProfile.configure();
	}
}
