import { useMutation, useApolloClient } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";
import { useHistory } from 'react-router-native';

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHORIZE);
    const authStorage = useAuthStorage();
    const history = useHistory();
    const client = useApolloClient();

    const signIn = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        console.log(data.authorize.accessToken);

        await authStorage.setAccessToken(data.authorize.accessToken);
        client.resetStore();
        history.push("/");
    };
    return [signIn, result];
};

export default useSignIn;