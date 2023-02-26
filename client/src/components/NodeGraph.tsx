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
        nodes: {
          color: '#606C38',
          size: 20,
          font: {
            size: 22,
            color: '#FFFFFF',
          },
        },
        interaction: {
          dragNodes: true,
          dragView: false,
          zoomView: false,
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
          height: '80vh',
          width: '80vw',
          border: '2px solid black',
          overflow: 'hidden',
        }}
      />
    </div>
  );
};

export default NodeGraph;
