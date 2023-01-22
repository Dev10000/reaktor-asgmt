export interface SnapShotDrones {
  drone: Drone[];
}

export interface DronesResponse {
  report: Report;
}

export interface Report {
  deviceInformation: DeviceInformation;
  capture: Capture;
}

export interface Capture {
  drone: Drone[];
}

export interface Drone {
  serialNumber: string;
  model: string;
  manufacturer: string;
  mac: string;
  ipv4: string;
  ipv6: string;
  firmware: string;
  positionY: number;
  positionX: number;
  altitude: number;
}

export interface DeviceInformation {
  listenRange: number;
  deviceStarted: string;
  uptimeSeconds: number;
  updateIntervalMs: number;
}

export interface Pilot {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdDt: string;
  email: string;
}
