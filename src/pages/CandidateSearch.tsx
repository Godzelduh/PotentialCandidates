import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, User } from '../api/API';

const CandidateSearch = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    searchGithub().then((data) => {

      setUsers(data);
    })
  }, []);
  return (
    
    <div>
           <h1>CandidateSearch</h1>
      <div className="card">
        <img src="img_avatar.png" alt="Avatar" style={{ width: "100%" }}/>
          <div className="container">
            <h2><b>John Doe</b></h2>
            <p>Architect & Engineer</p>
          </div>
      </div>
      {/* {
        users.map((User) => {
          return <>
            {JSON.stringify(User)}
          </>
        })
      } */}
    </div>

  );

};

export default CandidateSearch;
