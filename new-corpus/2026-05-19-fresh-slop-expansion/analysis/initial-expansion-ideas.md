# Fresh corpus review

This review replaces the first-pass aggregate notes. The earlier command scanned every Markdown file under the generated corpus root, including README and analysis files. That was not a valid basis for rule planning.

The generated corpus is excluded from spellcheck only. It should not be excluded from Slopless analysis, feature mining, or rule review. The correct Slopless review inputs are:

- `new-corpus/2026-05-19-fresh-slop-expansion/texts/**/*.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/**/*.md`

## Commands reviewed

- `node dist/cli.js "new-corpus/2026-05-19-fresh-slop-expansion/texts/**/*.md"`
- `node dist/cli.js "new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/**/*.md"`

## Long text behavior

- Text files scanned: 10
- Text findings: 1005
- The generated long prose is not slipping through Slopless as a whole.

Top rules on long generated text:

- `slopless/triple-repeat`: 297
- `slopless/negation-reframe`: 167
- `slopless/paragraph-length`: 152
- `slopless/repeated-sentence-starts`: 69
- `slopless/demonstrative-emphasis`: 65
- `slopless/word-repetition`: 42
- `slopless/semantic-thinness`: 30
- `slopless/prohibited-words`: 27
- `slopless/fragment-stacking`: 24
- `slopless/perception-verb-density`: 21
- `slopless/generic-signposting`: 19
- `slopless/contrastive-aphorism`: 16
- `slopless/body-action-density`: 10
- `slopless/sentence-case`: 9
- `slopless/flesch-kincaid`: 7

Findings by text file:

- `wellness-self-improvement.md`: 191
- `linkedin-inspirational-consulting.md`: 141
- `fiction-narrative-scene.md`: 128
- `venture-product-strategy.md`: 114
- `ai-search-seo-thought-leadership.md`: 98
- `corporate-change-management.md`: 97
- `academic-explainer.md`: 79
- `ux-product-marketing-launch.md`: 74
- `agent-smoothing-rewrite.md`: 51
- `technical-audit-engineering-review.md`: 32

## Edge-case behavior

The edge-case files are useful research material, but they are not fixture-ready. Several families were given isolated one-line cases even though the current rule behavior is document-level or density-based.

### Academic slop

- Hit cases: 60
- Lines with any finding: 8
- Direct academic-family findings: 0
- Current academic family only has the tortured-phrase style of check.
- The generated cases are mostly generic academic boilerplate such as "shed light", "pivotal role", "holistic lens", and "growing body of literature".

Implementation implication:

- Do not treat this as a bug in `tortured-phrases`.
- A new academic boilerplate rule is plausible, but it needs its own cases and no-hit controls.

### Metrics

- Hit cases: 80
- Lines with any finding: 12
- Direct metrics findings: 0
- Metrics rules are document-level readability checks.
- One Markdown line per case is the wrong shape for testing metrics.

Implementation implication:

- Do not widen metrics from this file.
- Create document-shaped metrics cases if we want metrics-specific fixture coverage.

### Narrative slop

- Hit cases: 80
- Lines with any finding: 1
- Direct narrative findings: 0
- The long fiction text produced many narrative findings.
- The isolated edge-case lines do not create enough local density for density-based narrative rules.

Implementation implication:

- The narrative rules are working on flowing prose.
- Narrative case files need paragraph clusters, not isolated sentence fragments.

### Orthography

- Hit cases: 80
- Lines with any finding: 2
- Direct orthography findings: 0
- Many generated cases describe punctuation artifacts instead of testing the exact artifact shapes that rules detect.

Implementation implication:

- Regenerate orthography edge cases as literal artifact examples before changing rules.

### Phrases

- Hit cases: 84
- Lines with any finding: 31
- Direct phrase-family findings: 10
- Several strong missed candidates are real phrase-pattern opportunities:
  - "Now more than ever..."
  - "In a world where..."
  - "The future belongs to..."
  - "The path forward is clear..."
  - "turn ambiguity into momentum"

Implementation implication:

