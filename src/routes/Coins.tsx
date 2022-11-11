import styled from "styled-components";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
//Interface
interface IAllCoins {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}
function Coins() {
	// const [coins, setCoins] = useState<getCoinInterface[]>([]);
	// const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	const url = "https://api.coinpaprika.com/v1/coins";
	// 	(async () => {
	// 		const response = await fetch(url);
	// 		const json = await response.json();
	// 		setCoins(json.slice(0, 100));
	// 		setLoading(false);
	// 	})();
	// 	setCoins([]);
	// }, []);

	const { isLoading, data } = useQuery<IAllCoins[]>("allCoins", fetchCoins);

	return (
		<Container>
			<Helmet>
				<title>Coin</title>
			</Helmet>
			<header>
				<h1>Coins</h1>
			</header>
			<ul>
				{isLoading ? (
					<Loader>Loading...</Loader>
				) : (
					data?.slice(0, 100).map((coin, idx: number) => (
						<li key={coin.id + idx}>
							<Link to={`/${coin.id}`} state={coin}>
								<img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
									alt={"코인 심볼이미지"}
								/>
								{coin.name} &rarr;
							</Link>
						</li>
					))
				)}
			</ul>
		</Container>
	);
}
//Style
const Container = styled.div`
	padding: 0px 20px;

	header {
		height: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		h1 {
			color: ${(props) => props.theme.accentColor};
			font-size: 48px;
		}
	}
	ul {
		li {
			background-color: ${(props) => props.theme.columnBgColor};
			color: ${(props) => props.theme.bgColor};

			border-radius: 15px;
			margin-bottom: 10px;
			a {
				transition: color 0.2s ease-in;
				display: flex;
				align-items: center;
				padding: 20px 10px;
				img {
					margin-right: 5px;
					width: 25px;
					height: 25px;
				}
			}
			&:hover {
				a {
					color: ${(props) => props.theme.accentColor};
				}
			}
		}
	}
`;
const Loader = styled.div``;
export default Coins;
