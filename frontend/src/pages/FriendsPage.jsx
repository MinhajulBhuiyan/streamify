
import React, { useEffect, useState } from 'react';
import FriendCard from '../components/FriendCard.jsx';
import PageLoader from '../components/PageLoader.jsx';
import NoFriendsFound from '../components/NoFriendsFound.jsx';
import { getUserFriends } from '../lib/api.js';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (err) {
        setError('Failed to load friends.');
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Friends</h1>
      {friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid gap-4">
          {friends.map(friend => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
