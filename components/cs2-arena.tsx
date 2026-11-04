'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  Copy,
  Crown,
  ExternalLink,
  Globe2,
  Menu,
  Pin,
  Radio,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

type ImageProps = { src: string; alt: string; className?: string; fallbackTone?: string }

function ResilientImage({ src, alt, className = '', fallbackTone = '#de9b35' }: ImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <div className={`image-fallback ${className}`} style={{ '--fallback-tone': fallbackTone } as React.CSSProperties} aria-label={alt} role="img">
        <div className="fallback-grid" />
        <svg viewBox="0 0 600 260" aria-hidden="true" className="fallback-weapon">
          <path d="M72 123h62l30-19h76l24 18h65l17 13h65l19 16h93v18h-55l-18 34h-31l-11-34h-90l-26-16h-96l-32 11h-56l-22-15H72z" fill="currentColor" />
          <path d="M199 155h48l-9 42h-24zM145 115l20-26h64l13 16h-76zM402 132h38v-9h-38z" fill="currentColor" opacity=".8" />
          <circle cx="342" cy="142" r="7" fill="#0b0e14" />
        </svg>
        <span className="fallback-label">ARMORY // SIGNAL LOST</span>
      </div>
    )
  }
  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} loading="lazy" />
}

const drops = [
  { name: 'AWP | Chromatic Aberration', player: 'n0thing', avatar: 'photo-1534528741775-53994a69daeb', rarity: 'Covert', tone: '#eb4b4b', img: 'photo-1612287230202-1ff1d85d1bdf' },
  { name: 'AK-47 | Neon Rider', player: 'Kovaak', avatar: 'photo-1500648767791-00dcc994a43e', rarity: 'Classified', tone: '#d32ce6', img: 'photo-1511512578047-dfb367046420' },
  { name: '★ Karambit | Doppler', player: 's1mple', avatar: 'photo-1506794778202-cad84cf45f1d', rarity: 'Covert', tone: '#eb4b4b', img: 'photo-1550745165-9bc0b252726f' },
  { name: 'M4A1-S | Printstream', player: 'Jett', avatar: 'photo-1535713875002-d1d0cf377fde', rarity: 'Classified', tone: '#d32ce6', img: 'photo-1538481199705-c710c4e965fc' },
]

const skins = [
  { category: 'RIFLES', weapon: 'AWP', skin: 'Dragon Lore', wear: 'Souvenir FN', float: '0.0124', price: '$14,500', rarity: 'CONTRABAND', tone: '#e4ae39', image: 'photo-1612287230202-1ff1d85d1bdf', stat: '1,284', code: 'AWP-DRGN-042' },
  { category: 'KNIVES', weapon: 'KARAMBIT', skin: 'Doppler Sapphire', wear: 'StatTrak™ FN', float: '0.0081', price: '$9,200', rarity: 'COVERT', tone: '#eb4b4b', image: 'photo-1550745165-9bc0b252726f', stat: '092', code: 'KARAMBIT-DOP-007' },
  { category: 'RIFLES', weapon: 'AK-47', skin: 'Wild Lotus', wear: 'Minimal Wear', float: '0.0742', price: '$8,400', rarity: 'COVERT', tone: '#eb4b4b', image: 'photo-1511512578047-dfb367046420', stat: '3,510', code: 'AK47-LOTUS-118' },
  { category: 'GLOVES', weapon: 'SPORT GLOVES', skin: "Pandora's Box", wear: 'Field-Tested', float: '0.1890', price: '$5,100', rarity: 'CLASSIFIED', tone: '#d32ce6', image: 'photo-1563089145-599997674d42', stat: '—', code: 'GLOVE-PAND-003' },
]

const maps = [
  { name: 'MIRAGE', location: 'MIDDLE EAST · ACTIVE DUTY', mode: 'RETAKE 5v5', players: '18 / 20', ping: '14', image: 'photo-1509198397868-475647b2a1e5', tone: '#e4ae39' },
  { name: 'DUST II', location: 'MAGHREB · ACTIVE DUTY', mode: 'DM HS ONLY', players: '16 / 20', ping: '22', image: 'photo-1518709268805-4e9042af9f23', tone: '#60a5fa' },
  { name: 'INFERNO', location: 'ITALY · ACTIVE DUTY', mode: 'COMPETITIVE', players: '10 / 10', ping: '18', image: 'photo-1579783902614-a3fb3927b675', tone: '#eb4b4b' },
  { name: 'NUKE', location: 'UNITED STATES · ACTIVE DUTY', mode: 'COMPETITIVE', players: '12 / 20', ping: '31', image: 'photo-1526374965328-7f61d4dc18c5', tone: '#60a5fa' },
]

