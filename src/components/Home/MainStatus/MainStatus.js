import React from 'react';
import { useSelector } from 'react-redux';
import CreatePost from './NewFeeds/CreatePost/CreatePost';
import Post from './NewFeeds/Post/Post';
import Search from './Search/Search';
import Stories from './Story/Stories';

function MainStatus(props) {
  const listPosts = useSelector((state) => state.FetchListPost);

  return (
    <div className='w-full mx-3 flex pt-2 bg-gray-100'>
      <div className='w-2/3'>
        <div className='w-full bg-white text-xl rounded-md cursor-pointer'>
          <CreatePost />
        </div>
        <div className='w-full'>
          <Post listPosts={listPosts} />
        </div>
      </div>
      <div className='fixed' style={{ width: '320px', right: '255px' }}>
        <Stories />
        <Search />
      </div>
    </div>
  );
}

export default MainStatus;
