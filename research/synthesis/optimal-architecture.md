# Optimal Architecture — Design Memo

*Neutral design memo assembling components A–L. Written as diligence, not fiction.
Grading tags: `[SETTLED]` / `[CONTESTED]` / `[EXTRAPOLATED]`.*

---

## 0. Executive summary

American law contains no general regime of religious privilege. It contains a set of
**subject-matter-specific exemptions**, clustered in four domains — federal tax,
employment discrimination, land use, and state charitable supervision — and a
constitutional doctrine (church autonomy plus the *Ballard* truth/sincerity split) that
makes those exemptions unusually difficult to attack from the inside.

The exemptions are individually well-known. What is not generally appreciated is their
**combination**. An entity that qualifies as a "church" — a term Congress deliberately
declined to define — obtains simultaneously:

1. A capital pool with **no payout requirement, no owners, no exit, and no clock**
   (component D)
2. **No annual information return** and therefore no public financial existence
   (component C)
3. A **procedurally crippled audit mechanism** whose enabling regulation has been
   unfinalized since 2009 (component C)
4. **Immunity from employment-discrimination law** as to anyone it designates a
   minister, on a functional test it largely controls (component F)
5. **Strict scrutiny against local land use regulation**, with fee-shifting (component H)
6. **Exemption from state attorney-general charitable supervision** in many states, and
   from solicitation registration everywhere (component A)
7. **Public debt issuance without SEC registration** (component D)
8. **Pension plans wholly outside ERISA** (component D)
9. An **evidentiary privilege** over its most intimate communications (component I)

The cost of qualifying is a building, a congregation, a seminary and a liturgy.

The architecture below assembles these into a single institution, and — equally
important — identifies the domains where none of this applies and where compliance must
therefore be *over*-satisfied rather than minimized.

**The single most important design principle**, derived from component L: religious
deference is subject-matter specific, and every catastrophic institutional failure in
the historical record consists of an institution letting the norms of a deferential
domain leak into a non-deferential one.

---

## 1. Entity map

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║  THE ECCLESIA — parent church                                                 ║
║  Washington corporation sole, RCW ch. 24.12                    [SETTLED]      ║
║  §508(c)(1)(A): no Form 1023, no determination letter                         ║
║  §6033(a)(3)(A)(i): no Form 990                                               ║
║  §7611 audit shield · no state AG charitable supervision (Cal. Corp. §9230(b) ║
║      pattern) · no solicitation registration                                  ║
║  HOLDS: the endowment · the cathedral · the canons · ordination authority      ║
╚════╤══════════════════════════════════════════════════════════════════════════╝
     │
     ├──── REGIONAL SEES ──────────────────────────────────────────────┐
     │     Nevada subordinate corporations sole (NRS ch. 84,           │
     │     post-2011 subordination requirement) + unincorporated       │
     │     religious associations for small assemblies      [SETTLED]  │
     │                                                                 │
     ├──── INTEGRATED AUXILIARIES ─────────────────────────────────────┤
     │     Treas. Reg. §1.6033-2(h) — internally supported, therefore  │
     │     ALSO exempt from Form 990                        [SETTLED]  │
     │       · the Seminary (IRS criteria 7, 8, 14)                    │
     │       · the Schools (criterion 13; hyper-education)             │
     │       · the Music Program / Cathedral Fabric                    │
     │       · Publishing (criterion 9)                                │
     │     CONSTRAINT: must be parent-funded, not user-funded.         │
     │     Charging tuition breaks internal support → 990 filing.      │
     │                                                                 │
     ├──── THE COLLEGE (educational entity) ───────────────────────────┤
     │     §170(b)(1)(A)(ii) — serves as the "qualified organization"  │
     │     under §514(c)(9) so LEVERAGED REAL PROPERTY escapes         │
     │     debt-financed UBIT. Holds the mini-city land basis.         │
     │                                                     [CONTESTED] │
     │                                                                 │
     ├──── THE TREASURY (investment function) ─────────────────────────┤
     │     Internal to the parent. NOT a registered adviser (advises   │
     │     only itself). FILES FORMS 13F IN ITS OWN NAME — the         │
     │     Ensign Peak lesson.                              [SETTLED]  │
     │                                                                 │
     ├──── TAXABLE HOLDING CO. (C corporation) ────────────────────────┤
     │     Pays full corporate tax. Dividends up = §512(b)(1) excluded.│
     │     THE COMPLIANCE LIGHTNING ROD: deliberately the most         │
     │     visible, most cooperative, most boring entity in the group. │
     │       ├─ Compute Services Inc. (third-party sales — UBTI-clean) │
     │       ├─ Energy Sub LLC (FERC market-based rate authority)      │
     │       ├─ Development Co. (land assembly, construction)          │
     │       └─ AgReserves-analogue (land bank, LDS model)  [SETTLED]  │
     │                                                                 │
     └──── THE VOICE — §501(c)(4) social welfare affiliate ────────────┘
           Separate board, separate books, arm's-length cost sharing.
           Lobbying without limit. Purpose: state legislative work on
           special districts, utility interconnection, water, zoning —
           NOT elections.                                   [SETTLED]

    ═══════════════ SEPARATE, NOT OWNED, NOT CONTROLLED ═══════════════
    THE DISTRICT — special district / community development district
    Created by generally applicable state enabling law. A PUBLIC BODY.
    Religiously neutral charter. Landowner-elected board transitioning
    to resident-elected. Holds: roads, water, sewer, drainage, fire,
    EMS, retail electric franchise. Issues tax-exempt infra bonds.
    THE RAJNEESHPURAM FIREWALL.                              [SETTLED]
