import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useHistory } from "react-router-native";

const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const history = useHistory();

    const createReview = async ({ repositoryName, ownerName, rating, text }) => {

        const { data } = await mutate({ variables: { repositoryName, ownerName, rating: Number(rating), text } });
        history.push(`/repo/${data.createReview.repositoryId}`);
    };
    return [createReview, result];
};

export default useCreateReview;