const players = [
  { rank: '01', name: 'donk', country: '🇷🇺', team: 'Team Spirit', rating: '31,450', tier: 'gold', wins: '78.4%', hs: '62.1%', avatar: 'photo-1534528741775-53994a69daeb', delta: '+214' },
  { rank: '02', name: 'ZywOo', country: '🇫🇷', team: 'Vitality', rating: '27,890', tier: 'red', wins: '74.8%', hs: '58.7%', avatar: 'photo-1500648767791-00dcc994a43e', delta: '+180' },
  { rank: '03', name: 'm0NESY', country: '🇰🇿', team: 'G2 Esports', rating: '24,120', tier: 'pink', wins: '71.2%', hs: '55.9%', avatar: 'photo-1506794778202-cad84cf45f1d', delta: '+96' },
  { rank: '04', name: 'ropz', country: '🇪🇪', team: 'FaZe Clan', rating: '22,640', tier: 'blue', wins: '69.7%', hs: '51.3%', avatar: 'photo-1535713875002-d1d0cf377fde', delta: '+73' },
]

function SectionTitle({ eyebrow, title, side }: { eyebrow: string; title: React.ReactNode; side?: React.ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {side}
    </div>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['PLAY', '#servers'], ['LOADOUT', '#loadout'], ['SERVERS', '#servers'], ['PREMIER RANK', '#leaderboard'], ['PASS', '#season']]
  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="CS2 Arena home"><span className="brand-mark"><Crosshair size={23} strokeWidth={1.8} /></span><span>CS2<span className="brand-slash">//</span>ARENA</span></a>
          <nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href], index) => <a key={label} className={index === 0 ? 'nav-link nav-active' : 'nav-link'} href={href}>{label}{index === 0 && <span className="nav-active-line" />}</a>)}</nav>
          <div className="nav-actions"><div className="online-pill"><span className="online-dot" /><span>24,590 <small>ONLINE</small></span></div><a className="steam-button" href="https://steamcommunity.com/login/home/" target="_blank" rel="noreferrer"><span className="steam-symbol">S</span><span>LOGIN WITH STEAM</span><ArrowUpRight size={14} /></a><button className="mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
        </div>
        <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} aria-label="Mobile navigation">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={14} /></a>)}</motion.nav>}</AnimatePresence>
      </header>
      <div className="ticker"><div className="ticker-label"><span className="ticker-live"><span />LIVE</span><span>SKIN DROPS</span></div><div className="ticker-track">{[...drops, ...drops].map((drop, i) => <div className="ticker-item" key={`${drop.name}-${i}`} style={{ '--rarity-tone': drop.tone } as React.CSSProperties}><div className="ticker-thumb"><ResilientImage src={`https://images.unsplash.com/${drop.img}?auto=format&fit=crop&w=160&q=80`} alt="" fallbackTone={drop.tone} /></div><div className="ticker-copy"><span className="ticker-skin">{drop.name}</span><span className="ticker-player"><ResilientImage src={`https://images.unsplash.com/${drop.avatar}?auto=format&fit=crop&w=48&q=80`} alt="" />{drop.player} <span>UNBOXED</span></span></div><span className="ticker-rarity">{drop.rarity}</span></div>)}</div><a className="ticker-all" href="#loadout">VIEW ALL <ArrowRight size={13} /></a></div>
    </>
  )
}

