// Web Worker와 메인 스레드 간 메시지 타입 정의

export interface WorkerInitMessage {
  type: 'init';
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  pixelRatio: number;
}

export interface WorkerResizeMessage {
  type: 'resize';
  width: number;
  height: number;
  pixelRatio: number;
}

export interface WorkerStopMessage {
  type: 'stop';
}

export type WorkerMessage =
  | WorkerInitMessage
  | WorkerResizeMessage
  | WorkerStopMessage;

export interface Star {
  x: number;
  y: number;
  baseOpacity: number;
  noiseOffsetX: number;
  noiseOffsetY: number;
  noiseOffsetZ: number;
  size: number;
  color: { r: number; g: number; b: number };
  type: 'small' | 'medium' | 'large';
  shouldTwinkle: boolean;
}
