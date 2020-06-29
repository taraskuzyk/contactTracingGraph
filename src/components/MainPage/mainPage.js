import React, {Fragment, useEffect, useState} from 'react'
import io from 'socket.io-client'
import {Card, Container, FormInput} from "shards-react";
import MyGraph from "../../elements/graph/graph";

const devices = [
    //TEKTELIC Demo
    {deveui: "647FDA000000589A", mac: "90d667", name: "   A   "},
    {deveui: "647FDA00000058AE", mac: "90d60b", name: "   B   "},
    {deveui: "647FDA000000597F", mac: "90d5a4", name: "   C   "},
    // {deveui: "647FDA0000005974", mac: "90dc1a", name: "   D   "},
    // {deveui: "647FDA0000005892", mac: "90d659", name: "   E   "},
    // SwissCom
    // {deveui: "647FDA000000596D", mac: "90D5AA", name: "#1"},
    // {deveui: "647FDA00000059B3", mac: "90DC2A", name: "#2"},
    // {deveui: "647FDA00000059BE", mac: "90DC16", name: "#3"},
]

export default () => {
    const [devicesData, setDevicesData] = useState({});
    const [latestDeveui, setLatestDeveui] = useState("");
    const [socket, setSocket] = useState(null)
    const [isSocketSetUp, setIsSocketSetUp] = useState(false);
    const [nodes, setNodes] = useState(
        devices.map(device => {
            return {id: device.deveui, label: device.name, title: device.name, group: 'safe', mac: device.mac}
        })
    );
    const [links, setLinks] = useState([])

    const isLinkDetected = (deveuiSender, macReceiver, newDevices) => {

        if (!devicesData)
            return false

        for (let i = 0; i < newDevices.length; i++) {
            if (newDevices[i].id === macReceiver.toLowerCase() &&
                newDevices[i].avg > -65){
                console.log(newDevices, macReceiver)
                return true;
            }
        }

        return false;
    }

    const updateGraph = (latestDeveui, newDevices) => {
        for (let i = 0; i < devices.length; i++){ // receiver nodes
            //console.log(latestDeveui, devices[i].deveui)
            if (latestDeveui === devices[i].deveui) {

                for (let j = 0; j < devices.length; j++) { // beacon nodes
                    if (isLinkDetected(devices[i].deveui, devices[j].mac, newDevices)) {
                        let isLinkAlreadyInLinks = false;
                        for (let n = 0; n < links.length; n++) {
                            if (devices[i].deveui === links[n].from && devices[j].deveui === links[n].to)
                                isLinkAlreadyInLinks = true
                            //console.log(1)
                        }

                        if (!isLinkAlreadyInLinks) {
                            const newLink = {
                                from: devices[i].deveui,
                                to: devices[j].deveui,
                                fromName: devices[i].name,
                                toName: devices[j].name
                            }
                            setLinks(links => [...links, newLink])

                            console.log("New Link Created between ", devices[i].name, " and ", devices[j].name)
                        }


                    } else {
                        for (let n = 0; n < links.length; n++) {
                            if (links[n].from === devices[i].deveui && links[n].to === devices[j].deveui) {
                                if (links.length > 1) {
                                    console.log(2)
                                    setLinks(links => links.slice(n))
                                } else {
                                    console.log(3)
                                    setLinks(links => [])
                                }
                            }
                        }
                    }
                }
            }

        }
    }

    // useEffect(()=> {
    //     if (nodes.length > 0)
    //         updateGraph()
    //     //console.log(devicesData)
    // }, [devicesData]);

    useEffect(()=>{
        console.log("links:")
        console.log(links)
    }, [links])

    useEffect(()=>{
        console.log("nodes:")
        console.log(nodes)
    }, [nodes])

    useEffect(()=> {
        setSocket(io("http://localhost:4000"))
    }, []);

    useEffect(()=>{
        if (socket !== null && !isSocketSetUp ) {

            socket.on("detectedDevices", async ({detectedDevices, deveui}) => {
               // console.log(deveui)
                // setDevicesData(devicesData => {
                //     devicesData[deveui] = detectedDevices
                //     console.log(devicesData)
                //     return devicesData
                // })
                let newDetectedDevices = Object.fromEntries([[deveui, detectedDevices]])
                //let newDevicesData = { ...devicesData, ...newDetectedDevices}
                updateGraph(deveui, detectedDevices)
                await setDevicesData(devicesData => ({ ...devicesData, ...newDetectedDevices}) )
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
