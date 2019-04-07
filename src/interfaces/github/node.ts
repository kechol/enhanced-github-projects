export interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface Connection<N> {
  nodes: Array<N>;
  pageInfo: PageInfo;
  totalCount: number;
  errors?: Array<Error>;
}

export interface ActorNode {
  login: string;
  avatarUrl: string;
  resourcePath: string;
  url: string;
}

export interface ProjectNode {
  columns: Connection<ProjectColumnNode>;
  pendingCards: Connection<ProjectCardNode>;
  body: string;
  bodyHTML: string;
  closed: boolean;
  closedAt: string;
  createdAt: string;
  creator: ActorNode;
  databaseId: number;
  id: string;
  name: string;
  // owner: UserNode | OrganizationNode | RepositoryNode
  resourcePath: string;
  state: "CLOSED" | "OPEN";
  updatedAt: string;
  url: string;
  viewerCanUpdate: boolean;
}

export interface ProjectColumnNode {
  cards: Connection<ProjectCardNode>;
  createdAt: string;
  databaseId: number;
  id: string;
  name: string;
  project: ProjectNode;
  purpose: "DONE" | "IN_PROGRESS" | "TODO";
  resourcePath: string;
  updatedAt: string;
  url: string;
}

export interface ProjectCardNode {
  __typeName: "Issue"; // "Issue" | "PullRequest";
  column: ProjectColumnNode;
  content: IssueNode; // IssueNode | PullRequestNode;
  createdAt: string;
  creator: ActorNode;
  databaseId: number;
  id: string;
  isArchived: boolean;
  note: string;
  project: ProjectNode;
  resourcePath: string;
  state: "CONTENT_ONLY" | "NOTE_ONLY" | "REDACTED";
  updatedAt: string;
  url: string;
}

export interface MilestoneNode {
  // issues: Connection<IssueNode>;
  // pullRequests: Connection<PullRequestNode>;
  closed: boolean;
  closedAt: string;
  createdAt: string;
  creator: ActorNode;
  description: string;
  dueOn: string;
  id: string;
  number: number;
  // repository: RepositoryNode;
  resourcePath: string;
  state: "CLOSED" | "OPEN";
  title: string;
  updatedAt: string;
  url: string;
}

export interface IssueNode {
  activeLockReason: "OFF_TOPIC" | "RESOLVED" | "SPAM" | "TOO_HEATED";
  author: ActorNode;
  authorAssociation: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MEMBER" | "NONE" | "OWNER";
  body: string;
  bodyHTML: string;
  bodyText: string;
  closed: boolean;
  closedAt: string;
  createdAt: string;
  createdViaEmail: boolean;
  databaseId: number;
  editor: ActorNode;
  // hovercard: HovercardNode;
  id: string;
  includesCreatedEdit: boolean;
  lastEditedAt: string;
  locked: boolean;
  milestone: MilestoneNode;
  number: number;
  publishedAt: string;
  // reactionGroups: Array<ReactionGroupNode>;
  // repository: RepositoryNode;
  resourcePath: string;
  state: "CLOSED" | "OPEN";
  title: string;
  updatedAt: string;
  url: string;
  viewerCanReact: boolean;
  viewerCanSubscribe: boolean;
  viewerCanUpdate: boolean;
  viewerCannotUpdateReasons: Array<
    "DENIED" | "INSUFFICIENT_ACCESS" | "LOCKED" | "LOGIN_REQUIRED" | "MAINTENANCE" | "VERIFIED_EMAIL_REQUIRED"
  >;
  viewerDidAuthor: boolean;
  viewerSubscription: "IGNORED" | "SUBSCRIBED" | "UNSUBSCRIBED";
}
