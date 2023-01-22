import * as admin from 'firebase-admin';

admin.initializeApp();

/**
 * Endpoint - Update Lock - Start fetching data
 */
export * from './endpoints';

/**
 * Scheduler - Delete stale history every 10 minutes
 */
export * from './schedulers';

/**
 * Triggers - Background data processing
 * - Fetch Data and Update Database - Long Polling Data
 * - Update drone history every time snapshot is updated (every 2 seconds)
 * - Calculate shortest distance every time 'history/{droneId}' is updated
 */
export * from './triggers';
