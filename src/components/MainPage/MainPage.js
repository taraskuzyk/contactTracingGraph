import React, {Fragment, useEffect, useState} from 'react'
import io from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import {Card, Container, FormInput} from "shards-react";
import MyGraph from "../../elements/graph/graph";

const devices = [
    //TEKTELIC Demo
    // {deveui: "647FDA000000589A", mac: "90D667", name: "   A   "},
    // {deveui: "647FDA00000058AE", mac: "90D60B", name: "   B   "},
    // {deveui: "647FDA000000597F", mac: "90D5A4", name: "   C   "},
    // {deveui: "647FDA0000005974", mac: "90DC1A", name: "   D   "},
    // {deveui: "647FDA0000005892", mac: "90D659", name: "   E   "},
    // SwissCom
    {deveui: "647FDA000000596D", mac: "90D5AA", name: "  #1  "},
    {deveui: "647FDA00000059B3", mac: "90DC2A", name: "  #2  "},
    {deveui: "647FDA00000059BE", mac: "90DC16", name: "  #3  "},
]

export default (props) => {
    const history = useHistory()
    const [devicesData, setDevicesData] = useState({});
    const [socket, setSocket] = useState(null)
    const [isSocketSetUp, setIsSocketSetUp] = useState(false);
    const [nodes, setNodes] = useState(
        devices.map(device => {
            return {id: device.deveui, label: device.name, title: device.name, group: 'safe', mac: device.mac}
        })
    );
    const [links, setLinks] = useState([])

    const isLinkDetected = (deveuiSender, macReceiver) => {
        if (!devicesData)
            return false
        if (devicesData.hasOwnProperty(deveuiSender)) {
            for (let i = 0; i < devicesData[deveuiSender].length; i++) {
                if (devicesData[deveuiSender][i].id === macReceiver.toLowerCase() &&
                    devicesData[deveuiSender][i].avg >= -72.5){
                    return true;
                }
            }
        }
        return false;
    }

    const updateGraph = () => {

        for (let i = 0; i < devices.length; i++){ // receiver nodes
            let isAnyLinkDetected = false;

            for (let j = 0; j < devices.length; j++){ // beacon nodes
                if (isLinkDetected(devices[i].deveui, devices[j].mac)) {
                    isAnyLinkDetected = true;
                    console.log(devices[i].name, "received")
                    console.log(devicesData[devices[i].deveui])

                    let isLinkInLinks = false;
                    for (let n = 0; n < links.length; n++){
                        if (devices[i].deveui === links[n].from && devices[j].deveui === links[n].to)
                            isLinkInLinks = true
                    }

                    if (!isLinkInLinks){
                        setLinks(links => [...links,
                                {
                                    from: devices[i].deveui,
                                    to: devices[j].deveui,
                                    fromName: devices[i].name,
                                    toName: devices[j].name
                                }
                            ]
                        )
                    } else {
                        // do nothing
                    }

                } else {
                    for (let n = 0; n < links.length; n++){
                        if (links[n].from === devices[i].deveui && links[n].to === devices[j].deveui){
                            if (links.length > 1){
                                const newLinks = [...links]
                                newLinks.splice(n, 1)
                                setLinks(links => newLinks)
                            } else {
                                console.log("deleting last link")
                                setLinks(links => [])
                            }
                        }
                    }
                }
            }
        }
    }

    useEffect(()=> {
        if (nodes.length > 0)
            updateGraph()
    }, [devicesData]);

    useEffect(()=> {
        if (props.location.state) {
            console.log(props.location.state)
            if (props.location.state.isLoggedIn) {
                setSocket(io("http://swisscom-contact-tracin-demo-backend.ngrok.io"))
            } else {
                history.push('/login')
            }
        } else {
            history.push('/login')
        }
    }, []);

    useEffect(()=>{
        if (socket !== null && !isSocketSetUp ) {
            socket.on("detectedDevices", ({detectedDevices, deveui}) => {
                setDevicesData(devicesData => ({ ...devicesData, [deveui]: detectedDevices}) )
            })
            setIsSocketSetUp(true);
        }
    }, [socket])

    return (
        <Fragment>
            <MyGraph nodes={nodes} links={links} />
            <FormInput/>
        </Fragment>
    )
}
