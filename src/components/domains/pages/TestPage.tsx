"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

interface Pokemon {
  number: Number;
  name: string;
  flavorText: string;
}

export const TestPage = () => {
  const [pokemonNumber, setPokemonNumber] = React.useState(1);
  const [pokemon, setPokemon] = React.useState<Pokemon>({
    number: 1,
    name: "",
    flavorText: "",
  });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonNumber}`,
    fetcher
  );

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setPokemonNumber((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (data) {
      console.log(data);
      const name = data.names.find((nameObj: any) => nameObj.language.name === "ja").name;
      const flavorText = data.flavor_text_entries.find((nameObj: any) => nameObj.language.name === "ja").flavor_text;

      setPokemon({
        number: data.id,
        name: name,
        flavorText: flavorText,
      });
    }
  }, [data])

  return (
    <>
      <p>図鑑番号：{String(pokemon.number)}</p>
      <p>ポケモンの名前: {pokemon.name}</p>
      <p>フレーバーテキスト: {pokemon.flavorText}</p>
    </>
  );
};
