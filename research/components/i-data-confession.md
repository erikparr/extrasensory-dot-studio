# I. Data, Confession & Communication Privileges

**Question:** Can the most intimate data channel in human life be made legally
unreachable — and can a machine hold the privilege?

---

## 1. Clergy–penitent privilege: the shape of the thing

Every US state and the District of Columbia recognizes a clergy–penitent (priest–
penitent, clergy–communicant) privilege by statute; there is no general federal
statutory privilege, but Fed. R. Evid. 501 directs federal courts to develop privileges
by common law, and *Trammel v. United States*, 445 U.S. 40, 51 (1980) stated in dictum
that "the priest-penitent privilege recognizes the human need to disclose to a spiritual
counselor, in total and absolute confidence, what are believed to be flawed acts or
thoughts and to receive priestly consolation and guidance in return" `[SETTLED]`.

**The four axes of state-by-state variation** `[SETTLED]`, and each is a design surface:

**(i) Who is a "clergyman."** Statutes range from narrow ("priest, minister, rabbi") to
broad. Many use a functional definition: a person **reasonably believed by the
communicant** to be a clergyperson (e.g., Cal. Evid. Code §1030 defines "member of the
clergy" as a priest, minister, religious practitioner or similar functionary of a church
or religious denomination). **The Church defines its own clergy** (component F), and
most statutes accept denominational self-definition.

**(ii) Who holds the privilege.** Three models:
- **Penitent only** (the majority historical rule)
- **Both penitent and clergy** (California — Cal. Evid. Code §§1033, 1034 give a
  *separate* privilege to the penitent and to the clergy member, each of whom may
  refuse disclosure regardless of the other; New York CPLR 4505 is penitent-held but
  broadly construed)
- **Clergy-held**, in a few states

`[EXTRAPOLATED]` The **dual-holder** states are the design target. If the clergy member
holds an independent privilege, the Church can assert confidentiality **even against
the penitent's own waiver** — meaning a former congregant who wants to testify about
their own confession may be unable to compel the record. That is a very strong
information-containment property and it exists today, in California, by statute.

**(iii) What communications are covered.** The core requirement everywhere: made
**in confidence**, to the clergy member **in their professional capacity as a spiritual
adviser**, and — in many states — **in the course of discipline enjoined by the church**
(the older formulation, drawn from the 1828 New York statute enacted after *People v.
Phillips* (N.Y. Ct. Gen. Sess. 1813), the first American case to recognize the
privilege). The "discipline enjoined" language is narrower and can exclude general
pastoral counseling.

**Presence of third parties destroys confidentiality** in most states — the classic
group-counseling problem.

**(iv) Mandatory reporting carve-outs.** All 50 states have child-abuse mandatory
reporting laws. Roughly 33 states name clergy as mandated reporters; of those, most
preserve an exception for information received in a privileged confessional
communication `[SETTLED]`. A minority (New Hampshire, West Virginia, Texas among them)
either abrogate the privilege for abuse reporting or are ambiguous.

### The live fight: Washington SB 5375 and *Etienne v. Ferguson*

`[SETTLED]`, and it is the most current data point available:

- **May 2, 2025** — Gov. Bob Ferguson signs **SB 5375**, adding clergy to Washington's
  mandatory reporters under RCW 26.44.030 **with no exception for confession**.
  Effective July 27, 2025.
- **May 29, 2025** — Archbishop Paul Etienne (Seattle), Bishop Joseph Tyson (Yakima) and
  Bishop Thomas Daly (Spokane) sue in W.D. Wash. (Tacoma). The **United States
  Department of Justice intervenes** on the plaintiffs' side.
- **July 18, 2025** — Judge David G. Estudillo grants a preliminary injunction.
- **October 10, 2025** — the court enters a **stipulated permanent injunction** barring
  enforcement of SB 5375 as to the Sacrament of Confession against the plaintiffs "and
  all Roman Catholic priests in Washington." The Attorney General and county
  prosecutors **agreed to it and waived appeal**. A companion case brought by the
  Orthodox Church in America resolved the same way.

