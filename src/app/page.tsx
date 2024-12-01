import { postService } from "@/app/lib/services/PostService";
import { PostsTable } from "./__components/PostsTable";

export default async function Home() {
  const posts = await postService.getPosts();

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <PostsTable initialPosts={posts} />
    </section>
  );
}
