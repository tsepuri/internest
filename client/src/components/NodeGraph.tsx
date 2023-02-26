import { useEffect } from 'react';
import vis from 'vis';

type Node = {
  id: number;
  label: string;
};

type Edge = {
  from: number;
  to: number;
};

type Props = {
  nodes?: Node[];
  edges?: Edge[];
};

const NodeGraph = ({ nodes = [], edges = [] }: Props) => {
  useEffect(() => {
    const container = document.getElementById('network-container');

    if (container !== null) {
      const data = {
        nodes: nodes.map((node) => ({ id: node.id, label: node.label })),
        edges: edges.map((edge) => ({ from: edge.from, to: edge.to })),
      };

      const options = {
        interaction: {
          dragNodes: true,
          dragView: false,
          zoomView: true,
        },
        physics: {
          enabled: true,
          solver: 'forceAtlas2Based',
          forceAtlas2Based: {
            springConstant: 0.08,
            springLength: 100,
          },
        },
      };

      const network = new vis.Network(container, data, options);
      network.fit();
    }
  }, [nodes, edges]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        id="network-container"
        style={{
          height: '75vh',
          width: '75vw',
          border: '5px solid black',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default NodeGraph;
