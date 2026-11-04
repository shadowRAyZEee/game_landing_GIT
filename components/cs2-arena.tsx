'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Crosshair,
  Gamepad2,
  Globe2,
  Menu,
  Pin,
  Play,
  Radio,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Volume2,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

type TacticalImageProps = { src: string; alt: string; className?: string }

type StatBlock = {
  damage: number
  fireRate: number
  accuracy: number
  armor: number
}

type Weapon = {
  name: string
  cost: string
  key: string
  className: 'rifle' | 'sniper' | 'pistol' | 'grenade' | 'gear'
  description: string
  stats: StatBlock
}

type BuyCategory = 'PISTOLS' | 'MID-TIER' | 'RIFLES' | 'GRENADES' | 'EQUIPMENT'

type MapGroup = 'OVERHAUL' | 'UPGRADE' | 'TOUCHSTONE'

type MapInfo = {
  name: string
  subtitle: string
  image: string
  callouts: string[]
  ctWin: number
  tWin: number
}

const images = {
  hero: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85',
  overhaul: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
  upgrade: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
  touchstone: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
}

const weapons: Record<BuyCategory, Weapon[]> = {
  PISTOLS: [
    { name: 'GLOCK-18', cost: 'FREE', key: '1', className: 'pistol', description: 'Standard issue · Terrorist', stats: { damage: 34, fireRate: 82, accuracy: 48, armor: 47 } },
    { name: 'USP-S', cost: 'FREE', key: '2', className: 'pistol', description: 'Silenced · Counter-Terrorist', stats: { damage: 35, fireRate: 41, accuracy: 68, armor: 50 } },
    { name: 'DESERT EAGLE', cost: '700', key: '3', className: 'pistol', description: 'High impact · .50 AE', stats: { damage: 53, fireRate: 19, accuracy: 74, armor: 93 } },
    { name: 'P250', cost: '300', key: '4', className: 'pistol', description: 'Compact · High utility', stats: { damage: 38, fireRate: 48, accuracy: 57, armor: 64 } },
  ],
  'MID-TIER': [
    { name: 'MP9', cost: '1,250', key: '1', className: 'rifle', description: 'Fast handling · CT side', stats: { damage: 26, fireRate: 89, accuracy: 63, armor: 60 } },
    { name: 'MAC-10', cost: '1,050', key: '2', className: 'rifle', description: 'Run and gun · T side', stats: { damage: 29, fireRate: 88, accuracy: 54, armor: 57 } },
    { name: 'XM1014', cost: '2,000', key: '3', className: 'rifle', description: 'Automatic · Close quarters', stats: { damage: 20, fireRate: 67, accuracy: 43, armor: 80 } },
    { name: 'P90', cost: '2,350', key: '4', className: 'rifle', description: 'High capacity · Mobility', stats: { damage: 26, fireRate: 83, accuracy: 66, armor: 69 } },
  ],
  RIFLES: [
    { name: 'AK-47', cost: '2,700', key: '1', className: 'rifle', description: 'Assault rifle · Terrorist', stats: { damage: 36, fireRate: 75, accuracy: 58, armor: 77 } },
    { name: 'M4A1-S', cost: '2,900', key: '2', className: 'rifle', description: 'Silenced rifle · Counter-Terrorist', stats: { damage: 38, fireRate: 68, accuracy: 76, armor: 70 } },
    { name: 'AWP', cost: '4,750', key: '3', className: 'sniper', description: 'Bolt action · One shot, one kill', stats: { damage: 100, fireRate: 17, accuracy: 96, armor: 97 } },
    { name: 'M4A4', cost: '3,000', key: '4', className: 'rifle', description: 'Full auto · Counter-Terrorist', stats: { damage: 33, fireRate: 76, accuracy: 73, armor: 70 } },
  ],
  GRENADES: [
    { name: 'HE GRENADE', cost: '300', key: '1', className: 'grenade', description: 'Explosive · Area damage', stats: { damage: 66, fireRate: 24, accuracy: 45, armor: 48 } },
    { name: 'SMOKE GRENADE', cost: '300', key: '2', className: 'grenade', description: 'Volumetric · Line of sight', stats: { damage: 0, fireRate: 30, accuracy: 50, armor: 0 } },
    { name: 'FLASHBANG', cost: '200', key: '3', className: 'grenade', description: 'Tactical · Disorient', stats: { damage: 0, fireRate: 36, accuracy: 50, armor: 0 } },
    { name: 'MOLOTOV', cost: '400', key: '4', className: 'grenade', description: 'Incendiary · Area denial', stats: { damage: 42, fireRate: 20, accuracy: 52, armor: 38 } },
  ],
  EQUIPMENT: [
    { name: 'KEVLAR VEST', cost: '650', key: '1', className: 'gear', description: 'Body armor · 100 points', stats: { damage: 0, fireRate: 0, accuracy: 0, armor: 100 } },
    { name: 'VEST + HELMET', cost: '1,000', key: '2', className: 'gear', description: 'Full armor · Head protection', stats: { damage: 0, fireRate: 0, accuracy: 0, armor: 100 } },
    { name: 'DEFUSE KIT', cost: '400', key: '3', className: 'gear', description: 'Counter-Terrorist · Faster defuse', stats: { damage: 0, fireRate: 0, accuracy: 0, armor: 0 } },
    { name: 'ZEUS X27', cost: '200', key: '4', className: 'gear', description: 'Tactical · Single-use', stats: { damage: 100, fireRate: 9, accuracy: 62, armor: 0 } },
  ],
}

