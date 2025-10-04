import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";

interface NewsItem {
  title: string;
  url: string;
  source: string;
  time_published: string;
  banner_image?: string;
}

export default function NewsPage() {
  const [news, setNews] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_KEY; // from .env
    fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=economy_monetary&apikey=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => setNews(data.feed.slice(0, 10))) // Top 10 stories
      .catch((err) => console.error("Failed to fetch news:", err));
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-6 space-y-6 px-4 sm:px-6 md:px-0">
      {/* Header Card */}
      <Card className="w-full max-w-screen-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Market News</CardTitle>
          <CardDescription className="text-center">
            The latest financial news
          </CardDescription>
        </CardHeader>
      </Card>

      {/* News Grid */}
      <div className="grid w-full max-w-screen-lg grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card className="hover:shadow-lg transition overflow-hidden h-full flex flex-col">
              {item.banner_image && (
                <img
                  src={item.banner_image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {item.source} ·{" "}
                  {new Date(item.time_published).toLocaleDateString()}
                </CardDescription>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
