import React from "react";
import { User } from "../api/API";
import { randomLocs } from "./testSearch";
const columns = ["Image", "name", "location", "email", "company", "bio", "reject"] as const;

type ColumnName = typeof columns[number];
const DataCell = (props: { removeUser: (event: any) => void, name: ColumnName, user: User }) => {
    return (
        <>
            {props.name === "Image" && (
                <td >
                    <img src={props.user.avatar_url} alt="Avatar"
                        style={{ height: "auto", width: "55px" }} />
                </td>
            )}
            {props.name === "name" && (
                <td style={{ minWidth: "50px", padding: "50px" }}>{props.user.login}</td>
            )}
            {props.name === "location" && (
                <td style={{ padding: "50px" }}>
                    {randomLocs[Math.floor(Math.random() * randomLocs.length)]}
                </td>
            )}
            {props.name === "email" && (
                <td style={{ padding: "50px" }}>todo</td>
            )}
            {props.name === "company" && (
                <td style={{ padding: "50px" }}>todo</td>
            )}
            {props.name === "bio" && (
                <td style={{ padding: "50px" }}>todo</td>
            )}
            {props.name === "reject" && (
                <td style={{ padding: "50px" }}>
                    <button id={props.user.id.toString()} onClick={props.removeUser} style={{ background: "red", borderRadius: "50%"}}> - </button>
                </td>
            )}
        </>
    );
}
export const TestSaved = () => {
    const [savedCandidates, setSavedCandidates] = React.useState<User[]>([]);
    React.useEffect(() => {
        const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
        console.log(candidates)
        setSavedCandidates(candidates);
    }, []);
    function removeUser(event: any) {
        const newlist = savedCandidates.filter((user) => user.id != event.target.id);
        setSavedCandidates(newlist);
        localStorage.setItem('candidates', JSON.stringify(newlist));
    }
    return (
        <>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                       {
                            columns.map(col => {
                                return <td>
                                    {col}
                                </td>
                            })
                       } 
                    </tr>
                </thead>
                <tbody>
                    {
                        savedCandidates.map(cand => {
                            return (
                                <tr>
                                    {columns.map(col => {
                                        return <DataCell removeUser={removeUser} name={col} user={cand} />
                                    })}
                                </tr>
                            )
                        }) 
                    }
                </tbody>
            </table>
        </>
    );
};