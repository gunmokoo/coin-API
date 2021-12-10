import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => price.close),
              },
            ]}
            options={{
              theme: { mode: "dark" },
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
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  show: false,
                },
                type: "datetime",
                categories: data?.map((price) => price.time_open),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            height={350}
            series={[
              {
                name: "Price",
                data: [
                  {
                    x: data?.map((price) => price.time_open),
                    y: data?.map((price) => [
                      price.open,
                      price.high,
                      price.low,
                      price.close,
                    ]),
                  },
                ],
              },
            ]}
            options={{
              theme: { mode: "dark" },
              chart: {
                type: "candlestick",
                height: 350,
                background: "transparent",
              },
              title: {
                text: "CandleStick Chart",
                align: "left",
              },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Chart;
