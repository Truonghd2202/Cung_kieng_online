const repository = require("../repositories/proverb.repository");

async function pickVerifiedProverb(options = {}, random = Math.random) {
  let candidates = await repository.listVerified(options);
  if (candidates.length === 0 && options.categories?.length) {
    candidates = await repository.listVerified({ excludeIds: options.excludeIds });
  }
  if (candidates.length === 0) return null;
  return candidates[Math.floor(random() * candidates.length)];
}

function toProverbDto(proverb) {
  if (!proverb) return null;
  return {
    id: proverb.id,
    content: proverb.content,
    meaning: proverb.meaning,
    category: proverb.category,
    source: {
      name: "VIVID – Vietnamese Idioms and Proverbs Benchmark",
      url: proverb.source,
      license: "MIT",
    },
    verified: proverb.verified,
  };
}

module.exports = { pickVerifiedProverb, toProverbDto };
