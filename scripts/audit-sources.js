const fs = require("fs");
const path = require("path");

const batchesDir = path.join(__dirname, "../editorial/culture-batches");
const files = fs.readdirSync(batchesDir).filter(f => f.endsWith(".json")).sort();

let allArticles = [];
for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(batchesDir, file), "utf8"));
  allArticles.push(...content.map((a, idx) => ({ ...a, _batch: file, _batchIndex: idx })));
}

console.log("Total articles:", allArticles.length);

let homepages = 0;
let specificUrls = 0;
let noUrls = 0;
const domainCounts = {};

const countWords = (text) => text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

let bodyUnder600 = 0;
let totalUnder600 = 0;
let minBody = 999999, maxBody = 0;
let minTotal = 999999, maxTotal = 0;

allArticles.forEach(a => {
  const url = a.provenance?.sourceUrl;
  if (!url) {
    noUrls++;
  } else {
    try {
      const u = new URL(url);
      domainCounts[u.hostname] = (domainCounts[u.hostname] || 0) + 1;
      const isHome = u.pathname === "/" || u.pathname === "" || u.pathname === "/vi" || u.pathname === "/en" || u.pathname === "/vi/" || u.pathname === "/en/";
      if (isHome) {
        homepages++;
      } else {
        specificUrls++;
      }
    } catch {
      specificUrls++;
    }
  }

  const bodyWords = (a.sections || []).reduce((acc, s) => acc + countWords(s.body), 0);
  const headingsWords = (a.sections || []).reduce((acc, s) => acc + countWords(s.heading), 0);
  const totalWords = countWords(a.title) + countWords(a.excerpt) + headingsWords + bodyWords;

  if (bodyWords < 600) bodyUnder600++;
  if (totalWords < 600) totalUnder600++;

  if (bodyWords < minBody) minBody = bodyWords;
  if (bodyWords > maxBody) maxBody = bodyWords;
  if (totalWords < minTotal) minTotal = totalWords;
  if (totalWords > maxTotal) maxTotal = totalWords;
});

files.forEach(f => {
  const content = JSON.parse(fs.readFileSync(path.join(batchesDir, f), "utf8"));
  const specific = content.filter(a => {
    try {
      const u = new URL(a.provenance?.sourceUrl);
      return !(u.pathname === "/" || u.pathname === "" || u.pathname === "/vi" || u.pathname === "/en" || u.pathname === "/vi/" || u.pathname === "/en/");
    } catch { return false; }
  });
  console.log(`${f}: ${specific.length}/${content.length} specific`);
});

