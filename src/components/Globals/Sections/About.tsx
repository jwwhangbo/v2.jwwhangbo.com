"use client";
import { Post } from "@/gql/graphql";
import Image from "next/image";
import profilePic from "@/public/linkedin_profile.jpeg";
import WavingHand from "./WavingHand";
import { InView } from "react-intersection-observer";
import { useInView } from "../Providers/NavigationProvider";
import SectionHeader from "../Common/SectionHeader";

export default function About({ post }: { post: Post }) {
  const {inView, setInView} = useInView();

  return (
    <InView
      id="about"
      as="div"
      threshold={0.2}
      // rootMargin="-100px 0px"
      triggerOnce={false}
      onChange={(inView, entry) => {
        if (inView) {
          setInView(entry.target.id);
        }
      }}
      className="lg:pt-24"
    >
      <SectionHeader text="About" />
      <div className="px-3 lg:px-0 relative">
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
