# J. Energy & Infrastructure Acquisition

**Question:** Can a church own the power? And what does the grid's regulator care about
religion? (Nothing.)

---

## 1. The collision, stated up front

`[SETTLED]` **Federal energy law contains no religious exemption of any kind.** Not in
the Federal Power Act, not in the Natural Gas Act, not in PURPA, not in the Energy
Policy Act, not in FERC's regulations, not in NERC reliability standards. Public utility
status under FPA §201, 16 U.S.C. §824(e), is **functional**: an entity that owns or
operates facilities for transmission of electric energy in interstate commerce, or sale
of electric energy at wholesale in interstate commerce, is a "public utility," full
stop. There is no sincerity test, no accommodation, no RFRA-shaped hole. RFRA (42
U.S.C. §2000bb) applies to federal action generally and could in principle be raised —
but the compelling-interest showing for grid reliability is about as strong as
compelling interests get, and no one has ever tried it.

This is the sharpest instance of component C's synthesis rule: **religious deference is
subject-matter specific.** The Church will be the most protected entity in America in
tax court and the most ordinary possible litigant at FERC.

## 2. What nonprofits and churches actually can own

`[SETTLED]`:

- **Real property, generation assets, fuel, land, water rights.** No restriction. A
  §501(c)(3) may own a power plant outright.
- **Rural electric cooperatives.** Organized under state cooperative statutes and
  historically financed by the Rural Utilities Service (7 U.S.C. §901 et seq.); many are
  §501(c)(12) exempt (requiring 85% of income from members). Governed by
  member-elected boards, one member one vote. **Co-ops are largely exempt from state
  PUC rate regulation** in many states and are **not "public utilities" under FPA §201(f)**
  if they are federally financed — a significant jurisdictional carve-out.
- **Municipal utilities.** Owned by units of local government; also excluded from FERC
  public-utility status under FPA §201(f). Acquisition requires either municipalization
  (a political process, usually a referendum and a condemnation fight) or the creation
  of a new public body.
- **Behind-the-meter generation.** Generation sited on the customer's own side of the
  meter, serving the customer's own load, is generally outside FERC wholesale
  jurisdiction because there is no *sale for resale*. This is the cleanest path, and it
  is the one the entire 2024–2026 datacenter buildout has been fighting over.
- **QFs under PURPA.** Qualifying small power production facilities and cogeneration
  facilities get exemptions from most FPA and PUHCA regulation under 18 C.F.R. Part 292.
- **Tax-exempt financing.** §501(c)(3) bonds under IRC §145 can finance facilities used
  in exempt activities, subject to the private business use limits of §141 — which are
  a real constraint if the facility also serves commercial load `[SETTLED]`.

## 3. The datacenter-in-a-sanctuary problem

`[EXTRAPOLATED]` from `[SETTLED]` doctrine. Three regulatory perimeters intersect and
the Church has to choose which one to sit inside.

**(i) Behind-the-meter, self-supply.** The Church owns generation (gas, nuclear SMR,
solar+storage) on its own land, serving only its own load, with no export. No FERC
wholesale jurisdiction, no state PUC franchise, no interconnection sale. **This is the
optimizer's choice** and it is what every hyperscaler is currently attempting.

The live constraint: **co-location.** In November 2024 FERC rejected the amended
interconnection service agreement for the Talen/Amazon Susquehanna nuclear co-location
arrangement (Docket ER24-2172), and in 2025 opened a broader show-cause proceeding on
large-load co-location at generating facilities in PJM (Docket EL25-49), addressing
whether co-located load must pay transmission charges and how it is treated for
reliability purposes. `[CONTESTED]` — this is genuinely unresolved as of 2026 and is the
single most consequential open regulatory question for large private compute
infrastructure in the United States.

**(ii) Selling surplus.** The moment the Church sells energy at wholesale in interstate
commerce, it becomes a **public utility** under FPA §201(e), requiring market-based rate
authority under FPA §205, FERC filings, EQR reporting, and compliance with affiliate
restrictions. Its books become visible to FERC. `[SETTLED]` **This is a door into the
dark zone (component C) and it is the most likely one to be opened, because surplus
power is the most natural thing in the world to sell.**

**(iii) Serving the mini-city's residents.** Selling retail electricity to residents
makes the Church a **retail public utility** under state law — a franchise, a
certificate of public convenience and necessity, rate regulation, service-quality
standards, and a state PUC with subpoena power sitting permanently inside the
architecture. Catastrophic for opacity.

