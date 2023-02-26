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

      const options = {};

      const network = new vis.Network(container, data, options);
    }
  }, [nodes, edges]);

  return <div id="network-container" style={{ height: '90vw' }} />;
};

export default NodeGraph;