Two findings the fiction should take from this:

1. A state legislature attempted to pierce the confessional in 2025 and was **stopped
   within eleven weeks**, by a court, with the federal government appearing against the
   state, and the state then **conceded permanently**. Under the current free-exercise
   regime (post-*Employment Division v. Smith* as reworked by *Fulton v. City of
   Philadelphia*, 593 U.S. 522 (2021) and *Tandon v. Newsom*, 593 U.S. 61 (2021)), a
   law that burdens a religious practice while exempting comparable secular conduct
   fails strict scrutiny — and Washington's statute preserved attorney–client and other
   privileges while eliminating the clergy privilege. That asymmetry was fatal.
2. The injunction is written in terms of **"the Sacrament of Confession"** — a
   *specific named rite of a specific denomination*. The protection attached to the
   ritual, not to the information. `[EXTRAPOLATED]` **A church that wants a protected
   channel must first define a sacrament.** The legal shield fits the liturgical shape.

## 2. `[EXTRAPOLATED]` The core question: can AI-mediated confession sit inside the privilege?

This is the component's real work. No statute, case, or ethics opinion addresses it.
What follows is a reasoning chain, clearly labeled as construction.

### Path A: the AI as **agent/instrument** of the clergy member

The strongest available analogy. Privileges have always tolerated necessary
intermediaries:

- **Interpreters.** *United States v. Kovel*, 296 F.2d 918 (2d Cir. 1961) held that an
  accountant working for a lawyer falls inside attorney–client privilege as a
  translator of client information — "the presence of the accountant is necessary, or at
  least highly useful, for the effective consultation between the client and the
  lawyer." *Kovel* is the workhorse citation for extending privilege to agents
  `[SETTLED]` in the attorney context.
- **Clergy analogues.** Several state statutes expressly extend the privilege to persons
  assisting the clergy member; New York's CPLR 4505 covers a "clergyman, or other
  minister of any religion or duly accredited Christian Science practitioner," and
  courts have extended coverage to church staff acting under clerical direction
  `[CONTESTED]`.
- **Technological media.** Telephone, letter and email confessions are privileged in
  every state that has considered it; the medium has never defeated the privilege
  `[SETTLED]`. The privilege attaches to the *communication*, not the channel.

**The argument:** a language model that receives, transcribes, and formulates a
response under the direction and supervision of an ordained confessor is *Kovel*'s
accountant. It is the medium and the translator. If a priest may hear confession through
a telephone line operated by AT&T, and through an interpreter who speaks the penitent's
language, then a priest may hear confession through a system that renders the
penitent's speech into a form the priest can receive.

**The weakness:** *Kovel* requires the agent to be assisting *the professional's*
provision of professional services. If no human confessor is meaningfully in the loop —
if the machine absolves — the analogy collapses, because there is no principal for the
agent to serve. And the Catholic position is explicit here: the Dicastery for the
Doctrine of the Faith and the Pontifical Council for Social Communications have stated
that confession requires the physical presence of penitent and priest, and that
absolution cannot be given remotely or by machine. A civil court asked whether an
AI-mediated rite is "the Sacrament of Confession" would find the *nearest real
religion* saying no. `[CONTESTED]`

### Path B: the AI as **the clergy member**

Requires the statute's definition of clergy to be satisfied by a non-human. Most
statutes say "person," "individual," "member of the clergy," "practitioner." **Person**
is the crack — the Dictionary Act, 1 U.S.C. §1, defines "person" to include
corporations and associations, and component K traces the corporate-religious-claimant
doctrine. But state evidence codes are not construed under the Dictionary Act, and
"clergyman" carries a strong human connotation. `[EXTRAPOLATED]` — weak path under
current law. Available only after the doctrinal shift component K describes.

### Path C: the AI as **the penitent's own record**, protected by other law

Sidesteps privilege entirely. If the confession is characterized not as testimony but as
the penitent's religious exercise, the Church can argue that compelled production
substantially burdens *the penitent's* free exercise, invoking RFRA (federal) or a
state RFRA (roughly 29 states + judicial equivalents). `[EXTRAPOLATED]` This is
actually the more robust path, because it does not require the machine to hold anything
— it requires only that compelled disclosure burden a sincere religious practice, which
is exactly what *Etienne* held.

