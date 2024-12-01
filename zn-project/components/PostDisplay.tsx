import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPhotos, fetchUsers } from '../services/app'; // Import all API functions

interface Post {
    id: number;
    title: string;
    body: string;
    image?: string;
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

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Posts with combined data
    const [photos, setPhotos] = useState();
    const [users, setUsers] = useState();
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const [fetchedPosts, fetchedPhotos, fetchedUsers] = await Promise.all([
                    fetchPosts(),
                    fetchPhotos(),
                    fetchUsers(),
                ]);

                const combinedPosts = fetchedPosts.slice(0,10).map((post: Post, index: number) => ({
                    ...post,
                    image: fetchedPhotos[index]?.url,
                    user: fetchedUsers.find((user: User) => user.id === post.userId),
                }));

                setPosts(combinedPosts);
                setUsers(fetchedUsers);
                setPhotos(fetchedPhotos);
            } catch (error) {
                console.error('Error fetching posts:', error); // Log if there's an error
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        getData(); // Call function
    }, []);


    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        {/* Image Section */}
                        <img src={post.image} alt={post.title}/>

                        {/* Content Section */}
                        <div>
                            {/* Post Title */}
                            <h3>{post.title}</h3>

                            {/* Post Description */}
                            <p>{post.body}</p>

                            {post.user && (
                                <div>
                                    <h4>User Info</h4>
                                    <p>Name: {post.user.name}</p>
                                    <p>Email: {post.user.email}</p>
                                    <p>Phone: {post.user.phone}</p>
                                    <p>Website: {post.user.website}</p>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>


    );
};

export default PostList;
