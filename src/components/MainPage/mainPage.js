import React, {Fragment, useEffect, useState} from 'react'
import io from 'socket.io-client'
import {Card, Container, FormInput} from "shards-react";
import MyGraph from "../../elements/graph/graph";

const devices = [
    {deveui: "647FDA000000589A", mac: "90D667", name: "Jack Stewart"},
    {deveui: "647FDA00000058AE", mac: "90D60B", name: "Jeffrey Perry"},
    {deveui: "647FDA000000597F", mac: "90D5A4", name: "Carter Mudryk"},
    {deveui: "647FDA0000005974", mac: "90DC1A", name: "Taras Kuzyk"},
    {deveui: "647FDA0000005892", mac: "90D659", name: "Roman Nemish"},
]

export default () => {
    const [devicesData, setDevicesData] = useState({});
    const [socket, setSocket] = useState(null)
    const [isSocketSetUp, setIsSocketSetUp] = useState(false);
    const [nodes, setNodes] = useState(
        devices.map(device => {
            return {id: device.deveui, label: device.name, title: device.name, group: 'safe', mac: device.mac}
        })
    );
    const [links, setLinks] = useState([])

    const isMacDetected = (deveuiSender, macReceiver) => {
        if (!devicesData)
            return false
        if (devicesData.hasOwnProperty(deveuiSender)) {
            for (let i = 0; i < devicesData[deveuiSender].length; i++) {
                if (devicesData[deveuiSender][i].id === macReceiver.toLowerCase() &&
                    devicesData[deveuiSender][i].avg > -70){
                    return true;
                }
            }
        }
        return false;
    }

    const getData = () => {
        for (let i = 0; i < nodes.length; i++){ // receiver nodes
            let isLinkDetected = false;
            for (let j = 0; j < nodes.length; j++){ // beacon nodes
                if (isMacDetected(nodes[i].id, devices[j].mac)) {
                    isLinkDetected = true;

                    setNodes(nodes => { //TODO: this can work if you use proper setState (updater form)
                        var newNodes = [...nodes]
                        newNodes[i].group = 'danger'
                        return newNodes
                    })

                    let isLinkDuplicate = false;
                    for (let n = 0; n < links.length; n++){
                        if (devices[i].deveui === links[n].from && devices[j].deveui === links[n].to)
                            isLinkDuplicate = true
                    }

                    if (!isLinkDuplicate)
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
                    for (let n = 0; n < links.length; n++){
                        if (links[n].from === devices[i].deveui && links[n].to === devices[j].deveui){
                            setLinks(links => links.slice(n))
                        }
                    }
                }
            }
            if (!isLinkDetected) {
                setNodes(nodes => {
                    var newNodes = [...nodes]
                    newNodes[i].group = 'safe'
                    return newNodes
                })
            }

        }
    }

    useEffect(()=> {
        if (nodes.length > 0)
            getData()
        //console.log(devicesData)
    }, [devicesData]);

    useEffect(()=>{
        //console.log(links)
    }, [links])

    useEffect(()=>{
        console.log(nodes)
    }, [nodes])

    useEffect(()=> {
        setSocket(io("http://localhost:4000"))
    }, []);

    useEffect(()=>{
        if (socket !== null && !isSocketSetUp ) {

            socket.on("detectedDevices", ({detectedDevices, deveui}) => {
                // setDevicesData(devicesData => {
                //     devicesData[deveui] = detectedDevices
                //     console.log(devicesData)
                //     return devicesData
                // })
                let newDetectedDevices = Object.fromEntries([[deveui, detectedDevices]])
                setDevicesData(devicesData => ({ ...devicesData, ...newDetectedDevices}) )
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
