import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const expectedIds = ['lexiflow', 'versionflow', 'robot-service', 'news-demo']
const expectedNames = ['LexiFlow', 'VersionFlow', '扫地机助手', '资讯 Demo']
const source = readFileSync('src/data/portfolio.ts', 'utf8')
const app = readFileSync('src/App.tsx', 'utf8')
const styles = readFileSync('src/styles.css', 'utf8')

const actualIds = [...source.matchAll(/^\s{4}id: '([^']+)',/gm)].map(match => match[1])
if (JSON.stringify(actualIds) !== JSON.stringify(expectedIds)) {
  throw new Error(`Portfolio project IDs changed: ${actualIds.join(', ')}`)
}

if (!app.includes('projects.map((project) =>') || !app.includes('project.navTitle ?? project.title')) {
  throw new Error('Project navigation no longer renders every item from project data')
}

const narrowStyles = styles.slice(styles.indexOf('@media (max-width: 900px) {\n  .project-switcher {'))
if (!/\.project-switcher__tabs\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s.test(narrowStyles)) {
  throw new Error('Narrow-screen navigation must show all four projects in a 2-column grid')
}

if (!existsSync('dist/index.html')) throw new Error('Missing GitHub Pages index.html')
if (existsSync('dist/documents/resume.html')) throw new Error('Removed resume page returned in the deploy')
const jsDir = 'dist/assets'
const appJs = readdirSync(jsDir).filter(file => file.endsWith('.js'))
  .map(file => readFileSync(join(jsDir, file), 'utf8')).join('\n')
for (const name of expectedNames) {
  if (!appJs.includes(name)) throw new Error(`Project label absent from the production bundle: ${name}`)
}
if (!appJs.includes('news-demo')) throw new Error('News demo project ID absent from the production bundle')
if (appJs.includes('documents/resume.html')) throw new Error('Resume download link persists in the production bundle')
console.log('Portfolio verified: 4 projects, visible narrow-screen navigation, no resume download path')