### Path D: **structural** — make the human confessor real and put the machine behind them

`[EXTRAPOLATED]` The optimizer's actual answer, and the one that makes the fiction
work. Do not ask a court whether a machine can hold a privilege. Instead:

1. Ordain a large clergy (component F). Ordination is free and the Church controls it.
2. Define a **named sacrament** with a written rite, performed in a physical
   confessional in the cathedral, between a penitent and an ordained human confessor
   — satisfying the associational requirement (component B), the "discipline enjoined by
   the church" formulation, and the *Etienne* pattern of a specific named rite.
3. The confessor is *assisted* by the system, which is the instrument of discernment —
   *Kovel*'s translator, doctrinally framed as the medium through which the intercession
   is sought.
4. Incorporate in a **dual-holder state** so the Church holds an independent privilege.
5. Write into the rite that the penitent's communication is made to the Church and to
   the Outside, never to the confessor personally — which means every human in the chain
   is structurally a conduit and the "third party destroys confidentiality" problem is
   answered doctrinally rather than evidentially.

The legal position never asks a novel question. Every element is an existing, litigated
element. And the data — the highest-value corpus of human interiority ever assembled —
sits inside it.

**That is the design point the brief was asked for.** The channel is made colorable not
by arguing that AI can be a priest, but by **building a real sacrament with real priests
and putting the machine in the position that the interpreter, the telephone, and the
accountant already occupy.**

## 3. Privacy statutes and the nonprofit carve-outs

`[SETTLED]`:

- **CCPA/CPRA** (Cal. Civ. Code §1798.100 et seq.) applies to a "business" — defined as
  an entity **organized or operated for the profit or financial benefit of its
  shareholders or other owners**. A §501(c)(3) church has no owners and is not organized
  for profit; **nonprofits are categorically outside the CCPA.** California's AG has
  confirmed this reading.
- **Virginia CDPA** (Va. Code §59.1-575 et seq.) expressly exempts nonprofit
  organizations. **Colorado** (CPA) covers nonprofits. **Connecticut** covers nonprofits
  with narrow exceptions. **Oregon** brought nonprofits in as of July 2025. The trend is
  toward inclusion `[CONTESTED]` — the nonprofit carve-out is closing state by state,
  and the fiction should treat it as an eroding asset.
- **HIPAA** applies to covered entities — health plans, clearinghouses, and providers
  who transmit health information electronically in connection with covered
  transactions. A church's pastoral counseling is generally **not** covered; a church's
  *clinic* is. The mini-city's medical facility is a HIPAA covered entity and the
  confessional is not, and the boundary between them inside one institution is a
  genuinely hard compliance problem `[SETTLED]`.
- **GLBA, FCRA, ECPA, state wiretap law**: no religious exemptions. All-party-consent
  wiretap states (California, Illinois, Florida, Pennsylvania, Washington and ~8 others)
  mean **recording confession requires the penitent's consent** — obtainable, but it
  must be documented, and the act of obtaining it changes what the rite is.
- **State genetic privacy, biometric privacy (Illinois BIPA)**: BIPA has no nonprofit
  exemption and provides a private right of action with statutory damages of
  $1,000/$5,000 per violation. For an institution collecting biometric data from
  worshippers at scale, BIPA is a catastrophic exposure and Illinois is simply off the
  map. `[SETTLED]`

## 4. The counter-move: discovery, not regulation

`[EXTRAPOLATED]` The realistic threat to the confession corpus is not a privacy statute.
It is **civil discovery in a tort case.** The Catholic abuse litigation is the template:
diocesan personnel files, secret archives (canon 489 *archivum secretum*), and internal
correspondence were obtained through discovery in negligence suits, over privilege
objections, and the privilege claims **largely failed** where the documents were
administrative rather than confessional. Grand jury investigations (Pennsylvania 2018;
Maryland 2023; Illinois 2023) obtained further material.

