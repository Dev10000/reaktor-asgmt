import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig';

// Firestore old version and syntax is different
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export default db;