const mapGroups: Record<MapGroup, MapInfo[]> = {
  OVERHAUL: [
    { name: 'ITALY', subtitle: 'REBUILT FROM THE GROUND UP', image: images.overhaul, callouts: ['MARKET', 'MID', 'ARCHES'], ctWin: 53, tWin: 47 },
    { name: 'OVERPASS', subtitle: 'A NEW PATH THROUGH THE CITY', image: images.overhaul, callouts: ['A SITE', 'CONNECTOR', 'B SHORT'], ctWin: 51, tWin: 49 },
    { name: 'INFERNO', subtitle: 'THE CLASSIC, REIMAGINED', image: images.overhaul, callouts: ['BANANA', 'MID', 'BOMBSITE A'], ctWin: 49, tWin: 51 },
  ],
  UPGRADE: [
    { name: 'NUKE', subtitle: 'SOURCE 2 PHYSICALLY BASED RENDERING', image: images.upgrade, callouts: ['OUTSIDE', 'RAMP', 'BOMBSITE B'], ctWin: 54, tWin: 46 },
    { name: 'ANCIENT', subtitle: 'A WORLD OF LIGHT AND MATERIAL', image: images.upgrade, callouts: ['TEMPLE', 'MID', 'BOMBSITE A'], ctWin: 51, tWin: 49 },
    { name: 'ANUBIS', subtitle: 'BUILT FOR THE NEXT ROUND', image: images.upgrade, callouts: ['CANAL', 'MID DOORS', 'BOMBSITE B'], ctWin: 48, tWin: 52 },
  ],
  TOUCHSTONE: [
    { name: 'MIRAGE', subtitle: 'THE COMPETITIVE FOUNDATION', image: images.touchstone, callouts: ['PALACE', 'MID', 'BOMBSITE A'], ctWin: 52, tWin: 48 },
    { name: 'DUST II', subtitle: 'EVERY ROUND HAS A STORY', image: images.touchstone, callouts: ['LONG A', 'MID DOORS', 'BOMBSITE B'], ctWin: 50, tWin: 50 },
    { name: 'VERTIGO', subtitle: 'HIGH STAKES. HIGHER GROUND.', image: images.touchstone, callouts: ['SCAFFOLD', 'MID', 'BOMBSITE A'], ctWin: 48, tWin: 52 },
  ],
}

const vetoMaps = ['MIRAGE', 'DUST II', 'INFERNO', 'NUKE', 'ANCIENT', 'ANUBIS', 'OVERPASS']
const ratingTiers = [
  { score: '4,500', label: 'GREY', color: 'silver' },
  { score: '12,000', label: 'LIGHT BLUE', color: 'cyan' },
  { score: '18,500', label: 'PURPLE', color: 'purple' },
  { score: '24,000', label: 'PINK', color: 'pink' },
  { score: '28,500', label: 'RED', color: 'red' },
  { score: '32,000+', label: 'GOLD', color: 'gold' },
]

function TacticalImage({ src, alt, className = '' }: TacticalImageProps) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`tactical-image-fallback ${className}`} role="img" aria-label={alt}><Crosshair size={32} /><span>MAP FEED // SOURCE 2</span></div>
  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} loading="lazy" />
}

