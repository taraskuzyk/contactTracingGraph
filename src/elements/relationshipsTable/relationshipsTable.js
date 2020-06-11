import React, {useEffect, useState} from 'react'
import {ListGroup, ListGroupItem} from "shards-react";

export default function RelationshipsTable({events, activeUser}){
    // relationships is an array of jsons that contain
    // timestamp_current (ms), sender (user), found (user) and duration(ms)
    const [relationships, setRelationships] = useState([])
    const eventsToRelationships = (events) => {
        let isTracker = activeUser.hasOwnProperty("deveui")
        if (activeUser !== null && events !== null && isTracker) {
            let r = relationships[activeUser["deveui"]];
            for (let i = 0; i < events.length; i++){
                let isRelationshipInitiated = false

                for (let j = 0; i < r.length; i++){

                    if (isTracker){
                        if (r[j].deveui === activeUser.deveui) {
                            isRelationshipInitiated = true;
                            r[j].duration += events[i].hasOwnProperty("timestamp_end") ?
                                events[i].timestamp_end - events[i].timestamp_start : 0
                        }
                    } else {
                        if (r[j].id === activeUser.id){
                            isRelationshipInitiated = true;
                            r[j].duration += events[i].hasOwnProperty("timestamp_end") ?
                                events[i].timestamp_end - events[i].timestamp_start : 0
                        }
                    }
                }

                if (!isRelationshipInitiated){
                    r.push({
                        duration: events[i].hasOwnProperty("timestamp_end") ?
                            events[i].timestamp_end - events[i].timestamp_start : null,
                        sender: events[i].sender,
                        found: events[i].found,
                        timestamp_recent: events[i].timestamp_start,
                    })
                }
            }

            let newRelationships = relationships;
            newRelationships[activeUser._id] = r;
            setRelationships(newRelationships);
        }
    }

    useEffect(()=> eventsToRelationships(events),[activeUser])

    if (relationships === undefined) {
        return (<div>Loading...</div>)
    }
    else {
        return (
            <table className="table mb-0">
                <thead className="bg-light">
                    <tr className="smaller">
                        <th scope="col" className="border-0">Contact</th>
                        <th scope="col" className="border-0">Time</th>
                        <th scope="col" className="border-0">Duration</th>
                    </tr>
                </thead>
                <tbody>
                {
                    relationships.map((relationship)=>{
                        const date = new Date(relationship.timestamp_recent)
                        const stringDate = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+
                            ", "+date.getDate()+"/"+date.getMonth()
                        let duration_ms;
                        if (relationship.duration !== null){
                            duration_ms = relationship.duration;
                        } else
                            duration_ms = "First contact in progress..."
                        return(
                            <tr>
                                <td>{relationship.found.name}</td>
                                <td>{stringDate}</td>
                                <td>{duration_ms}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }

}