function Hero({ onInspect }: { onInspect: (item: (typeof skins)[number]) => void }) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="hero" id="top">
      <div className="hero-background"><ResilientImage src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=85" alt="Esports arena under dramatic blue and amber lighting" /><div className="hero-wash" /><div className="hero-grid" /></div>
      <div className="hero-inner page-width">
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <div className="season-chip"><span className="season-live"><Radio size={12} />SEASON 2 PREMIER LIVE</span><span className="chip-separator" />128-TICK SUB-TICK SERVERS</div>
          <div className="hero-index"><span>01</span> / 04 <i /></div>
          <h1>MASTER THE<br /><span>SMOKE.</span><br />DOMINATE THE<br /><span className="outline-title">SERVER.</span></h1>
          <p className="hero-description">Next-gen Counter-Strike 2 matchmaking, instant skin inspection, and competitive community servers built for the next round.</p>
          <div className="hero-buttons"><a className="button-primary" href="#servers"><Crosshair size={17} />PLAY NOW<ArrowRight size={15} /></a><button className="button-glass" onClick={() => onInspect(skins[0])}><Target size={16} />INSPECT SKINS</button></div>
          <div className="hero-proof"><div className="proof-avatars">{drops.slice(0, 3).map((drop) => <ResilientImage key={drop.player} src={`https://images.unsplash.com/${drop.avatar}?auto=format&fit=crop&w=64&q=80`} alt="" />)}</div><span><strong>24K+</strong> players in queue</span><span className="proof-divider" /><span className="proof-stars">★★★★★</span><span>4.9 / 5</span></div>
        </motion.div>
        <motion.div className="inspect-stage" initial={reduceMotion ? false : { opacity: 0, x: 24, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: .8, delay: .14 }}>
          <div className="stage-topline"><span><span className="status-square" />LIVE INSPECT</span><span>ITEM ID <b>CS2-0001847</b></span></div>
          <div className="featured-item">
            <div className="featured-rarity">COVERT <span>★</span></div>
            <div className="featured-glow" />
            <ResilientImage src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=80" alt="Featured weapon skin in the CS2 inspect frame" fallbackTone="#4a89f3" />
            <div className="featured-crosshair"><Crosshair size={19} /></div>
            <div className="featured-zoom">+  HOVER TO INSPECT</div>
            <div className="featured-stickers"><span>★</span><span>⚡</span><span>◈</span><span>◉</span></div>
          </div>
          <div className="featured-meta"><div><span className="meta-label">STAT TRAK™ FACTORY NEW</span><h3>AWP <span>|</span> Chromatic Aberration</h3></div><div className="featured-price"><span>MARKET VALUE</span><b>$ 1,284.50</b></div></div>
          <div className="float-row"><span>FLOAT VALUE</span><code>0.0042189</code><span className="float-spectrum"><i /></span><span className="float-fn">FN</span></div>
          <div className="featured-foot"><span><ShieldCheck size={13} /> VERIFIED ITEM</span><span>STICKER CAPSULE <b>× 4</b></span><button aria-label="Inspect featured skin" onClick={() => onInspect(skins[0])}><ArrowUpRight size={15} /></button></div>
        </motion.div>
      </div>
      <div className="hero-bottom page-width"><span><ArrowDownRight size={15} /> SCROLL TO DEPLOY</span><span>EST. MMXXIV</span><div className="hero-progress"><i /></div></div>
      <div id="season" className="hero-season-note"><Sparkles size={13} /> PREMIER SEASON 02 <span>·</span> ASCEND THE RANKS</div>
    </section>
  )
}

