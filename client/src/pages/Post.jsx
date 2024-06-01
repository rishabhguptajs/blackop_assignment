import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://localhost:8080/api/posts?page=${page}&limit=5`
        ,{
          headers: {
            Authorization: token,
          },
        }
      );
      setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
      if (response.data.posts.length === 0) {
        setHasMore(false);
      }
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  console.log(posts)

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">MelodyVerse Posts</h1>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center">
            <b>Yay! You have seen it all</b>
          </p>
        }
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {posts.map((post) => (
          <div key={post.id} className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <div className="bg-purple-700 px-4 py-2">
              <h2 className="text-xl text-white font-semibold mb-2">{post.title}</h2>
            </div>
            <div className="px-4 py-2">
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
