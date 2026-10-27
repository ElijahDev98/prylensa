export interface PrylensaSpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface PrylensaSpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: PrylensaSpeechRecognitionAlternative;
}

export interface PrylensaSpeechRecognitionResultList {
  readonly length: number;
  [index: number]: PrylensaSpeechRecognitionResult;
}

export interface PrylensaSpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: PrylensaSpeechRecognitionResultList;
}

export interface PrylensaSpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

export interface PrylensaSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: PrylensaSpeechRecognitionEvent) => void) | null;
  onerror: ((event: PrylensaSpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

export interface PrylensaSpeechRecognitionConstructor {
  new (): PrylensaSpeechRecognition;
}

export interface PrylensaDetectedBarcode {
  rawValue: string;
}

export interface PrylensaBarcodeDetector {
  detect(source: ImageBitmapSource): Promise<PrylensaDetectedBarcode[]>;
}

export interface PrylensaBarcodeDetectorConstructor {
  new (): PrylensaBarcodeDetector;
}

export interface PrylensaDetectedText {
  rawValue: string;
}

export interface PrylensaTextDetector {
  detect(source: ImageBitmapSource): Promise<PrylensaDetectedText[]>;
}

export interface PrylensaTextDetectorConstructor {
  new (): PrylensaTextDetector;
}

declare global {
  interface Window {
    SpeechRecognition?: PrylensaSpeechRecognitionConstructor;
    webkitSpeechRecognition?: PrylensaSpeechRecognitionConstructor;
    BarcodeDetector?: PrylensaBarcodeDetectorConstructor;
    TextDetector?: PrylensaTextDetectorConstructor;
  }
}

