import ApiService from "./api.service";
import APIPaths from "../constants/apipath.constants";

export default class ResourceService {

    static async upload(files) {
        const formData = new FormData();
        formData.append("file", files[0]);

        return ApiService.postForm(APIPaths.UPLOAD, formData);

    }

}