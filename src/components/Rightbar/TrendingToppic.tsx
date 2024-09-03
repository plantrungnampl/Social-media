import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { formatCount } from "../../utils/formatNumber";

const getTrendingTopic = unstable_cache(
  async () => {
    const result = await db.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[a-zA-Z0-9_]+', 'g'))) AS hashtag, COUNT(*) AS count
    FROM "Post"
    GROUP BY (hashtag)
    ORDER BY count DESC, hashtag ASC
    LIMIT 5
    `;
    console.log(result);
    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 3 * 60 * 60,
  }
);
const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopic();
  console.log(trendingTopics);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-3">
        {trendingTopics.map((topic) => (
          <Link
            key={topic.hashtag}
            href={`/hashtag?q=${encodeURIComponent(topic.hashtag)}`}
            className="flex items-center justify-between hover:bg-gray-100 p-2 rounded transition-colors duration-200"
          >
            <span className="text-blue-500 font-medium">{topic.hashtag}</span>
            <span className="text-gray-500 text-sm">
              {formatCount(topic.count)} {topic.count === 1 ? "post" : "posts"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default TrendingTopics;
