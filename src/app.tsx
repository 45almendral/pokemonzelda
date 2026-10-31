import { Page, Section, Text, Metrics, Callout, Columns, Table, Bars, useGrokTheme, useState } from "./shim";

type Ev = { date: string; name: string; kind: string; place: string; rec: string; deck: string; tag?: string };

const EVENTS: Ev[] = [
  { date: "May 2022", name: "Secaucus Regional", kind: "Regional", place: "33rd", rec: "1-4-0", deck: "Arceus Crobat", tag: "First Regional" },
  { date: "Jun 2022", name: "Milwaukee Regional", kind: "Regional", place: "46th", rec: "0-3-3", deck: "Origin Palkia Suicune" },
  { date: "Jun 2022", name: "North America IC", kind: "IC", place: "69th", rec: "1-3-3", deck: "Arceus Pikachu Gengar Crobat", tag: "First IC" },
  { date: "Sep 2022", name: "Baltimore Regional", kind: "Regional", place: "22nd", rec: "3-3-0", deck: "Arceus Pikachu Decidueye" },
  { date: "Oct 2022", name: "Peoria Regional", kind: "Regional", place: "32nd", rec: "2-4-0", deck: "Darkrai Weezing" },
  { date: "Dec 2022", name: "Toronto Regional", kind: "Regional", place: "48th", rec: "2-3-2", deck: "Lugia Archeops" },
  { date: "Dec 2022", name: "Arlington Regional", kind: "Regional", place: "27th", rec: "4-3-0", deck: "Lugia Archeops" },
  { date: "Jan 2023", name: "San Diego Regional", kind: "Regional", place: "33rd", rec: "2-3-1", deck: "Lugia Archeops" },
  { date: "Feb 2023", name: "Orlando Regional", kind: "Regional", place: "51st", rec: "3-4-0", deck: "Lugia Archeops" },
  { date: "Feb 2023", name: "Knoxville Regional", kind: "Regional", place: "17th", rec: "4-2-1", deck: "Lugia Archeops" },
  { date: "Mar 2023", name: "Vancouver Regional", kind: "Regional", place: "39th", rec: "1-3-2", deck: "Lugia Archeops" },
  { date: "Mar 2023", name: "Charlotte Regional", kind: "Regional", place: "33rd", rec: "4-3-0", deck: "Lugia Archeops" },
  { date: "Apr 2023", name: "Fort Wayne Regional", kind: "Regional", place: "22nd", rec: "4-2-1", deck: "Lugia Archeops" },
  { date: "Apr 2023", name: "Europe IC, London", kind: "IC", place: "50th", rec: "4-3-1", deck: "Arceus Goodra Duraludon" },
  { date: "May 2023", name: "Portland Regional", kind: "Regional", place: "17th", rec: "4-1-2", deck: "Lugia Archeops" },
  { date: "May 2023", name: "Hartford Regional", kind: "Regional", place: "14th", rec: "5-2-0", deck: "Lugia Archeops" },
  { date: "Jun 2023", name: "Milwaukee Regional", kind: "Regional", place: "42nd", rec: "3-2-2", deck: "Lugia Archeops" },
  { date: "Jul 2023", name: "North America IC", kind: "IC", place: "76th", rec: "3-2-3", deck: "Gardevoir" },
  { date: "Aug 2023", name: "World Championships, Yokohama", kind: "Worlds", place: "102nd", rec: "2-4-1", deck: "Arceus Giratina", tag: "Worlds #1" },
  { date: "Dec 2023", name: "San Antonio Regional", kind: "Regional", place: "19th", rec: "5-2-0", deck: "Roaring Moon ex" },
  { date: "Jan 2024", name: "Portland Regional", kind: "Regional", place: "12th", rec: "5-2-0", deck: "Roaring Moon ex" },
  { date: "Feb 2024", name: "Knoxville Regional", kind: "Regional", place: "58th", rec: "3-3-1", deck: "Roaring Moon ex" },
  { date: "Mar 2024", name: "Vancouver Regional", kind: "Regional", place: "10th", rec: "5-1-1", deck: "Roaring Moon ex" },
  { date: "Apr 2024", name: "Europe IC, London", kind: "IC", place: "15th", rec: "6-2-0", deck: "Arceus Vulpix Goodra", tag: "Best IC finish" },
  { date: "Apr 2024", name: "Orlando Regional", kind: "Regional", place: "24th", rec: "5-2-1", deck: "Ancient Box" },
  { date: "May 2024", name: "Indianapolis Regional", kind: "Regional", place: "48th", rec: "5-3-0", deck: "Charizard Pidgeot" },
  { date: "Jun 2024", name: "Bologna Special Event", kind: "SPE", place: "54th", rec: "4-4-0", deck: "Roaring Moon ex" },
  { date: "Jun 2024", name: "North America IC", kind: "IC", place: "109th", rec: "3-3-2", deck: "Lugia Archeops" },
  { date: "Aug 2024", name: "World Championships, Honolulu", kind: "Worlds", place: "125th", rec: "4-2-2", deck: "Regidrago VSTAR", tag: "Worlds #2" },
  { date: "Sep 2024", name: "Baltimore Regional", kind: "Regional", place: "49th", rec: "4-3-0", deck: "Arceus Vulpix Noivern" },
  { date: "Oct 2024", name: "Louisville Regional", kind: "Regional", place: "2nd", rec: "9-3-0", deck: "Banette ex Dusknoir", tag: "Finalist" },
  { date: "Nov 2024", name: "Buenos Aires Special Event", kind: "SPE", place: "11th", rec: "3-3-0", deck: "Banette ex Dusknoir" },
  { date: "Nov 2024", name: "Latin America IC, Sao Paulo", kind: "IC", place: "60th", rec: "3-3-0", deck: "Banette ex Dusknoir" },
  { date: "Nov 2024", name: "Sacramento Regional", kind: "Regional", place: "9th", rec: "7-3-0", deck: "Banette ex Dusknoir" },
  { date: "Dec 2024", name: "Toronto Regional", kind: "Regional", place: "5th", rec: "8-1-2", deck: "Banette ex Dusknoir", tag: "Top 8" },
  { date: "Jan 2025", name: "San Antonio Regional", kind: "Regional", place: "27th", rec: "5-2-2", deck: "Banette ex Dusknoir" },
  { date: "Feb 2025", name: "Puerto Rico Special Event", kind: "SPE", place: "1st", rec: "7-0-2", deck: "Gardevoir", tag: "Champion" },
  { date: "Mar 2025", name: "Vancouver Regional", kind: "Regional", place: "14th", rec: "5-2-1", deck: "Gardevoir" },
  { date: "Apr 2025", name: "Atlanta Regional", kind: "Regional", place: "11th", rec: "6-1-2", deck: "Gardevoir" },
  { date: "May 2025", name: "Melbourne Regional", kind: "Regional", place: "8th", rec: "5-2-2", deck: "Gardevoir", tag: "Top 8" },
  { date: "May 2025", name: "Portland Regional", kind: "Regional", place: "23rd", rec: "5-2-2", deck: "Gardevoir" },
  { date: "Jun 2025", name: "North America IC", kind: "IC", place: "44th", rec: "6-3-1", deck: "Grimmsnarl Froslass" },
  { date: "Aug 2025", name: "World Championships, Anaheim", kind: "Worlds", place: "189th", rec: "3-3-2", deck: "Crustle", tag: "Worlds #3" },
  { date: "Sep 2025", name: "Monterrey Regional", kind: "Regional", place: "5th", rec: "5-2-1", deck: "Crustle", tag: "Top 8" },
  { date: "Sep 2025", name: "Pittsburgh Regional", kind: "Regional", place: "8th", rec: "8-3-1", deck: "Crustle", tag: "Top 8" },
  { date: "Oct 2025", name: "Milwaukee Regional", kind: "Regional", place: "23rd", rec: "6-3-1", deck: "Gardevoir Jellicent" },
  { date: "Nov 2025", name: "Las Vegas Regional", kind: "Regional", place: "56th", rec: "4-2-2", deck: "Mega Absol Box" },
  { date: "Nov 2025", name: "Latin America IC, Sao Paulo", kind: "IC", place: "83rd", rec: "3-3-2", deck: "Mega Absol Box" },
  { date: "Nov 2025", name: "Stuttgart Regional", kind: "Regional", place: "44th", rec: "4-3-1", deck: "Gardevoir" },
  { date: "Jan 2026", name: "Toronto Regional", kind: "Regional", place: "52nd", rec: "4-2-2", deck: "Gardevoir" },
  { date: "Feb 2026", name: "Europe IC, London", kind: "IC", place: "97th", rec: "5-3-0", deck: "Dragapult Dusknoir" },
  { date: "Mar 2026", name: "Seattle Regional", kind: "Regional", place: "13th", rec: "7-3-1", deck: "Dragapult Dusknoir" },
  { date: "Mar 2026", name: "San Juan Special Event", kind: "SPE", place: "11th", rec: "3-3-0", deck: "Dragapult Dusknoir" },
  { date: "Mar 2026", name: "Houston Regional", kind: "Regional", place: "44th", rec: "5-3-0", deck: "Dragapult Dusknoir" },
  { date: "Apr 2026", name: "Orlando Regional", kind: "Regional", place: "32nd", rec: "5-3-2", deck: "Kangaskhan Bouffalant" },
  { date: "May 2026", name: "Los Angeles Regional", kind: "Regional", place: "19th", rec: "6-3-1", deck: "Festival Lead" },
  { date: "Jun 2026", name: "North America IC", kind: "IC", place: "61st", rec: "5-4-2", deck: "Festival Lead" },
  { date: "Jul 2026", name: "Shanghai Ultra Ball League", kind: "League event", place: "28th", rec: "8-4", deck: "Gardevoir" },
  { date: "Aug 2026", name: "World Championships, San Francisco", kind: "Worlds", place: "85th", rec: "5-3-0", deck: "Alakazam Dusknoir", tag: "Worlds #4" },
  { date: "Sep 2026", name: "Baltimore Regional", kind: "Regional", place: "63rd", rec: "4-2-2", deck: "Dragapult" },
  { date: "Oct 2026", name: "Louisville Regional", kind: "Regional", place: "96th", rec: "3-3-2", deck: "Sharpedo Toxtricity" },
  { date: "Oct 2026", name: "Puebla Regional", kind: "Regional", place: "7th", rec: "7-2-2", deck: "Sharpedo Toxtricity", tag: "Top 8" },
];

const DECKS: [string, number][] = (() => {
  const m: Record<string, number> = {};
  EVENTS.forEach((e: Ev) => { if (e.deck !== "Deck TBD") m[e.deck] = (m[e.deck] || 0) + 1; });
  return Object.entries(m).sort((a: [string, number], b: [string, number]) => b[1] - a[1]);
})();

const IMGS: Record<string, string> = {};

IMGS["swsh9-123"] = "images/cards/swsh9-123.webp";
IMGS["sv1-86"] = "images/cards/sv1-86.webp";
IMGS["swsh3-104"] = "images/cards/swsh3-104.webp";
IMGS["swsh12-139"] = "images/cards/swsh12-139.webp";
IMGS["swsh12-147"] = "images/cards/swsh12-147.webp";
IMGS["swsh10-40"] = "images/cards/swsh10-40.webp";
IMGS["swsh7-31"] = "images/cards/swsh7-31.webp";
IMGS["cel25-7"] = "images/cards/cel25-7.webp";
IMGS["swsh8-157"] = "images/cards/swsh8-157.webp";
IMGS["swsh10-82"] = "images/cards/swsh10-82.webp";
IMGS["swsh10-99"] = "images/cards/swsh10-99.webp";
IMGS["swsh2-113"] = "images/cards/swsh2-113.webp";
IMGS["swsh11-136"] = "images/cards/swsh11-136.webp";
IMGS["swsh7-123"] = "images/cards/swsh7-123.webp";
IMGS["swsh11-131"] = "images/cards/swsh11-131.webp";
IMGS["sv4-124"] = "images/cards/sv4-124.webp";
IMGS["swsh12-34"] = "images/cards/swsh12-34.webp";
IMGS["sv1-124"] = "images/cards/sv1-124.webp";
IMGS["sv5-78"] = "images/cards/sv5-78.webp";
IMGS["sv3-125"] = "images/cards/sv3-125.webp";
IMGS["sv3-164"] = "images/cards/sv3-164.webp";
IMGS["swsh12-136"] = "images/cards/swsh12-136.webp";
IMGS["sv4pt5-69"] = "images/cards/sv4pt5-69.webp";
IMGS["sv1-88"] = "images/cards/sv1-88.webp";
IMGS["sv6pt5-20"] = "images/cards/sv6pt5-20.webp";
IMGS["sv6-53"] = "images/cards/sv6-53.webp";
IMGS["sv10-12"] = "images/cards/sv10-12.webp";
IMGS["rsv10pt5-45"] = "images/cards/rsv10pt5-45.webp";
IMGS["me1-86"] = "images/cards/me1-86.webp";
IMGS["sv6-130"] = "images/cards/sv6-130.webp";
IMGS["me1-104"] = "images/cards/me1-104.webp";
IMGS["sv6-149"] = "images/cards/sv6-149.webp";
IMGS["sv6-18"] = "images/cards/sv6-18.webp";
IMGS["me1-56"] = "images/cards/me1-56.webp";
IMGS["me2-68"] = "images/cards/me2-68.webp";
IMGS["sv10-136"] = "images/cards/sv10-136.webp";
IMGS["sv7-119"] = "images/cards/sv7-119.webp";
IMGS["me2-61"] = "images/cards/me2-61.webp";
const DECK_CARDS: Record<string, [string, string][]> = {
  "Arceus Crobat": [["Arceus VSTAR", "swsh9-123"], ["Crobat V", "swsh3-104"]],
  "Origin Palkia Suicune": [["Origin Forme Palkia VSTAR", "swsh10-40"], ["Suicune V", "swsh7-31"]],
  "Arceus Pikachu Gengar Crobat": [["Arceus VSTAR", "swsh9-123"], ["Flying Pikachu VMAX", "cel25-7"], ["Gengar VMAX", "swsh8-157"]],
  "Arceus Pikachu Decidueye": [["Arceus VSTAR", "swsh9-123"], ["Flying Pikachu VMAX", "cel25-7"], ["Hisuian Decidueye", "swsh10-82"]],
  "Darkrai Weezing": [["Darkrai VSTAR", "swsh10-99"], ["Galarian Weezing", "swsh2-113"]],
  "Lugia Archeops": [["Lugia VSTAR", "swsh12-139"], ["Archeops", "swsh12-147"]],
  "Arceus Goodra Duraludon": [["Arceus VSTAR", "swsh9-123"], ["Hisuian Goodra VSTAR", "swsh11-136"], ["Duraludon VMAX", "swsh7-123"]],
  "Gardevoir": [["Gardevoir ex", "sv1-86"]],
  "Arceus Giratina": [["Arceus VSTAR", "swsh9-123"], ["Giratina VSTAR", "swsh11-131"]],
  "Roaring Moon ex": [["Roaring Moon ex", "sv4-124"]],
  "Arceus Vulpix Goodra": [["Arceus VSTAR", "swsh9-123"], ["Alolan Vulpix VSTAR", "swsh12-34"], ["Hisuian Goodra VSTAR", "swsh11-136"]],
  "Ancient Box": [["Roaring Moon ex", "sv4-124"], ["Koraidon", "sv1-124"], ["Flutter Mane", "sv5-78"]],
  "Charizard Pidgeot": [["Charizard ex", "sv3-125"], ["Pidgeot ex", "sv3-164"]],
  "Regidrago VSTAR": [["Regidrago VSTAR", "swsh12-136"]],
  "Arceus Vulpix Noivern": [["Arceus VSTAR", "swsh9-123"], ["Alolan Vulpix VSTAR", "swsh12-34"], ["Noivern ex", "sv4pt5-69"]],
  "Banette ex Dusknoir": [["Banette ex", "sv1-88"], ["Dusknoir", "sv6pt5-20"]],
  "Grimmsnarl Froslass": [["Marnie's Grimmsnarl ex", "sv10-136"], ["Froslass", "sv6-53"]],
  "Crustle": [["Crustle", "sv10-12"]],
  "Gardevoir Jellicent": [["Gardevoir ex", "sv1-86"], ["Jellicent ex", "rsv10pt5-45"]],
  "Mega Absol Box": [["Mega Absol ex", "me1-86"]],
  "Dragapult Dusknoir": [["Dragapult ex", "sv6-130"], ["Dusknoir", "sv6pt5-20"]],
  "Dragapult": [["Dragapult ex", "sv6-130"]],
  "Kangaskhan Bouffalant": [["Mega Kangaskhan ex", "me1-104"], ["Bouffalant", "sv7-119"]],
  "Festival Lead": [["Festival Grounds", "sv6-149"], ["Dipplin", "sv6-18"]],
  "Alakazam Dusknoir": [["Alakazam", "me1-56"], ["Dusknoir", "sv6pt5-20"]],
  "Sharpedo Toxtricity": [["Mega Sharpedo ex", "me2-61"], ["Toxtricity", "me2-68"]],
};