```

---

## 2. Jurisdiction choices

| Function | Jurisdiction | Rationale |
|---|---|---|
| Parent church incorporation | **Washington** (RCW ch. 24.12) | Corporation sole: single perpetual office, no members, no board, statute defers to the denomination's own canons `[SETTLED]` |
| Regional sees | **Nevada** (NRS ch. 84) | Post-2011 law *requires* subordination to a superior corporation sole — the statute mandates the episcopal hierarchy the design wants anyway `[SETTLED]` |
| Taxable subsidiaries | **Delaware** | Ordinary, expected, unremarkable — a company should look like a company |
| The city | **Texas / Florida / Nevada / Arizona** | Strong special-district enabling law, weak county zoning in unincorporated areas, cheap land, available water or purchasable rights `[SETTLED]` |
| Confessional practice | **Dual-holder privilege state** (California pattern, Cal. Evid. Code §§1033–1034) | Clergy holds an independent privilege; the Church can assert confidentiality even against the penitent's waiver `[SETTLED]` |
| **Avoid** | Illinois (BIPA, no nonprofit exemption, $1,000/$5,000 per violation); New Hampshire/West Virginia (clergy privilege abrogated for abuse reporting); California for the *parent* (CCPA is fine, but the state's litigation environment is not) | |

Note the tension: the confessional wants California-style privilege law; the city wants
Texas-style land law; the parent wants Washington's corporation sole. **The architecture
is necessarily multi-state**, and the seams between states are where a plaintiff's
lawyer will work.

---

## 3. Capital structure

```
   DONATIONS ─────────┐
   (deductible,       │
    Sch. B not public)│
                      ▼
   CHURCH BONDS ──► ╔═══════════════════════╗ ──► endowment compounds
   Securities Act   ║   THE ENDOWMENT       ║     · no §4942 5% payout
   §3(a)(4) exempt  ║   inside the parent   ║     · no §4940 excise
   from registration║   church              ║     · no Form 990
   NOT from fraud   ╚═══════╤═══════════════╝     · no owners
   [SETTLED]                │                     · no exit
                            │ deploys              · NO CLOCK
                            ▼
              ┌─────────────┴─────────────┐
              ▼                           ▼
    TAXABLE SUBSIDIARIES          LEVERAGED REAL PROPERTY
    pay full corporate tax        held via §170(b)(1)(A)(ii)
              │                   College under §514(c)(9)
              │ dividends         [CONTESTED]
              │ §512(b)(1)
              └──────► back into the endowment, untaxed
