import db from './db';

export async function seedDatabase() {
  try {
    // Sample articles
    const sampleArticles = [
      {
        title: "The Future of AI in Technology",
        content: "Artificial Intelligence is revolutionizing the way we live and work. From autonomous vehicles to smart homes, AI is everywhere...",
        author: "Tech Analyst",
        image_url: "https://source.unsplash.com/random/800x600/?technology,mobile",
        category: "Technology"
      },
      {
        title: "Sustainable Energy Solutions",
        content: "Renewable energy sources are becoming more viable and cost-effective...",
        author: "Environmental Tech Writer",
        image_url: "https://source.unsplash.com/random/800x600/?sustainable,technology",
        category: "Environment"
      },
      {
        title: "Best AI Tools for Tech Professionals 2024",
        content: "# Best AI Tools for Tech Professionals 2024\n\n## Our Methodology\n\nJust like NerdWallet evaluates financial products, we rigorously tested AI tools using a comprehensive methodology...",
        author: "Tech AI Reviewer",
        image_url: "https://source.unsplash.com/random/800x600/?ai,tools,technology",
        category: "AI Tools"
      },
      // Add more articles as needed
    ];

    for (const article of sampleArticles) {
      await db.run(
        `INSERT OR IGNORE INTO articles (title, content, author, image_url, category) VALUES (?, ?, ?, ?, ?)`,
        article.title,
        article.content,
        article.author,
        article.image_url,
        article.category
      );
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}