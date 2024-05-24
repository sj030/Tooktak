import axiosInstance from "./config/axiosInstance";

export function getMetadata() {
    return axiosInstance.get('service/attributes')
}

export function getFileList(hospital, attributes) {
    console.log(hospital, attributes)
    return axiosInstance.post('file/search', {name: hospital, attributes: attributes})
}