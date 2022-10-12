import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // creates a connection to the database
  const jateDb = await openDB('jate', 1);
  // creates a new transaction 
  const tx = jateDb.transaction('jate', 'readwrite');
  // opens the desired object store
  const store = tx.objectStore('jate');
  // uses .put() method to add to database
  const request = store.put({ jate: content });
  // get confirmation
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // creates a connection to the database
  const jateDb = await openDB('jate', 1);
  // creates a new transaction 
  const tx = jateDb.transaction('jate', 'readonly');
  // opens the desired object store
  const store = tx.objectStore('jate');
  // get all data in databse
  const request = store.getAll();
  // get confirmation
  const result = await request;
  console.log(result);
};

initdb();
