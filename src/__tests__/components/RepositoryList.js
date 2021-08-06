import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from "../../components/RepositoryList";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };

            // Add your test code here
            const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

            // Mutate numbers to correct form
            const mutateNumber = (number) => {
                const suffix = "k";
                try {
                    const num = Number(number);
                    if (num < 1000) {
                        return num;
                    } else {
                        const newNum = number / 1000;
                        return Math.round(newNum * 10) / 10 + suffix;
                    }
                } catch (e) {
                    console.log(number, " is not a number.", e.message);
                }
            };

            debug();
            // Check fullName
            expect(getAllByTestId('fullName')[0]).toHaveTextContent(repositories.edges[0].node.fullName);
            expect(getAllByTestId('fullName')[1]).toHaveTextContent(repositories.edges[1].node.fullName);

            // Check description
            expect(getAllByTestId('description')[0]).toHaveTextContent(repositories.edges[0].node.description);
            expect(getAllByTestId('description')[1]).toHaveTextContent(repositories.edges[1].node.description);

            // Check language
            expect(getAllByTestId('language')[0]).toHaveTextContent(repositories.edges[0].node.language);
            expect(getAllByTestId('language')[1]).toHaveTextContent(repositories.edges[1].node.language);

            // Check forksCount
            expect(getAllByTestId('forksCount')[0]).toHaveTextContent(mutateNumber(repositories.edges[0].node.forksCount));
            expect(getAllByTestId('forksCount')[1]).toHaveTextContent(mutateNumber(repositories.edges[1].node.forksCount));

            // Check stargazersCount
            expect(getAllByTestId('stargazersCount')[0]).toHaveTextContent(mutateNumber(repositories.edges[0].node.stargazersCount));
            expect(getAllByTestId('stargazersCount')[1]).toHaveTextContent(mutateNumber(repositories.edges[1].node.stargazersCount));

            // Check ratingAverage
            expect(getAllByTestId('ratingAverage')[0]).toHaveTextContent(repositories.edges[0].node.ratingAverage);
            expect(getAllByTestId('ratingAverage')[1]).toHaveTextContent(repositories.edges[1].node.ratingAverage);

            // Check reviewCount
            expect(getAllByTestId('reviewCount')[0]).toHaveTextContent(mutateNumber(repositories.edges[0].node.reviewCount));
            expect(getAllByTestId('reviewCount')[1]).toHaveTextContent(mutateNumber(repositories.edges[1].node.reviewCount));
        });
    });
});