import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id }
    });
    return { repository: data ? data.repository : null, error, loading, refetch };
};

export default useRepository;