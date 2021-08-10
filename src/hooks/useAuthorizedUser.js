import { useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "../graphql/queries";

const useAuthorizedUser = (variables) => {
    const { data, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
        fetchPolicy: "cache-and-network",
        variables,
    });

    return { authorizedUser: data ? data.authorizedUser : null, loading, refetch };
};

export default useAuthorizedUser;