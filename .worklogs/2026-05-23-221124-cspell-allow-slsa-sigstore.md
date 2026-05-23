# Allow SLSA, Sigstore, Nixpkgs, SARIF in cspell

CI failed on PR #53 because the README "Verify the package" section introduced `SLSA` and `Sigstore`, and ROADMAP.md introduced `Nixpkgs` and `SARIF`. All four are proper nouns or standardized acronyms. Added to the cspell allow list.
