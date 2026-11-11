import { ImageResponse } from 'next/og';

// The preview picture shown when your link is shared on LinkedIn, WhatsApp or X.
export const alt = 'Juned Kazi · SaaS developer for founders';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FBFAF7',
          color: '#141218',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 600, letterSpacing: '-1px' }}>
          Juned Kazi<span style={{ color: '#FF5A1F' }}>.</span>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: '-3px',
            maxWidth: 1000,
          }}
        >
          I build SaaS apps that go live and take payments.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, color: '#5E5A66' }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: '#16A34A',
              marginRight: 14,
            }}
          />
          SaaS developer for founders · Next.js · AI · Payments
        </div>
      </div>
    ),
    size
  );
}
