# Internal docs

## Releasing / publishing a new version

To publish, we run a release script that bumps + tags, and push to trigger a CI to
do the actual publish.

```bash
# Must be on a clean, up to date main
git checkout main
git pull

# Run the release script
node tools/scripts/release.js 0.31.0
```

Pushing the `v0.31.0` tag triggers GitHub Actions, which publishes to
npm and creates the GitHub release.

## Re-publishing an existing tag

git push origin :refs/tags/v0.32.0
git tag -d v0.32.0
git tag -a v0.32.0 -m "Version 0.32.0"
git push origin refs/tags/v0.32.0
