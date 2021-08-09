import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { changeOption } from '../../reducers/optionShow';
import { SOCKET_URL } from '../../constants/Socket_URL';
import SockJsClient from 'react-stomp';
import { API_URL } from '../../constants/Config';

function RightListFriend(props) {
  const token = useSelector((state) => state.CheckLogin.current.accessToken);

  const username = useSelector((state) => state.CheckLogin.current.username);

  let clientRef = useRef(null);
  const [actives, setActives] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `${API_URL}/api/active/active-users-except/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => setActives(res.data));
    }
    fetchData();
  }, [token]);

  return (
    <div>
      <ul className='w-full bg-white shadow h-screen pt-2 z-10'>
        {actives.length > 0
          ? actives.map((item, index) => {
              if (item.username !== username)
                return (
                  <div
                    className='pb-1 w-full'
                    key={index}
                    onClick={() => changeOption(1)}
                  >
                    <Link
                      to={`/chat/${item.id}`}
                      className='w-full flex items-center '
                    >
                      <div className='px-4 py-2'>
                        {item.gender === true ? (
                          <img
                            className='h-12 w-12 rounded-full'
                            src='https://cdn.iconscout.com/icon/free/png-512/boy-avatar-4-1129037.png'
                            alt=''
                          />
                        ) : (
                          <img
                            className='h-12 w-12 rounded-full'
                            src='https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/131304884/original/190ac627bd2074add9e3281828ee8ac7ac725380/make-you-a-random-anime-girl-avatar.jpg'
                            alt=''
                          />
                        )}
                      </div>
                      <div className='text-base pl-1'>
                        <p>{`${item.lastName} ${item.firstName}`}</p>
                        <p className='text-blue-400 text-sm'>Đang hoạt động</p>
                      </div>
                    </Link>
                  </div>
                );
            })
          : []}
      </ul>
      <SockJsClient
        url={SOCKET_URL}
        topics={[`/topic/active-users-list`]}
        onConnect={() => {
          console.log('connected');
        }}
        onDisconnect={() => {
          console.log('disconnected');
        }}
        onMessage={(msg) => {
          setActives(msg);
        }}
        ref={(client) => {
          clientRef = client;
        }}
      />
    </div>
  );
}

export default RightListFriend;
