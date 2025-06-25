import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const storage = getStorage(app);

// TODO: Add Firebase storage logic here 