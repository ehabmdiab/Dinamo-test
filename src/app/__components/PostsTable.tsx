"use client";

import { Post } from "@/app/lib/types/Post.type";
import { Button } from "@/components/atoms/Button";
import { Table } from "@/components/atoms/Table";
import { postService } from "@/app/lib/services/PostService";
import { notification } from "antd";
import { CreatePostDialog } from "./CreatePostDialog";
import * as React from "react";

export function PostsTable({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = React.useState<Post[]>(initialPosts);
  const [api, contextHolder] = notification.useNotification();

  const RemovePostFromTable = (id: number) => {
    setPosts((currentPosts) => currentPosts.filter((post) => post.id !== id));
  };

  const handleDelete = async (id: number) => {
    try {
      await postService.deletePost(id);
      api.success({
        message: "Success",
        description: "Post deleted successfully!",
        duration: 3,
        placement: "topRight",
      });
      RemovePostFromTable(id);
    } catch (error) {
      api.error({
        message: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete post",
        duration: 3,
        placement: "topRight",
      });
    }
  };

  const addPost = (newPost: Post) => {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "Content",
      dataIndex: "body",
      key: "body",
      width: "45%",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_: unknown, record: Post) => (
        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <CreatePostDialog addPostCreatedAction={addPost} />
      <Table<Post> columns={columns} dataSource={posts} rowKey="id" />
    </>
  );
}
