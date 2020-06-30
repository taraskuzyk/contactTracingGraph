import React from "react";
import Graph from "react-graph-vis";

export default function MyGraph({nodes, links}) {


    const graph = {
        nodes: nodes,
        edges: links
    };

    console.log(links)

    const options = {
        layout: {
            hierarchical: false
        },
        edges: {
            color: "red",
            width: 10,
            hoverWidth: 10,
            chosen: false,
            arrows: {
                to: {
                    enabled:false
                }
            }
        },
        nodes: {
            shape: 'circle',
            size: 50,
            scaling: {
                label: {
                    min: 50,
                    max: 70
                }
            },
            font: {
                size: 40,
                align: 'center'
            },
            heightConstraint: {

            }
        },
        height: "1000",
        physics: {
            barnesHut: {
                gravitationalConstant: -10000,
                centralGravity: 0.6,
                springLength: 150,
                springConstant: 0.05
            },
        },

        /*groups: {
            danger: {color: 'red'},
            safe: {color: 'limegreen'}
        }*/
    };

    return (
        <Graph
            graph={graph}
            options={options}
        />
    );
}
