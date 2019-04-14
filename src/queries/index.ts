import api from "../utils/api";
import { getOwnerAndRepo } from "../utils/page";
import { ProjectsData, SearchResultItemData } from "../interfaces/github/query";
import { ProjectNode, IssueNode } from "../interfaces/github/node";
import { debug } from "../utils/debug";

export const fetchAllIssuesByLabel = async (searchText: string): Promise<Array<IssueNode>> => {
  const { ownerName, repoName } = getOwnerAndRepo();

  const query = `repo:${ownerName}/${repoName} no:project ${searchText}`;

  let hasNextPage = true;
  let endCursor = undefined;
  let results: Array<IssueNode> = [];

  try {
    while (hasNextPage) {
      const result: SearchResultItemData = await searchIssuesByQuery(query, endCursor);
      endCursor = result.search.pageInfo.endCursor;
      hasNextPage = result.search.pageInfo.hasNextPage;
      results = results.concat(result.search.nodes);
    }

    debug("fetchAllIssuesByLabel", searchText, results);
  } catch (e) {
    debug("ERROR: fetchAllIssuesByLabel", e);
  }

  return results;
};

const searchIssuesByQuery = async (query: string, cursor: string | undefined): Promise<SearchResultItemData> => {
  return await api.v4(`
    query {
      search(query: "${query}", type: ISSUE, first: 1${cursor ? `, after: "${cursor}"` : ""}) {
        nodes {
          __typename
          ... on Issue {
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
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `);
};

export const fetchProject = async (projectName: string): Promise<ProjectNode> => {
  const { ownerName, repoName } = getOwnerAndRepo();

  try {
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

    const projectNodes = projects.repository.projects.nodes;

    if (projectNodes.length !== 1) {
      throw new Error(`fetchProject totalCount ${projectNodes.length}`);
    }

    debug("fetchProject", projectNodes[0]);
    return projectNodes[0];
  } catch (e) {
    debug("ERROR: fetchProject", e);
    return Promise.reject(e);
  }
};

export const addProjectCard = (contentId: string, projectColumnId: string, clientMutationId?: string) => {
  const result = api.v4(`
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

  debug("addProjectCard", result);
  return result;
};
