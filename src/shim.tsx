import { useState as us, useEffect } from "preact/hooks";
export const useState = us;
const T = {
  bg: { base: "#FFFDF8", elevated: "#FFFFFF", subtle: "#F6F1E7" },
  border: { subtle: "#EDE6D8", default: "#DDD3C0", strong: "#B9AC93" },
  text: { primary: "#1F2430", secondary: "#4A5163", tertiary: "#7A8091", accent: "#C2410C" },
  dataviz: { blueTint: "#E6EEF8", categorical: ["#3B6CB7", "#E0A800", "#E3350D"], other: "#B9AC93" },
  font: { family: "'Nunito', 'Segoe UI', system-ui, sans-serif", body1: { fontSize: 16 }, body2: { fontSize: 14 }, label: { fontSize: 13 }, caption: { fontSize: 11 } },
};
export const useGrokTheme = () => T;
function Lightbox() {
  const [src, setSrc] = us<string | null>(null);
  const [alt, setAlt] = us("");
  useEffect(() => {
    const c = (e: MouseEvent) => { const el = e.target as HTMLElement; if (el && el.classList && el.classList.contains("zoom")) { setSrc(el.getAttribute("data-full")); setAlt(el.getAttribute("alt") || ""); } };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setSrc(null); };
    document.addEventListener("click", c); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("click", c); document.removeEventListener("keydown", k); };
  }, []);
  if (!src) return null;
  return (
    <div class="lb" onClick={() => setSrc(null)} role="dialog" aria-label={alt}>
      <img src={src} alt={alt} />
      <div class="lbbar" onClick={(e) => e.stopPropagation()}>
        <span>{alt}</span>
        <a href={src} target="_blank" rel="noopener">Open original</a>
        <button onClick={() => setSrc(null)}>Close (Esc)</button>
      </div>
    </div>
  );
}
export function Page(p: any) {
  return (<div class="page"><header class="hero"><h1>{p.title}</h1><p>{p.summary}</p></header>{p.children}<Lightbox /></div>);
}
export function Section(p: any) {
  return (<section><h2>{p.heading}</h2>{p.caption ? <p class="cap">{p.caption}</p> : null}{p.children}</section>);
}
export const Text = (p: any) => <p class="txt">{p.children}</p>;
export const Callout = (p: any) => <div class="callout"><strong>{p.lead}</strong> {p.children}</div>;
export const Metrics = (p: any) => (
  <div class="metrics">{p.metrics.map((m: any) => (<div class="metric"><div class="mv">{m.value}</div><div class="ml">{m.label}</div><div class="md">{m.detail}</div></div>))}</div>
);
export const Table = (p: any) => (
  <div class="tw"><table><thead><tr>{p.columns.map((c: string) => <th>{c}</th>)}</tr></thead><tbody>{p.rows.map((r: string[]) => <tr>{r.map((c) => <td>{c}</td>)}</tr>)}</tbody></table></div>
);
export const Columns = (p: any) => <div class="cols">{p.children}</div>;
export const Bars = () => null;
