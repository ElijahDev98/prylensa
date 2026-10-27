import { useCallback, useEffect, useRef, useState } from "react";

import Dialog from "@/components/ui/Dialog";
import {
  Camera,
  ImagePlus,
  LoaderCircle,
  RotateCcw,
  ScanSearch,
} from "lucide-react";

import {
  recognizeProductImage,
  type VisualRecognitionSource,
} from "../../services/visual-product-recognition.service";

interface VisualSearchDialogProps {
  open: boolean;
  onClose(): void;
  onSearch(query: string): void | Promise<void>;
}

type VisualSearchMode = "camera" | "upload";

const SOURCE_MESSAGES: Record<VisualRecognitionSource, string> = {
  text: "Product text detected. Review it before searching.",
  barcode: "Barcode detected. Review it before searching.",
  filename: "Product name inferred from the file name.",
  none: "No product details were detected. Enter the product name below.",
};

function VisualSearchDialog({
  open,
  onClose,
  onSearch,
}: VisualSearchDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [mode, setMode] = useState<VisualSearchMode>("camera");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraReady(false);
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewUrl((current) => {
      if (current) {
        URL.revokeObjectURL(current);
      }
      return null;
    });
    setQuery("");
    setStatus(null);
    setError(null);
  }, []);

  const closeDialog = useCallback(() => {
    stopCamera();
    clearPreview();
    onClose();
  }, [clearPreview, onClose, stopCamera]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const analyzeImage = useCallback(async (image: Blob) => {
    setAnalyzing(true);
    setError(null);
    setStatus("Analyzing product image...");

    try {
      const result = await recognizeProductImage(image);
      setQuery(result.query);
      setStatus(SOURCE_MESSAGES[result.source]);
    } catch {
      setStatus(null);
      setError("This image could not be analyzed. Try another image.");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const setImage = useCallback(
    (image: Blob) => {
      setPreviewUrl((current) => {
        if (current) {
          URL.revokeObjectURL(current);
        }
        return URL.createObjectURL(image);
      });
      void analyzeImage(image);
    },
    [analyzeImage],
  );

  const startCamera = useCallback(async () => {
    setError(null);
    clearPreview();
    setStatus("Starting camera...");

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus(null);
      setError("Camera access is not supported by this browser.");
      return;
    }

    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraReady(true);
      setStatus(null);
    } catch {
      setStatus(null);
      setError("Camera access is blocked or no camera is available.");
    }
  }, [clearPreview, stopCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setError("The camera is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("The photo could not be captured. Try again.");
          return;
        }
        stopCamera();
        setImage(blob);
      },
      "image/jpeg",
      0.9,
    );
  }, [setImage, stopCamera]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Choose a valid image file.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Choose an image smaller than 10 MB.");
        return;
      }

      stopCamera();
      setImage(file);
    },
    [setImage, stopCamera],
  );

  const changeMode = useCallback(
    (nextMode: VisualSearchMode) => {
      stopCamera();
      clearPreview();
      setMode(nextMode);
    },
    [clearPreview, stopCamera],
  );

  const submitSearch = useCallback(() => {
    const normalizedQuery = query.trim();
    if (!normalizedQuery || analyzing) {
      return;
    }

    void onSearch(normalizedQuery);
    closeDialog();
  }, [analyzing, closeDialog, onSearch, query]);

  const footer = (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={closeDialog}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={submitSearch}
        disabled={analyzing || query.trim().length === 0}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ScanSearch size={17} />
        Search product
      </button>
    </div>
  );

  return (
    <Dialog
      open={open}
      title="Search by image"
      footer={footer}
      onClose={closeDialog}
    >
      <div className="space-y-5">
        <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => changeMode("camera")}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
              mode === "camera"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Camera size={17} /> Camera
          </button>
          <button
            type="button"
            onClick={() => changeMode("upload")}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
              mode === "upload"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ImagePlus size={17} /> Upload
          </button>
        </div>

        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-950 sm:h-72">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected product"
              className="h-full w-full object-contain"
            />
          ) : mode === "camera" ? (
            <>
              <video
                ref={videoRef}
                muted
                playsInline
                className={`h-full w-full object-contain ${cameraReady ? "block" : "hidden"}`}
              />
              {!cameraReady && (
                <button
                  type="button"
                  onClick={() => void startCamera()}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  <Camera size={18} /> Start camera
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              <ImagePlus size={18} /> Choose image
            </button>
          )}

          {cameraReady && !previewUrl && (
            <button
              type="button"
              onClick={capturePhoto}
              aria-label="Capture product photo"
              title="Capture product photo"
              className="absolute bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg hover:bg-blue-700"
            >
              <Camera size={20} />
            </button>
          )}

          {previewUrl && (
            <button
              type="button"
              onClick={() => {
                clearPreview();
                if (mode === "camera") void startCamera();
              }}
              aria-label="Choose another image"
              title="Choose another image"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-700 shadow hover:bg-slate-100"
            >
              <RotateCcw size={18} />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="sr-only"
        />

        {(status || error) && (
          <div
            role={error ? "alert" : "status"}
            className={`flex items-center gap-2 text-sm ${error ? "text-red-700" : "text-slate-600"}`}
          >
            {analyzing && <LoaderCircle size={16} className="animate-spin" />}
            <span>{error ?? status}</span>
          </div>
        )}

        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-800">
            Detected product or barcode
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitSearch();
              }
            }}
            placeholder="Enter the product name"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
    </Dialog>
  );
}

export default VisualSearchDialog;
