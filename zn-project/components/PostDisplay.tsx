import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPhotos } from '../services/app'; // Import all API functions

interface Post {
    id: number;
    title: string;
    body: string;
    image?: string;
}

interface Photo {
    id: number;
    url: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]); // Posts with combined data
    const [photos, setPhotos] = useState();
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const [fetchedPosts, fetchedPhotos] = await Promise.all([
                    fetchPosts(),
                    fetchPhotos(),
                ]);

                const combinedPosts = fetchedPosts.slice(0,10).map((post, index) => ({
                    ...post,
                    image: fetchedPhotos[index]?.url,
                }));

                setPosts(combinedPosts);
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
                        </div>
                    </li>
                ))}
            </ul>
        </div>


    );
};

export default PostList;
