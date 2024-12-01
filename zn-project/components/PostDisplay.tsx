import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPhotos, fetchUsers } from '../services/app'; // Import all API functions

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    image?: string;
    user?: User;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

interface Photo {
    id: number;
    url: string;
}

interface PostDisplayProps {
    searchQuery: string; // Receive searchQuery as prop from parent
}

const PostDisplay: React.FC<PostDisplayProps> = ({ searchQuery }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const [fetchedPosts, fetchedPhotos, fetchedUsers] = await Promise.all([
                    fetchPosts(),
                    fetchPhotos(),
                    fetchUsers(),
                ]);

                const combinedPosts = fetchedPosts.slice(0, 10).map((post: Post) => ({
                    ...post,
                    image: fetchedPhotos.find((photo: { id: number; }) => photo.id === post.id)?.url,
                    user: fetchedUsers.find((user: { id: number; }) => user.id === post.userId),
                }));

                setPosts(combinedPosts);
                setFilteredPosts(combinedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    useEffect(() => {
        // Filter posts based on search query
        if (searchQuery) {
            const filtered = posts.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [searchQuery, posts]); // Re-run the filter whenever searchQuery or posts change

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className="space-y-6">
                    {filteredPosts.map((post) => (
                        <li key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                            <div className="flex items-center space-x-6 p-4">
                                {post.image && (
                                    <img src={post.image} alt={post.title} className="w-48 h-48 object-cover object-center rounded-lg" />
                                )}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.body}</p>
                                    {post.user && (
                                        <div className="bg-gray-100 p-4 rounded-lg mt-4">
                                            <h4 className="font-medium text-gray-800 mb-2">User Info</h4>
                                            <p className="text-gray-600">Name: {post.user.name}</p>
                                            <p className="text-gray-600">Email: {post.user.email}</p>
                                            <p className="text-gray-600">Phone: {post.user.phone}</p>
                                            <p className="text-gray-600">Website: {post.user.website}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PostDisplay;
