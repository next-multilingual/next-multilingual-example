import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { exit } from 'node:process'

console.log(`\n➰ starting repository synchronization from the \`next-multilingual\` example...`)

const exampleDirectoryPath = resolve('../next-multilingual/example')

if (!existsSync(exampleDirectoryPath)) {
  console.log(`\n❌ cannot synchronize: ${exampleDirectoryPath} not found`)
  exit(1)
}

const protectedFiles = new Set(
  [
    '.git',
    '.gitignore',
    'node_modules',
    'package.json',
    'package-lock.json',
    'synchronize-repo.mjs',
    'README.md',
    'next-multilingual-banner.svg',
  ].map((file) => resolve(file))
)

console.log(`\n✨ trying to clean current repository files..\n`)

let deleteCount = 0
readdirSync('.', { withFileTypes: true }).forEach((directoryEntry) => {
  const directoryEntryPath = resolve('.', directoryEntry.name)
  if (!protectedFiles.has(directoryEntryPath)) {
    rmSync(directoryEntryPath, { recursive: true, force: true })
    console.log(`- ❌ deleted ${directoryEntryPath}`)
    deleteCount++
  }
})

if (!deleteCount) {
  console.log(`- ✔️  could not find anything to delete`)
}

console.log(`\n✨ trying to copy \`next-multilingual\` example files..\n`)

let copyCount = 0
readdirSync(exampleDirectoryPath, { withFileTypes: true }).forEach((directoryEntry) => {
  const directoryEntryPath = resolve(exampleDirectoryPath, directoryEntry.name)
  const destinationPath = resolve('.', directoryEntry.name)
  if (!protectedFiles.has(destinationPath)) {
    cpSync(directoryEntryPath, destinationPath, { recursive: true, force: true })
    console.log(`- ✔️  copied ${directoryEntryPath}`)
    copyCount++
  }
})

if (!copyCount) {
  console.log(`- ❌ could not find anything to copy`)
  exit(1)
}
