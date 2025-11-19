import { useState, useMemo } from 'react';
import { newsCategories } from '../data/mockNewsData';
import './NewsTags.css';

function NewsTags({ newsData, onTagClick }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter news data by category
  const filteredNews = useMemo(() => {
    if (selectedCategory === 'All') {
      return newsData;
    }
    return newsData.filter(news => news.category === selectedCategory);
  }, [newsData, selectedCategory]);

  const handleTagClick = (news, originalIndex) => {
    setSelectedIndex(originalIndex);
    onTagClick(news.content);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Breaking News': return '🔴';
      case 'World News': return '🌍';
      case 'Investment News': return '💰';
      case 'Sport News': return '⚽';
      default: return '📰';
    }
  };

  return (
    <div className="news-tags">
      <div className="news-tags-header">
        <span className="news-tags-icon">📰</span>
        <h3 className="news-tags-title">News</h3>
      </div>
      
      <div className="category-filter">
        <select 
          className="category-dropdown"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedIndex(null); // Reset selection when changing category
          }}
        >
          {newsCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="news-tags-list">
        {filteredNews.map((news) => {
          // Find original index for selection state
          const originalIndex = newsData.indexOf(news);
          return (
            <button
              key={originalIndex}
              className={`news-tag ${selectedIndex === originalIndex ? 'active' : ''}`}
              onClick={() => handleTagClick(news, originalIndex)}
              title={news.title}
            >
              <span className="news-tag-icon">{getCategoryIcon(news.category)}</span>
              <div className="news-tag-content">
                <span className="news-tag-title">{news.title}</span>
                <div className="news-tag-meta">
                  <span className="news-tag-date">{news.date}</span>
                  <span className="news-tag-category">{news.category}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {filteredNews.length === 0 && (
        <div className="no-news-message">
          No news available for this category
        </div>
      )}
    </div>
  );
}

export default NewsTags;

