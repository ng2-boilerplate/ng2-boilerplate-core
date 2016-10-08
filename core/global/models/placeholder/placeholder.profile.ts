export class PlaceholderProfile {
	public static mapperConfig: IMapConfig = {
		destinationKey: 'BaseAuth',
		sourceKey: 'ApiBaseAuth',
	};

	public static configure() {
		automapper.createMap(PlaceholderProfile.mapperConfig.sourceKey, PlaceholderProfile.mapperConfig.destinationKey)
			.forMember('identifier', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
				opts.mapFrom('id');
			});
	};
}
