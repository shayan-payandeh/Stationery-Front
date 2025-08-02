export interface ICommentGet {
  _id: string;
  user: { fullName: string };
  product: string;
  context: string;
  likedBy: string[];
  reply: {
    _id: string;
    context: string;
    user: { fullName: string };
    likedBy: string[];
  }[];
}

export interface ICommentPost {
  productId: string;
  context: string;
}

export interface IReplyPost {
  commentId: string;
  context: string;
}
