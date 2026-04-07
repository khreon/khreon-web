'use client';

import React from 'react';
import { trackEvent } from '@/utils/gtag';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

export default function ClientTrackedLink({ action, category, label, value, ...props }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent({ action, category, label, value });
    if (props.onClick) props.onClick(e);
  };

  return <a {...props} onClick={handleClick} />;
}
