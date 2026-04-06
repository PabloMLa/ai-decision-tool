import { useState } from "react";

const QUESTIONS = [
  { id: "q1", step: "Question 1 of 6", q: "Is the AI you want to implement a core competitive differentiator for your business?", hint: "It's differential if the algorithm, proprietary data or model itself is part of your unique value proposition. It's not if any competitor could solve the same problem with the same generic tool.", opts: [{ label: "Yes — it's central to our business model", sub: "The model or data are part of our competitive advantage", next: "BUILD_strong" }, { label: "No — it's a support or back-office process", sub: "It helps us operate better, not differentiate in the market", next: "q2" }] },
  { id: "q2", step: "Question 2 of 6", q: "Does your company have unique proprietary data that an external provider couldn't replicate?", hint: "Unique data includes: exclusive customer behaviour history, proprietary sensor data, confidential production data, or any source not available on the market.", opts: [{ label: "Yes — we have data others don't", sub: "Our data is a differential and protected asset", next: "q3" }, { label: "No — our data is similar to what's in the market", sub: "An external provider could train on equivalent data", next: "BUY_strong" }] },
  { id: "q3", step: "Question 3 of 6", q: "Do you have (or can you build in 6–12 months) an internal ML/AI team?", hint: "A minimum viable team includes: 1–2 data scientists, 1 ML engineer, 1 data engineer. Also consider onboarding time and domain learning curve.", opts: [{ label: "Yes — we have talent or can hire it", sub: "We can attract and retain AI profiles in 6–12 months", next: "q4" }, { label: "No — we lack talent or easy access to it", sub: "Scarcity of profiles or budget makes it unfeasible", next: "PARTNER_strong" }] },
  { id: "q4", step: "Question 4 of 6", q: "Does the volume of the problem justify the cost of in-house development?", hint: "Rule of thumb: if the problem affects >50,000 transactions/month or >€1M in impact, it may justify in-house development. Below that, an off-the-shelf solution has better ROI.", opts: [{ label: "Yes — volume and impact are significant", sub: "Scale justifies investing in internal capability", next: "BUILD_final" }, { label: "No — volume is limited or the problem is one-off", sub: "Development cost would exceed the long-term benefit", next: "q5" }] },
  { id: "q5", step: "Question 5 of 6", q: "Does a SaaS or AI API solution already exist in the market for your use case?", hint: "Search in: AWS AI Services, Azure AI, Google Cloud AI, Salesforce Einstein, or vertical startups in your industry. If you find 3+ providers covering it, a market solution exists.", opts: [{ label: "Yes — several commercial solutions are available", sub: "The market already offers mature tools for this problem", next: "BUY_final" }, { label: "No — the problem is too specific or niche", sub: "No solutions that fit without deep customisation", next: "q6" }] },
  { id: "q6", step: "Question 6 of 6", q: "Is there urgency (<6 months) or does the problem require highly specialised expertise?", hint: "High urgency or scarce expertise points to partnering with a company that has already solved similar problems. Without urgency, you can afford to build internal capacity gradually.", opts: [{ label: "Yes — we need results fast or the expertise is very specific", sub: "Speed or specialisation justify an external partner", next: "PARTNER_final" }, { label: "No — we can invest time in building capacity", sub: "We have room to develop the solution internally", next: "BUILD_gradual" }] },
];

