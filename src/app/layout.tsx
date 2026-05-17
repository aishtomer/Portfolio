import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | Software Engineer',
  description: 'Premium Portfolio showcasing projects and experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Background ambient glow */}
        <div style={{
          position: 'fixed',
          top: '-10%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'var(--accent-color)',
          filter: 'blur(150px)',
          opacity: 0.15,
          zIndex: -1,
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'fixed',
          bottom: '-10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: '#ec4899',
          filter: 'blur(150px)',
          opacity: 0.1,
          zIndex: -1,
          borderRadius: '50%',
        }} />
        
        {children}
      </body>
    </html>
  );
}
