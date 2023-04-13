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
        <title>Assistive Intelligence</title>
        <meta
          name="description"
          content="AI Won't steal your job, but it can help you find one. "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AssistiveIntel />
    </>
  );
};

export default Home;
