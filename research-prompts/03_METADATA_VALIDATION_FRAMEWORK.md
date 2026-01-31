# Research Metadata & Validation Framework

## Purpose
Provide structured approach to tracking sources, validating claims, and maintaining research integrity across the code/cypher rendering research project.

---

## 1. Source Classification & Ranking System

### Tier 1: Primary Sources (Highest Authority)
**Definition:** Original research, technical specifications, archival documents, peer-reviewed publications.

**Examples:**
- Academic papers (peer-reviewed journals: IEEE Xplore, ACM Digital Library, arXiv, SIAM)
- Official technical documentation (Enigma patents, cryptographic standards like NIST publications)
- Archival materials (Bletchley Park Trust, National Archives, museum collections)
- Source code repositories (GitHub, institutional archives) with documented methodology
- Original artwork with artist statement or exhibition catalog

**How to Verify:**
- Check publication venue (journal name, impact factor if applicable)
- Verify author credentials (institutional affiliation, publication history)
- Look for DOI, arXiv identifier, or archival reference number
- For source code: examine commit history, documentation, maintainer reputation

**Metadata Template for Tier 1:**
```
Title: [exact title]
Authors: [full names, institutions]
Date: [publication/archival date]
Source Type: [journal article | patent | archival document | open-source repo]
Publication Venue: [journal name, conference, archive name]
DOI/Identifier: [DOI or archival ID]
Accessed Date: [when you accessed it]
Relevance to Cipher Rendering: [1-2 sentences]
Key Quote/Section: [exact passage with page number]
Reliability Assessment: [what makes this trustworthy]
Conflicts/Limitations: [what this source doesn't cover or argues against]
Cross-Reference: [other sources confirming/contradicting this]
```

---

### Tier 2: Secondary Sources (Good Authority)
**Definition:** Synthesized information from primary sources by recognized experts; books; educational resources from established institutions.

**Examples:**
- Books by cryptography experts (Simon Singh, Bruce Schneier, Andrew Hodges)
- University course materials with clear attribution and sources
- Technical blogs by established practitioners (documented experience, code examples)
- Documentary films with credits and source materials
- Museum exhibits or educational materials from recognized institutions

**How to Verify:**
- Confirm author has expertise in the domain (credentials, publication history)
- Check if author cites primary sources
- Assess potential bias (commercial interest? advocacy? entertainment value?)
- Cross-reference claims with primary sources
- Look for reviewer ratings or scholarly citations

**Metadata Template for Tier 2:**
```
Title: [exact title]
Author: [full name, institution/affiliation]
Date: [publication date]
Source Type: [book | educational course | technical blog | documentary]
Publisher/Platform: [publisher name or institution]
Primary Sources Cited: [list of key sources the author references]
Accessed Date: [when you accessed it]
Relevance to Cipher Rendering: [1-2 sentences]
Key Insight: [main contribution of this source]
Author Credentials: [why this author is trustworthy]
Potential Bias: [commercial, ideological, or methodological biases to note]
Cross-Reference: [other sources confirming/contradicting this]
```

---

### Tier 3: Tertiary Sources (Reference/Orientation)
**Definition:** General knowledge sources useful for orientation; overviews and summaries; community consensus.

**Examples:**
- Wikipedia articles (useful for overview, but verify all claims with Tier 1-2 sources)
- Blog posts by hobbyists or journalists
- Forum discussions or stack overflow threads
- Popular media representations (films, TV, news articles)
- YouTube educational videos (variable quality)

**How to Use:**
- Use only for context, orientation, or identification of concepts to research further
- Always verify specific claims with Tier 1-2 sources before reporting as fact
- Note when something is "popular understanding" vs. scholarly consensus
- Acknowledge when source is entertainment vs. education

**Metadata Template for Tier 3:**
```
Title: [exact title]
Author/Creator: [name if available, or "unknown"]
Date: [creation/publication date]
Source Type: [Wikipedia | blog | forum | video | news]
Platform: [where found]
Accessed Date: [when you accessed it]
Primary Use: [orientation | context | example of cultural representation]
Reliability Notes: [what aspects are reliable vs. speculative]
Verification Status: [claims verified against Tier 1-2 | not yet verified | contradicts Tier 1-2]
Cross-Reference: [Tier 1-2 sources to consult for verification]
```

---

## 2. Claim Validation Checklist

For every significant factual claim in the research, complete this checklist:

### Claim Template
```
Claim: [exact statement being validated]
Domain: [Art | Cryptography | History | Technical]
Claim Type: [factual | methodological | evaluative]
Confidence Level: [certain | probable | provisional | uncertain]
```

### Validation Steps

- [ ] **Identify Sources**
  - [ ] Tier 1 source found? (If yes → proceed with higher confidence)
  - [ ] Tier 2 source(s) found? (Minimum for reporting)
  - [ ] Multiple sources agree? (Cross-reference at least 2 independent sources)

