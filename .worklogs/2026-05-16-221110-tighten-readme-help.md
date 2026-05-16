# Summary

Tightened Slopless usage docs and CLI help around explicit inputs.

The CLI now rejects bare `slopless` with exit code 2, the README is shorter, and the rule overview names every shipped rule with a concrete example or threshold.

# Decisions Made

- Removed implicit `**/*.md` behavior because a no-argument run is unclear for users.
- Fixed stdin handling in the wrapper because textlint's programmatic CLI needs stdin text passed explicitly.
- Kept every rule visible in README, but compressed grouped rules to keep the document shorter.
- Bumped to `0.2.4` because CLI behavior and package help changed.

# Key Files For Context

- `README.md`
- `src/cli.ts`
- `package.json`
- `package-lock.json`
- `.plans/2026-05-16-220547-tighten-readme-help.md`

# Verification

- `npm run validate`
- `fixture3 check --suite textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-split-slopless.py`
- `node dist/cli.js` exits 2 with an explicit input error.
- `cat draft.md | node dist/cli.js --stdin --stdin-filename draft.md` emits parseable JSON.

# Next Steps

- Commit and push the package changes.
- Publish `slopless@0.2.4`.
