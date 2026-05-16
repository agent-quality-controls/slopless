# Goal

Make Slopless usage clearer by requiring an explicit target and shortening the public docs.

# Approach

- Change the CLI so `slopless` with no path and no stdin exits with usage error.
- Remove bare `npx slopless` examples from README and help.
- Add a short introduction that names the package as AI and human slop detection.
- Replace the broad "what it checks" section with a compact rule overview that names every enabled rule and gives an example signal.
- Publish a patch release because CLI help and behavior are package output.

# Files To Modify

- `README.md`
- `src/cli.ts`
- `package.json`
- `package-lock.json`
- `.worklogs/*`