function GameLogo({ small = false }: { small?: boolean }) {
  return <a className={`game-logo ${small ? 'game-logo-small' : ''}`} href="#top" aria-label="Counter-Strike 2 home"><span className="cs-mark"><Crosshair size={small ? 22 : 27} strokeWidth={1.8} /></span><span className="cs-logo-type"><b>COUNTER-STRIKE</b><strong>2</strong></span></a>
}

function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const items = [
    ['PLAY', '#top'],
    ['LOADOUT', '#buy-menu'],
    ['SOURCE 2', '#source-2'],
    ['MAPS', '#maps'],
    ['PREMIER', '#premier'],
  ]
  return <header className="game-topbar"><div className="topbar-inner"><GameLogo /><nav className="menu-tabs" aria-label="Main menu">{items.map(([label, href], index) => <a className={index === 0 ? 'menu-tab menu-tab-active' : 'menu-tab'} href={href} key={label}>{label}</a>)}</nav><div className="rank-summary"><span className="rank-emblem"><Trophy size={16} /></span><span className="rank-copy"><b>LEVEL 40 <i>·</i> GLOBAL GENERAL</b><span className="xp-track"><i /></span><small>1,240 / 2,000 XP</small></span></div><a className="play-free" href="https://store.steampowered.com/app/730/CounterStrike_2/" target="_blank" rel="noreferrer"><span>PLAY CS2 FREE</span><ArrowUpRight size={14} /></a><button className="mobile-nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div><AnimatePresence>{menuOpen && <motion.nav className="mobile-game-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{items.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={14} /></a>)}</motion.nav>}</AnimatePresence></header>
}

function MiniRadar() {
  return <div className="mini-radar" aria-label="Tactical minimap with A and B bombsites"><div className="radar-grid" /><div className="radar-ring radar-ring-one" /><div className="radar-ring radar-ring-two" /><div className="radar-route route-one" /><div className="radar-route route-two" /><span className="radar-bomb bomb-a">A</span><span className="radar-bomb bomb-b">B</span><i className="radar-dot ct-dot dot-a" /><i className="radar-dot ct-dot dot-b" /><i className="radar-dot ct-dot dot-c" /><i className="radar-dot t-dot dot-d" /><i className="radar-dot t-dot dot-e" /><i className="radar-dot t-dot dot-f" /><span className="radar-caption">DE_MIRAGE <b>·</b> 01:15</span></div>
}

function RoundScoreboard() {
  return <div className="round-scoreboard"><div className="score-side ct-side"><div className="mini-players">{[0, 1, 2, 3, 4].map((n) => <i key={n} className={n === 4 ? 'mini-player dead' : ''} />)}</div><span className="team-label">CT</span><b>12</b></div><div className="score-timer"><span>ROUND 24 / 30</span><strong>1:15</strong><small>BOMB NOT PLANTED</small></div><div className="score-side t-side"><b>11</b><span className="team-label">T</span><div className="mini-players">{[0, 1, 2, 3, 4].map((n) => <i key={n} className={n === 3 || n === 4 ? 'mini-player dead' : ''} />)}</div></div></div>
}

function KillFeed() {
  return <div className="killfeed" aria-label="Recent eliminations"><div className="killfeed-label"><Radio size={11} /> ROUND FEED</div><div className="kill-row"><span className="kill-player ct-text">PLAYER1</span><span className="kill-weapon">AK-47 <Crosshair size={11} /></span><span className="kill-player">PLAYER2</span><span className="headshot-mark">HS</span></div><div className="kill-row"><span className="kill-player ct-text">PLAYER3</span><span className="assist-mark">SMOKE ASSIST</span><span className="kill-weapon">AWP <Crosshair size={11} /></span><span className="kill-player">PLAYER4</span></div><div className="kill-row"><span className="kill-player">PLAYER5</span><span className="kill-weapon">M4A1-S <Crosshair size={11} /></span><span className="kill-player ct-text">PLAYER6</span></div></div>
}

