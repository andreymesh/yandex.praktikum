import { ResourcesApi } from "../api";
import { responseHasError } from "../utils";

const resourcesApi = new ResourcesApi('/resources');

export const uploadResource = async (file: FormData) => {
    const result = await resourcesApi.uploadResource(file);
    const error = responseHasError(result);
    if (error) {
        throw Error(error);
    }
    if (!error) {
        return result.data;
    }
};
