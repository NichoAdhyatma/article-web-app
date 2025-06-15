import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Main loading spinner */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto">
            <Loader2 className="w-16 h-16 text-slate-600 animate-spin" />
          </div>

          {/* Pulsing background circle */}
          <div className="absolute inset-0 w-16 h-16 mx-auto bg-slate-200 rounded-full animate-pulse opacity-20"></div>
        </div>

        {/* Loading text with typing animation */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-700 animate-pulse">
            Loading
          </h2>
          <p className="text-slate-500 text-sm animate-pulse delay-75">
            Please wait while we prepare everything for you...
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default loading;
