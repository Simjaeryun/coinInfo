import { useQuery } from "react-query";
import {
	Link,
	Outlet,
	useLocation,
	useMatch,
	useParams,
} from "react-router-dom";
import styled from "styled-components";
import { fetchCoinDetail, fetchCoinPrice } from "../api";
import { Helmet } from "react-helmet";
//Interface

interface Tag {
	id: string;
	name: string;
	coin_counter: number;
	ico_counter: number;
}

interface Team {
	id: string;
	name: string;
	position: string;
}

interface Links {
	explorer: string[];
	facebook: string[];
	reddit: string[];
	source_code: string[];
	website: string[];
	youtube: string[];
}

interface Stats {
	subscribers: number;
	contributors?: number;
	stars?: number;
	followers?: number;
}

interface LinksExtended {
	url: string;
	type: string;
	stats: Stats;
}

interface Whitepaper {
	link: string;
	thumbnail: string;
}

interface ICoinDetail {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	tags: Tag[];
	team: Team[];
	description: string;
	message: string;
	open_source: boolean;
	started_at: Date;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	links: Links;
	links_extended: LinksExtended[];
	whitepaper: Whitepaper;
	first_data_at: Date;
	last_data_at: Date;
}

interface USD {
	price: number;
	volume_24h: number;
	volume_24h_change_24h: number;
	market_cap: number;
	market_cap_change_24h: number;
	percent_change_15m: number;
	percent_change_30m: number;
	percent_change_1h: number;
	percent_change_6h: number;
	percent_change_12h: number;
	percent_change_24h: number;
	percent_change_7d: number;
	percent_change_30d: number;
	percent_change_1y: number;
	ath_price: number;
	ath_date: Date;
	percent_from_price_ath: number;
}

interface Quotes {
	USD: USD;
}

interface ICoinPrice {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: Date;
	last_updated: Date;
	quotes: Quotes;
}

interface RouteState {
	state: {
		name: string;
	};
}
function Coin() {
	const { coinId } = useParams();
	const { state } = useLocation() as RouteState;
	const priceMatch = useMatch("/:coinId/price");
	const chartMatch = useMatch("/:coinId/chart");

	//Coin 정보
	const { isLoading: detailLoading, data: detailData } =
		useQuery<ICoinDetail>(
			["coinDetail", coinId],
			() => fetchCoinDetail(coinId),
			{ refetchInterval: 10000 }
		);
	const { isLoading: priceLoading, data: priceData } = useQuery<ICoinPrice>(
		["coinPrice", coinId],
		() => fetchCoinPrice(coinId),
		{ refetchInterval: 10000 }
	);

	const loading = detailLoading || priceLoading;
	if (!priceData) return <></>;
	if (!priceData.quotes) return <></>;
	return (
		<Container>
			<Helmet>
				<title>
					{state?.name
						? state.name
						: loading
						? "Loading..."
						: detailData?.name}
				</title>
			</Helmet>
			<header>
				<Link to={"/"}>
					<h1>
						{state?.name
							? state.name
							: loading
							? "Loading..."
							: detailData?.name}
					</h1>
				</Link>
			</header>

			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{detailData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${detailData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>
								{priceData?.quotes.USD.price.toFixed(3)}
							</span>
						</OverviewItem>
					</Overview>
					<Description>{detailData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{priceData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{priceData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>
				</>
			)}
			<Outlet context={{ coinId, priceData }} />
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
			background-color: #fff;
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
const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
`;
const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

export default Coin;
