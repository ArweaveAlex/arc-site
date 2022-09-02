export const CURRENT_WHITELISTED_POOLS = [
  "0v4qUzj-3SaHLKq_uGt8dT5yan2wO2ylkOwXLf3mLaE",
];

/**
 * Since all pools in development are UK-RU conflict,
 * the code below duplicates the results for all of them.
 */
const POOL_EXTRA_DATA = CURRENT_WHITELISTED_POOLS.map((id) => ({
  contract: {
    id,
  },
  category: "uk-ru-conflict",
  page: {
    title: "THE UKRAINE & RUSSIA CONFLICT",
    subtitle: '"Truth is the first victim in a war." - Hiram Warren Johnson',
    description:
      "Bundlr and Arweave have been archiving data coming from Russia and Ukraine since before the war began. It was important to ensure that articles, tweets, videos, photos, and other data individuals were posting online, were permanently stored so governments and other centralized entities, could not censor them in the future.",
    scrollText:
      "Support us as we continue to archive important data from Russia and Ukraine.",
  },
}));

export default POOL_EXTRA_DATA;
