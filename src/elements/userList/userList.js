import React, {useState} from 'react'
import {ListGroup, ListGroupItem} from "shards-react";

export default function UserList({users, onClick}){

    const [activeUser, setActiveUser] = useState(users ? (users[0] ? users[0]._id : null) : null);
    //
    if (users) {
        return (
            <div>
            <ListGroup >
                {
                    users.map((user, i) => {
                        return (
                            <ListGroupItem
                                action={true}
                                active={activeUser === user._id || activeUser === null && i === 0}
                                onClick={() =>{
                                    setActiveUser(user._id)
                                    onClick(user)
                                }}
                                key={user._id}
                            >
                                {user.name}
                            </ListGroupItem>
                        );
                    })
                }
            </ListGroup>
            </div>
        )
    }
    else {
        return (
            <p>Loading...</p>
        )
    }
}
