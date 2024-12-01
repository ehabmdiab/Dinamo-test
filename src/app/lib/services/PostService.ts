import { CreatePostDTO, Post, PostResponse } from "../types/Post.type";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts`);
    }

    return response.json();
  },

  createPost: async (postData: CreatePostDTO): Promise<PostResponse> => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post`);
    }

    const data = await response.json();
    return {
      post: data,
      status: response.status,
    };
  },

  async deletePost(id: number): Promise<void> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
  },
};
