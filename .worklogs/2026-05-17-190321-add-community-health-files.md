# Add community health files

**Date:** 2026-05-17 19:03
**Scope:** .github/ scaffolding, AGENTS.md relocation

## Summary

Add CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md, PULL_REQUEST_TEMPLATE.md, ISSUE_TEMPLATE/{config,bug_report,rule_request,false_positive}, and dependabot.yml. Move AGENTS.md from repo root to .github/AGENTS.md.

## Context

Repo had a working README and four releases but no community profile scaffolding. GitHub's community profile checker showed CoC and CONTRIBUTING missing, and the repo had no structured issue intake.

## Decisions

- Contributor Covenant 2.1 verbatim for CoC.
- Three issue templates (bug, rule_request, false_positive) using the YAML form schema, plus config.yml routing usage questions to Discussions.
- dependabot.yml for npm + github-actions, weekly cadence, dev deps grouped.
- AGENTS.md belongs alongside community contributor docs, not at repo root.
