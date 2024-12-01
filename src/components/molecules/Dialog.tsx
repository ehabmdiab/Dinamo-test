"use client";

import { Modal } from "antd";
import * as React from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ isOpen, onClose, title, children, className }, ref) => {
    return (
      <Modal
        title={title}
        open={isOpen}
        onCancel={onClose}
        footer={null}
        destroyOnClose
        className={className}
        panelRef={ref}
        motion={false} 

      >
        {children}
      </Modal>
    );
  }
);

Dialog.displayName = "Dialog";
