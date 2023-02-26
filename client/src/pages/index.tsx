import { useState } from 'react';
import NodeGraph from '../components/NodeGraph';
import Head from 'next/head'
import styles from '@/styles/Graph.module.css'
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import JournalModal from '../components/JournalModal';


const HomePage = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const handleNodeDoubleClick = (nodeId: number) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputWrapper}>
        <div id={styles.datepicker}>
          <label className={styles.label} htmlFor={styles.body}>Select Date</label><br />
          <Datepicker onDateChange={handleDateChange} />
        </div>
        <div id={styles.entry}>
        <label className={styles.label} htmlFor={styles.body}>Journal Entry</label><br />
        <textarea
          id={styles.body}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        ></textarea>
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  );
}

export default HomePage;
