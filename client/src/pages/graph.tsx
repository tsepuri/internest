import NodeGraph from '../components/NodeGraph';
import Head from 'next/head';
import styles from '@/styles/Graph.module.css';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import JournalModal from '../components/JournalModal';
import { useState, useEffect } from 'react';
import { GraphResponse } from '@/types/GraphType';
import { getGraph } from '@/services/GraphService';
import { useAuth } from '@clerk/nextjs';

type Node = {
  id: number;
  label: string;
  size: number;
};

type Edge = {
  from: number;
  to: number;
};

const Graph = () => {
    const [graphResponse, setGraphResponse] = useState<GraphResponse>()
    const { userId, sessionId } = useAuth();

    useEffect(() => {
        const fetchGraph = async () => {
            const data = await getGraph({userId: userId as string}, sessionId as string)
            setGraphResponse(data)
          }
          fetchGraph()
          // make sure to catch any error
          .catch(console.error);
      }, [])

  // let graphResponse:GraphResponse = {
  //   graph: [{"keyword1": {"keyword2": ["keyword3", "keyword4"]}, "keyword5": {}}],
  //   frequency: {"keyword1": 3, "keyword2": 1, "keyword3": 5, "keyword4": 1, "keyword5": 1}
  // }

  var uniqueIDCounter = 0;
  var keysArr = Object.keys((graphResponse as GraphResponse).frequency);
  var averageFreq = Object.values((graphResponse as GraphResponse).frequency).reduce((a, b) => a + b) / keysArr.length;
  var i = 0;

  const nodes = keysArr.map((key, i) => {
    var currentFreq = (graphResponse as GraphResponse).frequency[key] 
    var currentSize = 0;
    var size = 15;

    if (currentFreq > averageFreq) {
      size = 22;
    }

    return { id: i, label: key, size: size }

  });

  const userNode = {id: -1, label: "User", size: 20};
  nodes.push(userNode);

  const forest0 = (graphResponse as GraphResponse).graph[0]

  function dfs(forest: any, parent: Node, f: { (t: any, p: any): void; (arg0: string, arg1: any): void; }) {
    if (Array.isArray(forest)) {
      Object.values(forest).forEach((treeLabel: string) => {
        var labelId = keysArr.indexOf(treeLabel)
        const treeNode = { id: keysArr.indexOf(treeLabel), label: treeLabel, size: 0 };

        f(treeNode, parent);
      })
    } else if (typeof forest == "object") {
      Object.keys(forest).forEach((treeLabel: string) => {
        const treeNode = { id: keysArr.indexOf(treeLabel), label: treeLabel, size: 0 };

        f(treeNode, parent);
        const children = forest[treeLabel];

        dfs(children, treeNode, f);
      })
    }
  }

  const edges:Edge[] = [];

  dfs(forest0, userNode, (t: any, p: any) => {
    edges.push({from: p.id, to: t.id});
  });

  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  
  const handleNodeDoubleClick = (nodeId: number) => {
    setSelectedNodeId(nodeId);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <h1 className={styles.h1}>Choose a view:</h1>
        <Button />
        <NodeGraph nodes={nodes} edges={edges} onNodeDoubleClick={handleNodeDoubleClick} />
        {selectedNodeId !== null && (
          <JournalModal
            header="Sample Journal Header"
            body="Sample Journal Body"
            onClose={() => setSelectedNodeId(null)}
          />
        )}
      </main>
    </>
  );
};

export default Graph;