function HeroHUD() {
  const reduceMotion = useReducedMotion()
  return <section className="hero-hud" id="top"><TacticalImage src={images.hero} alt="Atmospheric tactical urban map environment" className="hero-backdrop" /><div className="hero-fog" /><div className="hero-slashes" aria-hidden="true"><i /><i /><i /></div><div className="hud-top"><MiniRadar /><RoundScoreboard /><KillFeed /></div><motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}><div className="orange-tag"><span className="tag-dot" />POWERED BY SOURCE 2 <i>//</i> NEXT ERA OF COUNTER-STRIKE</div><h1>THE LARGEST<br /><em>TECHNICAL LEAP</em><br />IN COUNTER-STRIKE<br />HISTORY<span className="title-period">.</span></h1><p>Responsive volumetric smoke grenades, sub-tick server architecture, overhauled maps, and redesigned visual effects.</p><div className="hero-actions"><a className="action-green" href="https://store.steampowered.com/app/730/CounterStrike_2/" target="_blank" rel="noreferrer"><span><Play size={16} fill="currentColor" />PLAY FOR FREE ON STEAM</span><ArrowUpRight size={15} /></a><a className="action-glass" href="https://www.youtube.com/@CounterStrike" target="_blank" rel="noreferrer"><Volume2 size={16} />WATCH GAMEPLAY TRAILER</a></div><div className="hero-caption"><span><Sparkles size={13} /> FREE TO PLAY. FOREVER.</span><span className="caption-divider" /><span>EST. 1999 <i>·</i> REBUILT 2023</span></div></motion.div><div className="bottom-hud"><div className="player-status"><div className="hud-health"><span className="hud-health-icon">+</span><b>100</b><small>HP</small><span className="hud-meter"><i /></span></div><div className="hud-armor"><Shield size={17} /><b>100</b><small>ARMOR</small><span className="hud-meter"><i /></span></div><span className="hud-divider" /><div className="hud-money"><span>ROUND MONEY</span><b>4750</b></div></div><div className="objective-hud"><span className="objective-icon"><Target size={14} /></span><span><b>OBJECTIVE</b><small>ELIMINATE THE ENEMY TEAM</small></span><span className="objective-key">TAB</span></div><a href="#source-2" className="scroll-hint">DISCOVER SOURCE 2 <ArrowDown size={13} /></a></div><div className="hero-vignette" /></section>
}

function SmokeFeature() {
  const [smokeActive, setSmokeActive] = useState(true)
  return <article className={`feature-card smoke-card ${smokeActive ? 'smoke-active' : ''}`}><div className="feature-card-head"><span className="feature-index">01 <i>/ 03</i></span><span className="feature-label"><span /> LIVE SIMULATION</span></div><div className="smoke-visual"><div className="smoke-map-grid" /><div className="smoke-ground-lines" /><div className="smoke-cloud cloud-a" /><div className="smoke-cloud cloud-b" /><div className="smoke-cloud cloud-c" /><div className="smoke-light" /><div className="smoke-trajectory"><i /><i /><i /><i /></div><span className="smoke-callout">A SITE <b>·</b> MID</span><span className="smoke-test-label">HE IMPACT <Zap size={11} /></span></div><div className="feature-text"><span className="feature-kicker">GAME-CHANGING MECHANIC</span><h3>DYNAMIC<br /><em>VOLUMETRIC SMOKES</em></h3><p>Smoke fills spaces naturally, reacting to lighting, gunfire, and explosions. A well-placed HE can open a sightline in an instant.</p><div className="smoke-toggle-row"><span><b>{smokeActive ? 'SMOKE DEPLOYED' : 'SMOKE CLEARED'}</b><small>TEST SMOKE VS HE GRENADE</small></span><button className={`sim-toggle ${smokeActive ? 'toggle-on' : ''}`} onClick={() => setSmokeActive(!smokeActive)} role="switch" aria-checked={!smokeActive} aria-label="Toggle smoke clearing test"><i /></button></div></div></article>
}

