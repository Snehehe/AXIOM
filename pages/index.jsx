import Head from 'next/head'
import AxiomApp from '@/components/AxiomApp'

export default function Home() {
  return (
    <>
      <Head>
        <title>AXIOM Intelligence</title>
        <meta name="description" content="Autonomous AI-powered interview preparation system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AxiomApp />
    </>
  )
}
