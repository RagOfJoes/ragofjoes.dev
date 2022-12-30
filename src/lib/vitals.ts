// eslint-disable-next-line import/no-extraneous-dependencies
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals';
import type { Metric } from 'web-vitals';

export type WebVitalsOpts = {
  analyticsID: string;
  location: Location;
};

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

const getConnectionSpeed = (): string => {
  // @ts-ignore
  if (navigator.connection && navigator.connection.effectiveType) {
    // @ts-ignore
    return navigator.connection.effectiveType;
  }

  return '';
};

const sendToAnalytics = (metric: Metric, options: WebVitalsOpts) => {
  const { analyticsID, location } = options;
  const { href, pathname, search } = location;

  const page = Object.entries(search).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    pathname
  );

  const body = {
    dsn: analyticsID,
    id: metric.id,
    page,
    href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed(),
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: 'application/x-www-form-urlencoded',
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
    return;
  }

  fetch(vitalsUrl, {
    body: blob,
    credentials: 'omit',
    keepalive: true,
    method: 'POST',
  });
};

const webVitals = (options: WebVitalsOpts) => {
  try {
    onFID((metric) => sendToAnalytics(metric, options));
    onTTFB((metric) => sendToAnalytics(metric, options));
    onLCP((metric) => sendToAnalytics(metric, options));
    onCLS((metric) => sendToAnalytics(metric, options));
    onFCP((metric) => sendToAnalytics(metric, options));
  } catch (e) {
    console.error('[WebVitals]', e);
  }
};

export default webVitals;
