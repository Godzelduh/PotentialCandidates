import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, User } from '../api/API';

const CandidateSearch = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    searchGithub().then((data) => {
      setUsers(data);
    })
  }, []);
  return (
    <div>
    <h1>CandidateSearch</h1>
    {
      users.map((User)=>{
      return <>
      {JSON.stringify(User)}
      </>
      })
    }
    </div>
  );

};

export default CandidateSearch;
