"use client";
import React, { useState } from "react";
import { InView } from "react-intersection-observer";
import { useInView } from "../Providers/NavigationProvider";
import SectionHeader from "../Common/SectionHeader";
import { Post, PostFormatToPostConnection, Tag } from "@/gql/graphql";
import style from "./common.module.css";

const Experience = ({ posts }: { posts: PostFormatToPostConnection }) => {
  const { setInView } = useInView();
  const [ isVisible, setIsVisible ] = useState(false);
  const [hoverItem, setHoverItem] = useState("");
  const [ishovering, setIsHovering] = useState(false);

  return (
    <InView
      id="experience"
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
      className={`lg:pt-24 transition-opacity ${isVisible ? "animate-contentShow" : "opacity-0"}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <SectionHeader text="Experience" />
      <ul className="space-y-8 px-3 lg:px-0">
        {posts.edges.length > 0 &&
          posts.edges.map((edge: { node: Post }) => {
            const { node } = edge;
            return (
              <li
                className={`relative grid grid-cols-8 sm:gap-8 md:gap-4 transition-transform ${
                  style.card
                } ${ishovering && !(hoverItem === node.id) && "opacity-50"}`}
                key={node.id}
                onMouseOver={() => {
                  setHoverItem(node.id);
                }}
                onMouseLeave={() => {
                  setHoverItem("");
                }}
              >
                <div className="col-span-2">
                  <p>
                    {new Date(node.datePeriod?.startDate ?? 0).toLocaleString(
                      "en-US",
                      { month: "long", year: "numeric" }
                    )}
                    -
                    {node.datePeriod?.endDate
                      ? new Date(node.datePeriod.endDate ?? 0).toLocaleString(
                          "en-US",
                          { month: "short", year: "numeric" }
                        )
                      : "Present"}
                  </p>
                </div>
                <div className="col-span-6">
                  <p className="flex justify-start items-center gap-1 text-lg/tight text-slate-600! dark:text-slate-300!  mb-4">
                    {node.experienceMeta?.companyName}
                    <span className="text-[8px]">•</span>
                    {node.experienceMeta?.position}
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: node.content ?? " " }}
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
              </li>
            );
          })}
      </ul>
    </InView>
  );
};

export default Experience;
