import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import AssistiveIntel from "./assistiveintel";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bespoke Assistive Intelligence</title>
        <meta
          name="description"
          content="Build your own team of specialized AI agents to help you with your daily tasks. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AssistiveIntel />
    </>
  );
};

export default Home;
