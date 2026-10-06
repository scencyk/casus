// Static server component: the rotating ring of clinical terms.
// Rotation and fade-in are pure CSS (see globals.css) — no JS, no re-renders.

type Term = { label: string; source?: boolean };

const TERMS: Term[] = [
  { label: "apiksaban" },
  { label: "eGFR 38" },
  { label: "LDL 4,2 mmol/l" },
  { label: "Leki", source: true },
  { label: "interakcje" },
  { label: "ChPL" },
  { label: "dawka dobowa" },
  { label: "atorwastatyna" },
  { label: "empagliflozyna" },
  { label: "semaglutyd" },
  { label: "Refundacja", source: true },
  { label: "odpłatność" },
  { label: "65+" },
  { label: "zamiennik" },
  { label: "E11" },
  { label: "B02 półpasiec" },
  { label: "ICD-10", source: true },
  { label: "I48 migotanie przedsionków" },
  { label: "kod rozpoznania" },
  { label: "sensor CGM" },
  { label: "pieluchomajtki" },
  { label: "Wyroby medyczne", source: true },
  { label: "worki stomijne" },
  { label: "limit miesięczny" },
  { label: "kto może zlecić" },
  { label: "TSH 6,8" },
  { label: "fT4" },
  { label: "Wytyczne", source: true },
  { label: "nadciśnienie" },
  { label: "kaszel przewlekły" },
  { label: "ból nosa" },
  { label: "pacjentka 83 l." },
  { label: "klarytromycyna" },
  { label: "simwastatyna" },
  { label: "metformina XR" },
  { label: "niewydolność serca" },
  { label: "karta leku" },
  { label: "wskazania" },
  { label: "przeciwwskazania" },
  { label: "źródło" },
];

// Two laps of the list keep the ring dense enough to read as a continuous band.
const RING = [...TERMS, ...TERMS];
const STEP = 360 / RING.length;

export function Arc() {
  return (
    <div className="arc" aria-hidden="true">
      <div className="arc-wheel">
        {RING.map((term, i) => (
          <div
            key={i}
            className={term.source ? "arc-item arc-item--source" : "arc-item"}
            style={
              {
                "--angle": `${(i * STEP).toFixed(2)}deg`,
                "--delay": `${(0.3 + (i % 12) * 0.06).toFixed(2)}s`,
              } as React.CSSProperties
            }
          >
            {term.label}
          </div>
        ))}
      </div>
    </div>
  );
}
