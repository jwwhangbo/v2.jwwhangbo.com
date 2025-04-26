import About from "@/components/Globals/Sections/About";
import { print } from "graphql/language/printer";
import { Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PostQuery } from "@/components/Templates/Post/PostQuery";

export default async function Page() {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: "about",
    idType: "URI",
  });

  return (
    <main>
      <About post={post}/>
    </main>
  );
}
