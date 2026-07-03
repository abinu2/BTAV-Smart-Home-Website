import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt =
  'BTAV Smart Home — Phoenix AV & Automation Specialists';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default social share image. Brand wordmark + tagline on the dark palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#0A0C10',
          backgroundImage:
            'radial-gradient(circle at 80% 20%, rgba(95,190,178,0.25) 0%, transparent 45%), radial-gradient(circle at 15% 90%, rgba(203,164,108,0.18) 0%, transparent 45%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 48 }}>
            <div style={{ width: 8, height: 28, background: '#5FBEB2', borderRadius: 4 }} />
            <div style={{ width: 8, height: 48, background: '#5FBEB2', borderRadius: 4 }} />
            <div style={{ width: 8, height: 20, background: '#5FBEB2', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, color: '#F2F1EC', display: 'flex' }}>
            BT<span style={{ color: '#5FBEB2' }}>AV</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 68,
            fontWeight: 700,
            color: '#F2F1EC',
            lineHeight: 1.1,
            maxWidth: 900,
            display: 'flex',
          }}
        >
          Your Home, Intelligently Automated.
        </div>

        <div style={{ marginTop: 28, fontSize: 30, color: '#7A8BA8', display: 'flex' }}>
          Control4 Specialist · Maricopa County, AZ
        </div>
      </div>
    ),
    size,
  );
}
