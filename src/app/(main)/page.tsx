import About from "@/components/Globals/Sections/About";
import { print } from "graphql/language/printer";
import { CategoryIdType, Post, PostFormat, PostFormatToPostConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PostQuery } from "@/components/Templates/Post/PostQuery";
import Experience from "@/components/Globals/Sections/Experience";
import { postsQuery } from "@/queries/general/postsQuery";
import Projects from "@/components/Globals/Sections/Projects";
import Posts from "@/components/Globals/Sections/Posts";

export default async function Page() {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: "about",
    idType: "URI",
  });

  const { posts } = await fetchGraphQL<{ posts: PostFormatToPostConnection }>(
    print(postsQuery),
    {
      categoryName: "Experience",
    }
  );

  const { posts: posts_projects } = await fetchGraphQL<{
    posts: PostFormatToPostConnection;
  }>(print(postsQuery), {
    categoryName: "Projects",
  });

  const { posts: blog_posts } = await fetchGraphQL<{ posts: PostFormatToPostConnection }>(
    print(postsQuery),
    {
      categoryName: "Posts",
      first: 4,
    }
  )


  return (
    <main>
      <About post={post}/>
      <Experience posts={posts}/>
      <Projects posts={posts_projects} />
      <Posts posts={blog_posts} />
    </main>
  );
}
