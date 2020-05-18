#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync } = require('child_process')

const npmrc = path.join(os.homedir(), '.npmrc')
const npm = fs.readFileSync(npmrc, 'utf-8')

let localnpmrc = ''
let hasLocalNpmrc = false
try {
  localnpmrc = fs.readFileSync('.npmrc', 'utf-8')
  hasLocalNpmrc = true
} catch (e) {
  // nothing
}

const combined = [npm, localnpmrc].join('\n')

const upd = combined.split('\n')
  .filter(l => l.indexOf('package-lock') === -1)
  .concat('package-lock=true')
  .join('\n')

fs.writeFileSync('.npmrc', upd)

try {
  spawnSync('npm', [ 'install', '--package-lock-only' ], { stdio: 'inherit' })
} catch (err) {
  console.error(err.message)
}

if (hasLocalNpmrc) {
  fs.writeFileSync('.npmrc', localnpmrc)
} else {
  fs.unlinkSync('.npmrc')
}

