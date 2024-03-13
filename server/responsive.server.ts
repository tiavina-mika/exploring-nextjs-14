"use server"

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

type Output = {
  isMobile: boolean;
  isTablet: boolean;
  isTabletDown: boolean;
  isDesktop: boolean;
};

/**
 * Note: this not work on testing it a desktop browser
 * since it always return desktop
 * it work on real operating system (ex: android, ios, mac, etc...)
 * @returns 
 */
export const getIsResponsiveScreens = (): Output => {
  if (typeof process === 'undefined') {
    throw new Error('[Server method] you are importing a server-only module outside of server');
  }

  const { get } = headers();
  const ua = get('user-agent');

  const device = new UAParser(ua || '').getDevice();

  const isMobile = device.type === 'mobile';
  const isTablet = device.type === 'tablet';
  const isTabletDown = isMobile || isTablet;

  // for desktop: @see: https://github.com/faisalman/ua-parser-js/issues/182
  const isDesktop = device.type === undefined || !['wearable', 'mobile', 'tablet'].includes(device.type);

    /**
   * Possible device type:
   * console, mobile, tablet, smarttv, wearable, embedded
   */
  return {
    isMobile,
    isTablet,
    isTabletDown,
    isDesktop
  };
};