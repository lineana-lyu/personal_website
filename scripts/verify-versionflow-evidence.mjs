import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const screens = [
  'baseline-v0.0.5-pass-evidence',
  'cp-a-commit-v0.0.5-evidence',
  'cp-b-commit-v0.0.5-evidence',
  'trace-v0.0.5-evidence',
  'trace-after-restart-v0.0.5-evidence',
  'duplicate-baseline-fail-v0.0.5-evidence',
  'history-after-failed-baseline-v0.0.5-evidence',
]
const excluded = ['e0-v0.0.4-pass', 'cp-a-position-v0.0.5', 'cp-b-position-v0.0.5']
const component = readFileSync('src/components/VersionFlowRuntimeGallery.tsx', 'utf8')
const caseComponent = readFileSync('src/components/ProjectCaseStudy.tsx', 'utf8')
if (!caseComponent.includes('<VersionFlowRuntimeGallery />') || !caseComponent.includes('<VersionFlowEvidence />')) {
  throw new Error('Real screenshots and explanatory movement diagram must both remain')
}
for (const screen of screens) {
  const path = join('dist', 'media', 'versionflow', screen + '.svg')
  if (!existsSync(path)) throw new Error('Missing deployed runtime evidence: ' + path)
  const svg = readFileSync(path, 'utf8')
  const image = svg.match(/href="data:image\/png;base64,([^"]+)"/)?.[1]
  if (!image || !image.startsWith('iVBORw0KGgo') || image.length < 10000) {
    throw new Error('Real PNG screenshot bytes missing from ' + path)
  }
  if (!component.includes(screen + '.svg')) throw new Error('Gallery has no corresponding step for ' + screen)
}
for (const basename of excluded) {
  if (existsSync(join('dist', 'media', 'versionflow', basename + '.png')) ||
      existsSync(join('dist', 'media', 'versionflow', basename + '.svg'))) {
    throw new Error('Unapproved screenshot accidentally published: ' + basename)
  }
}
console.log('VersionFlow screenshot gate PASS: all 7 screened photos are published; 3 excluded assets stay absent')
