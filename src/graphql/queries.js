import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query getRepositories($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    ...RepositoryDetails
                }
                cursor
            }
            pageInfo {
                hasNextPage
                endCursor
                startCursor
            }
        }
    }
    ${REPOSITORY_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
    query getAuthorizedUser($includeReviews: Boolean = false) {
        authorizedUser {
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        repository {
                            id
                        }
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                    endCursor
                    startCursor
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query getRepository($first: Int, $after: String, $id: ID!) {
        repository(id: $id) {
            ...RepositoryDetails
            url
            reviews (first: $first, after: $after) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasNextPage
                    endCursor
                    startCursor
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
`;