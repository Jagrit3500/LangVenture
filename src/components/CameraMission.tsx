import { useState, useRef } from "react";
import { Camera, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface CameraMissionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CameraMission = ({ open, onOpenChange }: CameraMissionProps) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [detectedObject, setDetectedObject] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Your browser doesn't support camera access");
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      
      // Simulate object detection after 2 seconds
      setTimeout(() => {
        simulateDetection();
      }, 2000);
    } catch (error) {
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const simulateDetection = () => {
    const objects = [
      { en: "Coffee", es: "Café" },
      { en: "Book", es: "Libro" },
      { en: "Phone", es: "Teléfono" },
      { en: "Cup", es: "Taza" },
      { en: "Pen", es: "Bolígrafo" },
    ];
    const random = objects[Math.floor(Math.random() * objects.length)];
    setDetectedObject(`${random.en} = ${random.es}`);
    toast.success(`Detected: ${random.en} = ${random.es}`);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
    setDetectedObject(null);
  };

  const handleClose = () => {
    stopCamera();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl" aria-describedby="camera-description">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Camera className="w-6 h-6 text-primary" />
            Camera Mission
          </DialogTitle>
          <DialogDescription id="camera-description">
            Use your device camera to identify objects and learn new vocabulary
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">
            Point your camera at objects to learn their names in Spanish!
          </p>

          <div className="relative aspect-video bg-muted rounded-2xl overflow-hidden">
            {!cameraActive ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button onClick={startCamera} size="lg" className="shadow-float">
                  <Camera className="w-5 h-5 mr-2" />
                  Open Camera
                </Button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {detectedObject && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-float animate-scale-in">
                    <p className="text-lg font-semibold">{detectedObject}</p>
                  </div>
                )}
                <Button
                  onClick={stopCamera}
                  size="icon"
                  variant="destructive"
                  className="absolute top-4 right-4 rounded-full shadow-float"
                >
                  <X className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraMission;
