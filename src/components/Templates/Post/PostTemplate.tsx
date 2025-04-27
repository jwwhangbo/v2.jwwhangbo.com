import { print } from "graphql/language/printer";

import { ContentNode, Post, TagIdType } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostTemplate.module.css";
import { PostQuery } from "./PostQuery";
import Link from "next/link";
import PostArea from "./postArea";

interface TemplateProps {
  node: ContentNode;
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: node.databaseId,
    idType: "DATABASE_ID",
  });

  return (
    <div className={styles.post}>
      <Link href="/" className="group w-fit h-fit flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
          />
        </svg>
        <span className="group-hover:translate-x-1 transition-transform">
          Prev
        </span>
      </Link>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>
        @{" "}
        {new Date(post.date ?? 0)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+:\d+)/, "$3.$1.$2 $4")}
      </div>

      <PostArea content={post.content} />
    </div>
  );
}
