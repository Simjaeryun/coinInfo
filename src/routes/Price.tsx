import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
interface IcoinId {
	coinId: string;
}
interface ICoinHistory {
	time_open: string;
	time_close: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
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
	priceData: {
		id: string;
		name: string;
		symbol: string;
		rank: number;
		circulating_supply: number;
		total_supply: number;
		max_supply: number;
		beta_value: number;
		first_data_at: string;
		last_updated: string;
		quotes: Quotes;
	};
}

function Price() {
	const { priceData } = useOutletContext<ICoinPrice>();
	console.log(priceData);
	return (
		<Container>
			<div className="top">
				<ul>
					<li>최근 업데이트 : {priceData?.last_updated}</li>
					<li>
						최근 업데이트 기준 가격 :{" "}
						{priceData?.quotes.USD.price.toFixed(3)}
					</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>1시간 변동사항</li>
					<li>{priceData?.quotes.USD.percent_change_1h * 100}%</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>6시간 변동사항</li>
					<li>{priceData?.quotes.USD.percent_change_6h * 100}%</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>12시간 변동사항</li>
					<li>{priceData?.quotes.USD.percent_change_12h * 100}%</li>
				</ul>
			</div>
			<div>
				<ul>
					<li>24시간 변동사항</li>
					<li>{priceData?.quotes.USD.percent_change_24h * 100}%</li>
				</ul>
			</div>
		</Container>
	);
}

const Container = styled.div`
	> div {
		padding: 10px;
		border: 1px solid #fff;
		margin-bottom: 10px;
		min-height: 70px;
	}
	ul {
		background: inherit;
		li {
			background: inherit;
			padding: 0;
			font-size: 12px;
			color: #fff;
			&:last-of-type {
				color: red;
			}
		}
	}
`;

export default Price;
