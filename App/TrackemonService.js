class TrackemonService extends PokemonService {

  constructor() {
    super();
  }

	getApiEndpoint(lat, lon) {
	  return `http://trackemon.com/scan?lat=${lat}&lng=${lon}`;
	}

	getSpriteUrl(pokemonId) {
	  return `http://trackemon.com/images/${pokemonId}.png`;
	}

	get(lat, lon) {
		return this._getPokemon(lat, lon);
	}

	_getPokemon(lat, lon) {
		return new Promise((resolve, reject) => {
			$.getJSON(this.getApiEndpoint(lat, lon))
				.done(result => {

					if (!result.length === 0 || !("pokemon" in result)) {
						reject();
					}

					var distinctResults = Helpers.distinctObjects(
							result.pokemon,
							["pokedexTypeId", "latitude", "longitude"]
					);

					// convert to format identical to pokevision
					var formattedResults = [];
					for (let p of result.pokemon) {
						formattedResults.push({
							id: p.id,
							pokemonId: p.pokedexTypeId,
							latitude: p.latitude,
							longitude: p.longitude,
							expiration_time: p.expirationTime,
						});
					}

					resolve(formattedResults)

				}).fail(() => reject());
		});
	}

}
