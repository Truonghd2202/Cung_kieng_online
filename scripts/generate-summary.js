const fs = require("fs");
const path = require("path");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");
const files = fs.readdirSync(batchesDir).filter(f => f.endsWith(".json")).sort();

const countWords = (text) => text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

const summary = [];

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(batchesDir, file), "utf8"));
  content.forEach((article, idx) => {
    const bodyWords = (article.sections || []).reduce((acc, s) => acc + countWords(s.body), 0);
    const headingsWords = (article.sections || []).reduce((acc, s) => acc + countWords(s.heading), 0);
    const totalWords = countWords(article.title) + countWords(article.excerpt) + headingsWords + bodyWords;

    let urlType = "NONE";
    let isSpecific = false;
    const url = article.provenance?.sourceUrl;
    if (url) {
      try {
        const u = new URL(url);
        if (u.pathname === "/" || u.pathname === "" || u.pathname === "/vi" || u.pathname === "/en" || u.pathname === "/vi/" || u.pathname === "/en/") {
          urlType = "HOMEPAGE";
        } else {
          urlType = "SPECIFIC";
          isSpecific = true;
        }
      } catch {
        urlType = "INVALID";
      }
    }

    summary.push({
      batch: file,
      index: idx + 1,
      slug: article.slug,
      title: article.title,
      sourceTitle: article.provenance?.sourceTitle,
      sourceUrl: article.provenance?.sourceUrl,
      sourceLocator: article.provenance?.sourceLocator,
      bibliography: article.provenance?.bibliography,
      bodyWords,
      totalWords,
      urlType,
      isSpecific
    });
  });
});

fs.writeFileSync(path.join(__dirname, "all-200-summary.json"), JSON.stringify(summary, null, 2), "utf8");
console.log(`Saved summary for ${summary.length} articles.`);