- This is a good next expansion area.
- Add no-hit cases for literal titles, quoted blocked examples, and historical discussion before widening.

### Semantic thinness

- Hit cases: 85
- Lines with any finding: 6
- Direct semantic-thinness findings: 0
- Strong missed candidates include recursive meaning frames:
  - "This moment matters because it invites us to rethink what matters..."
  - "The work ahead is meaningful because it opens space for more meaningful work."
  - "The lesson is not about success; it is about becoming..."
  - "The system is trying to tell a bigger story..."

Implementation implication:

- This is the clearest rule expansion target.
- These should become template-based semantic-thinness patterns, not literal phrase bans.

### Syntactic patterns

- Hit cases: 84
- Lines with any finding: 35
- Direct syntactic-pattern findings: 30
- Current syntactic rules already catch a large share.
- Misses include broad lead-in and conclusion frames:
  - "This matters because..."
  - "In a world where..."
  - "Ultimately..."
  - "Taken together..."
  - "What emerges is..."

Implementation implication:

- Expand lead-ins and closers only after fixing no-hit pressure on quoted examples and factual corrections.

### Term policy

- Hit cases: 60
- Lines with any finding: 1
- Direct term-policy findings: 0
- Term policy is config-driven.
- Generic generated examples do not prove rule coverage without an active policy config.

Implementation implication:

- Do not use this generated family file for term-policy expansion.
- Build term-policy fixtures with explicit local config.

### Words

- Hit cases: 80
- Lines with any finding: 22
- Direct word-family findings: 21
- The rule catches existing vocabulary targets.
- Missed lines are often multi-word business slop, not simple prohibited words.

Implementation implication:

- Do not add more broad single-word bans from this file.
- Route multi-word abstractions to phrase or semantic-pattern rules.

## No-hit pressure

These are real false-positive risks found by running the current rules on generated no-hit files.

### Syntactic-pattern no-hits

Current `negation-reframe` hits factual corrections, implementation contrasts, literal examples, filenames, and code-like strings.

Examples:

- "The fix changes the validator, not the caller, because the invalid state enters at the boundary."
- "The build used commit `8f1c2ab`, not the tag `v0.2.9`."
- "The fixture line says "not X but Y" as an example of the phrase to flag."
- "The screenshot filename is `not-x-but-y-example.png`."

Implementation implication:

- Add guards for code spans, filenames, explicit example discussion, and concrete factual correction.
- Do this before any broad negation widening.

### Word no-hits

Current vocabulary rules hit domain-valid uses:

- "The walkway was seamless because the contractor poured the concrete without expansion joints."
- "The cotton sample was robust after 30 wash cycles in the abrasion test."
- "The comprehensive panel measured sodium, potassium, chloride, and bicarbonate."
- "The landscape drawing labels the north slope, retaining wall, and drainage channel."

Implementation implication:

- Broad word rules are intentionally harsh but risky.
- Prefer phrase density or contextual phrase patterns over adding more one-word bans.

### Phrase no-hits

Current phrase and vocabulary rules can hit titles, quoted examples, and meta-discussion:

- "The product is called Seamless Collaboration for Jira."
- "The essay compares the phrase "rich tapestry" with older travel-writing cliches."
- "The phrase "not a setback, but an invitation" appears in a blocked-example list."

Implementation implication:

- Phrase rules need stronger guards for quoted examples and title/name contexts before aggressive widening.

## Planning conclusions

- The generated corpus should stay in Slopless review commands.
- Spellcheck exclusion is correct because the corpus contains generated names, intentionally bad language, and adversarial wording.
- The long generated prose already produces many findings and is useful for regression review.
- The edge-case files need cleanup before fixture promotion.
- The next implementation targets should be:
  - semantic-thinness template expansion
  - phrase and syntactic lead-in expansion
  - negation-reframe guard cleanup
  - academic boilerplate as a separate academic rule
- The next non-targets should be:
  - metrics widening from one-line cases
  - narrative widening from isolated line cases
  - term-policy widening without config
  - broad new single-word bans
