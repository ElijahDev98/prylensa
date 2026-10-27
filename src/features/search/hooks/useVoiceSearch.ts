import { useCallback, useEffect, useRef, useState } from "react";

import type {
  PrylensaSpeechRecognition,
  PrylensaSpeechRecognitionErrorEvent,
} from "../types/browser-search.types";

interface UseVoiceSearchOptions {
  onInterimTranscript(value: string): void;
  onFinalTranscript(value: string): void;
}

function getErrorMessage(event: PrylensaSpeechRecognitionErrorEvent): string {
  switch (event.error) {
    case "not-allowed":
    case "service-not-allowed":
      return "Microphone access is blocked. Allow it in your browser settings.";
    case "audio-capture":
      return "No microphone is available.";
    case "no-speech":
      return "No speech was detected. Try again.";
    case "network":
      return "Voice recognition is temporarily unavailable.";
    default:
      return event.error === "aborted"
        ? ""
        : "Voice search could not start. Try again.";
  }
}

export default function useVoiceSearch({
  onInterimTranscript,
  onFinalTranscript,
}: UseVoiceSearchOptions) {
  const recognitionRef = useRef<PrylensaSpeechRecognition | null>(null);
  const messageTimerRef = useRef<number | null>(null);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const supported =
    typeof window !== "undefined" &&
    Boolean(window.SpeechRecognition ?? window.webkitSpeechRecognition);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  const toggle = useCallback(() => {
    if (listening) {
      stop();
      return;
    }

    const Recognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!Recognition) {
      setError("Voice search is not supported by this browser.");
      setMessage(null);
      return;
    }

    recognitionRef.current?.abort();

    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = navigator.language || "en-NG";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setError(null);
      setMessage("Listening...");
    };

    recognition.onresult = (event) => {
      let transcript = "";
      let hasFinalResult = false;

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index]?.[0]?.transcript ?? "";
        hasFinalResult ||= Boolean(event.results[index]?.isFinal);
      }

      const normalizedTranscript = transcript.trim();
      if (!normalizedTranscript) {
        return;
      }

      onInterimTranscript(normalizedTranscript);

      if (hasFinalResult) {
        setMessage(`Searching for ${normalizedTranscript}`);
        onFinalTranscript(normalizedTranscript);

        if (messageTimerRef.current !== null) {
          window.clearTimeout(messageTimerRef.current);
        }
        messageTimerRef.current = window.setTimeout(() => {
          setMessage(null);
          messageTimerRef.current = null;
        }, 4000);
      }
    };

    recognition.onerror = (event) => {
      const nextError = getErrorMessage(event);
      setError(nextError || null);
      setMessage(null);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setListening(false);
      setMessage(null);
      setError("Voice search could not start. Try again.");
    }
  }, [listening, onFinalTranscript, onInterimTranscript, stop]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      if (messageTimerRef.current !== null) {
        window.clearTimeout(messageTimerRef.current);
      }
    };
  }, []);

  return {
    supported,
    listening,
    message,
    error,
    toggle,
    stop,
  };
}
