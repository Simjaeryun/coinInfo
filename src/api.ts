const BASE_URL = "https://api.coinpaprika.com/v1";
const DETAIL_BASE_URL = "https://ohlcv-api.nomadcoders.workers.dev";
export function fetchCoins() {
	return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinDetail(coinId: string | undefined) {
	return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinPrice(coinId: string | undefined) {
	return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
		response.json()
	);
}

export function fetchCoinHistory(coinId: string | undefined) {
	return fetch(`${DETAIL_BASE_URL}?coinId=${coinId}`).then((response) =>
		response.json()
	);
}