const RESULTS = {
  BUILD_strong: { badge: "🏗️ BUILD — Strategic in-house development", col: "#7F77DD", bg: "rgba(127,119,221,0.12)", desc: "AI is central to your competitive advantage. Building internally protects the know-how, enables iteration on proprietary data and creates a real barrier to entry.", pros: ["Full control of model and data", "IP belongs to your company", "Continuous iteration on business feedback", "Builds lasting organisational capability"], cons: ["High initial cost (talent + infra)", "Longer time-to-market", "Risk of talent turnover", "Requires mature MLOps to scale"], steps: ["Define the founding team: Data Scientist + ML Engineer + Data Engineer", "Establish the tech stack (cloud provider + framework)", "Launch an MVP in 90 days with the simplest use case", "Implement MLOps from day one, not as an afterthought", "Plan governance model and ethical review"] },
  BUY_strong: { badge: "🛒 BUY — SaaS or market API solution", col: "#1D9E75", bg: "rgba(29,158,117,0.1)", desc: "The problem doesn't require proprietary differentiation and mature solutions are available. Buying delivers the best ROI: minimal time-to-market, no development cost, and the vendor handles maintenance.", pros: ["Immediate time-to-market (weeks vs. months)", "Predictable cost (SaaS subscription)", "Vendor handles maintenance", "No need for internal technical team"], cons: ["Vendor dependency (lock-in risk)", "Limited model customisation", "Customer data goes to the vendor (check GDPR)", "Same model your competitors may use"], steps: ["Send RFP to 3–5 vendors with concrete use cases", "Require a 30-day PoC with your own data", "Review contract: data portability, SLA, exit clause", "Define success criteria before signing", "Plan integration with current systems"] },
  PARTNER_strong: { badge: "🤝 PARTNER — External specialist alliance", col: "#3B8BD4", bg: "rgba(59,139,212,0.1)", desc: "Without an internal team, partnering with a company that already has the expertise is the smartest option. A good partner accelerates organisational learning while delivering real results.", pros: ["Immediate expertise without hiring lag", "Knowledge transfer to internal team", "Shared risk with the partner", "Flexibility to adjust scope"], cons: ["Less control over the process", "Dependency during the transition", "Higher cost than SaaS long-term", "Know-how risk if it stays with the partner"], steps: ["Define which internal capabilities you want to own by the end", "Require a knowledge transfer clause in the contract", "Assign an internal shadow team to learn from the partner", "Start with a scoped project before committing large budget", "Plan progressive internalisation at the end of the engagement"] },
  BUILD_final: { badge: "🏗️ BUILD — In-house, scale justified", col: "#7F77DD", bg: "rgba(127,119,221,0.12)", desc: "Volume justifies the investment in internal capability. Even if it's not your core competitive advantage, scale makes in-house development more profitable than paying SaaS licences indefinitely.", pros: ["Full control and customisation", "Positive long-term ROI (>3 years)", "Reusable internal capability", "No vendor dependency"], cons: ["High upfront investment", "Longer time-to-market than BUY", "Requires ongoing team attention", "Higher technical risk"], steps: ["Evaluate a BUY solution first for cost benchmarking", "Hire a tech lead experienced in the model type", "Start with a tightly scoped MVP to validate the approach", "Scale only if the MVP proves the estimated ROI", "Implement model governance from day one"] },
  BUY_final: { badge: "🛒 BUY — Available commercial solution", col: "#1D9E75", bg: "rgba(29,158,117,0.1)", desc: "The market offers solutions for your use case and volume doesn't justify in-house development. It's the most time- and cost-efficient decision. Prioritise integration and change management.", pros: ["Lower technology risk", "Faster ROI", "Easy to evaluate with a PoC", "Automatic vendor updates"], cons: ["Possible vendor lock-in", "Less adaptation to your specific process", "Recurring cost vs. one-time investment", "Mandatory GDPR review"], steps: ["Evaluate 3 vendors with a 30-day PoC", "Review data portability clauses", "Plan API integration with current systems", "Train end users", "Monitor ROI quarterly"] },
  PARTNER_final: { badge: "🤝 PARTNER — Specialist with knowledge transfer", col: "#3B8BD4", bg: "rgba(59,139,212,0.1)", desc: "Urgency or required specialisation justifies working with an expert partner. Structure the engagement so the knowledge stays in your organisation when it ends.", pros: ["Delivery speed with real expertise", "No need to hire in a competitive market", "Experience from similar solved cases", "Delivers results while building capacity"], cons: ["High hourly/project cost", "Know-how may leave with the partner", "Requires active engagement management", "Define IP ownership from the start"], steps: ["RFP to 2–3 specialised consultancies or startups", "Structure the project in sprints with clear deliverables", "Include knowledge transfer as a mandatory deliverable", "Assign an internal product owner with real dedication", "Plan the post-project internal autonomy phase"] },
  BUILD_gradual: { badge: "🏗️ BUILD GRADUAL — Build capacity at your own pace", col: "#7F77DD", bg: "rgba(127,119,221,0.12)", desc: "Without urgency and with a stable problem, you can build internal capability gradually. Start small, learn fast, scale only what works.", pros: ["Real organisational learning", "Cost distributed over time", "Can pivot if the approach doesn't work", "Builds talent that stays in the company"], cons: ["Slow results in the first months", "Requires leadership patience", "Risk of urgency changing", "Needs alignment with other IT priorities"], steps: ["Define a very focused first model use case", "Start with low-code/no-code AI tools to learn", "Hire 1 senior data scientist as the team core", "Set a learning rhythm: 1 model in production per quarter", "Document learnings and build an internal AI community"] },
};

