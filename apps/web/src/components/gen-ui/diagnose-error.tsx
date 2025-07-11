"use client";

import "../app/globals.css";
import {
  AlertTriangle,
  Loader2,
  CheckCircle,
  MessageSquare,
  FileText,
} from "lucide-react";
import { useState } from "react";

type DiagnoseErrorProps = {
  status: "loading" | "generating" | "done";
  diagnosis?: string;
  recommendation?: string;
  reasoningText?: string;
  summaryText?: string;
};

export function DiagnoseError({
  status,
  diagnosis,
  recommendation,
  reasoningText,
  summaryText,
}: DiagnoseErrorProps) {
  const [showReasoning, setShowReasoning] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return (
          <div className="h-3.5 w-3.5 rounded-full border border-gray-300" />
        );
      case "generating":
        return <Loader2 className="h-3.5 w-3.5 animate-spin text-gray-500" />;
      case "done":
        return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "loading":
        return "Preparing error analysis...";
      case "generating":
        return "Diagnosing errors...";
      case "done":
        return "Error diagnosis complete";
    }
  };

  return (
    <div className="overflow-hidden rounded-md border border-gray-200">
      {reasoningText && (
        <div className="border-b border-blue-100 bg-blue-50 p-2">
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="flex items-center gap-1 text-xs font-normal text-blue-700 hover:text-blue-800"
          >
            <MessageSquare className="h-3 w-3" />
            {showReasoning ? "Hide reasoning" : "Show reasoning"}
          </button>
          {showReasoning && (
            <p className="mt-1 text-xs font-normal text-blue-800">
              {reasoningText}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center border-b border-gray-200 bg-gray-50 p-2">
        <AlertTriangle className="mr-2 h-3.5 w-3.5 text-amber-500" />
        <span className="flex-1 text-xs font-normal text-gray-800">
          {getStatusText()}
        </span>
        {getStatusIcon()}
      </div>

      {status === "done" && diagnosis && (
        <div className="p-2">
          <div className="mb-2">
            <h3 className="mb-1 text-xs font-normal text-gray-500">
              Diagnosis
            </h3>
            <p className="text-xs font-normal text-gray-800">{diagnosis}</p>
          </div>

          {recommendation && (
            <div>
              <h3 className="mb-1 text-xs font-normal text-gray-500">
                Recommendation
              </h3>
              <p className="text-xs font-normal text-gray-800">
                {recommendation}
              </p>
            </div>
          )}
        </div>
      )}

      {summaryText && status === "done" && (
        <div className="border-t border-green-100 bg-green-50 p-2">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="flex items-center gap-1 text-xs font-normal text-green-700 hover:text-green-800"
          >
            <FileText className="h-3 w-3" />
            {showSummary ? "Hide summary" : "Show summary"}
          </button>
          {showSummary && (
            <p className="mt-1 text-xs font-normal text-green-800">
              {summaryText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
