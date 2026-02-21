import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   EUROPE 2026 — Family Vacation PWA
   London · Paris · July 8–17
   ═══════════════════════════════════════════════════════════ */

// ─── Trip Data ─────────────────────────────────────────────
const TRIP = {
  title: "Europe 2026",
  subtitle: "London · Paris",
  dates: "July 8 – 17, 2026",
  travelers: ["Shawn", "Susan", "Charlotte", "Gabriella"],
  lodging: [
    { city: "London", name: "Airbnb — Pimlico", address: "10A Winchester Street, SW1V 4ND", dates: "Jul 9–13", icon: "🏠" },
    { city: "Paris", name: "Airbnb — Latin Quarter", address: "3 Rue Hautefeuille, 75006", dates: "Jul 13–16", icon: "🏠" },
    { city: "London", name: "The Megaro Hotel", address: "1 Belgrove St, WC1H 8AB", dates: "Jul 16–17", icon: "🏨" },
  ],
};

const DAYS = [
  {
    day: 0, date: "2026-07-08", weekday: "Wednesday", city: "Denver → London", emoji: "✈️", theme: "travel",
    events: [
      { time: "5:35 PM", title: "UA 262 departs DEN → LHR", detail: "Seats: Shawn 43B, Susan 43A, Charlotte 44A, Gabriella 44B", type: "travel", icon: "✈️" },
      { time: "", title: "Overnight flight — try to sleep!", detail: "Arrive +1 day. Set watches to London time (GMT+1) on boarding.", type: "tip", icon: "💡" },
    ]
  },
  {
    day: 1, date: "2026-07-09", weekday: "Thursday", city: "Arrive London", emoji: "🇬🇧", theme: "london",
    events: [
      { time: "9:40 AM", title: "Arrive London Heathrow T2", detail: "Collect bags, clear UK immigration (have ETA ready on phone)", type: "travel", icon: "🛬" },
      { time: "11:00 AM", title: "National Express → Victoria Coach Stn", detail: "~45 min ride. Luggage included if pre-booked.", type: "travel", icon: "🚌", tag: "BUY AHEAD" },
      { time: "12:00 PM", title: "Walk to Pimlico Airbnb", detail: "10A Winchester St — 10-min walk from Victoria. Drop bags.", type: "lodging", icon: "🏠" },
      { time: "1:00 PM", title: "Lunch near Pimlico / Victoria", detail: "Grab a bite — nothing fancy, keep it easy.", type: "food", icon: "🍽️" },
      { time: "2:00 PM", title: "Big Ben → Parliament → Westminster Bridge", detail: "Stay outdoors to fight jet lag! Great first views of London.", type: "activity", icon: "🏛️", tag: "FREE" },
      { time: "3:30 PM", title: "St. James's Park → Buckingham Palace", detail: "Relax in the park. See the Palace facade — save Guard for Day 2.", type: "activity", icon: "👑", tag: "FREE" },
      { time: "5:00 PM", title: "South Bank walk: London Eye → Jubilee Gardens", detail: "Or rest at Airbnb if jet lag is winning. No shame in a nap.", type: "activity", icon: "🎡", tag: "FREE" },
      { time: "7:00 PM", title: "Early dinner near Pimlico", detail: "Eat early, crash early. You need sleep for tomorrow.", type: "food", icon: "🌙" },
    ]
  },
  {
    day: 2, date: "2026-07-10", weekday: "Friday", city: "Westminster & West End", emoji: "🇬🇧", theme: "london",
    events: [
      { time: "9:00 AM", title: "★ Westminster Abbey", detail: "Book 9 AM slot. Allow 1.5–2 hrs. Audio guide included.", type: "activity", icon: "⛪", tag: "BOOK AHEAD" },
      { time: "10:45 AM", title: "Walk to Buckingham Palace", detail: "Arrive 45–60 min early for good spot at railings.", type: "activity", icon: "🚶" },
      { time: "11:00 AM", title: "★ Changing of the Guard", detail: "FRIDAY = ceremony day! 45 min. Free. Arrive by 10:15.", type: "activity", icon: "💂", tag: "FREE" },
      { time: "12:00 PM", title: "Picnic in St. James's Park", detail: "Grab sandwiches from Pret or M&S Food nearby.", type: "food", icon: "🥪" },
      { time: "1:30 PM", title: "★ Churchill War Rooms", detail: "Timed entry. Allow 1.5–2 hrs. Kids enjoy the interactive table.", type: "activity", icon: "🏛️", tag: "BOOK AHEAD" },
      { time: "3:30 PM", title: "Rick Steves Westminster Walk", detail: "Download RS Audio Europe app. Walk passes Downing St, Whitehall.", type: "activity", icon: "🎧", tag: "FREE (app)" },
      { time: "4:00 PM", title: "★ National Gallery", detail: "Free entry. Van Gogh, Monet, da Vinci. 1–2 hrs.", type: "activity", icon: "🎨", tag: "FREE" },
      { time: "6:00 PM", title: "Pre-show dinner in Soho / Covent Garden", detail: "Book a restaurant near the theatre. Leicester Sq area.", type: "food", icon: "🍽️" },
      { time: "7:30 PM", title: "★ West End Show", detail: "Book 4 seats NOW! Check officiallondontheatre.com", type: "activity", icon: "🎭", tag: "BOOK AHEAD" },
    ]
  },
  {
    day: 3, date: "2026-07-11", weekday: "Saturday", city: "The City & South Bank", emoji: "🇬🇧", theme: "london",
    events: [
      { time: "9:00 AM", title: "★ Tower of London", detail: "Book 1st entry slot. 3 hrs for Crown Jewels, White Tower, etc.", type: "activity", icon: "🏰", tag: "BOOK AHEAD" },
      { time: "12:30 PM", title: "Walk across Tower Bridge", detail: "Great photo op! Optional glass floor walk above.", type: "activity", icon: "🌉", tag: "FREE" },
      { time: "1:00 PM", title: "★ Borough Market for lunch", detail: "SATURDAY = best day! Amazing street food. Try a toastie or paella.", type: "food", icon: "🥘", tag: "FREE entry" },
      { time: "2:30 PM", title: "South Bank → Shakespeare's Globe", detail: "Walk along Thames. Globe does tours or catch a matinee.", type: "activity", icon: "🎭" },
      { time: "3:00 PM", title: "Millennium Bridge → St. Paul's Cathedral", detail: "Iconic bridge walk. Climb to Whispering Gallery (257 steps).", type: "activity", icon: "⛪", tag: "BOOK AHEAD" },
      { time: "5:00 PM", title: "Tate Modern (optional)", detail: "Free entry. Great rooftop views. Or skip and rest.", type: "activity", icon: "🖼️", tag: "FREE" },
      { time: "7:00 PM", title: "Dinner in Bankside / Southwark", detail: "Lots of options near the Globe / Borough Market area.", type: "food", icon: "🍽️" },
    ]
  },
  {
    day: 4, date: "2026-07-12", weekday: "Sunday", city: "British Museum & Explore", emoji: "🇬🇧", theme: "london",
    events: [
      { time: "10:00 AM", title: "★ British Museum", detail: "Free, opens 10 AM. Rosetta Stone, mummies, Parthenon. Pick 3–4 galleries, ~2.5 hrs.", type: "activity", icon: "🏛️", tag: "FREE" },
      { time: "12:30 PM", title: "Walk to Covent Garden", detail: "Street performers, market stalls, shopping.", type: "activity", icon: "🎪", tag: "FREE" },
      { time: "1:00 PM", title: "Lunch in Covent Garden", detail: "", type: "food", icon: "🍽️" },
      { time: "2:30 PM", title: "Explore: Regent St / Harrods / Hyde Park", detail: "Pick one — flexible afternoon. Or revisit a favorite.", type: "activity", icon: "🛍️" },
      { time: "5:00 PM", title: "Return to Pimlico — pack for Paris", detail: "Pack carry-ons for Eurostar. Passports, ETA confirmations ready.", type: "tip", icon: "🧳" },
      { time: "7:00 PM", title: "Farewell London dinner near Pimlico", detail: "Last night! Try a proper pub dinner or a nice restaurant.", type: "food", icon: "🍻" },
    ]
  },
  {
    day: 5, date: "2026-07-13", weekday: "Monday", city: "London → Paris", emoji: "🚄", theme: "travel",
    events: [
      { time: "7:30 AM", title: "Check out Pimlico Airbnb", detail: "Tube: Pimlico → King's Cross St. Pancras (Victoria Line, direct).", type: "travel", icon: "🧳" },
      { time: "8:30 AM", title: "Arrive St. Pancras — Eurostar security", detail: "Arrive 60+ min early. UK exit + French entry (EES biometrics).", type: "travel", icon: "🔒" },
      { time: "9:31 AM", title: "★ Eurostar departs → Paris Gare du Nord", detail: "2h28 ride. Relax, enjoy the Channel Tunnel crossing!", type: "travel", icon: "🚄", tag: "BOOKED ✓" },
      { time: "12:59 PM", title: "Arrive Gare du Nord (Paris time)", detail: "Métro Line 4 → Saint-Michel (4 stops, ~10 min).", type: "travel", icon: "🛬" },
      { time: "1:30 PM", title: "Drop bags at Paris Airbnb", detail: "3 Rue Hautefeuille, 75006 · Latin Quarter", type: "lodging", icon: "🏠" },
      { time: "2:00 PM", title: "Lunch in the Latin Quarter", detail: "Crêperie or café on Rue de la Huchette. Welcome to Paris!", type: "food", icon: "🥐" },
      { time: "3:00 PM", title: "★ Rick Steves Historic Paris Walk", detail: "Start at Notre-Dame → Île de la Cité → Latin Quarter.", type: "activity", icon: "🎧", tag: "FREE (app)" },
      { time: "3:30 PM", title: "★ Notre-Dame Cathedral", detail: "Free. Book timed slot ahead on notredamedeparis.fr.", type: "activity", icon: "⛪", tag: "FREE (book slot)" },
      { time: "4:30 PM", title: "★ Sainte-Chapelle", detail: "Stunning stained glass. 5 min from Notre-Dame.", type: "activity", icon: "✨", tag: "BOOK AHEAD" },
      { time: "5:30 PM", title: "Continue walk through Latin Quarter", detail: "Rue Saint-Séverin, Place Saint-Michel, bookshops.", type: "activity", icon: "📚", tag: "FREE" },
      { time: "7:00 PM", title: "Dinner — Île Saint-Louis or Latin Quarter", detail: "Berthillon ice cream on Île St-Louis is legendary!", type: "food", icon: "🍦" },
      { time: "9:00 PM", title: "★ Seine River Cruise (evening)", detail: "Vedettes du Pont Neuf or Bateaux Mouches. Paris lit up!", type: "activity", icon: "🚢", tag: "BUY TICKETS" },
      { time: "", title: "💡 Firemen's Ball tonight (Jul 13) 9 PM–4 AM", detail: "Musée d'Orsay closed Mondays.", type: "tip", icon: "💡" },
    ]
  },
  {
    day: 6, date: "2026-07-14", weekday: "Tuesday · ★ BASTILLE DAY", city: "Paris — Bastille Day!", emoji: "🇫🇷", theme: "paris",
    events: [
      { time: "8:00 AM", title: "★★ Bastille Day Military Parade", detail: "Champs-Élysées. Parade 10 AM. Arrive by 8 AM! Flyovers! Métro: Charles de Gaulle-Étoile.", type: "activity", icon: "🎆", tag: "FREE" },
      { time: "11:30 AM", title: "Walk Champs-Élysées → Place de la Concorde", detail: "Post-parade stroll. Spectacular atmosphere.", type: "activity", icon: "🚶", tag: "FREE" },
      { time: "12:30 PM", title: "Lunch near Tuileries or Marais", detail: "Many restaurants open on Bastille Day. Book ahead if possible.", type: "food", icon: "🍽️" },
      { time: "2:00 PM", title: "★ Montmartre & Sacré-Cœur", detail: "Métro to Anvers or Abbesses. Hilltop views, artists, charming streets. Dome climb €7.", type: "activity", icon: "⛪", tag: "FREE" },
      { time: "4:30 PM", title: "Explore Montmartre", detail: "Place du Tertre, Amélie's café, street artists, crêpes.", type: "activity", icon: "🎨" },
      { time: "6:00 PM", title: "Return to Airbnb — rest & freshen up", detail: "Long night ahead! Nap recommended.", type: "tip", icon: "😴" },
      { time: "7:30 PM", title: "Dinner or picnic supplies for Champ de Mars", detail: "If watching fireworks from Champ de Mars, grab food to bring.", type: "food", icon: "🧺" },
      { time: "9:00 PM", title: "★★ Champ de Mars — Concert + Fireworks!", detail: "Concert ~9 PM. FIREWORKS 11 PM from Eiffel Tower! 30 min show! Arrive by 8 PM.", type: "activity", icon: "🎆", tag: "FREE" },
      { time: "", title: "💡 Louvre is FREE today but insanely crowded", detail: "Better to go tomorrow with timed entry.", type: "tip", icon: "💡" },
    ]
  },
  {
    day: 7, date: "2026-07-15", weekday: "Wednesday", city: "Louvre, Orsay & Eiffel Tower", emoji: "🇫🇷", theme: "paris",
    events: [
      { time: "9:00 AM", title: "★ Louvre Museum", detail: "9 AM timed entry. Rick Steves audio tour. Mona Lisa, Venus, Nike. ~2.5 hrs.", type: "activity", icon: "🖼️", tag: "BOOK AHEAD" },
      { time: "12:00 PM", title: "Walk through Tuileries Garden", detail: "Beautiful stroll from Louvre toward Place de la Concorde.", type: "activity", icon: "🌳", tag: "FREE" },
      { time: "12:30 PM", title: "Lunch near Tuileries / Rue de Rivoli", detail: "", type: "food", icon: "🍽️" },
      { time: "2:00 PM", title: "★ Musée d'Orsay", detail: "Impressionists! Monet, Renoir, Van Gogh. Open Wed. ~2 hrs.", type: "activity", icon: "🎨", tag: "BOOK AHEAD" },
      { time: "4:30 PM", title: "Eiffel Tower area", detail: "Walk to Champ de Mars / Trocadéro for photos and views.", type: "activity", icon: "🗼" },
      { time: "7:00 PM", title: "Last Paris dinner", detail: "Celebrate the trip! Latin Quarter or splurge somewhere special.", type: "food", icon: "🥂" },
    ]
  },
  {
    day: 8, date: "2026-07-16", weekday: "Thursday", city: "Paris → London", emoji: "🚄", theme: "travel",
    events: [
      { time: "Morning", title: "Last morning in Paris", detail: "Explore or revisit favorites. ⚠️ Eurostar at 4:02 PM — arrange early checkout or luggage storage.", type: "activity", icon: "☕" },
      { time: "4:02 PM", title: "★ Eurostar departs Gare du Nord", detail: "→ St. Pancras International. Arrives 5:35 PM (London time).", type: "travel", icon: "🚄", tag: "BOOKED ✓" },
      { time: "6:30 PM", title: "Check into The Megaro Hotel", detail: "1 Belgrove St, WC1H 8AB — right at King's Cross St. Pancras!", type: "lodging", icon: "🏨" },
      { time: "7:30 PM", title: "Farewell dinner in London", detail: "Last night of the trip! King's Cross / Granary Square area.", type: "food", icon: "🌙" },
    ]
  },
  {
    day: 9, date: "2026-07-17", weekday: "Friday", city: "London → Denver", emoji: "✈️", theme: "travel",
    events: [
      { time: "11:00 AM", title: "Tube → Paddington → Heathrow Express", detail: "Express to LHR ~15 min. Arrive airport 3 hrs before departure.", type: "travel", icon: "🚇" },
      { time: "2:50 PM", title: "UA 263 departs LHR → DEN", detail: "Arrives Denver 5:35 PM same day. Welcome home!", type: "travel", icon: "✈️" },
    ]
  },
];

