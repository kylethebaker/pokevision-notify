class PokemonServiceStub extends PokemonService {
	
	getSpriteUrl(pokemonId) {
		return `http://ugc.pokevision.com/images/pokemon/${pokemonId}.png`;
	}

	get(latitude, longitude) {
		return Promise.resolve([{
			id: 1,
			pokemonId: 1,
			latitude: 33.7745567,
			longitude: -84.3854958,
			expiration_time: new Date().getTime() + 10000
		}, {
			id: 2,
			pokemonId: 24,
			latitude: 33.7745567,
			longitude: -84.3854958,
			expiration_time: new Date().getTime() + 10000
		},{
			id: 3,
			pokemonId: 142,
			latitude: 33.7745567,
			longitude: -84.3854958,
			expiration_time: new Date().getTime() + 10000
		},{
			id: 4,
			pokemonId: 95,
			latitude: 33.7745567,
			longitude: -84.3854958,
			expiration_time: new Date().getTime() + 10000
		},{
			id: 5,
			pokemonId: 150,
			latitude: 33.7745567,
			longitude: -84.3854958,
			expiration_time: new Date().getTime() + 10000
		},{
			id: 6,
			pokemonId: 25,
			latitude: 33.7745567,
			longitude: -84.3854958,
			expiration_time: new Date().getTime() + 10000
		}]);
	}
}
