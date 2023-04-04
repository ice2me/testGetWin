export const apiBaseUrl =
	process.env.NODE_ENV === "development"
		// ? "http://localhost:8080/api/"
		? "https://pokeapi.co/api/v2"
		: `${window.location.origin}/api/v2`
