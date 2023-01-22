import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Endpoint - Update Lock - Start fetching data
 */
export * from './endpoints';

/**
 * Triggers - Background data processing
 * - Fetch Data and Update Database - Long Polling Data
 */
export * from './triggers';
