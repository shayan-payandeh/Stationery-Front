import { ICommentPost } from "@/interface/comment";
import { QueryType } from "@/type/query";
import axios from "axios";
import { getCookie } from "cookies-next";
import http from "./http";

class CommentService {
  async getCommentsByProduct(productId: string, query: QueryType) {
    return await http
      .get(`/comment/${productId}?${query}`)
      .then(({ data }) => data.data);
  }

  async getMyCommentsByProduct(productId: string, query: QueryType) {
    const token = getCookie("accessToken");
    const res = await axios
      .get(
        `${process.env.NEXT_PUBLIC_LOCAL_API_URL}/comment/mine/${productId}?${query}`,
        {
          withCredentials: true,
          headers: {
            Cookie: token,
          },
        },
      )
      .then(({ data }) => data.data);

    return res;
  }

  async addComment(commentData: ICommentPost) {
    return await http
      .post(`/comment/add`, commentData)
      .then(({ data }) => data.data);
  }

  async addReplyToComment(commentId: string, data: { context: string }) {
    return await http
      .patch(`/comment/reply/add/${commentId}`, data)
      .then(({ data }) => data.data);
  }

  async addLikeToComment(commentId: string, data: { likeType: number }) {
    return await http
      .patch(`/comment/like/${commentId}`, data)
      .then(({ data }) => data.data);
  }

  async addLikeToReply(
    replyId: string,
    data: { commentId: string; likeType: number },
  ) {
    return await http
      .patch(`/comment/reply/like/${replyId}`, data)
      .then(({ data }) => data.data);
  }
}

const commentService = new CommentService();

export default commentService;
