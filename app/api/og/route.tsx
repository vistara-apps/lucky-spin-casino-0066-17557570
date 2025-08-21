
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e293b',
          color: '#f1f5f9',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 120 }}>🎰</div>
        <div style={{ fontSize: 48, fontWeight: 'bold', color: '#f59e0b' }}>
          Lucky Spin Casino
        </div>
        <div style={{ fontSize: 24, marginTop: 20 }}>
          Spin to Win Real Crypto Rewards!
        </div>
        <div style={{ 
          fontSize: 18, 
          marginTop: 40,
          padding: '10px 20px',
          backgroundColor: '#f59e0b',
          color: '#000',
          borderRadius: 8,
          fontWeight: 'bold'
        }}>
          🚀 Play Now in Farcaster
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
