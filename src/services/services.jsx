import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export function getPost() {
    return api.get('/posts');
}

export function deletePost(id) {
    return api.get(`/posts/${id}`);
}