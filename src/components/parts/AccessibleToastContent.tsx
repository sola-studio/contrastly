import React from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

interface Props {
  type: ToastType;
  children: React.ReactNode;
  label?: string; // Optional: can override default label
}

const defaultAriaLabels: Record<ToastType, string> = {
  success: 'Success notification: ',
  error: 'Error notification: ',
  info: 'Information: ',
  warning: 'Warning: ',
  loading: 'Loading in progress: ',
};

export const AccessibleToastContent = ({ type, children, label }: Props) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-center gap-2 text-sm"
    >
      <span className="sr-only">{label || defaultAriaLabels[type]}</span>
      {children}
    </div>
  );
};
