import { useState, useRef } from "react";
import { Mic, Square, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RecorderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: string;
}

const RecorderModal = ({ open, onOpenChange, challenge }: RecorderModalProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Your browser doesn't support audio recording");
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started!");
    } catch (error) {
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped!");
    }
  };

  const handleUpload = () => {
    if (audioURL) {
      // Simulate AI feedback
      toast.success("Great pronunciation! 85% accuracy 🎉");
      setTimeout(() => {
        onOpenChange(false);
        setAudioURL(null);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-describedby="recorder-description">
        <DialogHeader>
          <DialogTitle className="text-2xl">Speaking Challenge</DialogTitle>
          <DialogDescription id="recorder-description">
            Record your pronunciation and get AI feedback
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <p className="text-muted-foreground">{challenge}</p>

          <div className="flex flex-col items-center gap-4">
            {!isRecording && !audioURL && (
              <Button
                size="lg"
                onClick={startRecording}
                className="w-full h-20 text-lg shadow-float"
              >
                <Mic className="w-6 h-6 mr-2" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <div className="relative">
                <Button
                  size="lg"
                  onClick={stopRecording}
                  variant="destructive"
                  className="w-32 h-32 rounded-full shadow-float"
                >
                  <Square className="w-8 h-8" />
                </Button>
                <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-primary animate-ripple" />
              </div>
            )}

            {audioURL && (
              <div className="w-full space-y-4">
                <audio src={audioURL} controls className="w-full" />
                <Button
                  onClick={handleUpload}
                  className="w-full h-12 shadow-float"
                  size="lg"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Submit Recording
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecorderModal;