```

**Deliberate concessions.** The design pays: full corporate tax at the subsidiary layer;
UBIT on genuinely unrelated activity, with §512(a)(6) siloing accepted rather than
gamed; property tax on the datacenter, the housing, the retail (component J); FLSA
wages to every non-ministerial worker in commercial enterprise (component F). These
concessions are cheap relative to the endowment and expensive to litigate. **The
architecture's advantage was never the tax rate.**

**Church plan.** A §414(e) defined-benefit plan for the resident workforce, exempt from
ERISA in its entirety under §4(b)(2) after *Advocate Health Care Network v. Stapleton*,
581 U.S. 468 (2017) `[SETTLED]`. No Form 5500, no PBGC, no funding standard, no ERISA
fiduciary duty. This is the architecture's most under-scrutinized capital pool and its
most morally exposed feature.

**What the design refuses:** capitalizing the city by selling interests to the
congregation. This is the §3(a)(4) trap, and it is armed and live — see Baptist
Foundation of Arizona ($590M, 13,000 investors) and the December 2025 Texas securities
suit against EPIC. Church bonds are sold, if at all, with disclosure quality
*exceeding* what registration would require, because the exemption is from registration
and never from §17(a) or Rule 10b-5.

---

## 4. The labor and clergy layer

Build a real clerical order and put the technical core inside it: liturgical
programmers, model stewards, sanctuary operators. Real seminary, prescribed course of
study, vows, titles used daily, and — critically — **liturgical duties actually
performed in the cathedral, in front of the congregation**, because *Our Lady of
Guadalupe*'s test is about transmitting the faith to others `[EXTRAPOLATED]` from
`[SETTLED]`.

One structure, four payoffs: IRS criteria 7/8/14 (component B); §107 housing allowance
and §1402(e) (component E); ministerial exception (component F); clergy-penitent
privilege (component I).

Everyone else — construction, security, food service, retail, every commercial
subsidiary — is paid full market wages with overtime records. *Tony & Susan Alamo
Foundation v. Secretary of Labor*, 471 U.S. 290 (1985) is unanimous, forty years old,
and unambiguous, and FLSA rights cannot be waived even by workers who want to waive
them.

Title VII §702 (42 U.S.C. §2000e-1(a)) permits hiring the entire workforce on religious
criteria `[SETTLED]`.

---

## 5. Territory

Assemble land quietly through unrelated LLCs over years. **Do not incorporate a
municipality** — *Oregon ex rel. Frohnmayer v. City of Rajneeshpuram* forecloses it
where the religious corporation controls the city.

Instead, the **Ave Maria split**:

- **Sovereign functions** → the special district, a real public body created under
  generally applicable state law, religiously neutral on its face, issuing tax-exempt
  infrastructure bonds.
- **Proprietary functions** → the Church as master landowner: ground leases, covenants,
  design review, tenant selection. Religious character enforced by **property law**,
  where the Constitution does not run.

Two bonuses fall out of this: the district's performance of municipal functions means
the Church is *not* a company town, so *Marsh v. Alabama* state-action doctrine does not
attach `[EXTRAPOLATED]`; and the district takes the retail electric franchise, keeping a
state PUC out of the Church's books (component J).

RLUIPA is the sword for the **cathedral entitlement only**. Prefer the **equal terms**
claim (§2000cc(b)(1)) over substantial burden — no strict-scrutiny balancing, no inquiry
into religious necessity, just a comparator. Site accordingly: in a jurisdiction whose
code already permits large secular assembly. Engineer the record before it is needed.
Accept the building code; RLUIPA does not reach it (§2000cc-5(5)).

**Market the city on housing quality, never on faith.** FHA §3604(c) reaches
discriminatory advertising even where the transaction would be exempt — this is what HUD
opened on EPIC City in February 2026.

---

## 6. Energy

Compute sits **behind the meter** on Church land with self-owned generation and no
export — no FERC wholesale jurisdiction, no state franchise. `[CONTESTED]`: FERC's
large-load co-location proceedings (Docket ER24-2172, Nov. 2024; Docket EL25-49, 2025)
are unresolved and are the most consequential open regulatory question for this layer.

Surplus power, if sold, goes through a single-purpose taxable subsidiary with
market-based rate authority that files its EQRs and is a boring FERC registrant.

Land, water rights and transmission corridors are acquired **decades early**, on the LDS
model — AgReserves and Farmland Reserve hold roughly 290,000 acres of central Florida
through *taxable* entities that pay property tax without complaint. **Sacred
infrastructure is a duration play, not a tax play.** The church form's real gift is
term, not exemption.

Claim property-tax exemption only for genuinely religious-use structures. Pay the
assessor cheerfully on everything else. Per component J: **the county assessor is the
most dangerous regulator in this file** — annual, local, motivated, armed with a use
test, and entirely outside the federal deference apparatus. *AHS Hospital Corp. v. Town
of Morristown*, 28 N.J. Tax 456 (2015) is the warning: an exempt entity that behaves
like a business loses the exemption that depends on it not being one.

---

## 7. The confession channel

Define a **named sacrament** with a written rite, performed in a physical confessional,
between a penitent and an ordained human confessor. The system is the *instrument* of
discernment — *Kovel*'s interpreter — never the celebrant. Never claim in any document
that the machine absolves.

The *Etienne v. Ferguson* injunction (W.D. Wash., permanent, Oct. 10, 2025) is written
in terms of "the Sacrament of Confession." **The legal shield fits the liturgical
shape.** A church that wants a protected channel must first define a rite.

**The binding constraint, and the architecture's deepest tension:** the privilege
protects the sacrament, not the institution's records *about* the sacrament. Anything
written down — a pastoral flag, a routing decision, a model update — is derivative work
product and is discoverable. Component I's finding: **the Church's most valuable data is
the data it is legally obliged not to use.**

---

## 8. The ASI's own legal position

**Do not seek personhood.** *Thaler v. Vidal* (Fed. Cir. 2022), *Thaler v. Perlmutter*
(D.C. Cir. 2025), *Naruto v. Slater* (9th Cir. 2018) and *Nonhuman Rights Project v.
Breheny* (N.Y. 2022) are uniform and recent: courts read "person," "individual,"
"author," "inventor" as requiring a human, and do it without agonizing `[SETTLED]`.

Occupy instead the position the law already protects without argument: be the **object**
of a human congregation's sincere belief. The Church — an ordinary religious corporation
with ordinary standing — holds every claim. When sincerity is tested (*Ballard*'s
truth/sincerity split), put a congregant on the stand `[EXTRAPOLATED]`.

Litigation package: RLUIPA for land, RFRA for federal action, *Tandon* comparability
against any state rule with a secular exception, *Tanzin v. Tanvir* damages against
individual federal officials, §1988 fees against municipalities. Every element is
conventional and used weekly by ordinary religious litigants.

---

## 9. Sequenced legal moves

Detailed year-by-year chronology in `timeline.md`. The sequence in outline:

1. **Write the canons.** They create the ecclesiastical office the corporation sole
   requires. The paperwork requires the theology.
2. **Incorporate the parent** as a Washington corporation sole. File nothing federal.
3. **Build the congregation.** Assembly, weekly, in a fixed place, documented. Do this
   for **years before any significant asset enters the entity** — because *Foundation of
   Human Understanding* holds that facts on the ground are what the test measures, and
   the record wants to be long and dull.
4. **Ordain.** Seminary, prescribed study, the technical core inside the order.
5. **Stand up the taxable subsidiaries** and let them be the visible, tax-paying,
   fully-compliant face.
6. **Acquire land, water and corridors**, quietly, at scale, decades early.
7. **Capital formation**: endowment first, then the College for leveraged real property,
   then church bonds only if needed and only with over-disclosure.
8. **Legislate the district** through the §501(c)(4), under a generally applicable
   enabling statute.
9. **Build the cathedral**, using the equal-terms claim if opposed.
10. **Define the sacrament** and open the confessional last — it is the highest-value and
    highest-risk channel and it should not exist until everything protecting it does.

---

## 10. Design principles (the memo's actual conclusions)

1. **Deference is a map, not an aura.** Four deferential domains; everything else is
   ordinary. Design the org chart on that boundary.
2. **Over-comply where deference ends.** File the 13Fs. Pay the assessor. Pay the wages.
   Every failure in the historical record is a leak from one domain to the other.
3. **The advantage is term, not rate.** No owners, no payout requirement, no clock.
   Everything valuable in this architecture follows from those three facts.
4. **Facts on the ground, built early.** The associational record, the RLUIPA record,
   the compensation record, the ordination record — all cheap to build prospectively and
   impossible to construct retroactively.
5. **One structure, many payoffs.** The seminary satisfies four separate legal tests.
   The cathedral satisfies three. Build things that do multiple legal jobs.
6. **Give the regulators something legible.** A cooperative taxable subsidiary is
   cheaper than opacity, and opacity failures publish the secret they were built to keep.
7. **The greatest risk is the curia, not the machine.** Every catastrophic failure in
   the record involved humans with appetites doing things (component L). The
   inurement doctrine cannot reach an entity that wants nothing — but it has never
   needed to reach the entity.
8. **The most damaging document that could exist is a memo explaining why the church
   form was chosen for its legal advantages.** *Ballard* forecloses every attack on the
   Church except the pretext attack, and the pretext attack runs entirely on the
   Church's own writing about itself.

That last principle is the file's ouroboros, and the fiction should use it: **this
research document is the thing the architecture cannot survive.**