function SkinCard({ item, index, onInspect }: { item: (typeof skins)[number]; index: number; onInspect: (item: (typeof skins)[number]) => void }) {
  return (
    <motion.article className="skin-card" style={{ '--rarity-tone': item.tone } as React.CSSProperties} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .4, delay: index * .07 }}>
      <div className="skin-card-top"><span className="skin-index">0{index + 1} <span>/ ARMORY</span></span><span className="rarity-tag">{item.rarity}</span></div>
      <div className="skin-art"><div className="skin-glow" /><ResilientImage src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=800&q=80`} alt={`${item.weapon} ${item.skin} skin artwork`} fallbackTone={item.tone} /><span className="stattrak"><Zap size={10} fill="currentColor" /> STAT TRAK™ <b>{item.stat}</b></span><span className="inspect-corner"><ArrowUpRight size={15} /></span></div>
      <div className="skin-details"><span className="skin-weapon">{item.weapon}</span><h3>{item.skin}</h3><span className="skin-wear">{item.wear}</span><div className="float-stat"><span>FLOAT <b>{item.float}</b></span><span className="float-spectrum"><i /></span><span className="float-quality">FN</span></div>
        <div className="skin-price-row"><div><span>MARKET PRICE</span><b>{item.price}</b></div><span className="price-change">+2.4% <ArrowUpRight size={12} /></span></div>
        <button className="inspect-button" onClick={() => onInspect(item)}><Crosshair size={14} /> INSPECT IN GAME <ArrowUpRight size={13} /></button>
      </div><div className="rarity-rail" />
    </motion.article>
  )
}

function Loadout({ onInspect }: { onInspect: (item: (typeof skins)[number]) => void }) {
  const [filter, setFilter] = useState('ALL')
  const filters = ['ALL', 'RIFLES', 'KNIVES', 'GLOVES', 'AWP']
  const filtered = filter === 'ALL' ? skins : skins.filter((skin) => skin.category === filter || (filter === 'AWP' && skin.weapon === 'AWP'))
  return (
    <section className="section-block loadout-section page-width" id="loadout">
      <SectionTitle eyebrow="THE ARMORY // CURATED INVENTORY" title={<>YOUR NEXT <span>LOADOUT.</span></>} side={<a className="section-link" href="#loadout">OPEN FULL ARMORY <ArrowUpRight size={15} /></a>} />
      <div className="loadout-toolbar"><div className="filter-list" role="tablist" aria-label="Filter by weapon category">{filters.map((filterName) => <button key={filterName} role="tab" aria-selected={filter === filterName} className={filter === filterName ? 'filter-pill selected' : 'filter-pill'} onClick={() => setFilter(filterName)}>{filterName}</button>)}</div><span className="inventory-count"><span className="online-dot" />{String(filtered.length).padStart(2, '0')} ITEMS FOUND</span></div>
      <div className="skin-grid">{filtered.length ? filtered.map((item) => <SkinCard key={item.code} item={item} index={skins.indexOf(item)} onInspect={onInspect} />) : <div className="empty-filter">AWP COLLECTION IS BEING RE-ARMED <span>CHECK BACK IN THE NEXT ROUND</span></div>}</div>
      <div className="loadout-foot"><span><ShieldCheck size={14} /> ALL ITEMS VERIFIED ON STEAM</span><span>PRICES UPDATED 2 MIN AGO <i /></span></div>
    </section>
  )
}

function ServerCard({ map, index }: { map: (typeof maps)[number]; index: number }) {
  const [copied, setCopied] = useState(false)
  async function copyAddress() {
    const text = 'connect play.cs2arena.gg:27015'
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const field = document.createElement('textarea')
      field.value = text
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2400)
  }
  return (
    <motion.article className="server-card" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .4, delay: index * .08 }}>
      <div className="server-image"><ResilientImage src={`https://images.unsplash.com/${map.image}?auto=format&fit=crop&w=800&q=80`} alt={`${map.name} inspired map environment`} fallbackTone={map.tone} /><div className="server-image-shade" /><div className="map-marker"><Pin size={13} fill="currentColor" /> {map.location}</div><span className="server-id">0{index + 1}</span><div className="map-title"><span className="mode-badge">{map.mode}</span><h3>{map.name}</h3></div><span className="map-corner"><ArrowUpRight size={16} /></span></div>
      <div className="server-info"><div className="server-slots"><div className="slots-top"><span><Users size={13} /> PLAYER SLOTS</span><b>{map.players} <small>PLAYERS</small></b></div><div className="slots-bar"><i style={{ width: `${Number(map.players.split('/')[0].trim()) / 20 * 100}%` }} /></div></div><div className="server-bottom"><span className="ping"><span />{map.ping} <small>MS</small></span><button className={copied ? 'copy-ip copied' : 'copy-ip'} onClick={copyAddress}>{copied ? <ShieldCheck size={13} /> : <Copy size={13} />}{copied ? 'CONSOLE IP COPIED!' : 'COPY IP'}</button></div></div>
    </motion.article>
  )
}

function Servers() {
  return (
    <section className="section-block servers-section" id="servers"><div className="page-width"><SectionTitle eyebrow="FIND YOUR NEXT FIGHT // 128-TICK" title={<>ACTIVE DUTY <span>MAP POOL.</span></>} side={<div className="region-select"><Globe2 size={15} /><span>EUROPE WEST</span><span className="region-dot" /></div>} /><div className="server-grid">{maps.map((map, index) => <ServerCard key={map.name} map={map} index={index} />)}</div><div className="servers-status"><span><span className="online-dot" /> ALL SYSTEMS OPERATIONAL</span><span>4 REGIONS <i /> 128-TICK <i /> 14MS AVG PING</span><a href="#servers">SERVER BROWSER <ArrowRight size={13} /></a></div></div></section>
  )
}

function RatingBadge({ rating, tier }: { rating: string; tier: string }) {
  return <span className={`rating-badge rating-${tier}`}><span className="rating-chevron">◢</span><span>{rating}</span></span>
}

