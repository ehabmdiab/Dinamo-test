"use client";

import { Button } from "../atoms/Button";
import * as React from "react";
import { Form, Input, notification } from "antd";
import { postService } from "@/app/lib/services/PostService";
import { CreatePostDTO, Post } from "@/app/lib/types/Post.type";
import { generateRandomId } from "@/app/lib/utils";

interface CreatePostFormProps {
  addPostCreatedAction: (post: Post) => void;
}

export const CreatePostForm = ({
  addPostCreatedAction,
}: CreatePostFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: CreatePostDTO) => {
    try {
      setLoading(true);
      const response = await postService.createPost({
        title: values.title,
        body: values.body,
        userId: 1,
      });
      addPostCreatedAction({
        ...response.post,
        id: generateRandomId(),
      });
      api.success({
        message: "Success",
        description: "Post created successfully!",
        duration: 10,
        placement: "topRight",
      });

      form.resetFields();
    } catch (error) {
      api.error({
        message: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create post",
        duration: 10,
        placement: "topRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="body"
          rules={[{ required: true, message: "Please input the content!" }]}
        >
          <Input.TextArea placeholder="Enter post content" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
