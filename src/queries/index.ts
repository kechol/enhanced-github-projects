import api from "../utils/api";
import { getOwnerAndRepo } from "../utils/page";
import { IssuesData, ProjectsData } from "../interfaces/github/query";
import { ProjectNode } from "../interfaces/github/node";

export const fetchIssuesByLabel = async (labelName: string): Promise<IssuesData> => {
  const { ownerName, repoName } = getOwnerAndRepo();
  return await api.v4(`
    query {
      repository(owner: "${ownerName}", name: "${repoName}") {
        issues(labels: ["${labelName}"], first: 100) {
          nodes {
            id
            number
            state
            url
            title
            author {
              login
            }
            publishedAt
            viewerCanUpdate
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `);
};

export const fetchProject = async (projectName: string): Promise<ProjectNode> => {
  const { ownerName, repoName } = getOwnerAndRepo();
  const projects: ProjectsData = await api.v4(`
    query {
      repository(owner: "${ownerName}", name: "${repoName}") {
        projects(search: "${projectName}", first: 2) {
          nodes {
            columns(first: 100) {
              nodes {
                cards {
                  nodes {
                    content {
                      __typename
                      ... on Issue {
                        id
                        number
                        title
                        url
                        state
                        locked
                        createdAt
                        lastEditedAt
                        publishedAt
                        updatedAt
                        authorAssociation
                        viewerCanReact
                        viewerCanSubscribe
                        viewerCanUpdate
                        viewerCannotUpdateReasons
                        viewerDidAuthor
                        viewerSubscription
                      }
                    }
                    creator {
                      login
                    }
                    id
                    databaseId
                    note
                    state
                    url
                    isArchived
                    createdAt
                    updatedAt
                  }
                }
                id
                databaseId
                name
                purpose
                url
                createdAt
                updatedAt
              }
            }
            pendingCards {
              nodes {
                content {
                  __typename
                  ... on Issue {
                    id
                    number
                    title
                    url
                    state
                    locked
                    createdAt
                    lastEditedAt
                    publishedAt
                    updatedAt
                    authorAssociation
                    viewerCanReact
                    viewerCanSubscribe
                    viewerCanUpdate
                    viewerCannotUpdateReasons
                    viewerDidAuthor
                    viewerSubscription
                  }
                }
                creator {
                  login
                }
                id
                databaseId
                note
                state
                url
                isArchived
                createdAt
                updatedAt
              }
            }
            creator {
              login
            }
            id
            databaseId
            url
            name
            body
            bodyHTML
            state
            closed
            closedAt
            createdAt
            updatedAt
            viewerCanUpdate
          }
        }
      }
    }
  `);

  if (projects.repository.projects.totalCount > 1) {
    throw new Error("[EGP] Duplicated project exists.");
  }

  return projects.repository.projects.nodes[0];
};

export const addProjectCard = (contentId: string, projectColumnId: string, clientMutationId?: string) => {
  return api.v4(`
    mutation {
      addProjectCard(input: {
        clientMutationId: "${clientMutationId || 0}",
        contentId: "${contentId}",
        projectColumnId: "${projectColumnId}"
      }) {
        clientMutationId
        cardEdge {
          cursor
          node {
            id
            databaseId
            url
            state
            isArchived
            createdAt
            updatedAt
            note
            content {
              __typename
              ... on Issue {
                id
                number
                title
                url
                state
                locked
                createdAt
                lastEditedAt
                publishedAt
                updatedAt
                authorAssociation
                viewerCanReact
                viewerCanSubscribe
                viewerCanUpdate
                viewerCannotUpdateReasons
                viewerDidAuthor
                viewerSubscription
              }
            }
          }
        }
      }
    }
  `);
};
