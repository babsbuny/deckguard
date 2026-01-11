'use client';

import Script from 'next/script';

declare global {
  interface Window {
    Paddle: any;
  }
}

export default function PaddleLoader() {
  return (
    <Script
      src="https://cdn.paddle.com/paddle/v2/paddle.js"
      onLoad={() => {
        window.Paddle.Initialize({
          token: 'live_5ed6e541f0267c37a34442d45cf',
          eventCallback: function(data: any) {
            if (data.name === 'checkout.completed') {
              window.location.href = '/analyze?success=true';
            }
          }
        });
      }}
    />
  );
}
