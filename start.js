/*
 * CUI//SP-CTI
 *
 * Controlled by: Department of the Navy (DoN)
 * Controlled by: PMW-130 Navy Cyber Situational Awareness (NCSA)
 * CUI Category: Controlled Technical Information (CTI)
 * Distribution/Dissemination Control: Federal Employees and Contractors Only. Other requests must be referred to PMW-130 or PEO C4I.
 * POC: NCSA IPT Lead <ncsa-feedback@us.navy.mil>
 */

/* eslint-disable */

import { isIP } from 'node:net'
import process, { exit } from 'node:process'

import express from 'express'
import { createServer as createViteServer } from 'vite'

const app = express()

// Create Vite server in middleware mode
const vite = await createViteServer({
  server: {
    middlewareMode: {
      server: app
    }
  }
})

// Use vite's connect instance as middleware
app.use(vite.middlewares)

const port = 5173
const address = 'localhost'
const server = app.listen(port, (e) => {
  if (e != null) {
    console.error('Failed to start the dev server:', e)
    exit(1)
  }
  const url = new URL(`${vite.config.server.https ? 'https' : 'http'}://${isIP(address) === 6 ? `[${address}]` : address}:${port}`).toString()
  console.log('Dev server URL:', url)
})

process.on('SIGINT', () => {
  server.close()
  exit(0)
})