const PHOTOS: [string, string, string][] = [
  ["images/photos/IMG_3053.webp", "First Regional, Secaucus", "May 2022"],
  ["images/photos/IMG_3584.webp", "Hartford Regional, first Worlds qualification", "May 2023"],
  ["images/photos/IMG_4983.webp", "Worlds 2023, Yokohama", "Aug 13, 2023"],
  ["images/photos/IMG_4189.webp", "Worlds 2024, Honolulu", "Aug 14, 2024"],
  ["images/photos/IMG_4359.webp", "Worlds 2024, Honolulu", "Aug 18, 2024"],
  ["images/photos/IMG_0275.webp", "Louisville Regional, runner-up", "Oct 13, 2024"],
  ["images/photos/IMG_9882.webp", "Puerto Rico SPE, Champion", "Feb 15, 2025"],
  ["images/photos/IMG_1389.webp", "Melbourne Regional", "May 16, 2025"],
  ["images/photos/IMG_3337.webp", "Melbourne Regional", "May 18, 2025"],
  ["images/photos/IMG_4674.webp", "Worlds 2025, Anaheim", "Aug 17, 2025"],
  ["images/photos/worlds2025.webp", "Worlds 2025, Anaheim", "Aug 2025"],
  ["images/photos/IMG_5507.webp", "São Paulo LAIC", "Nov 21, 2025"],
];
function PhotoGallery() {
  const t = useGrokTheme();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
      {PHOTOS.map((p) => (
        <figure key={p[1] + p[2]} style={{ margin: 0, borderRadius: 10, overflow: "hidden", border: "1px solid " + t.border.subtle, background: t.bg.elevated }}>
          <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: t.bg.subtle }}><img src={p[0]} alt={p[1]} loading="lazy" data-full={p[0].replace("photos/","photos/full/")} className="zoom" style={{ cursor: "zoom-in",  width: "100%", height: "100%", objectFit: "contain", display: "block" }} /></div>
          <figcaption style={{ padding: "8px 10px", fontFamily: t.font.family }}>
            <div style={{ color: t.text.primary, fontSize: t.font.body2.fontSize, fontWeight: 600 }}>{p[1]}</div>
            <div style={{ color: t.text.secondary, fontSize: t.font.label.fontSize }}>{p[2]}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
const pnum = (p: string) => parseInt(p, 10) || 9999;
const wins = (r: string) => parseInt(r.split("-")[0], 10) || 0;
// Juniors field sizes (pokedata / RK9; Shanghai as reported by Peter).
const FIELD: Record<string, number> = {"Secaucus Regional|May 2022":37,"Milwaukee Regional|Jun 2022":48,"North America IC|Jun 2022":87,"Baltimore Regional|Sep 2022":48,"Peoria Regional|Oct 2022":42,"Toronto Regional|Dec 2022":68,"Arlington Regional|Dec 2022":74,"San Diego Regional|Jan 2023":45,"Orlando Regional|Feb 2023":82,"Knoxville Regional|Feb 2023":65,"Vancouver Regional|Mar 2023":47,"Charlotte Regional|Mar 2023":97,"Fort Wayne Regional|Apr 2023":93,"Europe IC, London|Apr 2023":148,"Portland Regional|May 2023":105,"Hartford Regional|May 2023":109,"Milwaukee Regional|Jun 2023":96,"North America IC|Jul 2023":185,"World Championships, Yokohama|Aug 2023":137,"San Antonio Regional|Dec 2023":126,"Portland Regional|Jan 2024":107,"Knoxville Regional|Feb 2024":122,"Vancouver Regional|Mar 2024":128,"Europe IC, London|Apr 2024":199,"Orlando Regional|Apr 2024":182,"Indianapolis Regional|May 2024":217,"Bologna Special Event|Jun 2024":160,"North America IC|Jun 2024":195,"World Championships, Honolulu|Aug 2024":385,"Baltimore Regional|Sep 2024":190,"Louisville Regional|Oct 2024":161,"Buenos Aires Special Event|Nov 2024":24,"Latin America IC, Sao Paulo|Nov 2024":120,"Sacramento Regional|Nov 2024":146,"Toronto Regional|Dec 2024":156,"San Antonio Regional|Jan 2025":194,"Puerto Rico Special Event|Feb 2025":29,"Vancouver Regional|Mar 2025":120,"Atlanta Regional|Apr 2025":226,"Melbourne Regional|May 2025":73,"Portland Regional|May 2025":164,"North America IC|Jun 2025":330,"World Championships, Anaheim|Aug 2025":351,"Monterrey Regional|Sep 2025":64,"Pittsburgh Regional|Sep 2025":214,"Milwaukee Regional|Oct 2025":187,"Las Vegas Regional|Nov 2025":226,"Latin America IC, Sao Paulo|Nov 2025":161,"Stuttgart Regional|Nov 2025":157,"Toronto Regional|Jan 2026":184,"Europe IC, London|Feb 2026":362,"Seattle Regional|Mar 2026":217,"San Juan Special Event|Mar 2026":22,"Houston Regional|Mar 2026":193,"Orlando Regional|Apr 2026":219,"Los Angeles Regional|May 2026":175,"North America IC|Jun 2026":331,"World Championships, San Francisco|Aug 2026":389,"Baltimore Regional|Sep 2026":233,"Shanghai Ultra Ball League|Jul 2026":600,"Louisville Regional|Oct 2026":194,"Puebla Regional|Oct 2026":82};
const pct = (e: Ev) => pnum(e.place) / (FIELD[e.name + "|" + e.date] || 100);
const BEST: Record<string, Ev> = (() => {
  const m: Record<string, Ev> = {};
  EVENTS.forEach((e: Ev) => {
    if (/Cup/.test(e.name) || e.deck === "Deck TBD") return;
    const b = m[e.deck];
    if (!b || pct(e) < pct(b) || (pct(e) === pct(b) && wins(e.rec) > wins(b.rec))) m[e.deck] = e;
  });
  return m;
})();

function DeckGallery() {
  const t = useGrokTheme();
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
      {DECKS.map((d: [string, number]) => (
        <div key={d[0]} style={{ width: 260, maxWidth: "100%", fontFamily: t.font.family }}>
          <div style={{ color: t.text.primary, fontWeight: 600, fontSize: t.font.body1.fontSize }}>{d[0]}</div>
          <div style={{ color: t.text.tertiary, fontSize: t.font.label.fontSize, marginBottom: 6 }}>{d[1] + (d[1] === 1 ? " event" : " events")}</div>
          {BEST[d[0]] ? <div style={{ color: t.text.accent, fontSize: t.font.label.fontSize, fontWeight: 600, marginBottom: 6 }}>{"Best finish: " + BEST[d[0]].name + " (" + BEST[d[0]].date + "), " + BEST[d[0]].place + ", " + BEST[d[0]].rec}</div> : null}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {(DECK_CARDS[d[0]] || []).map((c: [string, string]) => (
              <div key={c[1]} style={{ width: 72, display: "flex", flexDirection: "column", gap: 4 }}>
                {IMGS[c[1]] ? <img src={IMGS[c[1]]} alt={c[0]} title={c[0]} loading="lazy" data-full={IMGS[c[1]].replace("cards/","cards/full/")} className="zoom" style={{ cursor: "zoom-in",  width: 72, height: "auto", borderRadius: 4, display: "block" }} /> : null}
                <span style={{ color: t.text.secondary, fontSize: t.font.caption.fontSize, lineHeight: 1.2 }}>{c[0]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Timeline() {
  const t = useGrokTheme();
  const c = t.dataviz.categorical;
  const big = (e: Ev) => !!e.tag && /Champion|Finalist|Top 8|Worlds/.test(e.tag);
  return (
    <div style={{ position: "relative", paddingLeft: 28 }}>
      <div style={{ position: "absolute", left: 9, top: 4, bottom: 4, width: 2, background: t.border.default }} />
      {EVENTS.map((e: Ev, i: number) => (
        <div key={i} style={{ position: "relative", marginBottom: 14 }}>
          <div style={{ position: "absolute", left: big(e) ? -25 : -23, top: 4, width: big(e) ? 16 : 12, height: big(e) ? 16 : 12, borderRadius: 9999, background: e.tag === "Champion" ? c[1] : big(e) ? c[0] : t.dataviz.other, border: "2px solid " + t.bg.base }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "baseline", fontFamily: t.font.family }}>
            <span style={{ color: t.text.tertiary, fontSize: t.font.label.fontSize, minWidth: 64 }}>{e.date}</span>
            <span style={{ color: t.text.primary, fontWeight: big(e) ? 600 : 500, fontSize: t.font.body1.fontSize }}>{e.name}</span>
            {e.tag ? <span style={{ color: t.text.accent, fontSize: t.font.label.fontSize, fontWeight: 600 }}>{e.tag}</span> : null}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, color: t.text.secondary, fontSize: t.font.body2.fontSize, fontFamily: t.font.family, paddingLeft: 72 }}>
            <span>{e.kind} · {e.place + (FIELD[e.name + "|" + e.date] ? " out of " + FIELD[e.name + "|" + e.date] : "")} · {e.rec} · {e.deck}</span>

          </div>
        </div>
      ))}
    </div>
  );
}

type City = { n: string; lat: number; lon: number; ev: string[] };
const CITIES: City[] = [
  { n: "Secaucus, NJ", lat: 40.79, lon: -74.06, ev: ["Regional 2022"] },
  { n: "Milwaukee, WI", lat: 43.04, lon: -87.91, ev: ["Regional 2022", "Regional 2023", "Regional 2025"] },
  { n: "Columbus, OH", lat: 39.96, lon: -83.0, ev: ["NAIC 2022", "NAIC 2023", "NAIC 2024"] },
  { n: "Baltimore, MD", lat: 39.29, lon: -76.61, ev: ["Regional 2022", "Regional 2024", "Regional 2026"] },
  { n: "Peoria, IL", lat: 40.69, lon: -89.59, ev: ["Regional 2022"] },
  { n: "Toronto, Canada", lat: 43.65, lon: -79.38, ev: ["Regional 2022", "Regional 2024 (Top 8)", "Regional 2026"] },
  { n: "Arlington, TX", lat: 32.74, lon: -97.11, ev: ["Regional 2022"] },
  { n: "San Diego, CA", lat: 32.72, lon: -117.16, ev: ["Regional 2023"] },
  { n: "Orlando, FL", lat: 28.54, lon: -81.38, ev: ["Regional 2023", "Regional 2024", "Regional 2026"] },
  { n: "Knoxville, TN", lat: 35.96, lon: -83.92, ev: ["Regional 2023", "Regional 2024"] },
  { n: "Vancouver, Canada", lat: 49.28, lon: -123.12, ev: ["Regional 2023", "Regional 2024", "Regional 2025"] },
  { n: "Charlotte, NC", lat: 35.23, lon: -80.84, ev: ["Regional 2023"] },
  { n: "Fort Wayne, IN", lat: 41.08, lon: -85.14, ev: ["Regional 2023"] },
  { n: "London, UK", lat: 51.51, lon: -0.13, ev: ["EUIC 2023", "EUIC 2024", "EUIC 2026"] },
  { n: "Portland, OR", lat: 45.52, lon: -122.68, ev: ["Regional 2023", "Regional 2024", "Regional 2025"] },
  { n: "Hartford, CT", lat: 41.76, lon: -72.67, ev: ["Regional 2023"] },
  { n: "Yokohama, Japan", lat: 35.44, lon: 139.64, ev: ["Worlds 2023"] },
  { n: "San Antonio, TX", lat: 29.42, lon: -98.49, ev: ["Regional 2023", "Regional 2025"] },
  { n: "Indianapolis, IN", lat: 39.77, lon: -86.16, ev: ["Regional 2024"] },
  { n: "Bologna, Italy", lat: 44.49, lon: 11.34, ev: ["Special Event 2024"] },
  { n: "Honolulu, HI", lat: 21.31, lon: -157.86, ev: ["Worlds 2024"] },
  { n: "Louisville, KY", lat: 38.25, lon: -85.76, ev: ["Regional 2024 (Finalist)", "Regional 2026"] },
  { n: "Buenos Aires, Argentina", lat: -34.6, lon: -58.38, ev: ["Special Event 2024"] },
  { n: "Sao Paulo, Brazil", lat: -23.55, lon: -46.63, ev: ["LAIC 2024", "LAIC 2025"] },
  { n: "Sacramento, CA", lat: 38.58, lon: -121.49, ev: ["Regional 2024"] },
  { n: "San Juan, Puerto Rico", lat: 18.47, lon: -66.11, ev: ["Special Event 2025 (Champion)", "Special Event 2026"] },
  { n: "Atlanta, GA", lat: 33.75, lon: -84.39, ev: ["Regional 2025"] },
  { n: "Melbourne, Australia", lat: -37.81, lon: 144.96, ev: ["Regional 2025 (Top 8)"] },
  { n: "New Orleans, LA", lat: 29.95, lon: -90.07, ev: ["NAIC 2025", "NAIC 2026"] },
  { n: "Anaheim, CA", lat: 33.84, lon: -117.91, ev: ["Worlds 2025"] },
  { n: "Monterrey, Mexico", lat: 25.69, lon: -100.32, ev: ["Regional 2025 (Top 8)"] },
  { n: "Pittsburgh, PA", lat: 40.44, lon: -79.99, ev: ["Regional 2025 (Top 8)"] },
  { n: "Las Vegas, NV", lat: 36.17, lon: -115.14, ev: ["Regional 2025"] },
  { n: "Stuttgart, Germany", lat: 48.78, lon: 9.18, ev: ["Regional 2025"] },
  { n: "Seattle, WA", lat: 47.61, lon: -122.33, ev: ["Regional 2026"] },
  { n: "Houston, TX", lat: 29.76, lon: -95.37, ev: ["Regional 2026"] },
  { n: "Los Angeles, CA", lat: 34.05, lon: -118.24, ev: ["Regional 2026"] },
  { n: "San Francisco, CA", lat: 37.77, lon: -122.42, ev: ["Worlds 2026"] },
  { n: "Shanghai, China", lat: 31.23, lon: 121.47, ev: ["Ultra Ball League 2026"] },
  { n: "Puebla, Mexico", lat: 19.04, lon: -98.2, ev: ["Regional 2026 (Top 8)"] },
];

const LAND: number[][][] = [
  [[-168,66],[-162,70],[-140,70],[-125,70],[-95,72],[-80,73],[-62,60],[-55,52],[-66,45],[-70,41],[-76,35],[-81,31],[-80,25],[-82,28],[-84,30],[-90,29],[-97,27],[-97,21],[-87,21],[-83,15],[-77,8],[-80,9],[-86,12],[-92,15],[-105,20],[-110,24],[-115,30],[-117,33],[-121,35],[-124,40],[-124,47],[-130,55],[-140,60],[-150,60],[-158,57],[-165,60]],
  [[-55,60],[-45,60],[-20,70],[-20,80],[-60,82],[-70,77],[-55,70]],
  [[-77,8],[-60,10],[-50,0],[-35,-5],[-39,-15],[-48,-26],[-58,-35],[-65,-42],[-68,-55],[-73,-50],[-72,-30],[-70,-18],[-81,-5],[-80,2]],
  [[-10,36],[-9,43],[-2,44],[-5,48],[2,51],[8,54],[5,58],[10,63],[20,70],[30,70],[40,67],[60,69],[80,73],[100,77],[130,72],[160,70],[170,68],[170,62],[160,58],[155,50],[140,46],[135,35],[128,38],[122,30],[121,23],[110,20],[108,12],[104,1],[100,7],[98,16],[92,22],[80,15],[77,8],[72,20],[67,25],[57,25],[52,27],[56,18],[45,13],[38,20],[34,28],[36,35],[28,37],[26,40],[20,40],[15,38],[12,44],[8,44],[3,43],[-2,37]],
  [[-17,15],[-17,21],[-10,30],[-5,36],[10,37],[20,32],[32,31],[35,25],[43,12],[51,12],[40,-2],[40,-15],[35,-25],[20,-35],[15,-25],[12,-6],[9,4],[-8,4],[-15,10]],
  [[-5,50],[2,51],[0,53],[-2,57],[-5,58],[-5,55],[-3,54]],
  [[130,31],[136,34],[141,36],[142,40],[141,45],[140,42],[135,35],[130,34]],
  [[114,-22],[122,-18],[130,-12],[137,-12],[142,-11],[146,-19],[153,-25],[150,-37],[141,-38],[135,-35],[129,-32],[115,-34]],
];

const LAND_D = "M594 245l11 8 4 6-2 7 2 1-1 6 3 7-11 5-5-1-1-6-9-5-4-15 4-3 1-7-2-2 10-1zM477 140l0 6-9 0-3 17-11 1 0-2 7-1 9-18 7-1 0-2zM216 70l-6-5 3-4-2-1 1-5 5-4-2-2 2-5-1-3-7 2 0-3-3 0 27-21 23 0 4-2 2 2 18 1 2 1-4 1 10 0 1 2 4-3 11 2 9-2 1 3 7-4-3-2 6-3 3 1 1 2-3 1 3 0-1 2 5 0-2 3 9-5 5 0 1 2-3 3-10 1-23 10-9 8 3 0-2 5 4-1 9 6 6 0-3 5 2 6 5-4 0-6 5-1 5-4 0-6 4-2 2-6 9-1 3 4 4 0-2 5 2 2 9-5 3 8-2 2 8 4 2 4-1 3-12 6-15 0-15 10 13-7 5 1-3 2 0 6 6 1 4-4-1 3 2 1-16 7-2 0 1-3 5-2-7 0 1-6-3-1-7 7-9 0-23 11 5-12-9-9-8 1-6-2 1-2-66 1zM341 11l-12-4 10 0 1 2 17 0-16 2zM374 64l-4 4 7 2-2 2 2-1 0 4-3 3 0-4-4 3-1-3-7 1 7-10 5-1zM333 28l6 3-9 1-6 0 7-5 2 1zM355 14l16 3 2 3-4 1 10 4-6 4-6-3 2 3-1 5-7-3 3 5-13-7-8 1 11-2 5-6-8-4-17 0 1-2-2 0 6-4 16 2zM329 11l7 1-10 3-2-2 5-2zM214 72l-5-1-1-6 5 2 1 5zM281 11l9 1-14 4-6 1-3-2 8-4 6 0zM308 9l-18 1 4-2 12 1 1-2 2 0-1 2zM306 13l-1 3 5 2-6 3-21 0-4-3 7 0-7-1 5-1-5-1 5-2 15 0 1 2 6-2zM316 13l7-1-2 3-6 1-3-3 4 0zM326 7l-2 3-4-1 6-2zM336 3l13 1-12 1 3-1-4-1zM345 2l51-1-27 4-12 3-15 0 9-2-4-1 5 0-1-2 9 0-15-1zM216 70l66-1-1 2 6 2 8-1 9 9-5 12 23-11 9 0 9-7 0 8-10 5-2 3 2 2-10 2 4 0-5 1-5 6-1-2 1 2-4 5 1-6-1 4-2-1 2 1-1 8-9 6-11 10-2 20-2 0-2-6 1-8-8-5-9 1 0 4-5-2-9 1-8 5-2 7-3 0-3-12-8 0-3-8-13 1-7-4-7 0 0-4-5-2 0-20 16-24 3 0 0 3 3-6zM233 19l-27 21 3 0 0 3 7-2-1 8 2 2-4 3 1-9-5 0-4-4-10-3-15 4 9-5-34 14-19 4 26-8 6-4-11 1 3-4-4 1 0-2 4-4 20-6-10 1-2-3 14-1 0-4-2 0 3-2 26-4 24 3zM701 70l-2 2 1 4-5-1 1 6-6 2 5 8-17-3 0 2-6 0-4 6-5-1-7-9-7 1-10-6-6 1 4 12-6-3-3 2 0-3-8-5 2-3 4 0 0-3-6-3-6 2-6-6 1-6 2 2 4-5 12 3 2-2 11 1-5-3 3-3-3-2 16-5 6 4 6 0 0 2 7-3 12 10 0-2 7 1 12 6zM637 94l-4-12 6-1 10 6 7-1 7 9 5 1 5-5 1 4 5 1-2 2-4-1 0-2-3 1-3 4 3 8-23-14-1-3-4-1-5 4zM891 251l10 5 8 8 1 2-3 3 8 12-7-2-4-7-4-2-6 6-5-1 2-24zM924 255l0 4-4-6 4 2zM919 263l-4 2-4-3 5-2 0 2 6-5-3 6zM891 251l-2 24-2-3-7 1 4-4-2-7-11-7-2 2-3-5 3-1 2-1-4 0-4-5 5-2 4 1 1 8 3 2 6-6 9 3zM827 226l0 9 4 3-4 0-5 18-3 1-1-3-12-2-3-16 2-2 2 5 5-3 4 1 5-7 0-5 6 1zM859 252l4 4-5-2-3 0 4-2zM855 233l2 3-2 6 2 2-3-6 1-5zM841 238l4 0 2-3-1 5-10 0-3 3 3 4 7-3-6 5 5 10-3 2 1-3-3 1-1-8-4 12 0-9-2-2 3-13 3-3 5 2zM800 265l1 2 6-1 10 4 3 3-4 1-8-2-16-5 2-4 6 2zM790 245l1 5 4 3-2 10-3 0-7-8-12-23-7-9 0-2 6 1 9 12 6 2 3 5-1 3 3 1zM346 423l11 7-8-1-3-6zM350 352l1 14 7 8-2 5-11 2 2 7-6-1 1 4 4 2-3 3 1 4-4 2 6 5 1 3-3 1-1 6 4 5-9-1-5-5-3-14-5-10-1-12-3-6 2-3-5-15 2-16-2-8 3-2 1-8 6 4 0-3 4 0 15 11-1 7 8 1 3-7 2 5-9 12zM346 423l3 6 4 1-4 1-8-3-8-5 10 4 0-3 3-1zM311 307l8 19 2-1 0 5-3 2 2 8-2 16 4 9 1 6-2 3 3 6 1 12 5 8 1 13 5 6 10 3-4 2 1 2-12-4-6-11 1-5-4-1 0-7 3 1-1-7-2-1 1 4-2 0-5-20 1-16-4-12-1-27-3-11 2-2zM581 258l4 15-6 0-1 12 3 2 0 4-6-6-2 1-6-4-6 1-1-14-4-2-3 4-5 1-3-9-11 1 2-5 3-1 1 2 4-4 6-16 1-14 3-3 8 3 6-4 8 0 10 6-1 5 2 0-6 14 0 11zM615 248l-1-17 7-8 4 0 10-17 0-7 4-2 2 5-6 19-20 27zM609 259l-4-6-11-8 3-11-3-9 5-4 0 3 7 4 4 1 3-4 3 2-2 4 1 17-6 11zM568 211l-8-17 3-11 2 0-1-16 3 0 0-7 32 0 5 15-4 3 0 10-6 14 0 7-4-13-4 9-3-2-3 3-7 0-4-3-3 6 2 2zM564 169l1 14-2 0-3 10 3 7-13 12-7 1-4-7 0-2 4 0-6-16 1-5 4-3 1-14-3-9 2-2 22 14zM306 168l0 6-8-1 5 0-1-4 4-1zM306 174l0-6 8 3 0 3-5-1-3 3 0-2zM660 2l12 2-3 1-13-2 4-1zM746 8l12 1-6 1-6-2zM597 12l20-5 5 1-12 1-6 3-1 4 5 1-12-1 0-3 3-1-2 0zM817 57l17 13-4-1 2 5 7 5-3-2 0 3-3-3-16-20zM579 79l7 3-6 2-3-3 2-2zM526 4l11 1-9 2-10-3 8 0zM559 19l-5 1-2-2-5 3-15 1-8 11 2 4-3 6-8 2-3-1-2-8 21-15 15-5 13 1-3 1 3 1zM421 1l58 1-13 1 4 0-4 2 2 2-6 1 3 0-2 2 2 1-11 3 5 3-6-1-3 2 8 0-37 10-4 4-8 8-11-3-3-13 9-6-8 1 8-2-6-1 2-2-4-5-24-3 26-5 23 0zM543 346l1-2 4 4 4-2 1-13 2 7 7-6 4 2 13-13 5 1 1 7-1 5-3 2 1 3 4-1-2 7-14 15-7 3-15 1-5-20zM576 347l-6 3 3 3 3-6zM576 347l-4 6-2-3 6-3zM199 123l7 0 7 4 13-1 3 8 8 0 1 9 5 3-5 13 2 13 9 1 6-3 2-6 10-1-5 11-11 3 3 3-4 2-2 5-6-6-5 2-18-9-3-4 1-13-6-10 1-3-5-9 1-7-2-2-3 1-1 4 6 23-2 3-4-7 1-4-5-6 3-2-2-15zM350 352l2-1 12 9-3 8-10-4-1-12zM364 364l-2-6-10-7-2 1 9-12-4-10-3 0-1-6-6-1-1-14-3-7-5 0-2-9-14-8 0-7-13 5-2-6-2 2-5-2-3-7 3-9 8-4 0-18 2 0-2-4 6-1 4 5 6-3 2-4-2 0-2-6 5 1 7-5 3 5-1 8 3 2 4-3 3 1 1-3 5 2 1-2 1 2 6-8 3 9-1 7 5 0 0 4 2-2 8 3 1 4 13 1 13 10 1 13-10 18 0 21-5 12-12 4-4 6 1 9-9 19zM309 282l2 1 5-5 4 0 0 7 14 8 2 9 5 0 3 7-1 7-3-3-7 1-1 10-4-1 0 3-6-4-3 4-8-19-2-25zM306 257l-8 4-3 9 3 7 3 2 4-2 1 5 3 0 2 27-19-13-1-3-9-20-7-9 0-8 2-2 0 4 3 2 10-13 1-5 6 8 9 2-2 3 2 2zM314 237l-2-3-6 1 2 3-2 1 0 18-2-2 2-3-9-2-4-7-8-3-4-5 5-8-2-13 2-2 0-3 5-3 3-6 4 0 6-5-6 12 3 8 12 4-1 12 2 6zM286 209l-2 5-2-6-4 2 0 4-5-3-2 0 0-5 4 3 8-3 3 3zM272 206l-1 5-6-6-2-4 5-1 4 6zM270 201l-6-1-5-7 7-4 2-3 5 0-3 15zM273 186l-5 0-7 7-3-4-2-4 4-3 9 0 4 4zM248 187l2-5 4-2-3-3 2-2 5 0-1 7 2 1-6 7-5-3zM258 175l3-2-1 5-3 4 1-7zM332 222l-4 4-8 0 4 7-8 6-4-8 1-12-12-4-2-10 5-8-2 2 0 9 2-3-1-5 4-1 1-3 4 6 9 2 9-3-3 2 8 7-5 9 2 3zM343 234l-6 3-3-2 1-8-5-8 1-3 4-6 7 9-3 7 4 8zM349 233l-4-1-1 3-5-12 3-4 8 1-1 13zM357 226l-5 8-3-3 1-11 7 6zM514 69l5 1-5 7 4 10-11 1-3 3-2-2-6 0 1-10-8-8 7 0 0-3 2 1 8-5 8 5zM291 242l-1 5-10 13-3-2 2-7-2 0-2-6 6-9 10 6zM280 156l10 2 6 7 4 1-10 2 1-3-10-7-9 3 8-5zM584 324l-9-3 0-4-6-7 0-3 4 1 5-5 5-4 6 4-1 14-4 7zM579 323l-13 13-4-2-7 6-2-7 0-11 3 0 1-13 12-2 6 14 4 2zM553 333l-1 13-4 2-4-4-1 2-11-40 5-2 1 2 20 2 10-1-11 2-1 13-3 0 0 11zM454 191l-2-4 3-6 5-1 7 7 2 7-5 1-10 0 0-3 7 0 1-2-8 1zM468 195l0-11 17 0-2-34 4-1 22 22 3-1-2 14-15 3-7 5-5 12 0-2-4 2-3-3 0-5-5 1-3-2zM454 164l11-1 3-17 9 0 0-5 10 8-4 1 2 34-16 0-2 3-5-6-7 0 1-14-2-3zM507 218l-3-2 1-9-3-5 4-5 4 1-3 20zM540 157l3 9-1 14-4 3-1 5 3 4-1 3-2-4-11 3-8-3-6-1-2 8-4-1-5-11 9-2 2-14 20-15 8 2zM507 218l5-28 13 4 12-3 1 4 2 3-3 3-4 14-2 2-3-2-4 9-8 1-4-7-5 0zM540 193l3 11-4 0 4 9-3 11 4 6 0 5-10-2-7 0-3-12 4-6 3 2 2-2 7-22zM502 200l3 7 0 11-3 0-2-17 2-1zM500 200l3 19-8 5-3-1-1-5 2-7-1-11 8 0zM478 203l5-1 5 4 4-1-1 18-4-1-8 3 0-5-3-3 2-14zM462 194l9 3 5-1 2 13-3 5-6-10-6 4-3-4-2-4 4-2 0-4zM454 195l8-1-1 4-3 2-4-5zM477 213l-1 4 3 3 0 5-9-7-2-2 5-7 1 4 3 0zM463 208l6-4 2 6-3 6-5-8zM485 203l3-11 7-5 6-1 2 8 3 0-3 6-11 0 0 5-4 1-3-3zM576 222l-8 0-6 4-8-3-10 10-4-15 2-4 8-2 13-12 2 8 11 14zM551 228l-1 12-6 16-4 4-1-2-6 2-2-4 4-7 4 2 1-2-2-8 2-4-4-4 8 2 2-6 5-1zM531 233l5 0 4 4-2 4 2 8-1 2-4-1-4 6-7-10 2-8 5-1 0-4zM585 273l7 5-1 15-8 3 0 3-10 9-12-4-1-15 6 0 1-7 6 4 2-1 6 6 0-4-3-2 1-12 6 0zM590 276l5 3-1 8 4 9-3 8-1-5-4-7 2-10-2-6zM595 284l8 1 8-5 0 19-17 16 1 14-9 7 0 4-2-2 0-14 4-7 1-14-6-3 0-4 8-3 3 3 1 8 3-4-3-16zM534 264l11-1 3 9 5-1 3-4 4 2 1 14 5-1 0 7-6 0 0 12 3 5-5 2-20-2-1-2-5 2 1-11 5-11-4-20zM585 250l-2 8-2 0 0-6 4-2zM592 123l-2 0 1 10-2-8 1-4 2 2zM636 288l2 10-13 35-5 3-4-5 0-6 4-9-1-10 2-4 9-6 5-10 1 2zM525 131l-6-13 2-10 7 0-1 4-1 7 2 0 1 5-4 7zM477 141l0-5 20-12-2-8 2-4 7-3 17-1 0 8-2 4 3 2 4 12 0 16 6 5-17 14-6 2-4-6-28-24zM591 124l4 0 4-4 2 4-6 3 4 3-2 2-3 3-3-1 0-10zM637 152l7 1 4-7 2 4-2 0 0 8-9-1-2-5zM625 132l2 5-2 0-4-2 4-3zM601 124l-2-4 5-3 2-10 6 1 5 6-1 4 6 5 4 9-5 3-4 0-16-11zM648 158l0-8 9 5 3 3-2 8-2 0-3 9-8 5-4-9 7-4 0-9zM782 196l0-8 8 2 1-3 4 4 0 4-4 3 2 3-8 1-3-6zM788 188l-6 0 0 8-8-5-1 13 5 10 5 4-1 2-11-10 2-9 1-4-6-12 2-4-6-8 1-5 5-2 4 3 0 7 8-2 6 9 0 5zM794 189l-3-2-1 3-2-2 0-5-6-9-8 2 0-7-4-3 2-4 2 1-1-5 5 7 3 0 2 3-2 2 12 12 1 7zM770 166l-5 2-1 5 6 8-2 4 6 12-2 7-6-22-2-3-4 4-3-1-1-8-7-9-1-12 3 0 0-9 2-3 3 1 0-4 5 8-1 7 3 0 3 7 6 2-2 4zM788 202l5-1-2-3 4-3 0-4-2-9-12-12 2-2-2-3-3 0-5-7 8-3 9 7-4 9 14 20 0 7-9 11-3-7zM817 91l1 4-4 4 5 5-6 1-3-5-4-1 3-7 4 2-2-2 3-3 3 2zM815 106l4-3 8 10-5 4-7-11zM702 70l8-5 13 3 0-6 27 8 12-3 6 1 2 6 5-1 6 3-5 1-6 6-4-1 3 4-2 3-11 4-9-3-14 0-7-6-10-2-5-8-9-4zM755 138l1 4-3-1-2 3 0 9-3 0 2 6-2 1-2-6-1 3-2-2 2-6-7-1-4-4-1 3 3 2-2 2 5 10-5 1-10 18-5 2 1 21-6 9-16-37-3-13-3 3-2-1-8-10 1-2 6 0-6-9 2-4 3 0 5-15-5-8 7 0 2-3 4 4 2 10 8 4-2 5 18 8 5 0-1-5 5 4 6 0-1-3 6-6 8 4zM748 160l1 5-5-8-2 0 0 4-3-1-5-9 2-2-3-2 1-3 4 4 7 1-2 6 2 2 1-3 2 6zM741 140l1 3-8-1 2-4 5 2zM731 139l1 5-5 0-18-8 2-6 11 7 9 2zM697 113l-2 3-7 0 5 8-5 15-3 0-2 4 6 9-6 0-1 2-6-6-13 1 0-4 4-2-7-9-2-2 11 2 3-2 1-5 5-1 3-16 7-2 9 5zM666 107l7 1 3-5 4 6 3-3 5 2-8 3 1 7-3 0 2 2-2 3 0 3-5 1-1 5-3 2-11-2 2-3-6-10 1-6 3 1 6-8 2 1zM670 108l-3-8 6-5 2 3-4 0 1 2 10 0 4 4 1 3-4-1-3 3-4-6-3 5-3 0zM672 91l2-2 4 1 0-2 13 1 4 2-7 6-4 0-2 3-10 0-1-2 8-2-5-1-2-4zM628 93l3-2 8 3 3-4 4 1 1 3 19 11-7 7-1 2-3-1-1-3-13-6-6 3-5-9 0-3 4 0-4-4-1 4-1-2zM626 132l-4-9-6-5 1-4-7-9-1-5 4 2 6-2 9 9 15-4 11 5 0 9 6 10-2 3 9 11-4 2 0 4-11-2-2-5-9 1-6-4-5-8-4 1zM592 123l1-7-2 0 0-4 1-3 4-1 10-1-2 10-9 7-3-1zM615 102l-8-7 3-1 5 8zM523 43l3-3-2-7 8-11 7-2 6 2 1 4-10 8-1 3 4 3-4 10-7 2-5-9zM561 50l6 2 6 6-3 0 2 3-3 3-3-1-13 0-1-7 9-6zM572 61l20 8 1 5-9 3-1 3-9-3-6 5 0-4 2 0-6-6-5 2-8-2 4-6-2-3 16 1 3-3zM552 56l3 9-2 5-7 0-7-4-5-2-3-7 8-3 13 2zM539 73l-1 4-4 1-11-1-1-2 2 0 6 0 1-4 3-1 5 3zM551 72l2 2-5 5-6 1-4-3 1-4 12-1zM562 73l5 0 4 5-2 0-2 3-5-8zM567 81l4 1-2 4-8 1-6-1-6-6 3-6 11-1 4 8zM558 52l-4 4-4-2-3-1 1-3 10 2zM559 47l2 3-3 2-3-2-9 1 2-5 2 2 4-3 5 2zM559 42l0 5-7-1 0-2-3-2 10 0zM531 57l3 7-6 3 3 4-1 4-10-1-3 0 2-4-5-1 1-11 4-2 0-3 12 4zM554 85l15 1-1 6-2-1-2 3-8 0-2-9zM556 94l9-1-1 3-6 0 2 2-4-1 1 5 3 2-3 3 1 3-4-1-4-9 1-4 5-2zM612 108l-16 0-4 1-1 3 0-3-5 2-9-2-2 2-6-2-1-3-3-6 2-3 4 0 0-3 5 1 9-3 9 3 10-2 6 6 2 9zM564 92l7 2-3 1-3 3-1-6zM551 96l-1 4-3-8 2-2 2 6zM539 78l6 2 0 3-7-1 7 8-13-8 7-4zM522 75l3 2-8 3-3-3 3-3 5 1zM514 65l-1 4-6-4 4-2 3 2zM515 58l-1 7-3-2-3 1 3-5 4-1zM478 92l6 0-3 15-3 2-2-7 3-6-1-4zM481 108l0-9 2 0 1-7-6 0-1-3 4-3 14 1 1 2 11 1-7 8-2 8-12 6-2-4-3 0zM486 56l-1 5-4 2-4-1 2-6 4-3 0 3 3 0zM946 319l2 4-2 1-3-4-1-4 4 3zM935 385l-5 4-4 0 11-13 3-10 0 11 6 0-11 8zM908 396l16-10-1 3 3-2-1 2-10 8-19 8-2-2 14-7zM862 387l-5 8-6 1 1-3 3-6 7 0zM824 359l-9 5-8 0-8 4-6-3 5-6 1-22 3 1-1-7 3-7 2-2 0 3 6-6 16-6 4-8 3-3 0 4 2-1 0-4 7-7 4-1 3 4 3 0 3-7 7-3-1-4 13 4-6 9 6 8 7 2 10-25 0 12 4 4-1 15 5 5 0 7 3 0 1 10-4 13-7 10-19 19-13 5-2-2 2-1-6 3-6-3 2-6-3-2 2-4-5 3 7-8-8 7 0-8-6-4-15 3zM726 213l0 4-3 2-3-8 1-6 5 8zM797 174l-3-1 0-5 5-1-2 7zM695 91l-5-8 6-2-1-6 5 1-1-4 2-2 10 4 5 8 10 2 7 6 14 0 9 3 9-3 4-4-3-4 4 1 6-6 5 0-6-4-5 1-2-4 0-2 5-1-3-9 9 0 26 16 8-2 3 7 1 3-4-1-1 2 5 8-3-2-3 3 2 2-4-2-3 7-6 3 0-5-4-1-4 6 5 5 3 1 1-3 6 3-3 1-2 6 12 11 0 4 3 2 2 6-2 0-2 13-5 6-12 5 0 4-3-4-8-1-6-6-8 3 1 5-2 0-6-3-3-7-3 0-1-12-9-7-3 0-6 6-5-2-3 3-30-14-2-10-9-5-10-12 13-9zM824 152l0 8-4-5 2-7 2 4zM525 77l8 1 0 3-4 0 0 3 16 13 0 2-4-2 1 5-2 3-1-3-1-4-9-5-6-8-2-1-3 3-2-8 9-2zM537 104l2 0-1 5-2-1-5-4 6 0zM521 95l2-1 1 3-2 5-1-7zM522 53l-4-1 0-4 5-2-1 7zM493 58l-1-4-3 0 0-3-1 2 1-9 5 0-3 3 5-1-3 5 3 0 3 4 5 5-1 4-10 1-5 3 4-5-4-1 3-1-2-2 1-2 3 1zM472 25l1 3-9 4-12-3 4-1-4-1 2-1 18-1zM613 92l4 3 1-3 6 5-2 1 0 6-2-3-5 1-3-3-2-5 4 1-1-3zM596 87l14 3 4 5-13-2-5-6zM838 204l4-5 0 4-2 5-2-4zM849 210l1 8-2-4 0 7-4-3-2-6-2 2-3 1 1-4 6-1 2-5 3 5zM827 207l-3 3 4-7 1-4 1 3-3 5zM832 174l1 14 7 2 1 3 0 2-7-5-4 0 1-3-4-3 0-11 5 1zM845 196l0 7-2-2-2-6 4 1zM777 217l3 3 4-2 3 5 0 8 2 6-8-6-4-14zM827 226l-6-1 0 5-5 7-4-1-5 3-2-3 0-2 4 0 0-3 5-1 3-6 3 1 4-10 6 6-3 5zM554 20l4 3 1 6 5 6-6 4-10 2-4-2 0-6 6-6-11-7 8 1 5-3 2 2zM552 70l-8 4-5-2 3-3 10 1zM534 64l8 3 1 2-5 2-4-1-1 2-5-4 6-4zM600 188l0-10 4-3 3 7 11 12-2 1-7-8-9 1zM851 101l4 13-6 2-2 4-4-4-9 3 4 2 1 6-3 0-1-3-4-3 4-8 8 0-1-6 3 2 2-5-4-10 8 7zM847 86l0-2 4 4-3 1 0 3-5-2 1 3-3 0-2-3 1-3-3-6 10 5zM838 120l3-3 3 2-1 2-2 2-3-3zM343 316l2 7 6 1 1 6 2-1 2 3-2 10-8-1 1-7-15-10 1-10 7-1 3 3zM641 171l4 9-5 5-16 9-5 0 0-2-3-7 2-9 11 2 4-6 8-1zM591 134l3 1 5-5-4-3 6-3 16 11 10 2 12 20 9 1 1 2-1 7-15 5-4 6-11-2-1 5-6-12-6-6-2-9-12-15 0-5zM495 114l2 10-20 12 0 6-7 1-10 19-6-1 8-16 13-13 1-9 9-11 10 2zM599 160l-32 0-2-34 10 3 5-3 7 3 2-1 2 5-1 6-6-6 15 27zM567 160l0 7-3 0 0 2-22-14-4 3-9-7-2 1-2-21 4-7 0-3 5 1 16 9 2-7 3-2 9 3 3 35zM632 211l-7 12-4 0-5 4-3-2-3 4-4-1-7-4 0-3-8-9 3-3 2-10 4-11 9-1 5 4 1 9 3 1 1 5 11 6 2-1zM635 199l0 7-5 6-11-6-1-5 1-2 3 3 13-3zM594 245l-12 1 5-13-2 0 2-6 6 0 1-2 3 9-3 11zM584 246l2 2-5 4 0-5 3-1zM545 90l-7-7 5-1 4 3-2 5zM554 91l2 3-5 2-1-4 4-1zM545 80l3-1 3 4 3 0 1 7-3 0-6-3-1-7zM586 228l-4-4-4 1-12-16 3-6 4 3 7 0 3-3 2 2 4-5-1-3 3-1 3 10-3 6 7 9-5 6-7 1z";

const LAND2 = ["M991 301l-1 2-4 2 0-2zM984 306l1 0 0 1-1 2-3 0 2-3zM594 245l11 8 0 2 4 4-2 4 0 3 2 1-1 6 3 7-2 2-9 3-5-1 0-5-2-2-8-4-3-9-1-6 2 0 2-4 0-4 1-2-2-2zM477 140l0 6-9 0 0 9-2 1-1 1 0 6-10 0-1 1 0-2 6 0 3-8 4-4 3-7 4 0 3-1zM216 70l-3-4-3-1 1-2 2-2-2-1 2-3-1-2 5-4-2-2 2-5-1-3-7 2 0-3-3 0 27-21 7 1 16-2 0 1 4-2 2 2 4-1-2 1 7 0 9 1 2 1-4 1 3 1 7-1 1 2 3-2-1 0 2-1 4 0 2 1 5 1 6 0 1-2 2 0 2 1-1 2 7-4-3-2 3-2 3-1 3 1 1 2-3 1 3 0-1 2 3-1 2 1-2 1 0 2 7-3 2-2 5 0 1 1-3 2 1 1-1 1-5 2-5-1-6 4-9 3-1 1-3 1-8 4-5 5 3 0-2 5 4-1 3 1 2 3 4 2 6 0-3 5 0 3 2 3 2-1 3-3 1-4-1-2 5-1 5-4 1-4-1-2 4-2 2-6 9-1 3 3 0 1 4 0-2 5 1 0 1 2 4-2 5-3 3 8-2 2 4 3 4 1 0 3 2 1-1 3-12 6-15 0-6 3-9 7 2-1 6-4 5-2 4 0 1 1-3 2 0 6 2 1 4 0 4-4-1 3 2 1-4 2-6 1-6 4-2 0 1-3 5-2-7 0-1-2 2-4-3-1-6 6-2 1-8 0-7 5-4 0-2 0 0 2-10 4-1-1 4-5 2-6-2-1 1-1-1-1-1 0 0-1-6-5-3 1-5 0-5-2 0-2-2 1zM329 34l5-1-4 2zM354 13l-1-1 1 0 7 1zM335 35l2 0 1 0-2 1zM332 10l-6 0 5-1zM333 5l1 0-1 1-4-1zM341 11l-7-1 1-1-6-2 1 0 9 0 1 1-1 0 2 1 16 0-5 2zM306 6l3 0-1 0-6 0zM374 64l-4 4 2-1 1 1-1 1 5 1-2 2 2-1 0 4-2 2-2 0 1-3-1 0-3 3-1 0 2-2-2-1-7 1 0-1 1-1 0-1 6-7 5-2 1 0zM333 28l4 2-1 1 3 0-3 1-2 0-1-1-7 2 1-1-3 0 3-1 4-4 1 0-1 1zM355 14l2-1 6 2-1 1 4-1 1 2 4 0 2 3-4 1 6 2 1 1 3 1-6 4-4-3-2 0-1 1 3 3 0 2-1 2-7-3 3 5-8-3-2-1 1 0-4-3-7 1-1 0 3-2 8 0 1-2 4-2 0-2-6-2 2 0-4-2-5 1-12-1-1-1 2-1-2 0 1-2 5-2 5 0-2 1 1 1 8-2 1 1-1 2zM329 11l7 1-12 3 1-3zM282 8l15-2-4 2zM206 56l3 0-4 3 0 2-1 0 0-3 2-2zM318 4l8 1 0 1-9-1 2 0zM214 72l-2 0-3-1-1-3-1-1 0-1 1-1 5 2 0 2 1 1zM281 11l7 0 2 1-20 5 0-1-3-1 8-3 0-1zM308 9l4-1-2 2-12 1-2-1 4 0-10 0 6-2 10 1-1-1 2-1 2 0zM306 13l1 1-2 2 5 2-5 1 1 1-2 1-5-1-16 1 0-1-4 0 0-2 10 0-10-1 5-1-5-1 5-2 6-1 2 1-2 1 4-1 2 1 3-1 1 1 0 1 1 0 1-2zM316 13l-1-1 3 0 5 0-2 1 2 1-2 1-6 1-3-2zM306 12l4 0-3 1-1-1zM326 7l1 1-3 2-7-1 2-1zM336 3l7-1 9 2-7 1-6 0-2 0 3-1-6-1zM345 2l22-1 29 0-18 3-11 0 3 0-2 0 1 1-9 2 3 0-6 1-15 0 4-1 0-1 5 0-4-1 6-1-2-1 9 0-10 0zM354 23l-4 1 2-2 3 0zM318 19l0 1-2 1-5-2 4-1zM352 68l4 0 1 2-3-1zM350 76l0 2 4 0-3 2-2-2 0-1zM216 70l64 0 2-1 0 2 5 2 5 0 3-1 6 5 0 1 1 0 1 1-1 1 2 1-2 6-4 5 1 1 10-4 0-2 2 0 4 0 7-5 8 0 2-1 6-6 3 1-2 4 1 3-8 4-4 4 0 2 1 0 1-2 0 1 0 1-10 2 3 0 1 0-5 1-2 3-3 3-1-2 0 3-3 4 1-2-1-1 1-3-1 4-2-1 2 1-1 8-3 2-8 5-8 7-1 5 0 11-1 4-2 2-1 0-1-3-1-7 1-2 0-2-2-3-3 1-3-3-7 1-2 0 0 4-4 0-1-2-3 0-1 0-5 1-8 5-2 4 0 3-1 0-3-1 0-5-2-6-1-1-3 0-2 2-2-1-1-1 0-3-2-4-5 0 0 1-8 0-8-4 1 0-7 0 1-2-2-3-4-2 0-10-1-4 2-3-1-2 5-8 7-8 4-8 1-1 2 1 0 3zM81 167l1 2-3 2 0-3 1-2zM80 165l-1 0-1-1zM76 161l0 2-1 0zM153 39l1 1-3 1-1-1zM173 45l1 1-7 3 1-2zM233 19l-27 21 3 0 0 3 7-2 1 3-2 5 2 2-4 3-1-2 1-2 0-2 1-3-5 0-2-1-1-2-4-2-3 0-4-2-3 1-2 1-10 2 9-5-13 5 0 1-5 2-16 6-19 4 26-8 6-4-6 1 0-1-2 1 1-1-4 1 3-3 0-1-4 1 0-2 2-1 0-1 2-2 6-2 10-2 1-1 3-1-10 1-2-1 0-2 10-2 2 0-2 1 4 0 1-1-1-1 0-2-2 0 16-4 13-2 2 0 0 1 5 0zM154 31l5 1-3 1-1-1-2 0zM701 70l0 2-2 0 1 3 0 1-5-1 1 6-6 2 5 5-1 1 1 2-4-2-8 0-4-1-1 0 0 2-6 0 0 1-3 3-1 2-1 0-1-1-3 0-1-3-2 0 0-3-4-3-7 1-3-3-7-3-6 1 4 12-2 0-4-3-3 2-1-4-3-1-4-4 3 0-1-2 4 0-1-5-5-1-4 2-2 0 0-2-2-2-2 0-2-2 1-2-1-1 1-3 2 2 0-2 4-3 3 0 9 3 2-2 4 0 3 2 0-1 4 0 0-1-5-2 2-2-1 0 2-1-3-2 1-1 8-1 7-3 4 1 2 3 2-1 4 1 0 2 2-1 5-2-1 1 4 2 9 7 1-2 4 2 2-1 7 4 3 0zM637 94l-4-12 6-1 7 3 3 3 7-1 4 3 0 3 2 0 1 3 3 0 1 1 1 0 1-2 3-3 1 0-1 2 2 2 1-1 4 2-2 2-3 0-1-3-3 1-1 4-2 0 0 1 2 1 1 2 0 4-4-1 0-2-7-3-5-4-3-3-3-1-2-3-4-1-3 2 0 2zM891 251l10 5 3 4 1 2 4 2 1 2-3 1 0 2 2 2 2 4 1 0 0 2 2 1-1 0 3 2-1 1-2 0 0-1-5-1-3-4-1-3-4-2-4 2 0 3-2 1-5-1zM924 255l1 3-1 1-1-3-5-4 1-1zM919 263l-4 2-4-2 0-1 4 0 1-2 0 2 2 0 3-3-1-2 2 0 0 3-1 2zM929 261l3 5-1 1-2-4-1-2zM891 251l-2 24-2-3-2 0-1 1-4 0 2-3 2-1-2-7-5-4-2 0-4-3-2 2-1-3-2-2 5-1 0-1-4 0-1-3-2 0-1-2 5-2 4 1 1 8 3 2 2-4 4-2 2 0zM845 275l0 1-2 3-2 1 1-4zM872 267l0-3 1-2 0 3zM827 226l-1 3 2 4-1 2 4 3-4 0-1 6-2 3-2 9 0-1-3 2-1-3-4-1-3 1-1-1-4-1 0-5-2-1-1-6 0-4 2-2 0 2 2 2 4 0 2-2 3 1 2-1 3-11zM859 252l3 1 1 3-2-2-6 0 1-2zM852 256l-2-1 0-2 3 0 0 1zM855 233l0 2 2 1 0 1 0 3-1 0-1 2 2 2-1 1-2-7zM841 238l4 0 2-3 1 1-2 4-12 1-1 2 3 4 1-2 6-1-1 1-1 0-1 2-3 2 3 4-1 2 3 4-1 2-1 1-1-1 1-3-2 2-1-1 0-2-1-2 0-4-2 1 0 10-2 1-1-1 1-4 0-4-2 0 0-2 3-13 3-3zM832 280l-4-3 3-1 2 3 0 1zM835 273l5-1-1 2-4 1-4-1 0-1 3-1zM827 273l2-1 0 2-7 1 2-2 1 0 1-1zM800 265l1 2 5 0 1-1 5 1 1 3 4 0 3 3-4 1-2-1-6-1-5-2-4 0-4-1-1-2-2 0 2-4 3 1zM790 245l1 5 2 0 2 3-2 10-3 0-5-6-7-13-2-3-2-6-10-12 0-2 6 1 9 12 3 0 3 2 1 3 2 2-1 3zM346 423l4 3 7 3 0 1-8-1zM350 352l1 14 4 3 0 2 2 2 1 1-2 5-3 1-8 1 3 6-1 1-3 0-3-1 0 1 1 3 2 1 1-1 1 2-3 3 1 4-2 0-2 2 1 2 5 3 1 3-3 1 0 4-1 2 4 5-9-1-3-4-1 0-1-1-2-3 1-1-3-12 1 0-2-2 0-1-3-5 1-1-2-4-1-6 1-1-3-6 2-3-1-2 0-4-4-9 1-4-1-3 0-3 2-6-1-1-1-7 3-2 0-5 1-3 4 1 2 3 0-3 4 0 6 6 9 5 0 2-1 5 6 1 2 0 2-3 0-3 1-1 1 2 1 3-4 4zM346 423l3 6 4 0-2 2-7-1-11-7 10 4 0-3 1-1zM311 307l2 5 2 1 0 4 4 9 2-1 0 1 0 4-3 2 1 7 1 1-2 6 0 3 1 3-1 4 4 9 0 4 1 2-2 3 3 6-1 1 1 6 2 4-1 1 3 5 0 1 2 2-1 0 3 12-1 1 2 3 1 1 1 0 3 4 8 1-2 0-2 2 1 2-4-1-8-3-6-11 0-2 1-3-4-1 1-2-1-5 3 1-1-7-2-1 1 4-2 0-2-11 0-2-3-7 1 0 0-16-4-12 1-4-2-23-3-11zM581 258l1 8 2 2 1 5-5 0-1 3 0 1-1 8 3 2 0 4-2 0-2-4-2 0 0-2-2 1-2-1-1-1-3-1 0-1-6 1-1-14-3 0 0-2-1 0-2 1-1 3-2 0-3 1-3-9-8 0-3 1 0-1 1-3 2 0 1-2 1 0 1 2 4-5 2-7 3-5 2-17 3-3 4 2 4 1 1-2 2 0 3-2 1 1 2-1 5 0 2 3 1 0 3-1 4 4-1 5 2 0-3 4-3 13zM615 248l-1-3 0-14 3-5 2-1 2-2 4 0 10-17 0-7 5-2 0 10-5 14-6 10-9 9zM609 259l-4-4 0-2-11-8 0-4 3-7-3-9 4-4 1 0 1 4 2 0 4 3 4 1 3-4 1 2 2 0-2 4 0 14 1 3-3 3-2 7zM568 211l-3-3 0-4-2-3-2-7-1 0 2-5-1-1 2-5 2 0-1-16 3 0 0-7 32 0 3 12 2 3-1 2-3 1-1 13-3 10-2 1 0 7-1-6-2-2 0-5-1 0 0 1-2 0 1 3-3 5-1 0-2-2-3 3-5-1-1 1-3-3-2 0-1 5-2 1zM564 169l1 14-2 0-2 5 1 1-2 5 1 0 2 6-3 2-2 4-3 2-3 0 0 1-2 3-8 2-1-5-2-3 0-2 4 0-2-3-1-9-2 0 0-3-1-1 1-5 4-3 1-14-2-3-1-6 2-2zM306 168l-1 4 1 2-5 0-2 0-1-1 1-1 4 1 1-1-1-3-1 0 1-1zM306 174l-1-2 2-4 4 1 0 1 2 0 0 1 2 1-1 2-4-1-1 1 0-1-3 3zM833 16l1 0 2 1zM616 78l-1 2-2 1-2 3 7 8-1 3-7-5-4 0-4-2-6-1-9-5 2-1 1-2-1-2 3-1-2 0-1-1 4-1-1-5-5-1-2-2-1 1-3-1-2-2-1 0 0-2-2-1-4 0-2-2 3-1-5-4-1-2-6-2-2-3 0-1-1-2 1-2 2-2-3-1 6-6-3-1 0-2-2-1 1-2-3-3 1-1-3-1-1-2 7-1 9 1 10 3 0 2-5 1-10-1 4 2 1 3 4 1-1-2 1-1 5 2 2-1-2-1 3-3 4 1 1-1-2-1 0-2-2-1 6 1 1 1-2 0 1 1 2 1 2 0 0-2 9-2 2 0-1 1 9-2 3 2 1-2-2-1 18 3 0-1-5-2-3-3 3-1 0-2 6 0 1 1-1 2 4 2 1 2 3 1 0 2-1 3 2 0 2-1 1-2-2-1 0-2-4-1 0-2-3-1 2-2-1-1 2 1 1 2 2 0-2-1 3-1 8 1-5-3 11-1-2 0 1-1 22-2 1-1 3-1 7 2 7-1 7 2-5 2 6 0 3 1 3 0 15 1-1-1 7 0 14 5 0-2 4 1 11 0-4-2 1-1 18 1 11 3 11 0 8 2 13 0 6 2 1-1-4-2 18 1 4 1 15 9-1 1-3-1 12 6-4-1-5 2-1 4 1 1-6-2-2 2-3-1 0 1-3 0 2 4 5 1 4 4-2 0 2 3 2 1-2 1 3 3-3 1 3 3-1 3-16-13-3-3 0-2-2-1 3-1 0-6 1-1-4-4-2 0 2 2-2 3-6-3-4 1 1 4 3 1-7 1-2-1-3-1-2 1-7 0-6 1-3 11 4 0 6 3 0-2 2 1 7 3 9 13 1 6-1 9-2 2-4-1-2 2 0 1-1-2 1 0-2-4-3-2 1-2 4 1-4-10-4 2-4 0-3-3-4-2-5-1-11-9-7-1-5 0-1 2 3 2 0 4 1 1-2 2-9-2-2 2-5 1-5 0-6-3-7 0-4-1-2-2-8-2-1 3 2 1-1 2-13-3-6 4-3 1-2-2-3 0-7-4-2 1-4-2-1 2-9-7-4-2 1-1-5 2-2 1 0-2-4-1-2 1-2-3-4-1-7 3-8 1-1 1 3 2-2 1 1 0-2 2 5 2 0 1-4 0 0 1-3-2-4 0-2 2-9-3-3 0-4 3 0 2-2-2-1 6 2 2 2 0 2 2 0 2zM660 2l7 1 5 1 1 1-12-1-5-1zM677 4l6 1-10 1 2-2zM746 8l12 1 1 1-9 0-5-1-1-1zM765 9l5 1-4 0-5 0zM755 12l2 0 5 1zM577 3l11 0-6 0zM550 55l-7 0 1-1 3-1 3 1zM597 12l3-2 8-2 14 0-17 3-3 3 1 2 5 1-8 0-4-1-1-1 2-1-1-1 3-1zM817 57l17 13-4-1 2 5 5 3 2 2-3-2 0 3-3-3-10-12-7-7 0-1-2-2 1 0zM160 24l-2 1 0 1 2-2 5 0 1 2-7 2-6 2-1 0-2-1 1-1-4 0 2-2-3 1-4 2 15-9zM166 17l-2 0 2-1 4 0zM579 79l1 0 4 2 3 0-1 1-5 2-1 0 0-2-3-1zM292 143l3 0 0 1-3 0zM295 142l2 2-1 2zM293 149l1 0 0 3-1 2-1-3zM362 421l2-2 2 1 1-1 2 1 0 1-3 1-1-1-1 1zM526 4l3-1 8 2-4 0-3 2-2 0-10-3zM559 19l-5 1 1-1-3-1-3 1-2 2-7-1-2 0 0 1-4 0 0 1-2 0-5 7 1 1-1 1-2 0-1 2 1 3 1 1 0 3-3 3-1-1-4 3-3 0-3-1-2-8 11-6 7-7 8-4 7-1 3-2 6 0 7 1-3 1zM547 3l-7 1-10-1zM543 6l-4 0-3 0 1 0-1-1z",
  "M421 1l34-1 10 1-18 0 32 1-13 1 4 0-4 2 0 1 2 1-6 0 3 1 0 1-2 1 2 1-4 0 2 1-1 0-5 0 2 2-5 0 5 2 0 1-3 0-3-1 0 1-3 1 8 0-11 3-8 1-6 3-12 3-2 1-2 3-4 2 0 2-4 4-3 0-2-2-4 0-4-6 0-4-1-2 1-1-1-1 3-2 4-1 2-3-6 2-2-1 2-2 6 0-4-2-3 0 3-1-3-4-2 0 1-1-5-1-12 0-4-1 8 0-11-1 15-2 1 0-5-1 11-1 21-1 10 1zM660 411l3 2-2 1-3 1zM845 275l3-2 4 0-7 3zM543 346l1-2 1 3 3 1 4-2 1-13 2 3 0 4 2-1 5-5 2 2 4-1 1-3 1 0 2-4 7-5 5 1 1 7-1 5-2 0-1 4 1 1 2 0 1-1 1 0-1 5-7 10-8 7-4 1 0 1-8 0-8 3-3-2-1-5 1-1 0-2zM576 347l-1-1-2 1-3 3 2 3 3-2 1-3zM576 347l0 1-1 3-3 2-2-3 3-3 2-1zM199 123l7 0-1 0 8 4 8 0 0-1 5 0 2 4 0 3 1 1 2 1 2-2 3 0 1 1 2 6 0 5 4 1-5 13 0 6 2 7 3 1 1 1 9-3 2-1 2-6 5-2 4 0 0 2-3 5-1 5-2-1-1 2-6 0 0 2-2 0 3 3-1 2-3 0-2 5-4-5-2-1-5 2-11-5-3-3-4-1-4-6 0-2 1-1 1-3 0-5-4-8-2-2 1-3-2-2 0-3-1 0-2-4 1-7-4-2-2 5 4 13 0 8 1 0 1 3-2 2 0-2-4-5 1-4-4-4-1-2 1 0 2-3-2-4zM350 352l2-1 4 3 8 6-1 2 1 2-1 2-2 2-8-2-2-2zM364 364l-1-2 1-2-2-2-10-7-2 1 5-8 4-4-1-3-1-2-1 1-1-6-3 0-1-6-2-1-1 1-3-1-2-7 1-1 0-6-1-2-1-1-1-4-5 0-1-4 0-1-1-4-3-1-5-4-3 0-3-3 0-7-4 0-4 4-6 0-1-5-2 2-2 0-1-2-2 0 0-2-3-5 1-3 2-1 0-5 6-4 2 0 1-11-2-4 1-3 2 0 0-1-2-1 0-2 6 0 0-1 2 3 2 2 2-1 6-5 0-1-2 0-1-5-1-1 5 1 6-3 1-1 0-1 1 0 1 1-1 1 2 3-2 4 1 4 2 1 1 1 4-3 3 1 1-3 2 0 3 2 1-2 1 2 1-1 4-7 1 0 2 8 1 1 0 2-2 4 1 1 5 0 0 4 2-2 8 3 2 2-1 2 3-1 6 2 4 0 8 7 4 2 1 1 2 7-1 6-9 15-1 18 0 6-3 5 0 3-2 2 0 2-7 2-5 2-2 3-2 3 0 10zM309 282l3 0 4-4 4 0 0 7 3 3 3 0 5 4 3 1 1 4 0 1 1 4 5 0 1 4 1 1 1 2 0 6-1 1 0-1-3-2-7 1-1 10 0-1-4 0 0 3-2-3-4-1-1 3-2 1-4-9 0-4-2-1-2-5 1-4-1-6 0-2 0-7zM306 257l-2 0-6 4 0 5-2 1-1 3 3 5 0 2 2 0 1 2 2 0 2-2 1 5 3 0 2 6 0 7 0 2 1 6-1 6-2 0-3-2 0-1-14-10-1-3 0-1-12-24-4-4 1-1-2-4 1-3 2-2 0 4 2 0 1 2 2-2 2-5 3-2 3-4 1-2 0-3 4 4 2 4 6 0 3 2-2 3zM314 237l-2-3 0 1-6 0 0 2 2 1 0 1-2 0-1 3 2 4-1 11-2-2 2-3-3-2-6 0-2-4-4-4-3-2-3 0-4-5 1 0 0-3 2-1 2-4-1-1 1-6-2-6 1-1 1 0 0-1 0-2 2-1 3-3 1-4 2-2 4 0 5-5 2 1-1 1-2 1-3 4-1 5 1 0 1 7 1 1 5 0 2 4 4-1 1 1-1 6 1 4-1 2 1 2zM286 209l0 3 0 1-1 0-1 1-1-3 1-1-2-2-4 2 1 3-2 1-1 0 0-2-1 1-1-2-3 0 1-3-1-2 1 0 1 2 1 0 1 1 5-3 2 0 3 1zM272 206l-1 0 1 2-1 3-2-1 0-2-3-4-1 2-1-2 0-3-1 0 2-1 4 1 1 0zM270 201l-1 0-2-1-3 0-5-7 3-1 0-2 2-1 1 1 3-4 1 1 4-1-4 13zM273 186l-4 1-1-1-3 4-1-1-2 1 0 2-2 1-1-1 0-2-1 0-2-2 0-3 4-3 8 0zM256 188l2 2 2 0-1 2-6-2zM248 187l2-5 3 0 1-2-3-3 2 0 0-2 5 0-1 7 2 1-3 2 0 3-3 2-3 0zM258 175l2-2 1 0-2 7-2 2zM332 222l0 1-1 1-6 3-5-1 1 1 1 5 2 0 0 1-6 5-2 1-4-8 1-2-1-4 1-6-1-1-4 1-2-4-5 0-1-1 0-4-1-3-1 0 1-5 3-4 2-1 0 1-2 1 1 3-2 3 1 3 1-1 1-2-1-5 4-1 0-2 1-1 1 3 1 0 2 3 6 0 1 1 2 1 2-2 7-1-3 2 1 1 2 1 2 1 0 3 3 1-2 2 0 3-2 1-1 3zM343 234l-2 0-4 3-3-2-1-4 2-4-2-3 1-1-1-1-1 0-2-3 1-3 2-1 0-3 2-2 3 4 0 2 1 0 3 3-1 3-2 1 0 3 1 3 1 0zM349 233l-4-1-1 3-1-1-2-5-1 0-1-3 0-3 2-1 1-3 3 1 3-1 2 1-1 3 1 5zM357 226l-4 7-4 0 1-5-1-5 1-3 3 1zM514 69l5 1-2 4-1 1-2 2 0 2 1-1 1 1 1 2-1 1 1 3 1 0 0 2-2 1-5-1-4 1 0 2-3 1-2-2-1 1-5-1-1-2 2-1 0-7-4-4-3-2-1-2 3 0 4 0 0-3 2 1 5-2 1-2 2-1 4 4zM521 90l2-1 0 2 0 3-2-1zM291 242l0 3-1 2-3 4-3 2-2 5-2 2-1-2-2 0 0-4 2-3-1-1-1 1-2-1 0-5 1 0 2-6 3-3 3 2 1 2 3 0zM320 173l2 1-1 1-3 0 0-2zM290 173l2 0 1 2-3 1-1-1-1-1zM280 156l5 0 3 3 2-1 4 5 3 1-1 1 2 0 2 1 0 1-10 1 2-2-2-1-1-3-8-3-1 0 1-1-2 0-4 2-3 1 4-4zM584 324l-5-1-4-2 0-4-4-4-2-6 4 1 6-7 4-2 0 1 2 0 4 3-1 14zM579 323l-7 5-2 4-1 0-1 3-4 1-2-2-5 5-2 1 0-4-2-3 0-11 3 0 1-13 6-1 1 1 2-1 3-1 2 6 4 4 0 4zM553 333l-1 13-4 2-3-1-1-3-1 2-3-5-2-18-6-15 0-2 5-2 1 2 12 0 1 1 7 1 7-2 3 1-4 2-1-1-6 1-1 13-3 0zM454 191l-2-4 1-1 3-6 4 0 3 2 4 5 1 8-11-1-3 1 0-3 2 0 2-1 3 1 1-1 0-1-2 1-1-1zM468 195l-1-8 1-3 3 1 3-1 11 0 1-3-3-31 4-1 18 16 1 2 2 1 1 3 3-1 0 9-2 5-6 0-1 2-6 0-2 1-4 4-1 1-1-1-3 7-1 5-2 1 0-2-2 2-3-1-1-2-1 0 1-2-2-3-3 1-2-1-1 0zM454 164l1-1 10 0 0-6 1-1 2-1 0-9 9 0 0-5 10 8-4 1 3 31-1 3-11 0-3 1-3-1-1 3-4-5-3-2-4 0-1 1 1-14zM507 218l-2 0 0-11-3-5 2-4 4-2 2 2 0 3 0 3-2 6zM540 157l1 6 2 3-1 14-4 3-1 5 1 1 0 3 2 0-1 3-3-4-2 2-4-1-5 2-4-2-2 1-4-3-4 1-1 7-2-2-2 1 0-3-3 0-2-5 0-3 2 0 1-2 6 0 2-5 0-9 3-1 17-14 4 1 2 2zM507 218l1-8 2-6 0-9 2-5 3 0 4 3 2-1 4 2 5-2 4 1 3-2 3 5-3 5-4 14-2 2-3-2-2 2-2 7-5 2-3-1-4-7zM540 193l1 3 0 5 2 3-4 0 0 2 2 3 2 4-3 5 0 6 4 6 0 5-4-2-13 0 0-3-3-5 2-8 2-2 3 2 2-2 4-14 3-3 0-2-1-1zM502 200l0 2 3 5 0 11-2 1-1-3 0-6-1-7-1-2 0-1zM500 200l2 10 0 6 1 3-8 5-3-1-1-5 2-7-1-11zM478 203l3 1 2-2 0 2 2-1 3 3 2-2 2 1 1 6-2 7 1 5-5-1-8 3 0-5-3-3 1-7 1-1-1-4zM462 194l4 1 2 0 1 1 1 0 2 1 2-2 2 1 1 3-1 2 1 0 1 2-1 2 1 4-1 1 0 3-1 0-1 1-1-1-1-4-2 1-2-6-3 1-3 3-3-5-2-3 2-2 2-1zM454 195l3-1 5 0 0 3-2 1-2 2-2-2zM477 213l-1 4 3 3 0 5-4-2-7-7 4-6 1-1 2 5zM463 208l3-3 3-1 2 6 1 0-4 6-4-4zM485 203l1-5 3-7 1 1 1-1 4-4 2-1 4 0 0 3 2 5 3 0-1 4-3 2-10 0 0 5-2-1-2 2zM576 222l-5 0-2 1-1-1-3 2-2 0-1 2-4-1-4-2-3 3 0 2-3-1-4 6 0-3-4-6 0-3 0-3 2-4 8-2 2-3 0-1 3 0 3-2 2-4 3-2 2 4 0 4 4 4 4 7zM551 228l-2 15-3 5-2 7-4 5-1-2-1 0-1 2-2-2-2 2-2-4 2-2-1-2 3-2 0-1 1 1 3 1 1-5-2-5 2-4-1-1-2 0-1-3 4 0 4 2 2-6 2-2zM531 233l5 0 1 3 2 0 1 1-2 4 2 5-1 5-3-1-1-1 0 1-3 2 1 2-2 2-7-10 2-8 5-1zM527 233l4 0 0 4-5 1zM585 273l7 5 0 3-1 4 0 3-1 4 1 1-8 3 0 3-4 2-6 7-4-1-2-1-4 0-3-5 0-12 6 0 0-7 1 0 0 1 3 1 1 1 2 1 2-1 0 2 2 0 2 4 2 0 0-4-3-2 1-8 0-1 1-3zM590 276l3 1 2 2 0 13 2 1 1 3 0 4-3 4-1-2 0-6-4-4 1-4 0-3 1-4zM595 284l5 1 3 0 1-2 5-1 2-2 0 16-4 7-5 4-8 8-1 2 2 6-1 7-7 5-1 1 0 4-1 0-1-5 1-4-1-7 4-7 1-14-4-3-2 0 0-4 8-3 3 3 0 6 1 2 3-4 0-4-1-3-2-1-1-5zM585 340l-1 1-2 0-1-1 1-4 2 0zM536 259l-2 4-1-3 2-2zM534 264l3-1 8 0 3 9 3-1 2 0 1-3 2-1 1 0 0 2 3 0 1 14 4-1 1 0 0 1 0 6-6 0 0 12 3 5-5 2-7-1-1-1-12 0-1-2-5 2 1-11 4-9 1-2-2-8 1-3zM585 250l0 4-2 4-2 0 0-6 1 0 1-2zM592 123l-1 1-1-1 0 2 1 1-1 1 1 0 1 1-1 6-2-6 1-7 2 0zM592 121l-2 0 1-5 2 0 0 1zM636 288l1 4 0 8 0 1-1-2 0 1-1 4-10 29-5 3-3-3-1-8 1-5 1 0 2-7-1-7 2-4 5-2 4-4 1-4 1 1 3-7zM591 127l-1 0 0-4 1 1zM454 191l5-1 1 1 2-1 0 1-1 1-3-1-2 1-2 0zM525 131l-2-6-4-5 0-2 2-2 0-8 3-1 2 0 0 2 2-1-1 2 1 2-1 3-1 2 0 2 2 0 1 2 0 3-3 3 0 3zM477 141l0-5 5-3 4-1 1-2 3-1 1-3 6-2 0-1-2-9 2-2 7-3 9 0 3-1 5 0 0 8-2 2 0 2 4 5 3 9 0 10-1 2 2 6 2-1 3 4-17 14-6 2-1-3-2-1-1-2zM591 124l1-1 3 1 4-4 2 4-6 3 4 3-5 5-3-1zM637 152l1 1 6 0 4-7 1 1 1 3-2 0 1 3-1 0-1 5-8-1zM635 150l-1-2 1-3 2 4 0 2zM625 132l2 5-2 0-1-2-3 0 2-3zM601 124l-2-4 5-3 0-7 3-3 4 1 1 0 3 4 1 1 1 1-1 2 0 2 2 3 4 2 1 3 0 2 1 0 0 2 2 2-3 0-2 3-4 0-9-7zM648 158l0-5 1 0-1-3 2 0 3 3 4 2 3 4-2 7-2 0 0 5-3 2 0 2-2 0-2 3-2 0-2 2-4-9 7-4 1-7zM956 300l1 3-1 0zM955 300l1-4 1 1-1 3zM782 196l-1-4 1-4 3 0 5 2 1-3 3 2 1 6-4 3 2 2-3 1-2 1-3 0zM788 188l-3 0-3 0-1 4 1 4-3-2-2 0 0-3-3 0 0 16 2 0 2 7 5 4-1 2-2 0 0-2-2-1-1 0-5-7 0 2-1-4 3-11-3-7-3-5 2-4-6-8 1-1 0-4 2 0 3-2 1 1 1 2 2 0 0 7 3-2 2 1 1-2 2 1 2 3 1 3 3 3zM794 189l-3-2-1 3-2-2 0-5-3-3-1-3-2-3-2-1-1 2-2-1-3 2 0-7-2 0-1-2-1-1 2-4 2 1-2-4 1-1 5 7 3 0 2 3-2 2 4 2 8 10 1 3zM770 166l-3 2-2 0 0 4-1 1 6 8-2 4 3 5 3 7-2 7 0-5-1-2-1-4-6-14-4 4-3-1 0-5-1-3-3-4 0-2-2 0-2-3-1-3 1 1-1-3 2-1-2-6 3 0 0-7 0-2 3-3 2 1-1-4 1 0 3 3 2 5-2 3 1 4 3 0 1 3 2 1 0 3 4 2 1-1 1 1zM788 202l2-1 3-1-2-2 4-3 0-4-2-9-8-10-4-2 2-2-2-3-3 0-5-7 6-1 2-2 4 2 0 2 2 2 3 1-3 3-1 6 11 14 3 6 0 7-9 11-2-2 1-3zM817 91l-1 0 0 2 2 2-4 4 1 2 4 3-3 0 0 1-3 0 0 1-2-2 0-1-2-3-3-1 2-4 1-3 4 2-2-2 3-1 0-2zM815 106l1-1 0-1 3 0 0-1 6 6 2 4 0 2-5 2-2-5-3-3 1-1zM702 70l2-1 6-4 13 3 1-2-2-1 1-3 8 2 2 2 4 1 7 0 6 3 5 0 5-1 2-2 3 1 3 0 1 5 1 1 4 0 1-1 6 3 0 1-5 0-1 3-3 1-2 2-4-1 0 2 3 2-2 3-9 2-2 2-12-3-11 0-5-5-5-2-7-1-1-2-1-3-3-3-7-2zM755 138l1 4-2-1-3 3 0 2 0 7-3 0 2 6-2 1-2-6-1 0 0 3-2-2 0-2 2 0 0-4-7-1-1-2-3-2-1 3 3 2-2 2 2 1 3 9-5 1 0 3-1 2-3 2-6 9 0 2-5 2 0 3 1 8-1 3 1 7-1 0-1 3 1 1-3 1-2 4-2-4-4-9-2-5-2-7-4-5-5-20-3 3-2-1-5-4 1-1-1-2-3-3 1-2 6 0-4-8-2-1 2-4 3 0 4-11 0-2 1-2-2-2-3-5 0-1 5 0 2 0 2-3 4 4 0 3 2 2 0 1-2 0 2 4 8 4-2 2 0 3 10 5 4 1 2 1 7 1-1-5 1 0 2 3 2 1 6 0 0-2-1-1 2-1 4-5 2 1 1-1 2 2 0 1z",
  "M748 160l1 3-1-1 1 3-5-8-2 0 0 4-3-1-3-6 0-2-2-1 2-2-3-2 1-3 3 2 1 2 7 1 0 4-2 0 0 2 2 2 0-3 1 0zM741 140l1 1 0 2-6 0-3-2 3-3zM731 139l1 5-7-1-2-1-4-1-10-5 0-3 2-3 14 8zM697 113l-2 3-2 0-5 0 0 1 3 5 2 2-1 2 0 2-4 11-3 0-2 4 2 1 4 8-6 0-1 2-2-1-4-5-13 1 0-4 4-2-1-1-1-1-1-3-3-2-3-4 5 2 6 0 3-2 0-3 1-2 2 0 0-1 3 0 1-1-1-2 0-2 2-1-2-2 3 0 0-4-1-3 1-1 7-2 3 1 1 3zM666 107l5 1 1-1 1 1 1-2 1 0 1-3 2 1 1 4 1 1 3-3 4 1 1 1-7 2-1 1 1 3 0 4-3 0 2 2-2 1 0 2 1 2-1 1-3 0 0 1-2 0-1 2 0 3-3 2-6 0-5-2 2-3-1-2-2 0-2-5 1-2-2-1 1-6 2 1 2-1 0-1 3-2 0-2 2-1 0-1zM670 108l0-4-1-2-2-1 0-1 2 0 1-4 3-1 0 2 2 1-1 1-3-1 1 2 6 1 4-1 2 3 2 1 1 3-4-1-3 3-1-1-1-4-2-1-1 3-1 0-1 2-1-1-1 1zM672 91l0-1 2-1 4 1 0-2 1 0 4 1 8 0 4 2-4 2 0 1-3 1 0 2-3-1-3 3 0 1-4 1-6-1-1-2 3 1 1-1 2 0 2-2-4-2-1 1-2-2 1-2zM628 93l3-2 4 3 4 0 0-2 3-2 4 1 2 3 3 1 3 3 5 4 7 3 0 2-2-1 0 1-2 1 0 2-3 2 0 1-2 1-2-1-1-3-2 0-4-3-5-2-5 0-1 2-2 0-1-5-3-1 0-3-1 0 0-3 2 1 2-1-4-4-1 1 0 3zM626 132l-2-2 0-2-1 0 0-2-1-3-4-2-2-3 0-2 1-2-1-1-1-1-5-7-1-5 1-1 3 3 1 0 5-2 1 1-1 1 3 2 1 2 5 3 3 0 4-1 3-3 5 0 5 2 4 3 2 0 1 3-1 6 2 1-1 2 2 5 2 0 1 2-2 3 3 4 3 2 1 3 1 1 1 1-4 2 0 4-11-2-2-5-1 0-5 2-3-1-3-3-3-1-5-8-1 1-2-1zM592 123l0-4 1-2 0-1-2 0 0-3 1-2 0-2 1 0 3-1 3 1 7-2-2 3 0 7-9 7zM615 102l-1 0-1-2-6-3 0-2 3-1 2 2-1 0 2 2-1 1 3 1zM523 43l3-3 0-3-1-1-1-3 1-2 2 0 1-1-1-1 5-7 2 0 0-1 4 0 0-1 1 0 6 2 2 4-3 1-2 2 1 1-7 4-1 3 4 3-1 3-2 1-1 6-3 0-1 2-3 0zM561 50l6 2 1 2 5 4-3 1 2 2-2 1-1 2-12-2-4 1-1-3 1 0 0-1-1-3 4-1 1-1 1-1 0-1zM572 61l4 0 2 1 0 2 1 0 2 2 3 1 1-1 2 2 5 1 1 5-3 0-1 1 1 1-8 3 1 1-3-1-1 0-4-1-1-1-2 1-2 4-3-1 1-3 3 0-4-5-3-1-6 2-4-1-1 1-2-2 2-2-1-1 3-3-2-3 4-1 12 2 1-2zM552 56l1 4-1 0 3 5-3 4 1 1-3-1-4 1-6-3 0-1-3 0 0-1-3-1-3-5 0-2 8-3 2 1 9 0zM539 73l0 1-1 0 1 1-1 2-4 1-5-1-1-1-2 1-4-1 1-1 1 0 1 0 3-1 2 1 0-2 1-2 2 1 2-2 3 1 1 1zM551 72l2 2-1 0-2 4-6 2-6-3 0-3 1 0 0-1 3 1 6-2zM562 73l2-1 3 1 4 5-3 0-1 3-1-4zM567 81l3 1 1 0-2 1 0 3-4-1-4 2-6-1-1-2-3-1-3-4 2-1 2-4 2-1 4 1 4-1 4 4zM558 52l0 1-1 1-1 1-4 1-2-1 0-1-3-1-1-2 8-1zM559 47l2 3-3 2-4-2-8 1 0-4 2-1 2 2 2 0 0-2 2-1zM559 42l-1 2 1 2 0 1-5-2-2 1 0-2-2 0-1-2 5-1zM531 57l0 2 3 5-2 0-4 3 1 2 2 2-1 2 0 2-2-1-3 1-1 0-4-1-3 0 2-4-4 0-1-3 0-5 1 0 0-1 1-4 2 0 1-1 0-3 3 0 0 1 2 1 0 1 4-1zM554 85l1 1 6 1 4-2 4 1-2 4 1 2-2-1-2 1 0 2-2 0-2-1-4 1 0-2-2-1 1-3-1-1zM567 114l-1 1-3 0-3-1 0-2 1 2zM556 94l4-1 2 1 2 0 0-2 1 1-1 3-3-1-3 1 2 2-3 0-1-1 2 4-1 1 3 2 0 2-2-1 1 2-2 0 1 3-1 0-3-1-4-9 1-4zM612 108l-1 0-4-1-8 2-3-1-3 1-1 0 0 2-1 1-1-1 1-2-4 0-1 2-4 0-2-2-3 0-1 2-1 0-3-2-3 0-3-5 0-2-1-2 2-3 4 0 0-3 5 1 5-3 4 0 9 3 5 0 2-2 3 0 3 2 0 2 3 2-1 1 1 5zM564 92l2-1 2 1 1 1 2 1-1 1-2 0-3 3-1-2 1-3zM551 96l-1 4-2-3-1-6 1-1 2 1 0 4zM539 78l3 2 3 0 1 2-1 1-7-1 0 1 7 7-6-3-3-2-1-3-1 0-1 1-1-1 1-1 3 0 1-2zM522 75l0 1 3 1-2 1-1 0-1 1-1 0-3 1-2-2-1 1 2-4 4-1zM514 65l-1 4-3-1-4-4 5-1zM515 58l0 3 0 1-1 0 0 3-3-2-3 1 3-5zM478 92l2-1 0 2 4-1 0 2-1 1 0 4-2 0 1 2 0 3 0 1-2 4-2 0 0-5-2-2 3-6zM481 108l1-3 0-1 0-3-1-2 2 0 0-4 1-1 0-2-4 1 0-2-2 1 0-2-1-1 4-3 14 1 1 2 5 1 1-1 2 2 3-1 0 2-2 2-3 1-3 6 1 1-2 4-2 1-1 2-6 0-3 3-1-1-1-3zM486 56l1 2-2 3-4 2-4-1 2-3 0-3 4-3 0 3zM946 319l2 4-2 1-1-1-2-3-1-4 1 0zM947 281l0 1-2 0 0-3zM946 277l0 1-2-6 1 0zM944 278l-3 0 0-2 2 0zM941 271l1 2-4-4zM935 268l1 1-2-1-1-2zM935 385l-5 4-3 1-1-1 4-3 1-2-2-1 4-2 4-5 1-3 1-7 1 0 0 2 1 1-2 6 2-2 0 1-1 3 1 1 5-1-6 5-1 0zM908 396l16-10-1 3 3-2-2 3-8 5-1 2-5 1-6 5-6 2-5-1 1-1 9-5zM862 387l1 0-6 8-1-1-3 2-2 0 4-9 3 1zM824 359l-6 2-3 3-9 1-7 3-3 0-3-3 1-2 2-1 2-3 2-10-1-12 1 2 0-3 2 2-1-7 5-9 0 3 1-3 7-4 2 0 6-3 4-1 5-5 1-4 3-3 0 4 2-1-1-2 1-2 1 1 1-3 5-5 1 1 0-1 3-1 3 4 3 0 0-2 5-7 2-1 3 0 1-2-2-2 1 0 3 2 5 2 3-1 1 1-2 4-1 0-3 6 6 7 2 1 0 1 3 1 2-1 4-9 2-9 4-7 1 8 0 7 2-2 1 3-1 15 5 5-1 1 1 2 0 4 1-1 1 2 1-1-1 4 2 6-2 7-1 3-8 13-14 13-5 6-5 1-8 4-2-2 2-1-6 3-6-3 0-2 2-4-1-2-2 0 2-2 0-2-2 2-3 1 6-6 1-2-8 7-1-2 1-2-1-3 1-1-6-4-5 0-7 3zM726 213l0 4-3 2-2-3-1-5 1-6 2 2zM797 174l-3-1 0-3 0-2 5-1 1 1-1 4zM695 91l-1-2 1-1-5-5 6-2-1-6 5 1 0-1-1-3 2 0 1-2 2 2 7 2 3 3 1 3 1 2 7 1 5 2 5 5 11 0 12 3 2-2 7-1 2-1 2-3-3-2 0-2 4 1 2-2 3-1 1-3 5 0 0-1-6-3-1 1-4 0-1-1-1-5 3 1 2-2-1-1 0-4-3-2 1-2 2 0 10 1 11 9 5 1 4 2 3 3 4 0 4-2 4 10-4-1-1 2 5 6-1 0 1 2-3-2 0 2-3 1 2 2-4-2-1 3-2 4-6 3 1-2-2-1 1-2-2-2-3 4-1 2-2 0 0 1 8 6 1-3 5 2 1 1-3 1 0 2-2 2 0 2 4 2 8 9 1 3-1 1 3 2 2 6-2 0-2 13-5 6-3 1-1 1-1-1-1 2-6 2 0 4-2 0-1-2 0-2-8-1-2-2 0-2-4-2-2 2-4 1-3 1 2 4-2 0-1-2-1 1-4-2 0-3-2-1-1-3-3 0-1-4 2-3-2-5-3-3-4-1 0-1-2-2-1 1-2-1-4 5-2 1-5-2-3 3-1-2-1 0-6-1-11-7-3-1 0 1-8-4-2-4 2 0 0-1-2-2 0-3-4-4-5-1-5-5-1-3-2-1-2-3 0-1 2-2 4 0 0-2 3-1 0-1zM824 152l0 8-4-5 2-7 1 1zM525 77l1 0 2-1 1 1 4 1 0 3-2-1-2 1 1 4 7 7 2 0 0 1 6 4 0 2-4-2 0 2 1 1 0 2-1 0-1 3-1 0 1-3-2-4-11-7-2-2-1-3-3-2-3 3 0-2-1 0-1-6 1 1 3-1 1 0 1-1 2 0zM537 104l2 0-1 5-7-3 0-2zM521 95l2-1 1 3 0 4-1 0-1 1-1-1-1-6zM522 53l-3 0-1-4 0-1 5-2-1 2 2 1-3 3zM527 50l1 2-1 2-3-3zM486 56l-3 0 0-3 2 0 3 2zM493 58l0-2-1-2-3 0 0-3-1 2 0-3-1-1 2-5 5 0-3 3 5-1-3 5 2 0 3 3 1 1 2 4 3 1 0 1-2 1 1 2-2 1-8 0-1 2-2-1-2 2-1-1 3-3 2-1-3 0-1-1 3-1-2-2 1-1zM472 25l-1 2 2 1-3 2-8 2-8-1 2-1-4-1 4-1-4-1 2-1 3 0 2 1 4-1 2 0 3-1zM613 92l4 3 1-3 4 4 2 1-2 1 0 6-3-2 1-1-1-1-4 2 0-2-3-1 1-1-3-4 4 1-2-2zM614 102l-1 0-3-3 3 1zM596 87l6 1 4 2 4 0 3 2-1 1 2 1-4 0-3 1-3-2-3 0-1-3zM832 194l-2-3 2 0 1 2 0 3zM838 204l1-3 1 0 0 2 2-4 0 4-2 5-2-3zM849 210l1 5 0 3-2-4-1 2 1 3 0 2-4-3-1-2 1-2-2-2-1 2-1 0-2 2-1-1 1-4 3-2 1 2 2-1 1-2 1 0 0-3 2 2zM827 207l-3 3 4-7 1-4 1 3zM832 174l1 4 0 3-1 1 1 6 3 0 4 2 1 5-4-4-1 1-2-2-2 1-2-1 1-3-1-1 0 2-3-4 0-3 1 1-1-9 4 1 0-1zM836 199l-1-2 4 1 0 2-3 2zM845 196l1 4-2-1 1 4-1 1-2-5 2 0-1-2-2-2 3 0zM777 217l1 0 2 1 0 2 2 0 1-2 2 3 2 2 0 8 2 6-1 0-7-6-3-9zM827 226l-6-1-3 11-2 1-3-1-2 2-4 0-2-2 0-2 2 1 2-1 0-3 5-1 3-6 1 2 1-1 1 0 0-4 3-5 1-1 2 4 4 2 0 2-2 0 1 2zM820 221l0 4-1 0-1 1-1-2zM533 78l5-1 1 1-2 1-1 2-3 0zM554 20l1 2 3 1-1 1 3 3-1 2 2 1 0 2 3 1-6 6-10 2-4-2 0-3-1-2 2-3 5-3-4-2-1-4-6-2 1 0 7 1 2-2 3-1 3 1zM552 70l-1 2-3 0-6 2-3-2 4-3 1 0 2 1 4-1zM534 64l4 3 1-1 1 0 3 3-4 3-4-2-2 2-4-3-1-2 4-3zM600 188l0-10 3-1 1-2 3 7 11 12-1 1-1 0-4-6-3-2-2 0-2 0-1-1-1 2zM851 101l0 3 4 8 0 2-2 2-4 0-2 4-2-1-2-3-4 1-2 1-3 1 4 2 1 6-1 1-2-1-1-3-4-3 2-2 2-6 5-1 3 1-1-6 3 2 2-5-1-4-3-4 0-2 2 0zM847 86l0-2 4 4-3 1 0 3-5-2 1 3-3 0-2-3-1-2 2-1-3-6zM838 120l1-2 1 0 1-1 3 2-1 2-1-1-1 1 0 2-2-1zM343 316l2 7 3 1 1-1 2 1 1 6 3 0 1 9-2 3-2 0-6-1 1-5 0-2-9-5-6-5 1-10 7-1 3 2zM641 171l4 9-2 1-1 2-6 4-3 2-2 0-1 2-5 1-1 2-5 0-3-9 2-9 1 1 8 0 1 1 1 0 2-4 2-2zM591 134l3 1 2-3 1 0 2-2-4-3 6-3 7 4 9 7 7 0 1 2 2 0 1 3 4 3 1 4 2 3 2 1 2 6 8 1 1 0 1 2-1 7-7 4-8 1-2 2-2 4-1 0-1-1-8 0-1-1 0 3-1 2-6-12-6-6 0-5-2-4-3-2-2-5-6-8-1 0zM583 114l0-1 4 0-1 2zM583 114l3 1-2 1-2-2zM495 114l2 9 0 1-6 2-1 3-3 1-1 2-4 1-5 3 0 6-3 1-4 0-3 7-4 4-3 8-6 0 3-8 3-3 2-6 2-1 3-5 2-1 6-6 0-4 1-5 2-2 4-3 3-6 2 0 1 2zM599 160l-32 0-2-25-1-3 1-6 3 0 7 3 3-2 2-1 2 1 1 2 0-1 4 1 2-1 2 6-1 5-1 1-2-3-3-4 6 12 5 8 0 3zM567 160l0 7-3 0 0 2-22-14-4 3-2-2-4-1-3-4-2 1-2-6 1-2 0-9-1-4 1-1 0-3 3-3 0-3 10 3 2 3 9 4 2-3-1-2 2-3 6 0 1 1 4 1 1 1-1 6 1 3zM632 211l-7 12-4 0-5 4-2 0-1-2-3 4-4-1-4-3-2 0-1-4-1 0-2-4-3-4-2-1 1-2 1 0 1-8 4-7 2-7 3 0 1-2 1 1 2 0 2 0 5 4 2 4-1 3 0 2 3 1-1 1 4 5 9 5zM616 195l1 0 1-1 1 1 0 2-2 1 2 1-1 2-3-1 0-2zM635 199l0 7-3 5-2 1-9-5-4-5 2-3 3 3zM594 245l-9 0-3 1 1-7 4-6-2 0 1-5 1-1 1 1 5-1 1-2 3 9-3 7zM584 246l2 2-1 2-2 0-1 2-1 0 0-5zM545 90l-6-5-1-2 0-1 8 1 0 1 1 1 0 2-2 1zM554 91l2 1 0 2-5 2-1-1 0-3zM545 80l3-1 3 4 3 1 0 2 1 2-1 3-2 0 1-1-3-2-1 1-3-2 1-2-1-1 0-1-1 0 1-1zM549 90l-1 0-1 2-2-2 0-2 1-1 3 2zM550 92l-1-2 1-2 3 2-1 1zM330 201l2 0 0 3-3 0zM586 228l-4-4-3 1-1 0-3-4-2-2 0-2-3-4-1-1-3-3 2-1 1-5 2 0 3 3 1-1 5 1 3-3 2 2 1 0 3-5-1-3 2 0 0-1 1 0 0 5 2 2 1 3-1 4-1 0-1 2 2 1 1 1 4 7-5 6-5 1-1-1z",
].join("");

function WorldMap() {
  const t = useGrokTheme();
  const [sel, setSel] = useState<number>(-1);
  const W = 1000, H = 437;
  const pr = (lat: number, lon: number): [number, number] => {
    const M = Math.sqrt(3) / 2, A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796;
    const th = Math.asin(M * Math.sin((lat * Math.PI) / 180)), t2 = th * th, t6 = t2 * t2 * t2;
    const px = ((lon * Math.PI) / 180) * Math.cos(th) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
    const py = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
    return [(px + 2.7066299836960748) * 184.73156767339816, (1.3067131388872926 - py) * 184.73156767339816];
  };
  const c = sel >= 0 ? CITIES[sel] : null;
  return (
    <div style={{ width: "100%", minHeight: 200 }}>
      <svg width="100%" viewBox={"0 0 " + W + " " + H} style={{ display: "block", width: "100%", height: "auto", aspectRatio: "1000 / 437" }}>
        <rect x={0} y={0} width={W} height={H} rx={12} fill={t.dataviz.blueTint} />
        <path d={LAND2} fillRule="nonzero" fill={t.bg.elevated} stroke={t.border.strong} strokeWidth={0.6} strokeLinejoin="round" />
        {CITIES.map((ci: City, i: number) => (
          <circle key={ci.n} cx={pr(ci.lat, ci.lon)[0]} cy={pr(ci.lat, ci.lon)[1]} r={3.5 + ci.ev.length * 1.2} fill={ci.ev.some((e: string) => /Champion|Finalist|Top 8/.test(e)) ? t.dataviz.categorical[1] : t.dataviz.categorical[0]} fillOpacity={0.85} stroke={i === sel ? t.text.primary : t.bg.base} strokeWidth={i === sel ? 3 : 1.5} style={{ cursor: "pointer" }} onMouseEnter={() => setSel(i)} onClick={() => setSel(i)}><title>{ci.n + ": " + ci.ev.join(", ")}</title></circle>
        ))}
      </svg>
      <div style={{ fontFamily: t.font.family, color: t.text.secondary, fontSize: t.font.body2.fontSize, minHeight: 24, marginTop: 8 }}>
        {c ? c.n + ": " + c.ev.join(", ") : "Hover or tap a marker to see the events there. Gold markers are titles, finals and Top 8s."}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Page title="Zelda Z. | Pokemon TCG Juniors" summary="4x Worlds competitor and 2025 Puerto Rico Special Event Champion. Every major tournament from her first Regional in May 2022 to Puebla in October 2026." width="wide" palette={["#E3350D", "#FFCB05", "#3B6CB7"]}>
      <Section heading="Zelda Zhou, @pokemonzeldaz">
        <Text>Juniors competitor from the Bay Area. Four straight World Championships, a Special Event title, a Regional final and six Regional Top 8s.</Text>
        <Metrics metrics={[
          { value: "262-159-67", label: "Lifetime record", detail: "61 events through Puebla 2026" },
          { value: "58.3%", label: "Match-point rate", detail: "53.7% win rate" },
          { value: "4", label: "Worlds appearances", detail: "2023, 2024, 2025, 2026" },
          { value: "1", label: "Special Event title", detail: "Puerto Rico, Feb 2025" },
          { value: "1", label: "Regional final", detail: "Louisville 2024" },
          { value: "6", label: "Regional Top 8s", detail: "Toronto, Melbourne, Monterrey, Pittsburgh, Puebla, Louisville" },
          { value: String(DECKS.length), label: "Distinct decks" },
        ]} />
      </Section>
      <Section heading="Where she has played" caption="40 cities in 11 countries, plus Puerto Rico. Marker size grows with the number of events.">
        <WorldMap />
      </Section>
      <Section heading="Photo gallery">
        <PhotoGallery />
      </Section>
      <Section heading="Highlights">
        <Table columns={["Event", "Result", "Record", "Deck"]} rows={EVENTS.filter((e: Ev) => e.tag && e.tag !== "First Regional" && e.tag !== "First IC").map((e: Ev) => [e.date + " " + e.name, e.tag + " (" + e.place + ")", e.rec, e.deck])} />
      </Section>
      <Section heading="Championship Points" caption="Official TCG Junior leaderboard, championships.pokemon.com, updated Oct 29, 2026.">
        <Table columns={["Season", "CP", "North America rank", "Global rank"]} rows={[["2027 (in progress)", "574", "19", "27"], ["2026", "1360", "18", "43"], ["2025", "1655", "9", "14"], ["2024", "970", "25", "45"], ["2023", "270", "50", "104"]]} />
        <Text>North America = US & Canada. 2027 season in progress.</Text>
      </Section>
      <Section heading="Decks she's played">
        <DeckGallery />
      </Section>
      <Section heading="Tournament timeline" caption="Regionals, Special Events, Internationals and Worlds. Placing, record and deck.">
        <Timeline />
      </Section>
    </Page>
  );
}


