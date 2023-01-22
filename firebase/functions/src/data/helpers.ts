import { parseStringPromise } from 'xml2js';
import * as admin from 'firebase-admin';
import { parseNumbers } from 'xml2js/lib/processors';
import { dronesInstance, pilotsInstance } from './axios';
import { DronesResponse, Report } from '../global';

/**
 * @description Fetch XML data from API using axiosInstance
 *
 * @return {string} - XML data
 * @throws - fetch errors
 */
export const fetchXML = async () => {
  try {
    const response = await dronesInstance.get('/');
    const data = await response.data;
    return data;
  } catch (error) {
    console.log('fetchXML Error: ', error);
    throw error;
  }
};

/**
 * @description Parse XML data using xml2js
 *
 * @param {string} data - XML data to parse
 * @return {Promise<DronesResponse>} - parsed JSON data
 * @throws - parsing errors
 */
export const parseXML = async (data: string): Promise<DronesResponse> => {
  try {
    const result = await parseStringPromise(data, {
      valueProcessors: [parseNumbers],
      explicitArray: false,
      mergeAttrs: true,
    });
    return result;
  } catch (error) {
    console.log('parseXML Error:', error);
    throw error;
  }
};

/**
 * @description Fetch XML data from API and parse it to JSON
 *
 * @return {Promise<DronesResponse>} - resolves to validated JSON data or rejects with error
 * @throws - fetchData errors
 */
export const fetchDrones = async () => {
  try {
    const xmlString = await fetchXML();
    const jsonObj = await parseXML(xmlString);
    return jsonObj;
  } catch (error) {
    console.log('fetchData Validate Error: ', error);
    throw error;
  }
};

export const fetchPilot = async (id: string) => {
  try {
    const response = await pilotsInstance.get(`/${id}`);
    const jsonObj = response.data;
    return jsonObj;
  } catch (error) {
    console.log('fetchPilot Error');
    throw error;
  }
};

/**
 * @description Updates the Firestore document with the data
 *
 * @param {string} document - document name
 * @param {Report} data - data to update
 * @return {void}
 *
 * @throws - updateSnapShot Firestore errors
 */
export const updateSnapShot = async (document: string, data: Report) => {
  try {
    const docRef = admin.firestore().collection('snapshots').doc(`${document}`);
    await docRef.set({ ...data });
    console.log('Snapshot update successful');
  } catch (error) {
    console.log('updateSnapShot Error', error);
    throw error;
  }
};
