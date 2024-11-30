import axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data;
    } catch (err) {
        throw new Error('Failed to Fetch');
        return [];
    }
}