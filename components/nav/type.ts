import React from 'react';

export interface MenuItem {
  name: string | NonNullable<React.ReactNode>;
  url?: string;
  comingSoon?: boolean;
  icon: NonNullable<React.ReactNode>;
  isOuterLink?: boolean;
  hoverBgImage?: React.ReactNode;
}
