import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
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

function Chart() {
	const { coinId } = useOutletContext<IcoinId>();
	const { isLoading, data } = useQuery<ICoinHistory[]>(
		["CoinHistory", coinId],
		() => fetchCoinHistory(coinId)
	);

	const chartData = data?.map((el) => {
		return {
			x: Number(el.time_close),
			y: [
				Number(el.open),
				Number(el.high),
				Number(el.low),
				Number(el.close),
			],
		};
	});

	if (!chartData) return <></>;
	return (
		<div>
			{isLoading ? (
				"Loading Chart..."
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "Price",
							data: chartData,
						},
					]}
					options={{
						theme: {
							mode: "dark",
						},
						chart: {
							height: 300,
							width: 500,
							toolbar: {
								show: false,
							},
							background: "transparent",
						},
						grid: { show: false },
						stroke: {
							curve: "smooth",
							width: 4,
						},

						xaxis: {
							type: "datetime",
						},

						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;