export default function App() {
  const [history, setHistory] = useState([]);
  const [cur, setCur] = useState("q1");

  const q = QUESTIONS.find(x => x.id === cur);
  const result = RESULTS[cur];

  function choose(next) { setHistory([...history, cur]); setCur(next); }
  function goBack() { if (!history.length) return; const h = [...history]; const prev = h.pop(); setHistory(h); setCur(prev); }
  function restart() { setHistory([]); setCur("q1"); }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "16px 0", maxWidth: 680 }}>
      <h2 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 4px" }}>Build vs. Buy vs. Partner</h2>
      <p style={{ fontSize: 13, color: "#666", margin: "0 0 16px" }}>6 strategic questions that guide you to the right AI sourcing decision for your context.</p>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < history.length ? "#3B8BD4" : i === history.length && !result ? "#1a1a1a" : "#e5e5e3", transition: "background .2s" }} />
        ))}
      </div>

      {/* Question */}
      {q && (
        <div>
          <div style={{ background: "#f7f7f5", borderRadius: 12, padding: "16px" }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: "#aaa", letterSpacing: ".04em", marginBottom: 6, textTransform: "uppercase" }}>{q.step}</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", marginBottom: 6, lineHeight: 1.4 }}>{q.q}</div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 16, lineHeight: 1.5 }}>{q.hint}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.opts.map((o, i) => (
                <button key={i} onClick={() => choose(o.next)} style={{
                  textAlign: "left", padding: "11px 14px", border: "0.5px solid #ddd", borderRadius: 9, cursor: "pointer", background: "#fff", fontSize: 13, lineHeight: 1.4, transition: "all .12s",
                }}>
                  <div style={{ fontWeight: 500, color: "#1a1a1a", marginBottom: 2 }}>{o.label}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>{o.sub}</div>
                </button>
              ))}
            </div>
          </div>
          {history.length > 0 && (
            <button onClick={goBack} style={{ marginTop: 10, padding: "5px 12px", fontSize: 12, border: "0.5px solid #ddd", borderRadius: 7, cursor: "pointer", background: "transparent", color: "#888" }}>← Back</button>
          )}
        </div>
      )}

      {/* Result */}
      {result && (
        <div>
          <div style={{ background: result.bg, borderRadius: 12, padding: "18px", marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 500, color: result.col, marginBottom: 8 }}>{result.badge}</div>
            <div style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.6, marginBottom: 14 }}>{result.desc}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["✅ In favour", result.pros, "+"], ["⚠️ Watch out for", result.cons, "-"]].map(([title, items, sym]) => (
                <div key={title} style={{ background: "rgba(255,255,255,0.5)", borderRadius: 9, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: result.col, marginBottom: 6, opacity: .8 }}>{title}</div>
                  {items.map((it, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#1a1a1a", padding: "3px 0", display: "flex", gap: 5, lineHeight: 1.4 }}>
                      <span style={{ color: result.col }}>{sym}</span>{it}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid #e5e5e3", borderRadius: 12, padding: "14px 16px", marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#555", marginBottom: 10 }}>Concrete next steps</div>
            {result.steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: i < result.steps.length - 1 ? "0.5px solid #f0ede8" : "none", fontSize: 13, color: "#1a1a1a", lineHeight: 1.4 }}>
                <span style={{ color: "#3B8BD4", fontWeight: 500, flexShrink: 0 }}>{i + 1}.</span>{s}
              </div>
            ))}
          </div>
          <button onClick={restart} style={{ width: "100%", padding: "8px", fontSize: 12, border: "0.5px solid #ddd", borderRadius: 9, cursor: "pointer", background: "transparent", color: "#888" }}>↺ Evaluate another case</button>
        </div>
      )}
    </div>
  );
}
