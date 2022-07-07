import Head from "next/head";
import React, { useState, useEffect } from "react";
import DataFetch from "../services/DataFetch";
import { FeatureCard } from "../components/cards/FeatureCard";
import { Loader } from "../components/commons/Loader";

export default function Home() {
  const [features, setFeatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataFetch.updateState("get", setFeatures);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            <span></span>
            Next.js
          </a>
          {" with "}
          <a className="text-purple-600" href="https://tailwindcss.com/">
            <span></span>
            Tailwindcss !
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            pages/index.js
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Loader isLoading={isLoading} />
          {features.map((feature) => {
            return <FeatureCard feature={feature} />;
          })}
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
