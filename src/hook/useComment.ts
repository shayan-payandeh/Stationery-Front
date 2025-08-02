import { ICommentPost } from "@/interface/comment";
import commentService from "@/service/commentService";
import { QueryType } from "@/type/query";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetCommentByProduct = (
  productId: string,
  query: QueryType = {},
) =>
  useQuery({
    queryKey: ["get-comment-by-product", query],
    queryFn: () => commentService.getCommentsByProduct(productId, query),
    retry: false,
    refetchOnWindowFocus: true,
  });
export const useGetMyCommentByProduct = (
  productId: string,
  query: QueryType = {},
) =>
  useQuery({
    queryKey: ["get-my-comment-by-product", query],
    queryFn: () => commentService.getMyCommentsByProduct(productId, query),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddComment = () => {
  return useMutation({
    mutationFn: (comment: ICommentPost) => commentService.addComment(comment),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useAddReplyToComment = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      reply,
    }: {
      commentId: string;
      reply: { context: string };
    }) => commentService.addReplyToComment(commentId, reply),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || error.message);
    },
  });
};

export const useAddLikeToComment = () => {
  return useMutation({
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: string;
      data: { likeType: number };
    }) => commentService.addLikeToComment(commentId, data),
  });
};

export const useAddLikeToReply = () => {
  return useMutation({
    mutationFn: ({
      replyId,
      data,
    }: {
      replyId: string;
      data: { commentId: string; likeType: number };
    }) => commentService.addLikeToReply(replyId, data),
  });
};
