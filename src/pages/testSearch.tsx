import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser, User } from '../api/API';

export const randomLocs = ["Italy", "South Korea", "Greece", "New Mexico",
    "United States", "Canada", "Mexico", "Brazil", "Argentina", "Chile",
]
const CandidateSearch = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({} as any);
    function smash(event: any) {
        const user = users.find(user => user.id == event.target.id)!;
        const newlist = users.filter(user => user.id != event.target.id);
        const nextUser = [...newlist].shift()!;
        console.log("newlist", newlist);

        console.log("user", user);

        setUsers(newlist);
        setCurrentUser(nextUser);

        addcandidate(user);
    }

    

    function pass(event: any) {
        const newlist = users.filter(user => user.id != event.target.id);
        const nextUser = [...newlist].shift()!;
        console.log("newlist", newlist);

        setUsers(newlist);
        setCurrentUser(nextUser);
    }
    function getusers() {
        searchGithub().then((data) => {

            setUsers(data);
            setCurrentUser(data[0]);
        })
    }
    function addcandidate(user: User) {
        const cands = JSON.parse(localStorage.getItem('candidates') || '[]');
        cands.push(user);
        console.log("cands", cands);
        localStorage.setItem('candidates', JSON.stringify(cands));
    }
    function setupLocalStorage() {
        if (!localStorage.getItem('candidates')) {
            localStorage.setItem('candidates', JSON.stringify([]));
        }
    }
    useEffect(() => {
        setupLocalStorage();
        getusers()
    }, []);

    return (
        <div>
            <button onClick={() => getusers()}>fetch users again</button>
            <h1>CandidateSearch</h1>
            {currentUser ? (
                <div className="card">
                    <img src={currentUser.avatar_url} alt="Avatar" style={{ height: "460px", width: "460px" }} />
                    <div className="container">
                        <h2><b>{currentUser?.login}</b></h2>
                        <p>location: {randomLocs[Math.floor(Math.random() * randomLocs.length)]}</p>
                        <p>email: todo</p>
                        <p>company: todo</p>
                        <p>bio: <a target="_blank" href={currentUser.html_url}>check my fuckin bio!!!</a></p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button id={currentUser.id?.toString()} onClick={pass} style={{ background: "red" }}>-</button>
                        <button id={currentUser.id?.toString()} onClick={smash} style={{ background: "green" }}>+</button>
                    </div>
                </div>
            ) : (<span>loading...</span>)}
          
        </div>

    );

};

export default CandidateSearch;
