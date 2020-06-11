import React from 'react'

export default function EventTable({events}){
    if (events === undefined) {
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
                    events.map((e)=>{
                        const date = new Date(e.timestamp_start)
                        const stringDate = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+", "+date.getDate()+"/"+date.getMonth()
                        let duration_ms = 0;
                        if (e.hasOwnProperty("timestamp_end")){
                            duration_ms = e.timestamp_end - e.timestamp_start
                        } else
                            duration_ms = "Ongoing..."
                        return(
                            <tr>
                                <td>{e.found.name}</td>
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