- [ ] **Assess Source Quality**
  - [ ] Author has relevant credentials?
  - [ ] Methodology is transparent or explained?
  - [ ] Potential conflicts of interest noted?
  - [ ] Publication/archival context appropriate?

- [ ] **Check for Contradictions**
  - [ ] Other sources contradict this? (If yes → note discrepancy, research further)
  - [ ] Is the claim a matter of interpretation vs. fact?
  - [ ] Has this view changed over time? (Document evolution)

- [ ] **Assess Applicability**
  - [ ] Does this apply to cipher rendering use case?
  - [ ] Any limitations or caveats noted?
  - [ ] Generalize or context-specific?

- [ ] **Document Uncertainty**
  - [ ] What would change the confidence level?
  - [ ] What additional evidence would help?
  - [ ] Should this be marked "needs further research"?

### Validation Result
```
Status: [VERIFIED | PROBABLE | PROVISIONAL | UNCERTAIN | CONTRADICTED]
Confidence: [95% | 75% | 50% | <50%]
Reasoning: [brief explanation of validation result]
Source Evidence: [list of supporting sources with tiers]
Caveats: [limitations or contextual notes]
Next Steps: [if UNCERTAIN or CONTRADICTED, what research is needed]
```

---

## 3. Source Quality Assessment Matrix

Use this matrix to evaluate overall reliability of a source:

| Factor | Score (1-5) | Notes |
|--------|------------|-------|
| **Expertise of Author** | | Verifiable credentials, prior work in domain |
| **Methodological Transparency** | | How clearly is methodology explained? |
| **Primary Source Citation** | | Does author cite primary sources or general claims? |
| **Peer Review / Vetting** | | Has this been reviewed by experts? |
| **Potential Bias** | | Commercial, ideological, or financial interests? |
| **Recency** | | Is information up-to-date? (Depends on domain) |
| **Accessibility** | | Can claims be verified independently? |
| **Alignment with Consensus** | | Agree with other sources or outlier position? |

**Scoring Interpretation:**
- 35-40: Tier 1 quality (use with high confidence)
- 25-34: Tier 2 quality (use with caution, verify claims)
- 15-24: Tier 3 quality (use for orientation only)
- <15: Do not use for factual claims

---

## 4. Domain-Specific Validation Criteria

### Artistic Claims
**What counts as evidence:**
- Artist statement or documented methodology
- Published exhibition materials or peer-reviewed art criticism
- Reproducible code or design files with documentation
- Video documentation showing process and result

**Red Flags:**
- Aesthetic claims presented as technical facts
- Lack of documentation about tools/process
- Unsubstantiated claims about other artists' intentions

---

### Cryptographic Claims
**What counts as evidence:**
- Mathematical proof or formal specification
- Peer-reviewed cryptography paper
- Official standard documentation (NIST, ISO, IEEE)
- Reference implementation with test vectors
- Scholarly historical documentation (for historical claims)

**Red Flags:**
- Simplified explanations without caveat about limitations
- "New" or "unbreakable" claims without peer review
- Confusion between theoretical security and implementation security
- Anachronistic application of modern understanding to historical systems

---

### Historical Claims
**What counts as evidence:**
- Primary source document with archival reference
- Multiple contemporary accounts agreeing
- Scholarly historical work with citations
- Oral history interview (note date and interviewer)
- Museum or archival exhibit with documentation

**Red Flags:**
- Single source for significant historical claim
- Popular media representation treated as fact
- Anachronistic language or understanding
- Conflation of myth with documented fact
- Claims without source attribution

---

### Technical Claims
**What counts as evidence:**
- Official framework documentation
- Peer-reviewed performance benchmark
- Source code reference with working example
- Multiple independent implementations showing same result
- Standards documentation (W3C, ECMAScript spec, etc.)

**Red Flags:**
- Claims about performance without benchmarking
- Outdated version numbers or deprecated APIs
- "Best practices" without documented reason
- Compatibility claims without testing across platforms
- Security claims without cryptographic review

---

## 5. Conflict Resolution Protocol

When sources contradict each other:

### Step 1: Identify the Contradiction
```
Source A Claims: [statement]
Source B Claims: [contradicting statement]
Context: [when/where do they differ?]
```

### Step 2: Assess Source Hierarchy
```
Source A Tier: [1/2/3]
Source B Tier: [1/2/3]
Recency: [which is more recent?]
Relevance: [which is more directly relevant?]
```

### Step 3: Investigate Root of Disagreement
- Different interpretation of same data?
- Different time periods (one outdated)?
- Different methodological approaches?
- Genuine scientific disagreement?
- Popular myth vs. documented fact?

### Step 4: Resolution Decision
```
Determination: [Source A is more reliable because | Both are valid in context because | Further research needed because]
How to Present: [present both views | note consensus | acknowledge uncertainty]
Confidence in Resolution: [high | medium | low]
```

