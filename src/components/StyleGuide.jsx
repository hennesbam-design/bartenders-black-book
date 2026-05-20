import { Link } from 'react-router-dom'

const COLOURS = [
  { name: 'Primary Teal',    hex: '#007c75', var: '--gold',         text: '#fff' },
  { name: 'Teal Light',      hex: '#009d96', var: '--gold-light',   text: '#fff' },
  { name: 'Teal 50',         hex: '#e6f5f4', var: '--teal-50',      text: '#005450' },
  { name: 'Teal 100',        hex: '#b3e2df', var: '--teal-100',     text: '#005450' },
  { name: 'Background',      hex: '#f2f6f6', var: '--bg',           text: '#0d1f20' },
  { name: 'Surface',         hex: '#ffffff', var: '--surface',      text: '#0d1f20', border: true },
  { name: 'Surface High',    hex: '#e8f0f0', var: '--surface-high', text: '#0d1f20' },
  { name: 'Border',          hex: '#d4e0e1', var: '--border',       text: '#0d1f20' },
  { name: 'Text Primary',    hex: '#0d1f20', var: '--text-primary', text: '#fff' },
  { name: 'Text Second',     hex: '#3a5258', var: '--text-second',  text: '#fff' },
  { name: 'Text Muted',      hex: '#7a9195', var: '--text-muted',   text: '#fff' },
  { name: 'Alert Amber',     hex: '#f0e0a0', var: '—',              text: '#7a5c00' },
  { name: 'Alert Red',       hex: '#fde8e8', var: '—',              text: '#9b1c1c' },
]

const TYPESCALE = [
  { name: 'Display',      tag: 'h1', style: { fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '3rem',  fontWeight: 300, color: 'var(--text-primary)' }, sample: 'Bartender's Black Book' },
  { name: 'Heading 1',    tag: 'h2', style: { fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem',  fontWeight: 400, color: 'var(--gold)' },         sample: 'House Recipes' },
  { name: 'Heading 2',    tag: 'h3', style: { fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.4rem',fontWeight: 600, color: 'var(--text-primary)' }, sample: 'Espresso Martini' },
  { name: 'Body Large',   tag: 'p',  style: { fontFamily: 'DM Sans, sans-serif', fontSize: '1rem',  fontWeight: 400, color: 'var(--text-primary)' }, sample: 'Double strain into chilled coupe glass.' },
  { name: 'Body',         tag: 'p',  style: { fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem',fontWeight: 400, color: 'var(--text-second)' }, sample: 'Shake with ice until well chilled and diluted.' },
  { name: 'Small / Meta', tag: 'p',  style: { fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem',fontWeight: 400, color: 'var(--text-muted)' }, sample: 'Coupe Glass · Shake · No Ice' },
  { name: 'Label',        tag: 'p',  style: { fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem',fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)' }, sample: 'Ingredients' },
]

function Swatch({ c }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 10, border: c.border ? '1px solid #d4e0e1' : 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div style={{ background: c.hex, height: 52 }} />
      <div style={{ background: '#fff', padding: '8px 10px', border: '1px solid #d4e0e1', borderTop: 'none', borderRadius: '0 0 10px 10px' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#0d1f20', margin: 0, lineHeight: 1.3 }}>{c.name}</p>
        <p style={{ fontSize: '0.65rem', color: '#7a9195', margin: 0 }}>{c.hex}</p>
        <p style={{ fontSize: '0.62rem', color: '#b0bec5', margin: 0, fontFamily: 'monospace' }}>{c.var}</p>
      </div>
    </div>
  )
}

export default function StyleGuide() {
  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <Link to="/dashboard" className="back-link">← Dashboard</Link>

      {/* Title */}
      <div style={{ background: 'var(--gold)', padding: '20px 20px 18px', borderRadius: 14, marginBottom: 28 }}>
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>v2 · 2026</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 6vw, 2.6rem)', fontWeight: 300, color: '#fff', lineHeight: 1.1, margin: 0 }}>
          Style Guide
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', marginTop: 6 }}>
          Bartender's Black Book · Design System
        </p>
      </div>

      {/* Colour Palette */}
      <section style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 12 }}>Colour Palette</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
          {COLOURS.map(c => <Swatch key={c.name} c={c} />)}
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

      {/* Typography */}
      <section style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 12 }}>Typography</p>
        <div style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
          {TYPESCALE.map((t, i) => (
            <div key={t.name} style={{ padding: '16px 20px', borderBottom: i < TYPESCALE.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <div style={{ minWidth: 90, flexShrink: 0 }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.name}</span>
              </div>
              <p style={{ ...t.style, margin: 0, flex: 1 }}>{t.sample}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 8 }}>
          Display + Headings: <strong>Cormorant Garamond</strong> (italic) · Body: <strong>DM Sans</strong>
        </p>
      </section>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

      {/* Buttons */}
      <section style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 12 }}>Buttons</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, background: 'var(--surface)', padding: '20px', borderRadius: 12, border: '1px solid var(--border)' }}>
          <button style={{ padding: '10px 20px', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}>Primary</button>
          <button style={{ padding: '10px 20px', background: 'var(--teal-50)', color: 'var(--teal-700)', border: '1px solid var(--teal-100)', borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}>Secondary</button>
          <button style={{ padding: '10px 20px', background: 'transparent', color: 'var(--text-second)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '0.88rem', cursor: 'pointer' }}>Ghost</button>
          <button style={{ padding: '10px 20px', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 999, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer' }}>Pill</button>
          <button style={{ padding: '5px 14px', background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 999, fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', cursor: 'pointer' }}>Filter Pill</button>
          <button style={{ padding: '5px 14px', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 999, fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Active Filter</button>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

      {/* Cards */}
      <section style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 12 }}>Cards & Surfaces</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <p className="label" style={{ marginBottom: 6 }}>Default Card</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-second)', margin: 0 }}>White background, 12px radius, subtle shadow.</p>
          </div>
          <div style={{ background: 'var(--teal-50)', borderRadius: 12, border: '1px solid var(--teal-100)', padding: 16 }}>
            <p className="label" style={{ marginBottom: 6, color: 'var(--teal-700)' }}>Teal Highlight</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--teal-700)', margin: 0 }}>For alerts, tips, and talking points.</p>
          </div>
          <div style={{ background: 'var(--surface-high)', borderRadius: 12, border: '1px solid var(--border)', padding: 16 }}>
            <p className="label" style={{ marginBottom: 6 }}>Surface High</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-second)', margin: 0 }}>For secondary info blocks.</p>
          </div>
          <div style={{ background: '#fef3cd', borderRadius: 12, border: '1px solid #f0e0a0', padding: 16 }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9a6c00', marginBottom: 6 }}>Allergen Warning</p>
            <p style={{ fontSize: '0.82rem', color: '#7a5c00', margin: 0 }}>⚠ Contains: Dairy, Egg</p>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

      {/* Spacing */}
      <section style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 12 }}>Spacing & Radius</p>
        <div style={{ background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', padding: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', marginBottom: 16 }}>
            {[4, 8, 10, 12, 16, 20, 24].map(r => (
              <div key={r} style={{ textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, background: 'var(--teal-50)', border: '1px solid var(--teal-100)', borderRadius: r, marginBottom: 4 }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{r}px</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
            Cards: 12px · Buttons: 8px · Pills: 999px · Icons: 10–12px
          </p>
        </div>
      </section>

      <div style={{ paddingBottom: 24, textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
          Bartender's Black Book · v2 · Coppa Club 2026
        </p>
      </div>
    </div>
  )
}
