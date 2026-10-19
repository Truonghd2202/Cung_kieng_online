const summary = require("./all-200-summary.json");
const batches = {};
summary.forEach(s => {
  batches[s.batch] = batches[s.batch] || [];
  batches[s.batch].push(s);
});

for (const [b, items] of Object.entries(batches)) {
  console.log(`=== ${b} ===`);
  items.forEach(it => {
    console.log(`  [${it.index}] ${it.slug} | ${it.isSpecific ? 'SPECIFIC' : 'HOMEPAGE'} | ${it.title}`);
  });
}
