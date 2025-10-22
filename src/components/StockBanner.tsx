import React, { useState, useEffect } from "react";

interface TickerData {
  ticker: string;
  current_price: number;
  price_change: "up" | "down" | "flat" | null;
  percentage_change: number | null;
  timestamp?: string;
}

const tickers = ["^DJI", "^GSPC", "^IXIC", "^RUT"];

const StockBanner: React.FC = () => {
  const [prices, setPrices] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPriceForTicker = async (
    symbol: string,
  ): Promise<TickerData | null> => {
    try {
      const response = await fetch(
        `https://stockprice-api.onrender.com/stock/${encodeURIComponent(symbol)}`,
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      const changeType: "up" | "down" | "flat" =
        data.change > 0 ? "up" : data.change < 0 ? "down" : "flat";

      return {
        ticker: data.symbol,
        current_price: data.price,
        price_change: changeType,
        percentage_change: data.percent_change,
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      console.error(`Error fetching ${symbol}:`, err);
      return null;
    }
  };

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const results = await Promise.all(tickers.map(fetchPriceForTicker));
      setPrices(results.filter((r): r is TickerData => r !== null));
      setError(null);
    } catch (err) {
      setError("Failed to fetch prices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  if (loading && prices.length === 0)
    return <div className="text-center p-4">Loading...</div>;
  if (error && prices.length === 0)
    return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100 mt-[60px]">
      {prices.map((item) => (
        <div
          key={item.ticker}
          className="flex items-center p-3 bg-white rounded shadow-md min-w-[150px]"
        >
          <span className="font-bold mr-2">{item.ticker}</span>
          <span className="mr-2">${item.current_price.toFixed(2)}</span>
          {item.price_change && (
            <span
              className={`mr-2 ${
                item.price_change === "up"
                  ? "text-green-500"
                  : item.price_change === "down"
                    ? "text-red-500"
                    : "text-gray-500"
              }`}
            >
              {item.price_change === "up"
                ? "▲"
                : item.price_change === "down"
                  ? "▼"
                  : "–"}
            </span>
          )}
          {item.percentage_change !== null && (
            <span
              className={`${
                item.percentage_change > 0
                  ? "text-green-500"
                  : item.percentage_change < 0
                    ? "text-red-500"
                    : "text-gray-500"
              }`}
            >
              {item.percentage_change > 0 ? "+" : ""}
              {item.percentage_change.toFixed(2)}%
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default StockBanner;
