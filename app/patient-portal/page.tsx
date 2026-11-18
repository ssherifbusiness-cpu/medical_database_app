"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Figtree:wght@400;500;600&display=swap');

.pp{
  --header-h:64px;
  --bg:#eef3f4;--surface:#fff;--ink:#12292e;--muted:#5a7176;--line:#d5e0e2;
  --brand:#0f6b73;--brand-ink:#fff;--tint:#dcefef;--ok:#2f7d4f;--warn:#b4580a;--bad:#b42335;
  color-scheme:light;
  flex:1;min-width:0;
  display:grid;grid-template-columns:240px minmax(0,1fr);
  min-height:calc(100vh - var(--header-h));
  background:var(--bg);color:var(--ink);
  font:400 17px/1.6 Figtree,var(--font-geist-sans),system-ui,sans-serif;
}
@media (prefers-color-scheme:dark){.pp:not([data-theme="light"]){
  --bg:#0d1b1e;--surface:#142428;--ink:#e6f0f1;--muted:#93aaae;--line:#264046;
  --brand:#4fc3c9;--brand-ink:#06292c;--tint:#17393d;--ok:#6cc58d;--warn:#f0a35e;--bad:#ff8b98;color-scheme:dark}}
.pp[data-theme="dark"]{
  --bg:#0d1b1e;--surface:#142428;--ink:#e6f0f1;--muted:#93aaae;--line:#264046;
  --brand:#4fc3c9;--brand-ink:#06292c;--tint:#17393d;--ok:#6cc58d;--warn:#f0a35e;--bad:#ff8b98;color-scheme:dark}
.pp *{box-sizing:border-box}
.pp h1,.pp h2{font-family:'Bricolage Grotesque',Figtree,system-ui,sans-serif;margin:0;line-height:1.15}
.pp button{font:inherit;color:inherit;cursor:pointer}
.pp :focus-visible{outline:3px solid var(--brand);outline-offset:2px}
.pp .pp-side{background:var(--surface);border-right:1px solid var(--line);padding:24px 16px;position:sticky;top:var(--header-h);height:calc(100vh - var(--header-h));display:flex;flex-direction:column;gap:20px}
.pp .pp-who{display:flex;gap:12px;align-items:center}
.pp .pp-av{width:44px;height:44px;border-radius:50%;background:var(--brand);color:var(--brand-ink);display:grid;place-items:center;font-weight:600}
.pp .pp-who b{display:block;font-weight:600}
.pp .pp-who span{color:var(--muted);font-size:13px}
.pp .pp-foot{margin-top:auto;font-size:13px;color:var(--muted)}
.pp .pp-theme{border:1px solid var(--line);background:none;border-radius:8px;padding:6px 10px;margin-top:8px}
.pp main{padding:32px clamp(16px,4vw,48px);max-width:1000px;width:100%;min-width:0}
.pp h1{font-size:clamp(26px,4vw,36px);margin-bottom:4px}
.pp .pp-sub{color:var(--muted);margin:0 0 24px}
.pp .pp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:16px}
.pp .pp-card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px}
.pp .pp-card h2{font-size:18px;margin-bottom:12px}
.pp .pp-vitals{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));background:var(--surface);border:1px solid var(--line);border-radius:16px;margin-bottom:16px;overflow:hidden}
.pp .pp-vitals div{padding:16px 18px;border-right:1px solid var(--line)}
.pp .pp-vitals div:last-child{border-right:0}
.pp .pp-vitals small{color:var(--muted);display:block}
.pp .pp-vitals strong{font:700 26px 'Bricolage Grotesque',sans-serif}
.pp .pp-vitals em{font-style:normal;font-size:13px;color:var(--muted);margin-left:3px}
.pp .pp-row{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--line)}
.pp .pp-row:first-of-type{border-top:0}
.pp .pp-row small{color:var(--muted);display:block}
.pp .pp-tag{font-size:13px;font-weight:600;padding:2px 10px;border-radius:99px;background:var(--tint)}
.pp .pp-tag.pp-ok{color:var(--ok)}.pp .pp-tag.pp-warn{color:var(--warn)}.pp .pp-tag.pp-bad{color:var(--bad)}
.pp .pp-note{background:var(--tint);border-radius:10px;padding:12px 16px;font-size:14px;margin-bottom:20px}
@media(max-width:760px){
  .pp{grid-template-columns:minmax(0,1fr)}
  .pp .pp-side{position:static;height:auto;border-right:0;border-bottom:1px solid var(--line);padding:16px}
  .pp .pp-foot{display:none}
}
`;

export interface Patient {
  name: string;
  dob: string;
  mrn: string;
  provider: string;
  blood: string;
  allergies: string[];
}
export interface Vital { value: string; unit?: string }
export interface LabResult { id: number; test: string; v: number; u: string; lo: number; hi: number; date: string }
export interface Appointment { id: number; when: string; what: string; who: string; where: string }

export interface PortalData {
  patient: Patient;
  vitals: Record<string, Vital>;
  labs: LabResult[];
  appts: Appointment[];
}

type LabStatus = "low" | "normal" | "high";

const emptyData: PortalData = {
  patient: { name: "", dob: "", mrn: "", provider: "", blood: "", allergies: [] },
  vitals: {},
  labs: [],
  appts: [],
};

async function fetchPortalData(): Promise<PortalData> {
  return emptyData;
}

const VITALS: [label: string, unit: string][] = [
  ["Blood pressure", "mmHg"],
  ["Heart rate", "bpm"],
  ["Weight", "lb"],
  ["Temperature", "°F"],
  ["SpO₂", "%"],
];

const labStatus = (l: LabResult): LabStatus => (l.v < l.lo ? "low" : l.v > l.hi ? "high" : "normal");

const muted = { color: "var(--muted)" } as const;

function Empty({ children }: { children: ReactNode }) {
  return <p style={{ ...muted, margin: 0 }}>{children}</p>;
}

function StatusTag({ s }: { s: LabStatus }) {
  const cls = s === "normal" ? "ok" : s === "high" ? "bad" : "warn";
  const label = s === "normal" ? "Looking good" : s === "high" ? "A bit high" : "A bit low";
  return <span className={`pp-tag pp-${cls}`}>{label}</span>;
}

function Overview({ data }: { data: PortalData }) {
  const { patient: p, vitals, labs, appts } = data;
  const flagged = labs.filter((l) => labStatus(l) !== "normal");
  const next = appts[0];

  return (
    <div>
      <h1>{p.name ? `Hi, ${p.name.split(" ")[0]}` : "Hi there"}</h1>
      <p className="pp-sub">Here is a quick look at your health today.</p>

      <div className="pp-vitals">
        {VITALS.map(([label, unit]) => {
          const v = vitals[label];
          return (
            <div key={label}>
              <small>{label}</small>
              <strong>{v ? v.value : "—"}</strong>
              <em>{v?.unit ?? unit}</em>
            </div>
          );
        })}
      </div>

      <div className="pp-grid">
        <div className="pp-card">
          <h2>Coming up</h2>
          {next ? (
            <div>
              <b>{next.what}</b>
              <div>{next.when}</div>
              <small style={muted}>{next.who} · {next.where}</small>
            </div>
          ) : (
            <Empty>No visits scheduled.</Empty>
          )}
        </div>

        <div className="pp-card">
          <h2>Worth a look</h2>
          {flagged.length ? (
            flagged.map((l) => (
              <div className="pp-row" key={l.id}>
                <div>{l.test}<small>{l.v} {l.u}</small></div>
                <StatusTag s={labStatus(l)} />
              </div>
            ))
          ) : (
            <Empty>All clear.</Empty>
          )}
        </div>
      </div>

      <div className="pp-grid">
        <div className="pp-card">
          <h2>Your allergies</h2>
          {p.allergies.length ? (
            p.allergies.map((a) => (
              <span key={a} className="pp-tag pp-bad" style={{ marginRight: 8 }}>{a}</span>
            ))
          ) : (
            <Empty>None on file.</Empty>
          )}
        </div>
        <div className="pp-card">
          <h2>Your care team</h2>
          {p.provider ? (
            <div>
              {p.provider}
              <br />
              <small style={muted}>Your primary care doctor{p.blood ? ` · Blood type ${p.blood}` : ""}</small>
            </div>
          ) : (
            <Empty>You have no provider assigned.</Empty>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PatientPortal() {
  const [data, setData] = useState<PortalData>(emptyData);
  const [theme, setTheme] = useState<"light" | "dark" | undefined>(undefined);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let live = true;
    fetchPortalData().then((d) => live && setData(d)).catch(console.error);
    return () => { live = false; };
  }, []);

  const toggleTheme = () => {
    const dark = rootRef.current && getComputedStyle(rootRef.current).colorScheme === "dark";
    setTheme(dark ? "light" : "dark");
  };

  const p = data.patient;
  const initials = p.name ? p.name.split(" ").map((x) => x[0]).join("") : "—";

  return (
    <div className="pp" ref={rootRef} data-theme={theme}>
      <style>{css}</style>
      <aside className="pp-side">
        <div className="pp-who">
          <div className="pp-av" aria-hidden="true">{initials}</div>
          <div>
            <b>{p.name || "Your name"}</b>
            <span>{p.mrn || "Record number"}</span>
          </div>
        </div>
        <div className="pp-foot">
          {p.dob ? `Born ${p.dob}` : "Date of birth"}
          <br />
          <button className="pp-theme" onClick={toggleTheme}>Light or dark mode</button>
        </div>
      </aside>

      <main>
        <div className="pp-note">Skeleton layout with no data.</div>
        <Overview data={data} />
      </main>
    </div>
  );
}