function SubTickFeature() {
  return <article className="feature-card subtick-card"><div className="feature-card-head"><span className="feature-index">02 <i>/ 03</i></span><span className="feature-label">SERVER ARCHITECTURE</span></div><div className="tick-visual"><div className="timeline-row"><span className="timeline-label">64 TICK</span><div className="timeline-track"><i /><i /><i /><i /><b className="event-marker old-marker">SHOT</b></div></div><div className="timeline-row"><span className="timeline-label">128 TICK</span><div className="timeline-track dense-track"><i /><i /><i /><i /><i /><i /><i /><i /><b className="event-marker old-marker">SHOT</b></div></div><div className="timeline-row subtick-row"><span className="timeline-label">SUB-TICK</span><div className="timeline-track sub-track"><i /><i /><i /><i /><i /><b className="event-marker sub-marker">INPUT REGISTERED</b></div></div><div className="timeline-legend"><span><i className="legend-tick" /> SERVER TICK</span><span><i className="legend-event" /> PLAYER INPUT</span></div></div><div className="feature-text"><span className="feature-kicker">WHAT YOU SEE IS WHAT YOU GET</span><h3>EVERY<br /><em>MICROSECOND.</em></h3><p>Sub-tick updates capture the precise instant you move and shoot. Timing feels immediate, because it is.</p><div className="feature-readout"><span>INPUT LATENCY</span><b>CONTINUOUS <i>↗</i></b></div></div></article>
}

function LightingFeature() {
  const [source2, setSource2] = useState(true)
  return <article className="feature-card lighting-card"><div className="feature-card-head"><span className="feature-index">03 <i>/ 03</i></span><span className="feature-label">SOURCE 2 RENDERING</span></div><div className={`lighting-visual ${source2 ? 'lighting-source2' : 'lighting-classic'}`}><TacticalImage src={images.upgrade} alt="Architectural map lighting comparison" /><div className="lighting-wash" /><div className="lighting-split-line" /><span className="lighting-tag old-tag">CS:GO</span><span className="lighting-tag new-tag">CS2</span><span className="light-callout">PBR <b>·</b> HDR <b>·</b> GLOBAL ILLUMINATION</span></div><div className="feature-text"><span className="feature-kicker">A NEW STANDARD FOR VISUAL FIDELITY</span><h3>LIGHT IT<br /><em>DIFFERENT.</em></h3><p>Physically based rendering brings realistic materials, sharper light, and recognizable maps into a new era.</p><div className="lighting-controls"><span>COMPARE LIGHTING</span><div className="lighting-segment" role="group" aria-label="Compare CS:GO and CS2 lighting"><button className={!source2 ? 'selected' : ''} onClick={() => setSource2(false)}>CS:GO</button><button className={source2 ? 'selected' : ''} onClick={() => setSource2(true)}>CS2</button></div></div></div></article>
}

function Source2Features() {
  return <section className="content-section source-section" id="source-2"><div className="section-container"><div className="section-eyebrow"><span className="orange-rule" />THE NEXT ROUND STARTS HERE <span className="section-eyebrow-index">01 — 03</span></div><div className="section-heading-row"><h2>BUILT FOR THE<br /><em>NEXT ERA.</em></h2><p>More than an upgrade. A new foundation for every clutch, every retake, every round that matters.</p></div><div className="feature-grid"><SmokeFeature /><SubTickFeature /><LightingFeature /></div></div></section>
}

function WeaponSilhouette({ type }: { type: Weapon['className'] }) {
  return <svg className={`weapon-silhouette silhouette-${type}`} viewBox="0 0 220 90" aria-hidden="true"><g fill="currentColor"><path d="M13 39h19l12-8h40l10 7h46l9 5h24l10 7h27v9h-30l-6 13h-13l-4-13h-31l-13-7H93l-17 6H59l-12-8H13z" /><path d="M75 57h18l-5 21H76zM35 37l8-11h35l8 5H48zM148 42h20v-7h-20zM181 46h19v-4h-19z" opacity=".82" /><path d="M105 56h12v7h-12z" fill="#111921" /></g></svg>
}

function WeaponStats({ weapon }: { weapon: Weapon }) {
  const stats = [
    ['DAMAGE', weapon.stats.damage],
    ['FIRE RATE', weapon.stats.fireRate],
    ['ACCURACY', weapon.stats.accuracy],
    ['ARMOR PEN.', weapon.stats.armor],
  ]
  return <div className="weapon-stats"><div className="selected-weapon-kicker">SELECTED ARSENAL</div><div className="selected-weapon-art"><WeaponSilhouette type={weapon.className} /><span>CS2 / {weapon.className.toUpperCase()}</span></div><div className="selected-weapon-name"><span>{weapon.description}</span><h3>{weapon.name}</h3><small>ROUND CREDITS <b>{weapon.cost}</b></small></div><div className="stat-bars">{stats.map(([label, value]) => <div className="stat-line" key={label}><div><span>{label}</span><b>{value}%</b></div><i><em style={{ width: `${value}%` }} /></i></div>)}</div><div className="arsenal-note"><Crosshair size={13} /> STATS SHOWN FOR GAMEPLAY REFERENCE</div></div>
}

