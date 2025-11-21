#!/usr/bin/env python3
"""
Script to summarize news articles using the summarization API.
Reads articles_news.json, calls the summarize API for each article's full_text,
and saves the summaries to summarized_news.json.
"""

import re
import json
import time
import requests
from datetime import datetime
import pandas as pd

# API configuration
SUMMARIZE_API_URL = "http://115.79.192.192:19977/summarize"
GET_NEWS_API_URL = "http://115.79.192.192:19977/get_news"
API_KEY = "zNBVyiatKn5eTvC2CEvDg1msgOCHrTZ55zZ0qfsu"

# Category mapping based on article content
CATEGORY_KEYWORDS = {
    "Breaking News": ["chủ tịch", "bí thư", "chính trị", "nhân sự", "UBND", "Tỉnh ủy"],
    "World News": ["quốc tế", "thế giới", "nước ngoài", "toàn cầu"],
    "Investment News": ["đầu tư", "chứng khoán", "kinh tế", "tài chính", "ngân hàng"],
    "Sport News": ["bóng đá", "thể thao", "vô địch", "giải", "cầu thủ"],
}


def categorize_article(title, full_text):
    """Determine article category based on keywords in title and content"""
    text_to_check = (title + " " + full_text).lower()

    for category, keywords in CATEGORY_KEYWORDS.items():
        for keyword in keywords:
            if keyword.lower() in text_to_check:
                return category

    return "Breaking News"  # Default category


def summarize_text(full_text):
    """Call the summarize API to get a summary of the text"""
    headers = {
        "accept": "application/json",
        "api-key": API_KEY,
        "Content-Type": "application/json",
    }

    data = {"content": full_text}

    try:
        response = requests.post(
            SUMMARIZE_API_URL, headers=headers, json=data, timeout=120
        )
        response.raise_for_status()
        result = response.json()

        if result.get("status") == 0 and "summary" in result:
            return result["summary"]
        else:
            print(f"API returned non-zero status: {result}")
            return None
    except Exception as e:
        print(f"Error calling summarize API: {e}")
        return None


def main():
    # Read articles from JSON file
    try:
        with open("articles_news.json", "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        print("Error: articles_news.json not found")
        return

    articles = data.get("articles", [])
    fetch_date = data.get("fetch_date", "")

    print(f"Found {len(articles)} articles to summarize")
    print(f"Fetch date: {fetch_date}\n")

    summarized_articles = []

    for i, article in enumerate(articles, 1):
        title = article.get("title", "")
        full_text = article.get("full_text", "")
        publish_time = article.get("publish_time", 0)

        # Convert timestamp to date string
        if publish_time:
            date_obj = datetime.fromtimestamp(publish_time)
            date_str = date_obj.strftime("%d/%m/%Y")
        else:
            date_str = "17/11/2024"

        print(f"[{i}/{len(articles)}] Summarizing: {title[:50]}...")

        # Call summarize API
        summary = summarize_text(full_text)

        if summary:
            # Determine category
            category = categorize_article(title, full_text)

            summarized_article = {
                "title": title,
                "summary": summary,
                "category": category,
                "date": date_str,
            }
            summarized_articles.append(summarized_article)
            print(f"  ✓ Summary: {summary[:80]}...")
            print(f"  Category: {category}")
        else:
            print(f"  ✗ Failed to summarize")

        print()

    # Save to output file
    output_data = {
        "fetch_date": fetch_date,
        "total_articles": len(summarized_articles),
        "articles": summarized_articles,
    }

    with open("summarized_news.json", "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"✓ Successfully summarized {len(summarized_articles)} articles")
    print(f"✓ Saved to summarized_news.json")


def get_news():
    """Get news from the API"""
    headers = {
        "accept": "application/json",
        "api-key": API_KEY,
        "Content-Type": "application/json",
    }

    data = {"news_type": "thoi-su", "limit": 5}
    response = requests.post(GET_NEWS_API_URL, headers=headers, json=data, timeout=120)
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    # main()
    news = get_news()
    results = news.get("results", [])

    for result in results["articles"]:
        title = result.get("title", "")
        publish_datetime = result.get("publish_time", "")

        # Extract date in format DD/MM/YYYY and convert to YYYY-MM-DD
        date_match = re.search(r"(\d{2})/(\d{2})/(\d{4})", publish_datetime)
        publish_date = (
            f"{date_match.group(3)}-{date_match.group(2)}-{date_match.group(1)}"
            if date_match
            else ""
        )

        # Extract time in format HH:MM
        time_match = re.search(r"(\d{2}):(\d{2})", publish_datetime)
        publish_time = (
            f"{time_match.group(1)}:{time_match.group(2)}" if time_match else ""
        )
        full_text = result.get("full_text", "")
        date_time = pd.to_datetime(f"{publish_date} {publish_time}")
        print(f"Title: {title}")
        print(f"Full text: {full_text}")
        print("-" * 100)

        import pdb

        pdb.set_trace()
