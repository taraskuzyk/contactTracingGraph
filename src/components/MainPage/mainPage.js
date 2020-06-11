import React, {Fragment, useEffect, useState} from 'react'
import io from 'socket.io-client'
import {Card, Container} from "shards-react";
import MyGraph from "../../elements/graph/graph";

const devices = [
    {deveui: "647FDA0000005972", mac: "90d581", name: "Aaron"},
    {deveui: "647FDA000000597F", mac: "90d5a4", name: "Bob"},
    {deveui: "647FDA00000059CC", mac: "90d5e5", name: "Charlotte"},
    {deveui: "647FDA0000005974", mac: "90dc1a", name: "Dianna"},
]

export default () => {
    const [devicesData, setDevicesData] = useState({});
    const [socket, setSocket] = useState(null)
    const [isSocketSetUp, setIsSocketSetUp] = useState(false);
    const [nodes, setNodes] = useState(devices.map(device => {
        return {id: device.deveui, label: device.name, title: device.name, group: 'safe'}
    }));
    const [links, setLinks] = useState([])

    const isMacDetected = (deveui, mac) => {
        if (!devicesData)
            return false
        if (devicesData.hasOwnProperty(deveui)) {
            for (let i = 0; i < devicesData[deveui].length; i++) {
                if (devicesData[deveui][i].id === mac &&
                    devicesData[deveui][i].deveui === deveui &&
                    devicesData[deveui][i].rssi > -75)
                    return true;
            }
        }
        return false;
    }

    const getData = () => {
        let newLinks = links;
        for (let i = 0; i < links.length; i++){
            for (let j = 0; j < nodes.length; j++){
                if (links[i].from === nodes[j].id)
                    setLinks(links.slice(i))
            }
        }
        let newNodes = nodes;
        for (let i = 0; i < devices.length; i++){
            let isLinkDetected = false;
            for (let j = 0; j < devices.length; j++){
                if(isMacDetected(devices[i].deveui, devices[j].mac)) {
                    console.log(devices[i].deveui, devices[j].mac)
                    isLinkDetected = true;
                    newNodes[i].group = 'danger'
                    newNodes[j].group = 'danger'
                    let isLinkDuplicate = false;
                    for (let n = 0; n < links.length; n++){
                        if (devices[i].deveui === links[n].from && devices[j].deveui === links[n].to)
                            isLinkDuplicate = true;
                    }
                    if (!isLinkDuplicate)
                        newLinks.push({from: devices[i].deveui, to: devices[j].deveui})
                }
            }
            if (!isLinkDetected)
                newNodes[i].group = 'safe'
        }

        setNodes({})
        setNodes(newNodes)
        setLinks(newLinks)
    }

    useEffect(()=> {
        getData()
    }, [devicesData]);

    useEffect(()=> {
        setSocket(io("http://localhost:2000"))
    }, []);

    useEffect(()=>{
        if (socket !== null && !isSocketSetUp ) {

            socket.emit("getUsers");

            socket.on("detectedDevices", ({detectedDevices, deveui}) => {
                if (deveui !== "647FDA00000059A1" && deveui !== "647FDA0000000ADE") {
                    let newDevicesData = devicesData;
                    newDevicesData[deveui] = detectedDevices;
                    setDevicesData({}) //TODO: this is a stupid way of doing this. This needs to be fixed.
                    setDevicesData(newDevicesData)
                }
            })

            setIsSocketSetUp(true);
        }
    }, [socket])

    return (
        <Fragment>
            <Container fluid>
                <Card>
                    <MyGraph nodes={nodes} links={Array.from(links)}/>
                </Card>
            </Container>
        </Fragment>
    )
}
