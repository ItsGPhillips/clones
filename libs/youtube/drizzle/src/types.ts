import { InferModel } from "drizzle-orm";
import {
   Channels,
   Comments,
   Videos,
   VoteActionEnum,
   VideoVotes,
   CommentVotes,
   Views,
   Subscriptions,
} from ".";

export type Channel<T extends "insert" | "select" = "select"> = InferModel<
   typeof Channels,
   T
>;

export type Subscription<T extends "insert" | "select" = "select"> = InferModel<
   typeof Subscriptions,
   T
>;

export type Comment<T extends "insert" | "select" = "select"> = InferModel<
   typeof Comments,
   T
>;

export type Video<T extends "insert" | "select" = "select"> = InferModel<
   typeof Videos,
   T
>;

export type VoteAction = (typeof VoteActionEnum.enumValues)[number];

export type VideoVoteAction<T extends "insert" | "select" = "select"> =
   InferModel<typeof VideoVotes, T>;

export type CommentVoteAction<T extends "insert" | "select" = "select"> =
   InferModel<typeof CommentVotes, T>;

export type View<T extends "insert" | "select" = "select"> = InferModel<
   typeof Views,
   T
>;
