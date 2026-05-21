import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className = '', size }: DynamicIconProps) {
  // Safe lookup for arbitrary lucide icons
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    // Return standard fallback icon (ShieldAlert or HelpCircle)
    return <LucideIcons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
