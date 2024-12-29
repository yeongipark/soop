"use client";

import { useEffect, useState } from "react";
import style from "./commentItem.module.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Confirm from "../confirm";
import Modal from "../modal";
import apiClient from "@/util/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Setting from "../review.my/setting";

export default function CommentItem({
  id,
  reviewId,
  date,
  name,
  content,
}: {
  id: string | number;
  reviewId: string | number;
  date: string;
  name: string;
  content: string;
}) {
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const [deleteModal, setDeleteModal] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  useEffect(() => {
    setNickname(localStorage.getItem("nickname") ?? "");
  }, []);

  // 댓글 삭제
  const { mutate } = useMutation({
    mutationFn: () => deleteChat(id),
    onMutate: async () => {
      const previousData = queryClient.getQueryData([
        "reviewDetail",
        String(reviewId),
      ]);

      if (previousData) {
        const updatedComments = previousData.commentResponses.filter(
          (comment) => comment.id !== id
        );

        queryClient.setQueryData(["reviewDetail", String(reviewId)], {
          ...previousData,
          commentResponses: updatedComments,
        });
      }

      return { previousData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviewDetail", String(reviewId)],
        refetchType: "all",
      });
    },
  });

  // 댓글 수정정
  const { mutate: editChat } = useMutation({
    mutationFn: () => patchChat(id, editContent),
    onMutate: async () => {
      const previousData = queryClient.getQueryData([
        "reviewDetail",
        String(reviewId),
      ]);

      if (previousData) {
        const updatedComments = previousData.commentResponses.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              content: editContent,
            };
          } else return comment;
        });

        queryClient.setQueryData(["reviewDetail", String(reviewId)], {
          ...previousData,
          commentResponses: updatedComments,
        });
      }

      return { previousData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviewDetail", String(reviewId)],
        refetchType: "all",
      });
    },
  });

  const handleEditBtn = () => {
    setSettingModal(false);
    setIsEditing(true);
  };

  const handleDeleteBtn = () => {
    if (!deleteModal) {
      setSettingModal(false);
      setDeleteModal(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleEdit = () => {
    if (editContent.length < 2) {
      return;
    }
    setIsEditing(false);
    editChat();
  };

  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.wrap}>
          <p>{name}</p>
          <p className={style.date}>{formatDate(date)}</p>
        </div>
        {nickname === name ? (
          <HiOutlineDotsHorizontal
            className={style.icon}
            onClick={() => {
              setSettingModal(true);
            }}
          />
        ) : null}
      </div>
      {isEditing ? (
        <div className={style.editContainer}>
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={style.input}
          />
          <div className={style.editButtons}>
            <button onClick={handleEdit} className={style.saveButton}>
              저장
            </button>
            <button onClick={handleCancelEdit} className={style.cancelButton}>
              취소
            </button>
          </div>
        </div>
      ) : (
        <p className={style.content}>{content}</p>
      )}
      {deleteModal && (
        <Confirm
          setModalState={setDeleteModal}
          title="댓글을 삭제하시겠습니까?"
          ok="네"
          func={mutate}
        />
      )}
      {settingModal && (
        <Modal width="30%" type="custom" setModalState={setSettingModal}>
          <Setting
            setModalState={setSettingModal}
            handleDeleteBtn={handleDeleteBtn}
            handleEditBtn={handleEditBtn}
          />
        </Modal>
      )}
    </div>
  );
}

async function deleteChat(commentId: number | string) {
  await apiClient.delete(`/api/comments/${commentId}`);
}

async function patchChat(commentId: number | string, content: string) {
  await apiClient.patch(`/api/comments/${commentId}`, { content });
}

function formatDate(date: string): string {
  const d = new Date(date);
  const now = Date.now();
  const diffInSeconds = Math.floor((now - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    // 1분 미만
    return "방금 전";
  }

  if (diffInSeconds < 3600) {
    // 1시간 미만
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  }

  if (diffInSeconds < 86400) {
    // 24시간 미만
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  }

  if (diffInSeconds < 86400 * 7) {
    // 7일 미만
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }

  if (diffInSeconds < 86400 * 30) {
    // 1개월 미만
    const weeks = Math.floor(diffInSeconds / (86400 * 7));
    return `${weeks}주일 전`;
  }

  if (diffInSeconds < 86400 * 365) {
    // 1년 미만
    const months = Math.floor(diffInSeconds / (86400 * 30));
    return `${months}개월 전`;
  }

  // 1년 이상
  const years = Math.floor(diffInSeconds / (86400 * 365));
  return `${years}년 전`;
}