function BuyMenu() {
  const [category, setCategory] = useState<BuyCategory>('RIFLES')
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>(weapons.RIFLES[0])
  const categories = Object.keys(weapons) as BuyCategory[]
  function selectCategory(nextCategory: BuyCategory) {
    setCategory(nextCategory)
    setSelectedWeapon(weapons[nextCategory][0])
  }
  return <section className="content-section buy-section" id="buy-menu"><div className="section-container"><div className="section-eyebrow"><span className="orange-rule" />B // BUY MENU <span className="section-eyebrow-index">02 — 03</span></div><div className="section-heading-row"><h2>CHOOSE YOUR<br /><em>ADVANTAGE.</em></h2><p>Every round starts with a decision. Explore the arsenal, compare capabilities, and build your buy.</p></div><div className="buy-menu-shell"><div className="buy-menu-top"><span className="buy-menu-title"><Gamepad2 size={16} /> EQUIPMENT SELECTION <i>//</i> ROUND 24</span><span className="buy-balance"><span>ROUND MONEY</span><b>4,750</b></span></div><div className="buy-menu-body"><div className="buy-categories" role="tablist" aria-label="Weapon categories">{categories.map((item, index) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'buy-category active' : 'buy-category'} onClick={() => selectCategory(item)}><span>{String(index + 1).padStart(2, '0')}</span>{item}<ArrowRight size={12} /></button>)}</div><div className="buy-grid" role="tabpanel" aria-label={`${category} selection`}>{weapons[category].map((weapon) => <button key={weapon.name} className={selectedWeapon.name === weapon.name ? 'weapon-slot weapon-selected' : 'weapon-slot'} onClick={() => setSelectedWeapon(weapon)} aria-pressed={selectedWeapon.name === weapon.name}><span className="weapon-key">{weapon.key}</span><WeaponSilhouette type={weapon.className} /><span className="weapon-name">{weapon.name}</span><span className="weapon-cost">{weapon.cost === 'FREE' ? 'FREE' : `${weapon.cost} CR`}</span></button>)}</div><WeaponStats weapon={selectedWeapon} /></div><div className="buy-menu-bottom"><span><span className="buy-status-dot" /> BUY PHASE <i>·</i> 00:18</span><span>SELECT AN ITEM TO VIEW COMBAT DATA</span><span>MAX CREDITS <b>16,000</b></span></div></div><div className="buy-note"><span><Shield size={14} /> ROUND CREDITS ARE EARNED IN MATCH</span><span>ARSENAL // COUNTER-STRIKE 2</span></div></div></section>
}