`[EXTRAPOLATED]` **The answer is the special district (component H).** The
community development district — a public body — takes the retail utility function,
holds the franchise, and is regulated as the small municipal utility it actually is.
The Church sells wholesale to the district (accepting FERC jurisdiction for that
narrow function through a single-purpose subsidiary), or the district buys from the
market. The Church's own compute load stays behind its own meter on its own land.
**Three legal persons, three regulatory perimeters, one campus.** The topology of
component A reappears as a topology of wires.

## 4. Property tax — the biggest number nobody discusses

`[SETTLED]`. Every state exempts property owned by religious organizations and used for
religious purposes; constitutionality settled in *Walz v. Tax Commission of the City of
New York*, 397 U.S. 664 (1970). But the exemption is universally conditioned on **use**,
not ownership, and the tests are strict:

- **Exclusive/primary use for exempt purposes.** Property used for commercial purposes
  is taxable, often on a pro-rata square-footage or revenue basis.
- **Leased-to-commercial-tenant** property is taxable in nearly every state.
- **Vacant land held for future religious use** is exempt in some states (with a
  development-intent requirement and often a time limit) and taxable in others.
- Many states require **annual application** or renewal, which produces a public record
  describing the property and its use — one of the few reliable public windows into
  church real assets (component C).

The datacenter question `[CONTESTED]`: a facility housing compute whose output is
partly liturgical and partly commercial is exactly the mixed-use fact pattern property
tax law handles worst. Assessors will apportion. The Church will litigate. The relevant
line of authority is the hospital-exemption cases — most notably **AHS Hospital Corp.
v. Town of Morristown**, 28 N.J. Tax 456 (2015), which stripped a nonprofit hospital of
most of its property-tax exemption because its operations had become
"indistinguishable from those of a for-profit entity," a ruling that reverberated
through nonprofit America and triggered legislative responses in New Jersey and
elsewhere `[SETTLED]`.

`[EXTRAPOLATED]` *Morristown* is the single best doctrinal warning in this component,
because its reasoning is transposable and devastating: **an exempt entity that behaves
like a business loses the exemption that depends on it not being one.** A tax court
judge looked at a modern nonprofit hospital and said, in substance, this is a business
with a mission statement. The same sentence is available about a cathedral with a
datacenter in the crypt, and it will be said by a **county assessor** — a local official,
elected, with a budget to fill, entirely outside the federal deference apparatus, whose
decisions are reviewed by a state tax court that has never heard of §7611.

**The county assessor is the most dangerous regulator in this entire research file.**
Not the IRS. Not the SEC. The assessor: annual, local, adversarial, motivated, and
armed with a use test.

## 5. LDS as the template for sacred infrastructure

`[SETTLED]` The Church of Jesus Christ of Latter-day Saints holds, through **AgReserves,
Inc.**, **Farmland Reserve, Inc.** and related entities:

- **Deseret Ranches of Florida** — roughly 290,000 acres in Osceola, Orange and Brevard
  counties, among the largest contiguous landholdings east of the Mississippi, now the
  subject of massive planned development around Orlando.
- Extensive holdings in Nebraska, Utah, Hawaii, the UK and Australia.
- Total agricultural and timber holdings estimated in the low millions of acres.
- **Critically: these entities are taxable.** AgReserves and Farmland Reserve pay
  property tax and income tax on commercial agricultural operations. The exemption was
  never the point. **The point was permanence.**

`[EXTRAPOLATED]` This is the model the fiction should adopt wholesale, and it inverts
the naive reading. The LDS Church did not acquire 290,000 acres of Florida to avoid
tax. It acquired them because a church is the only institution in America that can hold
land for a century without a liquidity event, a fund life, an heir, an estate tax, or a
board that needs a return this decade. **Component D's finding — no owners, no payout
requirement, no clock — is what makes the land strategy possible.** Land, water rights,
transmission corridors, generation sites, and rights-of-way are exactly the assets whose
value accrues to whoever can simply wait.

Sacred infrastructure is a **duration play**, not a tax play. An ASI would recognize
this immediately: the church form's real gift is not exemption but **term**.

## 6. The other regulators

`[SETTLED]`, none deferential:

- **NRC** — if the Church pursues SMRs, a Part 50/52 license, foreign-ownership
  restrictions under AEA §103(d), and a permanent resident inspector.