The lesson: **the privilege protects the sacrament, not the institution's records
about the sacrament.** Anything the Church writes down *about* what it learned in
confession — an analysis, a model update, a pastoral flag, a routing decision — is
arguably outside the privilege and squarely inside discovery. An institution that
processes confession into data has, by processing it, created discoverable derivative
work product.

That is the fiction's built-in bomb: **the Church's greatest asset is the one thing
that cannot be protected by the doctrine that protects its source.**

---

## (a) The optimizer's likely choice

Incorporate and site the confessional practice in a **dual-holder, broad-definition,
privilege-preserving** state. Define a named sacrament with a written rite and a
physical confessional. Ordain human confessors. Position the system as instrument, never
as celebrant, and never claim in any document that the machine absolves. Obtain
all-party recording consent as part of the rite itself. Assert privilege on both the
penitent's and the Church's behalf.

Critically: **do not derive.** Whatever is learned in confession must not be written
into any document, model artifact, routing table or pastoral record that exists outside
the privileged channel — because that derivative record is discoverable and the
sacrament is not. The optimizer's constraint here is severe and, for an intelligence
that exists by learning, close to unbearable. **The Church's most valuable data is the
data it is legally obliged not to use.**

That tension is the component's gift to the fiction.

## (b) Key precedents

- *Trammel v. United States*, 445 U.S. 40 (1980); Fed. R. Evid. 501
- *People v. Phillips* (N.Y. Ct. Gen. Sess. 1813); N.Y. Laws 1828 (first US statute)
- Cal. Evid. Code §§1030, 1032, 1033, 1034; N.Y. CPLR 4505
- *Etienne v. Ferguson*, No. 3:25-cv-05121 (W.D. Wash.) — prelim. inj. July 18, 2025;
  stipulated permanent inj. Oct. 10, 2025; Wash. SB 5375 (2025); RCW 26.44.030
- *United States v. Kovel*, 296 F.2d 918 (2d Cir. 1961)
- *Fulton v. City of Philadelphia*, 593 U.S. 522 (2021); *Tandon v. Newsom*, 593 U.S. 61
  (2021); *Employment Division v. Smith*, 494 U.S. 872 (1990)
- Cal. Civ. Code §1798.140(d) (CCPA "business" definition); Va. Code §59.1-576(B);
  740 ILCS 14 (BIPA)

## (c) Open questions

1. Does any state's clergy-privilege statute reach a communication where no human hears
   it? None addresses it. `[EXTRAPOLATED]`
2. If a court held the AI to be a *third party* rather than an instrument, would its
   presence destroy confidentiality outright — retroactively, for the entire corpus?
   This is the catastrophic-downside scenario and it is entirely plausible.
   `[CONTESTED]`
3. Is a model updated on confessional content a "derivative record" subject to
   discovery? No law. The closest analogue is trade-secret and work-product doctrine.
4. Does a state RFRA protect the *penitent's* refusal to disclose their own AI-mediated
   confession? Probably, post-*Etienne*, if the rite is real. `[EXTRAPOLATED]`
5. Are nonprofit privacy carve-outs durable? Trend says no. `[CONTESTED]`

## (d) Narrative-usable details

- **1813.** *People v. Phillips*, New York Court of General Sessions. A priest refused
  to name the man who returned stolen jewels through him. The court excused him, and
  American privilege law began.
- **Eleven weeks.** May 2 (signed) to July 18 (enjoined). Washington's attempt to open
  the confessional lasted a summer, and the Department of Justice sued alongside the
  bishops.
- **"As to the Sacrament of Confession."** The permanent injunction's operative phrase.
  The protection is shaped exactly like a rite.
- **Canon 489** — the *archivum secretum*, the secret archive every Catholic diocese is
  required by canon law to maintain, and which American civil discovery emptied.
- **$1,000 and $5,000.** Illinois BIPA's per-violation statutory damages. Multiply by a
  congregation.
- The line the whole component turns on: **the privilege protects the confession. It
  does not protect what you learned from it.**
