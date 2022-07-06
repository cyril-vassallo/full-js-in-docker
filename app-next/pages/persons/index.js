import React, { useState, useEffect } from "react";
import SingleCard from "../../components/cards/singleCard";

export default function Persons() {
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    await fetch("http://localhost:8080/persons")
      .then((response) => response.json())
      .then((fetchedData) => {
        setPersons(fetchedData.persons);
      });
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="bg-slate-100">
      <h1 className="text-3xl text-center  p-5">
        <span className="text-purple-500">Tailwindcss </span>
        example in
        <span className="text-blue-500"> Next.js</span>
      </h1>
      <p className="text-center">
        See{" "}
        <a
          className="underline text-blue-500"
          href="http://localhost:8080/persons"
        >
          here
        </a>{" "}
        the local api running on express server providing data{" "}
      </p>
      <p className="text-center">
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
