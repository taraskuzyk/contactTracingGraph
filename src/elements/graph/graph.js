import React, {useRef, useEffect, useState} from "react";
import Graph from "react-graph-vis";
import { DataSet } from "vis-data/peer/esm/vis-data"
import { Network } from "vis-network"


const devices = [
    {deveui: "647FDA0000005972", mac: "90d581", name: "Aaron"},
    {deveui: "647FDA000000597F", mac: "90d5a4", name: "Bob"},
    {deveui: "647FDA00000059CC", mac: "90d5e5", name: "Charlotte"},
    {deveui: "647FDA0000005974", mac: "90dc1a", name: "Dianna"},
]

export default function MyGraph({nodes, links}) {
    const container = useRef(null)
    const [network, setNetwork] = useState(null);

    useEffect(()=> {
        console.log(container)
        //let nodes = new DataSet()
        /*let nodeArray = devices.map(device => {
            return {id: device.deveui, label: device.name, title: device.name, group: 'safe'}
        })*/
        //nodes.add(nodeArray)
        console.log(typeof(nodes))

        //let links = new DataSet()
        // links.add(linkArray)

        const graph = {
            nodes: nodes,
            edges: links
        };
        const options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
            },
            nodes: {
                shape: 'ellipse',
            },
            height: "500px",
            /*groups: {
                danger: {color: 'red'},
                safe: {color: 'limegreen'}
            }*/
        };
        setNetwork(new Network(container.current, graph, options))
    }, [container])

    return (
        <div ref = {container}/>
    );
}
