"use client";
import { Post } from "@/gql/graphql";
import Image from "next/image";
import profilePic from "@/public/linkedin_profile.jpeg";
import WavingHand from "./WavingHand";
import { InView } from "react-intersection-observer";

export default function About({ post }: { post: Post }) {
  return (
    <InView
      id="about"
      as="div"
      onChange={(inView, entry) => {return;}}
      className="lg:pt-24"
    >
      <div className="relative">
        <Image
          src={profilePic}
          alt={"profile picture"}
          width={300}
          height={300}
          style={{ objectFit: "cover", float: "left" }}
          className="w-full sm:max-w-[300px] aspect-square lg:max-h-[300px] m-4 ml-0 mr-8"
        />
        <WavingHand />
        <div
          className=" space-y-6"
          dangerouslySetInnerHTML={{ __html: post?.content || " " }}
        />
      </div>
    </InView>
  );
}
