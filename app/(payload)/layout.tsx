import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import configPromise from '@/payload.config'
import React from 'react'
import '@payloadcms/next/css'

import { importMap } from './admin/importMap.js'

const serverFunction: any = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>{children}</RootLayout>
}
