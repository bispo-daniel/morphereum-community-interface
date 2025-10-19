import { Check } from "lucide-react";
import ReactDOM from "react-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertComponent = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => {
  if (!message) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed bottom-4 left-4 z-[100] transform rounded-md text-white shadow-lg transition-opacity duration-300"
      style={{ pointerEvents: "none" }}
    >
      <Alert className="bg-transparent backdrop-blur-md backdrop-filter">
        <AlertTitle className="flex items-center gap-2">
          <Check size={16} /> {title}
        </AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>,
    document.body,
  );
};

export default AlertComponent;
