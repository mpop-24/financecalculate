import React, { useState, useEffect } from "react";

interface TickerData {
  ticker: string;
  current_price: number;
  price_change: "up" | "down" | "flat" | null;
  percentage_change: number | null; // New field
  timestamp: string;
}

const StockBanner: React.FC = () => {
  const [prices, setPrices] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://stockprice-api.onrender.com/tickers/^DJI,^GSPC,^IXIC,^RUT",
      );
      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}`,
        );
      }
      const data: TickerData[] = await response.json();
      setPrices(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch prices");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && prices.length === 0) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error && prices.length === 0) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
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
