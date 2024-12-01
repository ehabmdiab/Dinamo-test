"use client";

import { Button } from "@/components/atoms/Button";
import { Dialog } from "@/components/molecules/Dialog";
import { CreatePostForm } from "@/components/organisms/CreatePostForm";
import * as React from "react";
import { Post } from "../lib/types/Post.type";



interface CreatePostDialogProps {
  addPostCreatedAction: (post: Post) => void;
}

export function CreatePostDialog({ addPostCreatedAction }: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="p-2">
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Create Post
      </Button>
      <Dialog title="Create New Post" onClose={handleClose} isOpen={isOpen}>
        <CreatePostForm addPostCreatedAction={addPostCreatedAction} />
      </Dialog>
    </div>
  );
}