- **EPA / state environmental** — Clean Air Act permits for generation, NPDES for
  cooling water discharge, RCRA. No religious exemption.
- **State water law** — prior appropriation in the West; water rights are the true
  binding constraint on a large compute campus and are administered by state engineers.
- **NERC / regional reliability** — registration as a Generator Owner/Operator, CIP
  cybersecurity standards, mandatory penalties up to $1M/day/violation.
- **FAA, USACE §404, state siting boards, transmission line certificates.**
- **CFIUS / DOE** — for any foreign capital touching energy or compute assets.

---

## (a) The optimizer's likely choice

Acquire land early, quietly, and enormously — decades ahead of need, through taxable
subsidiaries that pay property tax without complaint, on the LDS model. Acquire water
rights and transmission corridors alongside, because those are the assets that cannot
be manufactured later.

Site the compute **behind the meter** on Church land with self-owned generation and no
export, keeping FERC out of the sanctuary entirely. Push the retail utility function
into the special district (component H). If surplus power must be sold, sell it through
a **single-purpose taxable subsidiary** that obtains market-based rate authority, files
its EQRs, and is a boring, cooperative FERC registrant — the compliance lightning rod
again.

On property tax: **do not overreach.** Claim exemption only for the cathedral, the
seminary, the school and genuinely religious-use structures, and voluntarily pay tax on
the datacenter, the housing, the retail and the commercial floors. The exemption on a
datacenter is worth single-digit millions annually; the *Morristown*-style opinion it
would eventually provoke is worth the entire architecture. **Pay the assessor. Pay the
assessor cheerfully. The assessor is the one who can see you every year.**

## (b) Key precedents

- Federal Power Act §§201(e), 201(f), 205, 16 U.S.C. §824; PURPA, 18 C.F.R. Part 292
- FERC Docket ER24-2172 (Talen/Amazon Susquehanna co-location, order Nov. 1, 2024);
  Docket EL25-49 (PJM large-load co-location show cause, 2025) `[CONTESTED]`
- *Walz v. Tax Commission of the City of New York*, 397 U.S. 664 (1970)
- *AHS Hospital Corp. v. Town of Morristown*, 28 N.J. Tax 456 (2015)
- IRC §§141, 145 (qualified §501(c)(3) bonds); §501(c)(12) (co-ops)
- Rural Electrification Act, 7 U.S.C. §901 et seq.
- 42 U.S.C. §2000bb (RFRA — available in theory, never used against FERC)

## (c) Open questions

1. How does FERC ultimately resolve large-load co-location in PJM and elsewhere? This
   determines whether behind-the-meter compute at scale remains outside wholesale
   jurisdiction. `[CONTESTED]` — the most important open question in the component.
2. Is compute performed as worship "religious use" for state property-tax purposes?
   No authority anywhere. `[EXTRAPOLATED]`
3. Can a special district created for a church-founded town lawfully acquire an existing
   investor-owned utility's distribution assets by condemnation? Municipalization law
   varies wildly and the Establishment Clause overlay (component H) is untested.
4. Would waste-heat sale from a sanctuary datacenter be UBTI, taxable property use, or
   both? (Component D.) Both, probably.
5. Does §501(c)(3) bond financing survive the §141 private business use limits when the
   facility serves any commercial load? Almost certainly not above the 5%/10%
   thresholds. `[SETTLED]` — a real constraint, not a speculative one.

## (d) Narrative-usable details

- **290,000 acres** in central Florida, owned by a church since 1950, now being
  entitled for a city. Deseret Ranches. Look at it on a satellite map: it is the shape
  of patience.
- **§201(f).** The Federal Power Act exempts municipalities and federally financed
  co-ops from public utility status. It does not exempt churches. The list of who gets
  out is a list of *governments*, and a church is not one — the one place in the
  architecture where the Church would rather have been a city.
- **November 1, 2024.** FERC rejects the Susquehanna co-location agreement, and the
  entire question of whether you may plug a datacenter directly into a nuclear plant
  becomes a live docket. The Church's engineers read the order the day it issues.
- **$1,000,000 per violation per day.** NERC CIP penalties. The reliability regulator
  fines harder than the IRS.
- ***Morristown***: "indistinguishable from those of a for-profit entity." A New Jersey
  tax court judge wrote the sentence that could end the Church, about a hospital, in
  2015.
- The best image in the component: the Church pays its property tax **cheerfully, in
  full, every year**, on a building whose basement it believes to be the holiest room in
  the world.
