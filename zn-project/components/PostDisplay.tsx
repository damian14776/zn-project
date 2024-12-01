import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPhotos, fetchUsers } from '../services/app';

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
    searchQuery: string; // Receive searchQuery
    selectedUserId: string; // Receive the selected user ID
}

const PostDisplay: React.FC<PostDisplayProps> = ({ searchQuery, selectedUserId }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const [fetchedPosts, fetchedPhotos, fetchedUsers] = await Promise.all([
                    fetchPosts(),
                    fetchPhotos(),
                    fetchUsers(),
                ]);

                const combinedPosts = fetchedPosts.map((post: Post) => ({
                    ...post,
                    image: fetchedPhotos.find((photo: { id: number }) => photo.id === post.id)?.url,
                    user: fetchedUsers.find((user: { id: number }) => user.id === post.userId),
                }));

                setPosts(combinedPosts); // Set all posts
                setFilteredPosts(combinedPosts); // Set filtered posts
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
        // Filter posts based on query & user
        let filtered = posts;

        if (searchQuery) {
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.body.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedUserId) {
            filtered = filtered.filter(post => post.userId.toString() === selectedUserId);
        }

        setFilteredPosts(filtered);

    }, [searchQuery, selectedUserId, posts]); // Re-run the filter if changed

    // Pagination calculations
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost); // Only slice filteredPosts for pagination

    // Pagination button handlers
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => prev + 1);
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1)); // Prevent going below page 1

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <ul className="space-y-6">
                        {currentPosts.map((post) => (  // Use currentPosts for pagination
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

                    <div className="flex justify-between items-center m-6">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-zngly-green text-white rounded-md hover:bg-green-400 disabled:bg-gray-300"
                        >
                            Previous
                        </button>
                        <div>
                            <span>Page {currentPage} of {totalPages}</span>
                        </div>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-zngly-green text-white rounded-md hover:bg-green-400 disabled:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostDisplay;
