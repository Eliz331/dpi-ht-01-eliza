import submission from "../../submission.json";
const euro=n=>typeof n==="number"?new Intl.NumberFormat("en-IE",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n):n===null?"—":n;
export default function Review(){
 const mats=submission.decisions.filter(d=>d.reviewTier==="material_judgment");
 const low=submission.decisions.filter(d=>d.confidence==="low");
 const overrides=mats.filter(d=>d.changedFromAI);
 return <><div className="nav"><div className="navin"><div className="brand">DPI / ASSESSOR REVIEW</div><a href="/">← Main submission</a><a href="/submission.json">submission.json ↗</a></div></div>
 <main className="shell"><header className="reviewHero"><div className="eyebrow">Compact assessor view</div><h1>AI Review Trail</h1><p className="muted">25 material judgments, AI proposal, independent challenge, student certification, evidence, impact and confidence.</p></header>
 <div className="grid"><div className="card metric"><div className="k">Material judgments</div><div className="v">{mats.length}</div></div><div className="card metric"><div className="k">Student overrides</div><div className="v">{overrides.length}</div></div><div className="card metric"><div className="k">Low confidence</div><div className="v">{low.length}</div></div><div className="card metric"><div className="k">Uncertainties</div><div className="v">{submission.uncertainties.length}</div></div></div>
 <section><div className="sectionhead"><div><div className="eyebrow">Material judgments</div><h2>Decision-by-decision trail</h2></div></div>
 {mats.map(d=><details className="card decision" key={d.id}><summary>{d.id} — {d.question} <span className={"status "+d.confidence}> · {d.confidence}</span></summary><div className="inside">
 <p><b>AI proposal:</b> {d.aiProposal}</p><p><b>Independent challenge:</b> {d.independentChallenge}</p><p><b>Final certification:</b> {d.answer}</p><p><b>Student reasoning:</b> {d.studentReasoning}</p>
 <p><b>Evidence:</b> {d.evidence.join("; ")}</p><div><b>Statement effect:</b> Profit {euro(d.statementEffect?.profit)} · Cash {euro(d.statementEffect?.cash)} · Assets {euro(d.statementEffect?.assets)} · Liabilities {euro(d.statementEffect?.liabilities)} · Equity {euro(d.statementEffect?.equity)}</div>
 </div></details>)}</section>
 <section><div className="sectionhead"><div><div className="eyebrow">Flags</div><h2>Low confidence & unresolved uncertainty</h2></div></div>
 {low.map(d=><div className="callout danger" style={{marginBottom:12}} key={d.id}><b>{d.id} — {d.question}</b><div className="muted">{d.answer}</div></div>)}
 {submission.uncertainties.map(u=><div className="callout danger" style={{marginBottom:12}} key={u.issue}><b>{u.issue}</b><div className="muted">{u.detail}</div></div>)}</section>
 </main></>;
}
