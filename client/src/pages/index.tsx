import Navbar from '../components/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import { useState, FormEvent } from 'react';
import { useAuth } from '@clerk/nextjs';
import Datepicker from '../components/Datepicker';
import ValidatorContainer from '@/components/ValidatorContainer';
import { sendJournalEntry, sendKeywords } from '@/services/JournalService';
import { JournalResponse } from '@/types/Journal';

function JournalEntryForm({ onFormSubmit }: { onFormSubmit: (keywords: string[]) => void }) {
  const [body, setBody] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { userId, sessionId } = useAuth();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response:JournalResponse = await sendJournalEntry({userId: userId as string}, {entry: body, date: selectedDate}, sessionId as string);
    setBody(''); 
    setSelectedDate(new Date());
    if (response.keywords) {
      onFormSubmit(response.keywords)
    }
    else {
      onFormSubmit(["Pizza", "Food", "Ice Cream"])
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

export default function Home() {
  const router = useRouter();
  const apiCall = async () => {
    let res = await fetch("/api/hello")
    console.log(res)
  }
  const { userId, sessionId } = useAuth();
  const [keywords, setKeywords] = useState([""])
  const [showValidator, setShowValidator] = useState(false);

  const handleFormSubmit = (inputKeywords:string[]) => {
      setShowValidator(true)
      setKeywords(inputKeywords)
  };

  const submitValidated = async (keywords:string[]) => {
    const response = await sendKeywords({userId: userId as string}, keywords, sessionId as string);
    router.push('/graph');
  }

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

        <div className={styles.formWrapper}>
          <JournalEntryForm onFormSubmit={handleFormSubmit} />
          {showValidator && (
            <ValidatorContainer
              onSubmit={submitValidated}
              initialWords={keywords}
            />
          )}
        </div>
      </main>
    </>
  )
}
