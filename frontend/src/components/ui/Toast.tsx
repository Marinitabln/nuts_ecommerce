"use client";

import { useToastStore } from "@/stores/ToastStore";
import { CheckCircle2 } from "lucide-react";



const Toast = () => {
  const { visible, message } =
    useToastStore();

  return (
    <div
      className={`fixed top-6 right-10 z-[9999] transition-all duration-300  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} >
      <div
        className="bg-white shadow-xl border rounded-xl px-5 py-4 flex items-center gap-3 min-w-[280px]">
        <CheckCircle2
          className="text-success"
        />
        <p className="text-sm font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toast;