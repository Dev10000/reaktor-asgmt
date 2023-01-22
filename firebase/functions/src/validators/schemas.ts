import { JSONSchemaType } from 'ajv';
import { DronesResponse, Pilot } from '../global';

export const dronesSchema: JSONSchemaType<DronesResponse> = {
  type: 'object',
  properties: {
    report: {
      type: 'object',
      properties: {
        deviceInformation: {
          type: 'object',
          properties: {
            listenRange: {
              type: 'number',
            },
            deviceStarted: {
              type: 'string',
            },
            uptimeSeconds: {
              type: 'number',
            },
            updateIntervalMs: {
              type: 'number',
            },
          },
          required: [],
        },
        capture: {
          type: 'object',
          properties: {
            drone: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  serialNumber: {
                    type: 'string',
                  },
                  model: {
                    type: 'string',
                  },
                  manufacturer: {
                    type: 'string',
                  },
                  mac: {
                    type: 'string',
                  },
                  ipv4: {
                    type: 'string',
                  },
                  ipv6: {
                    type: 'string',
                  },
                  firmware: {
                    type: 'string',
                  },
                  positionY: {
                    type: 'number',
                  },
                  positionX: {
                    type: 'number',
                  },
                  altitude: {
                    type: 'number',
                  },
                },
                required: [
                  'serialNumber',
                  'model',
                  'manufacturer',
                  'mac',
                  'ipv4',
                  'ipv6',
                  'firmware',
                  'positionY',
                  'positionX',
                  'altitude',
                ],
              },
            },
          },
          required: ['drone'],
        },
      },
      required: ['deviceInformation', 'capture'],
    },
  },
  required: ['report'],
};

export const pilotSchema: JSONSchemaType<Pilot> = {
  type: 'object',
  properties: {
    pilotId: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    createdDt: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  required: [
    'pilotId',
    'firstName',
    'lastName',
    'phoneNumber',
    'createdDt',
    'email',
  ],
};
