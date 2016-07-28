class PokevisionService extends PokemonService {

	constructor() {
	  super();
	}

	getPokevisionUrl(lat, lon) {
		return `https://pokevision.com/#/@${lat},${lon}`;
	}

	getSpriteUrl(pokemonId) {
		return `http://ugc.pokevision.com/images/pokemon/${pokemonId}.png`;
	}
	
	get(latitude, longitude) {
		return this._scan(latitude, longitude)
			.then(jobId => {
				return Helpers.delay(3000).then(() => 
					Helpers.runFunctionWithRetriesAndMaxTimeout(() => 
						this._getPokemon(latitude, longitude, jobId), 3000 /* start at 3s per try */, 1000 /* inc by 1s */, 20000 /* max 20s */));
			});
	}

	
	_scan(latitude, longitude) {
		return new Promise((resolve, reject) => {
			$.get(`https://pokevision.com/map/scan/${latitude}/${longitude}`)
				.done(result => {
					if(typeof result === "string") {
						return reject();
					}
					
					resolve(result.jobId);
				}).fail(() => reject());
		});
	}
	
	_getPokemon(latitude, longitude, jobId) {
		var url = `https://pokevision.com/map/data/${latitude}/${longitude}`;
		
		if(jobId) {
			url += '/' + jobId;
		}
		
		return new Promise((resolve, reject) => {
			$.get(url).done(result => {
				if(result.status === 'success') {
					if(result.jobStatus === 'in_progress') {
						return reject();
					}
					resolve(Helpers.distinctObjects(result.pokemon, ['pokemonId', 'latitude', 'longitude']));
				}
				else if (result.message === '{scan-throttle}') {
					resolve('throttle');
				}
				else
					reject();
				
			}).fail(() => reject());
		});
	}
}