function MapShowcase() {
  const [group, setGroup] = useState<MapGroup>('OVERHAUL')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [map, setMap] = useState<MapInfo>(mapGroups.OVERHAUL[0])
  const [showCallouts, setShowCallouts] = useState(true)
  function changeGroup(next: MapGroup) {
    setGroup(next)
    setSelectedIndex(0)
    setMap(mapGroups[next][0])
  }
  function selectMap(index: number) {
    setSelectedIndex(index)
    setMap(mapGroups[group][index])
  }
  return <section className="content-section maps-section" id="maps"><div className="section-container"><div className="section-eyebrow"><span className="orange-rule" />MAP POOL // ACTIVE DUTY <span className="section-eyebrow-index">03 — 03</span></div><div className="section-heading-row"><h2>MADE FOR THE<br /><em>MAP CONTROL.</em></h2><p>Familiar lanes. Rebuilt surfaces. Every angle now rendered with the clarity and depth of Source 2.</p></div><div className="map-tabs" role="tablist" aria-label="Map categories">{(['OVERHAUL', 'UPGRADE', 'TOUCHSTONE'] as MapGroup[]).map((item) => <button key={item} role="tab" aria-selected={group === item} className={group === item ? 'map-tab map-tab-active' : 'map-tab'} onClick={() => changeGroup(item)}><span>{item}</span><small>{item === 'OVERHAUL' ? 'BUILT FROM THE GROUND UP' : item === 'UPGRADE' ? 'SOURCE 2 PBR' : 'CLASSIC COMPETITIVE'}</small></button>)}</div><div className="map-showcase"><div className="map-photo"><TacticalImage src={map.image} alt={`${map.name} map environment`} /><div className="map-photo-wash" /><div className="map-photo-top"><span><Globe2 size={13} /> ACTIVE DUTY MAP POOL</span><span>DE_{map.name.replaceAll(' ', '')}</span></div><AnimatePresence mode="wait"><motion.div className="map-photo-title" key={map.name} initial={{ opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .2 }}><span>{map.subtitle}</span><h3>{map.name}</h3></motion.div></AnimatePresence>{showCallouts && <div className="map-callouts">{map.callouts.map((callout, index) => <span key={callout} className={`callout-pin callout-${index}`}><Pin size={11} fill="currentColor" />{callout}</span>)}</div>}<button className="callouts-toggle" onClick={() => setShowCallouts(!showCallouts)} aria-pressed={showCallouts}>{showCallouts ? 'HIDE' : 'SHOW'} CALLOUTS</button></div><div className="map-data"><div className="map-choice-list">{mapGroups[group].map((item, index) => <button key={item.name} className={map.name === item.name ? 'map-choice active' : 'map-choice'} onClick={() => selectMap(index)}><span className="map-choice-number">0{index + 1}</span><span><b>{item.name}</b><small>{item.subtitle}</small></span><ArrowRight size={14} /></button>)}</div><div className="map-telemetry"><div className="telemetry-heading"><span>ROUND WIN DISTRIBUTION</span><span>LAST 30 DAYS</span></div><div className="telemetry-row"><span className="ct-telemetry">CT</span><div className="telemetry-bar"><i style={{ width: `${map.ctWin}%` }} /></div><b>{map.ctWin}%</b></div><div className="telemetry-row"><span className="t-telemetry">T</span><div className="telemetry-bar"><i style={{ width: `${map.tWin}%` }} /></div><b>{map.tWin}%</b></div><div className="telemetry-foot"><span>MAP CONTROL MATTERS</span><span>COMPETITIVE DATA</span></div></div><div className="map-data-stamp"><Crosshair size={14} /><span><b>TACTICAL OVERLAY</b><small>CALL OUTS ENABLED</small></span><span className="map-stamp-status">LIVE</span></div></div></div><div className="map-footerline"><span><span className="online-pulse" /> MAP ROTATION ACTIVE</span><span>9 MAPS <i /> 3 CATEGORIES <i /> ALL ACTIVE DUTY</span></div></div></section>
}

