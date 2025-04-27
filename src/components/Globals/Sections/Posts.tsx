"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import { useInView } from "../Providers/NavigationProvider";
import SectionHeader from "../Common/SectionHeader";
import { Post, PostFormatToPostConnection, Tag } from "@/gql/graphql";
import style from "./common.module.css";
import Link from "next/link";

const Posts = ({ posts }: { posts: PostFormatToPostConnection }) => {
  const { setInView } = useInView();
  const [isVisible, setIsVisible] = useState(false);
  const [hoverItem, setHoverItem] = useState("");
  const [ishovering, setIsHovering] = useState(false);

  return (
    <InView
      id="posts"
      as="div"
      threshold={0.3}
      // rootMargin="-100px 0px"
      triggerOnce={false}
      onChange={(inView, entry) => {
        if (inView) {
          setIsVisible(inView);
          setInView(entry.target.id);
        }
      }}
      className={`lg:pt-24 transition-opacity ${
        isVisible ? "animate-contentShow" : "opacity-0"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <SectionHeader text="Posts" />
      <ul className="space-y-8 px-3 lg:px-0">
        {posts.edges.length > 0 &&
          posts.edges.map((edge: { node: Post }) => {
            const { node } = edge;

            return (
              <li
                key={node.id}
                className={`hover:scale-105 transition-transform ${style.card} ${ishovering && !(hoverItem === node.id) && "opacity-50"}`}
                onMouseOver={() => {
                  setHoverItem(node.id);
                }}
                onMouseLeave={() => {
                  setHoverItem("");
                }}
              >
                <Link
                  href={`posts/${node.slug}`}
                  className={`group relative lg:grid lg:grid-cols-8 sm:gap-8 md:gap-4`}
                >
                  {/* Always render both column containers, regardless of image presence */}
                  <div className="col-span-2">
                    {node.featuredImage && node.featuredImage.node.filePath && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}${
                          node.featuredImage.node.filePath as string
                        }`}
                        alt={node.title || ""}
                        width={150}
                        height={150}
                        className="mb-4 lg:m-0"
                      />
                    )}
                  </div>
                  <div className="col-span-6">
                    <p className="flex justify-start items-center gap-1 text-lg/tight text-slate-600! dark:text-slate-300! mb-4">
                      {node.title || ""}
                    </p>
                    <div
                      className="max-h-24 overflow-y-hidden"
                      dangerouslySetInnerHTML={{
                        __html: node.excerpt ?? "&nbsp;",
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-4">
                      {node.tags?.nodes.map((tagNode: Tag) => (
                        <div
                          key={tagNode.id}
                          className="text-xs py-1 px-2 bg-violet-800/50 rounded-full border-t-[1px] border-violet-900 select-none drop-shadow-lg"
                        >
                          <p>{tagNode.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </InView>
  );
};

export default Posts;
