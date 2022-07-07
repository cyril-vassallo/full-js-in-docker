import React, { useState, useEffect } from "react";
import SingleCard from "../../components/cards/ProfileCard";
import DataFetch from "../../services/DataFetch";

export default function Persons() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    DataFetch.updateState("get", setPersons, "/persons");
  }, []);

  return (
    <div className="bg-slate-100">
      <h1 className="text-3xl text-center p-5">
        <span className="text-purple-500">Tailwindcss </span>
        styling example
      </h1>
      <p className="mt-3 text-2xl text-center my-5">
        Path to the component{" "}
        <code className="p-3 font-mono text-lg bg-white rounded-md">
          pages/persons/index.js
        </code>
      </p>
      <p className="text-center">
        See{" "}
        <a
          className="underline text-blue-500"
          href="http://localhost:8080/persons"
        >
          here
        </a>{" "}
        the local api running on nest.js providing data{" "}
      </p>
      <p className="text-center my-5">
        <a className="underline text-blue-500" href="http://localhost:3000">
          back to home
        </a>{" "}
      </p>
      <div className="flex m-auto flex-wrap justify-around max-w-4xl mt-6 sm:w-full">
        {persons.map((person, index) => {
          return <SingleCard className="w-1/2" person={person} key={index} />;
        })}
      </div>
    </div>
  );
}