const TODO_ITEMS = [
  { priority: "NOW", text: "UK ETA — all 4 travelers", detail: "gov.uk/eta or UK ETA app. £16 each. Need passport + face photo per person.", link: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta", status: "todo" },
  { priority: "NOW", text: "Eiffel Tower tickets", detail: "toureiffel.paris — Book 60 days ahead (~May 9 for Jul 13). Summit sells out fast!", link: "https://www.toureiffel.paris", status: "todo" },
  { priority: "NOW", text: "West End show — book 4 seats", detail: "Pick show + book. Check londontheatredirect.com or officiallondontheatre.com", link: "https://officiallondontheatre.com", status: "todo" },
  { priority: "NOW", text: "Churchill War Rooms tickets", detail: "iwm.org.uk — Timed entry, £33/adult. Book for Jul 10 afternoon.", link: "https://www.iwm.org.uk", status: "todo" },
  { priority: "NOW", text: "Tower of London tickets", detail: "hrp.org.uk — Book online for discount + skip line. Jul 11 AM.", link: "https://www.hrp.org.uk", status: "todo" },
  { priority: "NOW", text: "Westminster Abbey tickets", detail: "Timed entry, ~£27/adult. Book for Jul 10 morning.", link: "https://www.westminster-abbey.org", status: "todo" },
  { priority: "NOW", text: "Confirm The Megaro Hotel booked (Jul 16)", detail: "2× Standard Double, £603.50. themegaro.co.uk", link: "https://www.themegaro.co.uk", status: "todo" },
  { priority: "NOW", text: "National Express bus (LHR→Victoria)", detail: "Jul 9, ~11:00 from LHR T2. ~£30+luggage ×4.", link: "https://www.nationalexpress.com", status: "todo" },
  { priority: "2-4 WKS", text: "Louvre timed entry", detail: "louvre.fr — 9:00–9:30 AM slot best. €22/adult.", link: "https://www.louvre.fr", status: "todo" },
  { priority: "2-4 WKS", text: "Sainte-Chapelle timed entry", detail: "Book ahead to skip 60–90 min July lines.", link: "https://www.sainte-chapelle.fr", status: "todo" },
  { priority: "2-4 WKS", text: "Musée d'Orsay timed entry", detail: "Closed Mondays. Book AM slot. €16/adult.", link: "https://www.musee-orsay.fr", status: "todo" },
  { priority: "2-4 WKS", text: "St. Paul's Cathedral tickets", detail: "£18 online (£20 walk-up). Or attend a free service.", link: "https://www.stpauls.co.uk", status: "todo" },
  { priority: "2-4 WKS", text: "Heathrow Express tickets (Jul 17)", detail: "£25 advance vs £32 walk-up, ×4 people.", link: "https://www.heathrowexpress.com", status: "todo" },
  { priority: "2-4 WKS", text: "Consider Paris Museum Pass", detail: "2-day ~€62/person. Covers Louvre, Orsay, Sainte-Chapelle, Arc. Still need timed slots.", status: "todo" },
  { priority: "BEFORE", text: "Copy all 4 passports", detail: "Digital copies (phone/email) + paper copies in separate bag.", status: "todo" },
  { priority: "BEFORE", text: "Contactless pay cards for London transit", detail: "Each person needs own card or phone (Apple/Google Pay). No sharing.", status: "todo" },
  { priority: "BEFORE", text: "Verify credit cards — no foreign transaction fees", detail: "Check all cards. Consider no-FTF card (e.g. Capital One).", status: "todo" },
  { priority: "BEFORE", text: "Download Rick Steves Audio Europe app", detail: "Free self-guided walks: Westminster, Historic Paris, Louvre tour.", status: "todo" },
  { priority: "BEFORE", text: "Confirm Changing of Guard — Jul 11", detail: "Provisionally Sat Jul 11 at 11:00. Check changing-guard.com closer to trip.", link: "https://changing-guard.com", status: "todo" },
  { priority: "BEFORE", text: "Paris Airbnb checkout plan (Jul 16)", detail: "Checkout 18:00 but Eurostar departs 16:02. Arrange early checkout or luggage storage.", status: "todo" },
  { priority: "DONE", text: "Susan passport verified", detail: "Valid with 6+ months remaining beyond return date.", status: "done" },
  { priority: "DONE", text: "ETIAS — not required", detail: "Not required until Q4 2026. Not needed for July trip.", status: "done" },
  { priority: "DONE", text: "EU Entry/Exit System (EES)", detail: "Active. Biometrics at EU border. No advance action needed, allow extra time.", status: "done" },
];

// ─── Design Tokens ─────────────────────────────────────────
const P = {
  bg: "#FAF6F1", card: "#FFFFFF", text: "#2C2420", muted: "#8C7E74",
  accent: "#C45D3E", accentSoft: "#F4E8E2",
  london: "#7B5B3A", londonBg: "#FBF3EB",
  paris: "#1B3A5C", parisBg: "#EDF2F8",
  travel: "#2D6B50", travelBg: "#E8F5EE",
  border: "#E8E0D8", shadow: "0 2px 16px rgba(44,36,32,0.07)",
};

const themeMap = {
  london: { fg: P.london, bg: P.londonBg },
  paris: { fg: P.paris, bg: P.parisBg },
  travel: { fg: P.travel, bg: P.travelBg },
};

const typeColorMap = {
  travel: { bg: "#E8F5EE", fg: "#2D6B50" },
  lodging: { bg: "#FFF8E7", fg: "#9A7B2D" },
  food: { bg: "#FFF0EC", fg: "#C45D3E" },
  tip: { bg: "#FFFBE6", fg: "#A08520" },
  activity: { bg: "#EEEDF8", fg: "#5B4FA0" },
};

const priorityColors = {
  NOW: { bg: "#FDECEB", fg: "#C0392B", label: "Book Now" },
  "2-4 WKS": { bg: "#FFF6E0", fg: "#B8860B", label: "2-4 Weeks Before" },
  BEFORE: { bg: "#E8F5EE", fg: "#2D6B50", label: "Before You Leave" },
  DONE: { bg: "#F0F0F0", fg: "#888", label: "Done" },
};

const tagColors = {
  "FREE": { bg: "#E8F5EE", fg: "#2D6B50" },
  "BOOK AHEAD": { bg: "#FDECEB", fg: "#C0392B" },
  "BOOKED ✓": { bg: "#E8F5EE", fg: "#2D6B50" },
  "BUY AHEAD": { bg: "#FFF6E0", fg: "#B8860B" },
  "BUY TICKETS": { bg: "#FFF6E0", fg: "#B8860B" },
  "FREE (app)": { bg: "#E8F5EE", fg: "#2D6B50" },
  "FREE (book slot)": { bg: "#E8F5EE", fg: "#2D6B50" },
  "FREE entry": { bg: "#E8F5EE", fg: "#2D6B50" },
};

function fmtDate(s) {
  const d = new Date(s + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Countdown ─────────────────────────────────────────────
function useCountdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  const depart = new Date("2026-07-08T17:35:00-06:00"); // Denver MDT
  const diff = depart - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  return `${days} day${days !== 1 ? "s" : ""} to go!`;
}

// ─── Navigation ────────────────────────────────────────────
const TABS = [
  { id: "itinerary", label: "Itinerary", icon: "📋" },
  { id: "checklist", label: "Checklist", icon: "✅" },
  { id: "journal", label: "Journal", icon: "📸" },
];

function NavBar({ active, setActive }) {
  return (
    <nav className="nav-bar" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(250,246,241,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderTop: `1px solid ${P.border}`, display: "flex", justifyContent: "space-around",
      padding: "6px 0 8px",
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button key={tab.id} onClick={() => setActive(tab.id)} style={{
            background: isActive ? P.accentSoft : "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
            padding: "6px 22px", borderRadius: 14, transition: "all 0.2s ease",
          }}>
            <span style={{ fontSize: 20 }}>{tab.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
              color: isActive ? P.accent : P.muted,
            }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

// ─── Itinerary ─────────────────────────────────────────────
function DayCard({ d, open, toggle }) {
  const th = themeMap[d.theme] || themeMap.travel;
  return (
    <div style={{
      margin: "0 14px 10px", borderRadius: 16, background: P.card,
      boxShadow: P.shadow, overflow: "hidden", border: `1px solid ${P.border}`,
    }}>
      <button onClick={toggle} style={{
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, textAlign: "left",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 20,
          background: th.bg, flexShrink: 0,
        }}>{d.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: th.fg,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>Day {d.day} · {fmtDate(d.date)} · {d.weekday}</div>
          <div style={{
            fontSize: 16, fontWeight: 600, color: P.text,
            fontFamily: "'Playfair Display', Georgia, serif", marginTop: 1,
          }}>{d.city}</div>
          {!open && d.events.length > 0 && (
            <div style={{
              fontSize: 11, color: P.muted, marginTop: 2,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{d.events.filter(e => e.type !== "tip").slice(0, 4).map(e => e.title.replace(/★+ /g, "")).join(" · ")}</div>
          )}
        </div>
        <div style={{
          fontSize: 14, color: P.muted,
          transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease",
        }}>▾</div>
      </button>

      {open && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ borderTop: `1px solid ${P.border}`, paddingTop: 10 }}>
            {d.events.map((e, i) => {
              const tc = typeColorMap[e.type] || typeColorMap.activity;
              const tg = e.tag ? (tagColors[e.tag] || { bg: "#F0F0F0", fg: "#666" }) : null;
              return (
                <div key={i} style={{
                  display: "flex", gap: 10, padding: "9px 0",
                  borderBottom: i < d.events.length - 1 ? `1px solid ${P.border}22` : "none",
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, background: tc.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 15, flexShrink: 0, marginTop: 1,
                  }}>{e.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      {e.time && <span style={{
                        fontSize: 10, fontWeight: 700, color: tc.fg,
                        letterSpacing: "0.02em", flexShrink: 0,
                      }}>{e.time}</span>}
                      <span style={{ fontSize: 13, fontWeight: 600, color: P.text }}>{e.title}</span>
                      {tg && <span style={{
                        fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4,
                        background: tg.bg, color: tg.fg, letterSpacing: "0.03em",
                        flexShrink: 0, whiteSpace: "nowrap",
                      }}>{e.tag}</span>}
                    </div>
                    {e.detail && <div style={{
                      fontSize: 11.5, color: P.muted, marginTop: 2, lineHeight: 1.45,
                    }}>{e.detail}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ItineraryTab() {
  const [expanded, setExpanded] = useState(new Set([1]));
  const countdown = useCountdown();
  const toggle = (day) => setExpanded(prev => {
    const n = new Set(prev); n.has(day) ? n.delete(day) : n.add(day); return n;
  });

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{
        padding: "30px 20px 16px", textAlign: "center",
        background: "linear-gradient(180deg, #FDF9F5 0%, #FAF6F1 100%)",
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase",
          color: P.accent, marginBottom: 2,
        }}>{TRIP.dates}</div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 700,
          color: P.text, margin: "2px 0", lineHeight: 1.1, letterSpacing: "-0.02em",
        }}>{TRIP.title}</h1>
        <div style={{
          fontSize: 15, color: P.muted, fontWeight: 400, letterSpacing: "0.15em",
        }}>{TRIP.subtitle}</div>
        {countdown && (
          <div style={{
            marginTop: 8, fontSize: 12, fontWeight: 700, color: P.accent,
            background: P.accentSoft, display: "inline-block",
            padding: "4px 14px", borderRadius: 16,
          }}>{countdown}</div>
        )}
        <div style={{ marginTop: 10, display: "flex", justifyContent: "center", gap: 6 }}>
          {TRIP.travelers.map(t => (
            <span key={t} style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 16,
              background: P.accentSoft, color: P.accent,
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Lodging cards */}
      <div style={{ display: "flex", gap: 8, padding: "8px 14px 14px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {TRIP.lodging.map((l, i) => (
          <div key={i} style={{
            flexShrink: 0, padding: "10px 14px", borderRadius: 12,
            background: P.card, border: `1px solid ${P.border}`,
            boxShadow: "0 1px 6px rgba(0,0,0,0.03)", minWidth: 180,
          }}>
            <div style={{ fontSize: 15, marginBottom: 4 }}>{l.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: P.text }}>{l.name}</div>
            <div style={{ fontSize: 10, color: P.muted, marginTop: 2 }}>{l.dates} · {l.city}</div>
            <div style={{ fontSize: 9, color: P.muted, marginTop: 1 }}>{l.address}</div>
          </div>
        ))}
      </div>

      {DAYS.map(d => (
        <DayCard key={d.day} d={d} open={expanded.has(d.day)} toggle={() => toggle(d.day)} />
      ))}
    </div>
  );
}

// ─── Checklist ─────────────────────────────────────────────
function ChecklistTab() {
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem("europe2026-checklist") || "{}"); }
    catch { return {}; }
  });

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    localStorage.setItem("europe2026-checklist", JSON.stringify(next));
  };

  const groups = ["NOW", "2-4 WKS", "BEFORE", "DONE"];
  const completedCount = Object.values(checked).filter(Boolean).length;
  const totalActionable = TODO_ITEMS.filter(t => t.status !== "done").length;

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{
        padding: "30px 20px 14px", textAlign: "center",
        background: "linear-gradient(180deg, #FDF9F5 0%, #FAF6F1 100%)",
      }}>
        <div style={{ fontSize: 22 }}>✅</div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20,
          color: P.text, margin: "2px 0",
        }}>Pre-Trip Checklist</h2>
        <p style={{ fontSize: 11, color: P.muted, margin: "2px 0 8px" }}>
          {completedCount} of {totalActionable} action items completed
        </p>
        <div style={{
          height: 4, background: P.border, borderRadius: 2, overflow: "hidden",
          maxWidth: 200, margin: "0 auto",
        }}>
          <div style={{
            height: "100%", borderRadius: 2, background: P.accent,
            width: `${totalActionable ? (completedCount / totalActionable) * 100 : 0}%`,
            transition: "width 0.3s ease",
          }} />
        </div>
      </div>

      <div style={{ padding: "6px 14px" }}>
        {groups.map(g => {
          const items = TODO_ITEMS.map((t, i) => ({ ...t, idx: i })).filter(t => t.priority === g);
          if (!items.length) return null;
          const pc = priorityColors[g];
          return (
            <div key={g} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: pc.fg, padding: "6px 0 6px 4px", display: "flex", alignItems: "center", gap: 6,
              }}>
                <span style={{
                  display: "inline-block", width: 8, height: 8, borderRadius: 2,
                  background: pc.fg, opacity: 0.6,
                }} />
                {pc.label}
              </div>
              {items.map(item => {
                const isDone = item.status === "done" || checked[item.idx];
                return (
                  <div key={item.idx} onClick={() => item.status !== "done" && toggle(item.idx)} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: "12px 14px", margin: "0 0 6px", borderRadius: 12,
                    background: P.card, border: `1px solid ${P.border}`,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
                    cursor: item.status === "done" ? "default" : "pointer",
                    opacity: isDone ? 0.55 : 1, transition: "opacity 0.2s",
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                      border: `2px solid ${isDone ? P.accent : P.border}`,
                      background: isDone ? P.accent : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                      {isDone && <span style={{ color: "#FFF", fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 13, fontWeight: 600, color: P.text,
                        textDecoration: isDone ? "line-through" : "none",
                      }}>{item.text}</div>
                      {item.detail && <div style={{
                        fontSize: 11, color: P.muted, marginTop: 2, lineHeight: 1.4,
                      }}>{item.detail}</div>}
                      {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()} style={{
                          fontSize: 10.5, color: P.accent,
                          marginTop: 3, display: "inline-block", textDecoration: "none",
                        }}>Visit site →</a>}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Journal ───────────────────────────────────────────────
function JournalTab() {
  const [entries, setEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem("europe2026-journal") || "[]"); }
    catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [formDay, setFormDay] = useState("1");
  const [formNote, setFormNote] = useState("");

  const save = (e) => {
    setEntries(e);
    localStorage.setItem("europe2026-journal", JSON.stringify(e));
  };

  const add = () => {
    if (!formNote.trim()) return;
    const d = DAYS[parseInt(formDay)] || DAYS[0];
    save([{ id: Date.now().toString(), day: d.day, city: d.city, date: d.date, note: formNote.trim(), ts: new Date().toISOString() }, ...entries]);
    setFormNote(""); setShowForm(false);
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{
        padding: "30px 20px 14px", textAlign: "center",
        background: "linear-gradient(180deg, #FDF9F5 0%, #FAF6F1 100%)",
      }}>
        <div style={{ fontSize: 22 }}>📸</div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20,
          color: P.text, margin: "2px 0",
        }}>Travel Journal</h2>
        <p style={{ fontSize: 11, color: P.muted, margin: 0 }}>Capture memories from your trip</p>
      </div>

      <div style={{ padding: "8px 14px" }}>
        {!showForm ? (
          <button onClick={() => setShowForm(true)} style={{
            width: "100%", padding: "13px", borderRadius: 12,
            border: `2px dashed ${P.border}`, background: "transparent",
            color: P.accent, fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}>+ Add Journal Entry</button>
        ) : (
          <div style={{
            padding: 14, borderRadius: 14, background: P.card,
            border: `1px solid ${P.border}`, boxShadow: P.shadow, marginBottom: 10,
          }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: P.muted, letterSpacing: "0.06em", display: "block", marginBottom: 4 }}>DAY</label>
            <select value={formDay} onChange={e => setFormDay(e.target.value)} style={{
              width: "100%", padding: "9px 10px", borderRadius: 8, border: `1.5px solid ${P.border}`,
              fontSize: 12, color: P.text, background: P.bg, marginBottom: 10,
            }}>
              {DAYS.map((d, i) => (
                <option key={i} value={i}>Day {d.day} · {fmtDate(d.date)} · {d.city}</option>
              ))}
            </select>
            <label style={{ fontSize: 10, fontWeight: 700, color: P.muted, letterSpacing: "0.06em", display: "block", marginBottom: 4 }}>NOTES</label>
            <textarea value={formNote} onChange={e => setFormNote(e.target.value)}
              placeholder="What did you see? How was lunch? Any funny stories?"
              rows={4} style={{
                width: "100%", padding: "9px 10px", borderRadius: 8, border: `1.5px solid ${P.border}`,
                fontSize: 13, color: P.text, background: P.bg, resize: "vertical",
                boxSizing: "border-box", marginBottom: 10,
              }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={add} style={{
                flex: 1, padding: "9px", borderRadius: 8, border: "none",
                background: P.accent, color: "#FFF", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Save</button>
              <button onClick={() => setShowForm(false)} style={{
                padding: "9px 14px", borderRadius: 8, border: `1px solid ${P.border}`,
                background: "transparent", color: P.muted, fontSize: 13, cursor: "pointer",
              }}>Cancel</button>
            </div>
          </div>
        )}

        {entries.length === 0 && !showForm && (
          <div style={{ textAlign: "center", padding: "36px 20px", color: P.muted }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>✈️</div>
            <p style={{ fontSize: 13, margin: 0 }}>No entries yet — start capturing memories during the trip!</p>
          </div>
        )}

        {entries.map(entry => {
          const th = themeMap[entry.city?.includes("Paris") ? "paris" : entry.city?.includes("London") ? "london" : "travel"] || themeMap.travel;
          return (
            <div key={entry.id} style={{
              padding: 14, borderRadius: 12, background: P.card,
              border: `1px solid ${P.border}`, boxShadow: "0 1px 4px rgba(0,0,0,0.02)", marginTop: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 5,
                    background: th.bg, color: th.fg,
                  }}>DAY {entry.day}</span>
                  <span style={{ fontSize: 11, color: P.muted }}>{entry.city} · {fmtDate(entry.date)}</span>
                </div>
                <button onClick={() => save(entries.filter(e => e.id !== entry.id))} style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 15, color: P.muted, padding: "2px 4px",
                }}>×</button>
              </div>
              <p style={{ fontSize: 13, color: P.text, lineHeight: 1.5, margin: 0, whiteSpace: "pre-wrap" }}>{entry.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("itinerary");
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: P.bg, position: "relative" }}>
      {tab === "itinerary" && <ItineraryTab />}
      {tab === "checklist" && <ChecklistTab />}
      {tab === "journal" && <JournalTab />}
      <NavBar active={tab} setActive={setTab} />
    </div>
  );
}
