import Link from "next/link";
import { Figtree } from "next/font/google";
import { print } from "graphql/language/printer";

import styles from "./Navigation.module.css";

import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import Navlinks from "./Navlinks";
import SocialLinks from "./Sociallinks";
import ArrowUpRight from "../Common/ArrowUpRight";

const figtree = Figtree({ subsets: ["latin"] });

async function getData() {
  const menuQuery = gql`
    query MenuQuery {
      menuItems(where: { location: PRIMARY_MENU }) {
        nodes {
          uri
          target
          label
        }
      }
    }
  `;

  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(menuQuery));

  if (menuItems === null) {
    throw new Error("Failed to fetch data");
  }

  return menuItems;
}

export async function LegacyNavigation() {
  const menuItems = await getData();

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      {menuItems.nodes.map((item: MenuItem, index: number) => {
        if (!item.uri) return null;

        return (
          <Link
            itemProp="url"
            href={item.uri}
            key={index}
            target={item.target || "_self"}
          >
            <span itemProp="name">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navigation() {
  return (
    <header
      className="px-3 lg:px-0 lg:sticky top-0 bg-none lg:max-h-dvh flex items-center py-12 lg:py-24 gap-10"
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div>
          <h1 className={`text-end leading-[1] font-bold ${figtree.className}`}>
            Jongwook Whangbo
          </h1>
          <p className="text-end uppercase font-bold tracking-tight my-4 text-slate-400!">
            full-stack developer
          </p>
          <p className="text-end my-2 pt-1.5">
            Wesleyan University <br /> B.S. Computer Science <br />
            Passionate About Software Development and Data Science
          </p>
          <Navlinks className="hidden mt-8 lg:block" />
        </div>
        <div className="mt-6">
          <a
            href="mailto:jwwhangbo@gmail.com"
            className="group flex gap-0.5 items-start justify-end"
          >
            <span className="text-end text-sm/tight">Get in Touch</span>
            <ArrowUpRight
              className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              strokeWidth={2}
            />
          </a>
          <SocialLinks />
        </div>
      </div>
      <div className="hidden lg:block h-full w-px bg-black dark:bg-white" />
    </header>
  );
}
