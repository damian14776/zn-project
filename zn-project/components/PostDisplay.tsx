import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../services/app'; // Import API app

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // State for error handling

    useEffect(() => {
        const getPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts(); // Fetch posts from API
                console.log('Fetched posts:', fetchedPosts);
                setPosts(fetchedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error); // Log if there's an error
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        getPosts(); // Call function
    }, []);

    if (error) {
        return <div>{error}</div>; // Display error
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
