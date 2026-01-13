import React, { useEffect, useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { motion, AnimatePresence } from "framer-motion";

const AnimatedAlert = ({ show, onClose, title, description }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-md"
        >
          <Alert className="bg-gradient-to-br from-[#f7e1ff] to-[#e1a2f8]/20 border border-[#e79dff]/40 ring-[#e79dff] text-[#cb39fc] ring hover:ring-[#db6fff] shadow-lg rounded-xl">
            <CheckCircle2Icon className="text-[#cb39fc]" />
            <AlertTitle className="text-[#cb39fc] font-semibold">
              {title}
            </AlertTitle>
            <AlertDescription className="text-[#cb39fc]/90">
              {description}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedAlert;
