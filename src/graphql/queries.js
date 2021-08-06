import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
    query getRepositories {
        repositories {
            edges {
                node {
                    ...RepositoryDetails
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
`;

export const IS_AUTHORIZED = gql`
    query isAuthorized {
        authorizedUser {
            id
            username
        }
    }
`;

export const GET_REPOSITORY = gql`
    query getRepository($id: ID!) {
        repository(id: $id) {
            ...RepositoryDetails
            url
            reviews {
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
                }
            }
        }
    }
    ${REPOSITORY_DETAILS}
`;