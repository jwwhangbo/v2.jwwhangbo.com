"use client";
import React, { useState } from "react";
import Image from "next/image";
import { InView } from "react-intersection-observer";
import { useInView } from "../Providers/NavigationProvider";
import SectionHeader from "../Common/SectionHeader";
import { Post, PostFormatToPostConnection, Tag } from "@/gql/graphql";
import style from "./common.module.css";
import Link from "next/link";
import ArrowUpRight from "../Common/ArrowUpRight";

const Projects = ({ posts }: { posts: PostFormatToPostConnection }) => {
  const { setInView } = useInView();
  const [isVisible, setIsVisible] = useState(false);
  const [hoverItem, setHoverItem] = useState("");
  const [ishovering, setIsHovering] = useState(false);

  return (
    <InView
      id="projects"
      as="div"
      threshold={0.2}
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
      <SectionHeader text="Projects" />
      <ul className="space-y-8 px-3 lg:px-0">
        {posts.edges.length > 0 &&
          posts.edges.map((edge: { node: Post }) => {
            const { node } = edge;
            const itemClassName = `group relative lg:grid lg:grid-cols-8 sm:gap-8 md:gap-4 hover:scale-105 transition-transform ${
              style.card
            } ${ishovering && !(hoverItem === node.id) && "opacity-50"}`;

            return (
              <li
                key={node.id}
                className={node.projectLink?.projectLink ? "" : itemClassName}
                onMouseOver={() => {
                  setHoverItem(node.id);
                }}
                onMouseLeave={() => {
                  setHoverItem("");
                }}
              >
                {node.projectLink?.projectLink ? (
                  <Link
                    href={node.projectLink.projectLink}
                    className={itemClassName}
                  >
                    <div className="col-span-2">
                      {node.featuredImage &&
                        node.featuredImage.node.filePath && (
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
                      <div className="flex">
                        <p className="flex justify-start items-center gap-1 text-lg/tight text-slate-600! dark:text-slate-300!  mb-4">
                          {node.title}
                        </p>
                        <ArrowUpRight
                          className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          strokeWidth={2}
                        />
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: node.contentWithoutFigures ?? " ",
                        }}
                      />
                      <div className="flex gap-2 mt-4">
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
                ) : (
                  <>
                    <div className="col-span-2">
                      {node.featuredImage &&
                        node.featuredImage.node.filePath && (
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
                      <p className="flex justify-start items-center gap-1 text-lg/tight text-slate-600! dark:text-slate-300!  mb-4">
                        {node.title}
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: node.contentWithoutFigures ?? " ",
                        }}
                      />
                      <div className="flex gap-2 mt-4">
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
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </InView>
  );
};

export default Projects;