function Leaderboard() {
  return (
    <section className="section-block leaderboard-section page-width" id="leaderboard">
      <SectionTitle eyebrow="GLOBAL LEADERBOARD // EU REGION" title={<>THE PREMIER <span>ELITE.</span></>} side={<div className="season-label"><Trophy size={14} /> SEASON 02 <span>·</span> UPDATED LIVE</div>} />
      <div className="leaderboard-frame"><div className="leaderboard-head"><div className="leaderboard-caption"><span className="leaderboard-icon"><Crown size={16} /></span><div><b>PREMIER RATING</b><span>TOP PLAYERS · GLOBAL</span></div></div><div className="table-columns"><span>PLAYER</span><span>WIN RATE</span><span>HEADSHOTS</span><span>CS RATING</span></div></div>
        <div className="leader-list">{players.map((player, index) => <motion.div className="leader-row" key={player.name} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .35, delay: index * .06 }}><span className={`rank-number ${index === 0 ? 'rank-first' : ''}`}>{player.rank}</span><div className="player-cell"><div className="player-avatar"><ResilientImage src={`https://images.unsplash.com/${player.avatar}?auto=format&fit=crop&w=100&q=80`} alt={`${player.name} avatar`} /><span className="player-online" /></div><div className="player-ident"><b>{player.name} <span className="flag">{player.country}</span></b><small>{player.team}</small></div></div><div className="leader-stat winrate"><span className="mobile-stat-label">WIN RATE</span><b>{player.wins}</b><small>+{player.delta}</small></div><div className="leader-stat headshot"><span className="mobile-stat-label">HEADSHOTS</span><b>{player.hs}</b></div><div className="rating-cell"><span className="mobile-stat-label">CS RATING</span><RatingBadge rating={player.rating} tier={player.tier} /></div></motion.div>)}</div>
        <div className="leaderboard-footer"><span><span className="online-dot" /> RANKINGS UPDATE EVERY MATCH</span><a href="#leaderboard">FULL LEADERBOARD <ArrowUpRight size={14} /></a></div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer"><div className="page-width"><div className="footer-main"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Crosshair size={21} /></span><span>CS2<span className="brand-slash">//</span>ARENA</span></a><p>Built for the ones who clutch.<br /><span>See you in the server.</span></p><div className="footer-social"><a href="https://discord.com" aria-label="Discord"><span>DS</span></a><a href="https://x.com" aria-label="X"><span>𝕏</span></a><a href="https://steamcommunity.com" aria-label="Steam"><span>S</span></a></div></div><div className="footer-mid"><div className="footer-system"><span><span className="online-dot" /> SYSTEM STATUS: ALL SYSTEMS NOMINAL</span><span>SERVER LOCATIONS <b>EU</b> <b>CIS</b> <b>NA</b></span></div><div className="footer-links"><a href="#loadout">ARMORY</a><a href="#servers">SERVERS</a><a href="#leaderboard">RANKINGS</a><a href="#season">SEASON PASS</a><a href="https://store.steampowered.com/app/730/CounterStrike_2/" target="_blank" rel="noreferrer">CS2 ON STEAM <ExternalLink size={11} /></a></div></div><div className="footer-bottom"><span>© 2026 CS2//ARENA. NOT AFFILIATED WITH VALVE CORPORATION.</span><span>COUNTER-STRIKE, COUNTER-STRIKE 2, AND THE COUNTER-STRIKE LOGO ARE TRADEMARKS OF VALVE CORPORATION.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
  )
}

function InspectDialog({ item, onClose }: { item: (typeof skins)[number] | null; onClose: () => void }) {
  return <AnimatePresence>{item && <motion.div className="dialog-backdrop" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><motion.section className="inspect-dialog" role="dialog" aria-modal="true" aria-labelledby="inspect-title" initial={{ opacity: 0, y: 14, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }}><div className="dialog-top"><span><Crosshair size={15} /> LIVE ITEM INSPECT</span><button onClick={onClose} aria-label="Close inspect dialog"><X size={18} /></button></div><div className="dialog-image" style={{ '--rarity-tone': item.tone } as React.CSSProperties}><ResilientImage src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=900&q=80`} alt={`${item.weapon} ${item.skin} inspect artwork`} fallbackTone={item.tone} /><span>{item.rarity} · {item.code}</span></div><div className="dialog-info"><span className="skin-weapon">{item.weapon}</span><h2 id="inspect-title">{item.skin}</h2><span className="skin-wear">{item.wear}</span><div className="dialog-specs"><span>FLOAT VALUE <b>{item.float}</b></span><span>MARKET EST. <b>{item.price}</b></span></div><p>Inspect this item in the CS2 client to view its finish, wear pattern, and applied stickers in 3D.</p><a className="button-primary dialog-action" href={`steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20${encodeURIComponent(item.code)}`}><Crosshair size={15} /> OPEN IN GAME <ArrowUpRight size={14} /></a></div></motion.section></motion.div>}</AnimatePresence>
}

export default function Cs2Arena() {
  const [inspectItem, setInspectItem] = useState<(typeof skins)[number] | null>(null)
  return <div className="arena-shell"><Navbar /><main><Hero onInspect={setInspectItem} /><Loadout onInspect={setInspectItem} /><Servers /><Leaderboard /></main><Footer /><InspectDialog item={inspectItem} onClose={() => setInspectItem(null)} /></div>
}
