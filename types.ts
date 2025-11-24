export interface Coordinates {
  x: number;
  y: number;
}

export enum AppState {
  PROPOSAL = 'PROPOSAL',
  SUCCESS = 'SUCCESS',
}

export interface GeminiResponse {
  text: string;
}