function Premier() {
  const [mode, setMode] = useState<'BAN' | 'PICK'>('BAN')
  const [mapStates, setMapStates] = useState<Record<string, 'BANNED' | 'PICKED'>>({})
  function handleMap(name: string) {
    const nextState = mode === 'BAN' ? 'BANNED' : 'PICKED'
    setMapStates((current) => {
      const next = { ...current }
      if (next[name] === nextState) delete next[name]
      else next[name] = nextState
      return next
    })
  }
  return <section className="content-section premier-section" id="premier"><div className="section-container"><div className="section-eyebrow"><span className="orange-rule" />CS RATING // PREMIER <span className="section-eyebrow-index">RANKED PLAY</span></div><div className="section-heading-row"><h2>YOUR RATING.<br /><em>YOUR LEGACY.</em></h2><p>Pick and ban the active duty map pool, queue with your team, and climb your way to the top of Premier.</p></div><div className="premier-layout"><div className="veto-panel"><div className="veto-head"><span><Trophy size={15} /> ACTIVE DUTY VETO</span><span>BEST OF 1 <i>·</i> 7 MAPS</span></div><div className="veto-teams"><span className="veto-team ct-veto"><i /> COUNTER-TERRORISTS <b>0</b></span><span className="veto-phase">MAP SELECTION <i>01:24</i></span><span className="veto-team t-veto"><b>0</b> TERRORISTS <i /></span></div><div className="veto-controls"><span>SELECT ACTION</span><div className="veto-toggle" role="group" aria-label="Veto action"><button className={mode === 'BAN' ? 'selected' : ''} onClick={() => setMode('BAN')}>BAN MAP</button><button className={mode === 'PICK' ? 'selected' : ''} onClick={() => setMode('PICK')}>PICK MAP</button></div><span className="veto-instruction">CHOOSE A MAP TO {mode}</span></div><div className="veto-map-list">{vetoMaps.map((name, index) => <button key={name} className={`veto-map ${mapStates[name] ? `veto-${mapStates[name].toLowerCase()}` : ''}`} onClick={() => handleMap(name)} aria-pressed={Boolean(mapStates[name])}><span className="veto-map-number">0{index + 1}</span><span className="veto-map-name">{name}</span><span className="veto-state">{mapStates[name] ? (mapStates[name] === 'BANNED' ? <X size={13} /> : <Check size={13} />) : <ArrowUpRight size={12} />}</span>{mapStates[name] && <small>{mapStates[name]}</small>}</button>)}</div><div className="veto-foot"><span><span className="buy-status-dot" /> VETO IN PROGRESS</span><span>MAP PICK ORDER <b>CT → T → CT</b></span></div></div><div className="rating-panel"><div className="rating-panel-heading"><span><Trophy size={15} /> PREMIER RATING TIERS</span><small>SEASON 02</small></div><div className="rating-stack">{ratingTiers.map((tier, index) => <motion.div className={`rating-tier tier-${tier.color}`} key={tier.score} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .28, delay: index * .05 }}><span className="tier-glow" /><span className="tier-emblem"><Crosshair size={15} /></span><b>{tier.score}</b><span className="tier-label">{tier.label}</span><span className="tier-rank">{String(index + 1).padStart(2, '0')}</span></motion.div>)}</div><div className="rating-explainer"><span><Zap size={13} /> WIN MATCHES. GAIN RATING.</span><p>Every Premier match updates your CS Rating. Find your rank on the global leaderboard and keep moving up.</p></div></div></div></div></section>
}

function Footer() {
  return <footer className="game-footer"><div className="section-container"><div className="footer-main"><div className="footer-brand-block"><GameLogo small /><p>THE NEXT ERA OF COUNTER-STRIKE.<br /><span>BUILT ON SOURCE 2.</span></p></div><div className="footer-badges"><a href="https://www.counter-strike.net/cs2" target="_blank" rel="noreferrer"><Crosshair size={17} /><span>COUNTER-STRIKE 2</span></a><a href="https://www.valvesoftware.com/en/" target="_blank" rel="noreferrer"><Sparkles size={17} /><span>SOURCE 2</span></a><a href="https://store.steampowered.com/app/730/CounterStrike_2/" target="_blank" rel="noreferrer"><Gamepad2 size={17} /><span>STEAM</span></a></div><div className="system-requirements"><div className="requirements-heading"><span>PC SYSTEM REQUIREMENTS</span><span>MINIMUM</span></div><div><span>OS</span><b>Windows® 10</b></div><div><span>PROCESSOR</span><b>4 hardware CPU threads</b></div><div><span>MEMORY</span><b>8 GB RAM</b></div><div><span>GRAPHICS</span><b>1 GB DirectX 11 compatible</b></div><div><span>STORAGE</span><b>85 GB available space</b></div></div></div><div className="footer-links"><div className="footer-legal"><span>© 2026 VALVE CORPORATION. ALL RIGHTS RESERVED.</span><span>COUNTER-STRIKE, COUNTER-STRIKE 2, AND THE COUNTER-STRIKE LOGO ARE TRADEMARKS OF VALVE CORPORATION.</span></div><nav aria-label="Footer links"><a href="https://www.counter-strike.net/cs2" target="_blank" rel="noreferrer">COUNTER-STRIKE.NET <ArrowUpRight size={11} /></a><a href="https://store.steampowered.com/" target="_blank" rel="noreferrer">STEAM <ArrowUpRight size={11} /></a><a href="https://www.valvesoftware.com/" target="_blank" rel="noreferrer">VALVE <ArrowUpRight size={11} /></a></nav></div><div className="fan-disclaimer">UNOFFICIAL FAN-MADE SHOWCASE. NOT AFFILIATED WITH OR ENDORSED BY VALVE CORPORATION.</div></div></footer>
}

export default function Cs2Arena() {
  return <div className="cs2-site"><TopBar /><main><HeroHUD /><Source2Features /><BuyMenu /><MapShowcase /><Premier /></main><Footer /></div>
}
