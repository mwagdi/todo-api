import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Comment = {
  __typename?: 'Comment';
  by: User;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  task: Task;
  task_id: Scalars['Int']['output'];
  user_id: Scalars['Int']['output'];
};

export type CommentInput = {
  content: Scalars['String']['input'];
  task: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Comment;
  addTask: Task;
  deleteComment: Comment;
  deleteTask: Task;
  deleteUser?: Maybe<Array<Maybe<User>>>;
  login?: Maybe<AuthPayload>;
  signup?: Maybe<AuthPayload>;
};

export type MutationAddCommentArgs = {
  comment: CommentInput;
};

export type MutationAddTaskArgs = {
  task: TaskInput;
};

export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteTaskArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationSignupArgs = {
  input: SignupInput;
};

export type Query = {
  __typename?: 'Query';
  comments?: Maybe<Array<Maybe<Comment>>>;
  tasks?: Maybe<Array<Maybe<Task>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type SignupInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  comments?: Maybe<Array<Maybe<Comment>>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  owner: User;
  title: Scalars['String']['output'];
  user_id: Scalars['Int']['output'];
};

export type TaskInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  tasks: Array<Maybe<Task>>;
  username: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Comment: ResolverTypeWrapper<Comment>;
  CommentInput: CommentInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskInput: TaskInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  Comment: Comment;
  CommentInput: CommentInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  SignupInput: SignupInput;
  String: Scalars['String']['output'];
  Task: Task;
  TaskInput: TaskInput;
  User: User;
};

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload'],
> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Comment'] = ResolversParentTypes['Comment'],
> = {
  by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['Task'], ParentType, ContextType>;
  task_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, 'comment'>
  >;
  addTask?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<MutationAddTaskArgs, 'task'>
  >;
  deleteComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, 'id'>
  >;
  deleteTask?: Resolver<
    ResolversTypes['Task'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTaskArgs, 'id'>
  >;
  deleteUser?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType,
    Partial<MutationDeleteUserArgs>
  >;
  login?: Resolver<
    Maybe<ResolversTypes['AuthPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'email' | 'password'>
  >;
  signup?: Resolver<
    Maybe<ResolversTypes['AuthPayload']>,
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'input'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  comments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Comment']>>>,
    ParentType,
    ContextType
  >;
  tasks?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Task']>>>,
    ParentType,
    ContextType
  >;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >;
};

export type TaskResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Task'] = ResolversParentTypes['Task'],
> = {
  comments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Comment']>>>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  first_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  last_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tasks?: Resolver<
    Array<Maybe<ResolversTypes['Task']>>,
    ParentType,
    ContextType
  >;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};
