"use client";
import React from "react";
import { HiExclamationCircle } from "react-icons/hi";
import { motion } from "framer-motion";

interface ErrorFallbackProps {
  /** متن پیام خطا */
  message?: string;
  /** تابعی که هنگام کلیک روی Retry اجرا میشه */
  onRetry?: () => void;
  /** اگر true باشه، کامپوننت کل صفحه رو می‌گیره */
  fullScreen?: boolean;
  /** کلاس‌های اضافی برای wrapper */
  className?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  message = "خطا در بارگذاری داده‌ها",
  onRetry,
  fullScreen = true,
  className = "",
}) => {
  const wrapperClasses = `${fullScreen ? "flex h-screen items-center justify-center md:h-auto" : "flex items-center justify-center md:h-auto"} flex-col gap-4 ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={wrapperClasses}
    >
      <HiExclamationCircle className="animate-pulse text-6xl text-warning-800" />
      <span className="text-center text-lg font-medium text-warning-800">
        {message}
      </span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="hover:bg-warning-600 mt-2 rounded-md bg-primary-600 px-4 py-2 text-light-100 transition-colors"
        >
          تلاش مجدد
        </button>
      )}
    </motion.div>
  );
};

export default ErrorFallback;