### Step 5: Document in Research
- Note the contradiction explicitly
- Explain which source is being privileged and why
- Suggest it as area for further investigation if uncertain

---

## 6. Research Output Validation Checklist

Before finalizing any research deliverable:

### Content Validation
- [ ] All factual claims have source citations
- [ ] Claims are consistent throughout (no contradictions)
- [ ] Source citations are complete and verifiable
- [ ] Tier 3 sources are used only for orientation, clearly marked as such
- [ ] Confidence levels are appropriate to source quality
- [ ] Caveats and limitations are noted
- [ ] Opinion/interpretation is clearly distinguished from fact

### Citation Format
- [ ] All sources follow consistent citation format (APA recommended)
- [ ] Full citations available in source catalog
- [ ] In-text citations link to source catalog entries
- [ ] DOIs/identifiers included where applicable
- [ ] Access dates included for online sources

### Source Completeness
- [ ] Source catalog includes all cited sources
- [ ] Each source has tier ranking
- [ ] Tier 1 and 2 sources verified (not just titles)
- [ ] Source metadata complete (author, date, publisher, identifier)
- [ ] Any Tier 3 sources clearly labeled as reference only

### Transparency & Honesty
- [ ] Gaps in knowledge are noted
- [ ] Uncertain areas are flagged for further research
- [ ] Contradictions between sources are explained
- [ ] Author biases or limitations are disclosed
- [ ] Areas where secondary interpretation is applied are noted

---

## 7. Research Documentation Template

For each major research task/deliverable:

```markdown
# [Task Title]

## Research Questions
- [primary question]
- [secondary questions]

## Findings Summary
[2-3 paragraphs of key findings]

## Detailed Findings

### [Subtopic 1]
[findings with embedded citations]

### [Subtopic 2]
[findings with embedded citations]

## Source Validation Summary
| Claim | Source (Tier) | Confidence | Verified? |
|-------|---------------|-----------|-----------|
| [claim 1] | [citation] | [level] | [ ] |
| [claim 2] | [citation] | [level] | [ ] |

## Gaps & Further Research
- [area needing more investigation]
- [contradicting sources needing resolution]
- [topic not covered in current sources]

## Source Catalog
[List all sources with full citations and metadata]

## Appendix: Methodology
- Research approach taken
- Databases/platforms searched
- Date range of research
- Key search terms/queries used
```

---

## 8. Tools & Systems for Tracking

### Spreadsheet Template (if using Google Sheets or Excel)
Columns:
- Source ID (e.g., "ART-001")
- Title
- Author(s)
- Date
- Tier
- URL/DOI
- Status (To Review | Reviewed | Cited | Not Used)
- Relevance Tags (Matrix Aesthetic | Rotor Mechanics | etc.)
- Notes
- Quality Score

### Markdown File Organization
```
/research
  ├── sources_catalog.md (master list of all sources with metadata)
  ├── claims_validation.md (all claims with validation status)
  ├── domain_art.md (findings organized by domain)
  ├── domain_crypto.md
  ├── domain_history.md
  ├── domain_technical.md
  └── contradiction_log.md (any conflicting sources and resolutions)
```

### Notion or Obsidian Database
- Each source as separate entry/note
- Tags for domain, tier, relevance, claim type
- Backlinks between contradicting sources, related findings
- Status indicators for validation progress

---

## 9. Quality Assurance Process

### Pre-Publication QA Checklist
- [ ] All claims validated and sources cited
- [ ] At least one Tier 1 or 2 source per significant claim
- [ ] Cross-domain consistency checked (same facts reported consistently across Art, Crypto, History sections)
- [ ] Confidence levels and caveats documented
- [ ] Gaps and uncertain areas clearly flagged
- [ ] Bibliography complete and consistent
- [ ] No orphaned citations (cited but not in bibliography)
- [ ] Peer review by domain expert if possible
- [ ] Accessibility check: can a reader verify sources themselves?

### Peer Review Prompts (if using human or AI review)
1. Can you identify any unsupported claims?
2. Are there sources that contradict the major findings?
3. Are confidence levels appropriate to the evidence?
4. What gaps remain in the research?
5. Are the recommendations proportional to the evidence base?

---

## 10. Updating & Evolving Research

### Version Control
- Date each version
- Note what changed between versions
- Include change log in research output
- Maintain historical versions for reference

### When to Revise
- New Tier 1 source contradicts existing finding
- Source is found to be unreliable or retracted
- Research domain evolves significantly (new published findings)
- Additional cross-domain connections identified
- Feedback from domain experts surfaces gaps

### Archive Management
- Keep all previous versions
- Document what changed and why
- Note sources that were added/removed/downgraded
- Maintain audit trail of research evolution

---

**End Metadata & Validation Framework**
