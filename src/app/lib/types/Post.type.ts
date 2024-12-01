export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface CreatePostDTO {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponse {
  post: Post;
  status: number;
}
