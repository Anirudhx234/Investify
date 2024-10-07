import useTheme from "./hooks/useTheme";

import useNews from "./hooks/useNews";
import './styles/news.css';

export default function App() {
  const symbol = "AAPL";
  const { news, loading, error } = useNews(symbol);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error">Error loading news</div>;

  return (
      <div className="app">
        <header>
          <h1>Latest News for {symbol}</h1>
        </header>
        <section className="news-container">
          {news.map((article, index) => (
              <div key={index} className="news-card">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <img src={article.urlToImage} alt={article.title} className="news-image" />
                  <div className="news-content">
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <span className="news-date">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </a>
              </div>
          ))}
        </section>
      </div>
  );
}