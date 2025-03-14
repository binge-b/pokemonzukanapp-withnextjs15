"use client"; //クライアントコンポーネント

import { useState, useTransition } from "react";
import Image from "next/image";

export default function PokeCatch() {
  const [pokemon, setPokemon] = useState<{ name: string; imageUrl:string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchRandomPokemon = async () => {
    startTransition(async () => {
      const pokemonId = Math.floor(Math.random() * 898) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

      if (response.ok) {
        const data = await response.json();
        setPokemon({
            name: data.name.toUpperCase(),
            imageUrl: data.sprites.front_default,
          });
        }else {
          setPokemon(null);
        }
    });
  };
  
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-pink-100">
      <header className="fixed top-0 w-full bg-yellow-300 py-4 text-neutral-900 text-center text-lg font-bold">
        ポケモンずかん
      </header>

      {isPending ? (
        <p className="text-lg mt-4 text-neutral-900">Loading...</p>
      ) : pokemon ? (
        <div className="flex flex-col items-center mt-8">
          <Image src={pokemon.imageUrl} alt={pokemon.name} width={150} height={150} />
          <p className="text-xl text-neutral-900 font-bold mt-4">{pokemon.name}</p>
        </div>
      ) : (
        <p className="text-lg mt-4 text-neutral-900">ボタンを押してポケモンをゲット！</p>
      )}

      <button 
        className="mt-3 px-4 py-1 bg-yellow-500 text-neutral-900 text-lg font-bold rounded hover:bg-yellow-300 transition-all duration-200 delay-200 shadow"
        onClick={fetchRandomPokemon}
        disabled={isPending}
      >
        {isPending ? " _(:3」 ∠)_ " : "ゲットだぜ！"}
      </button>
    </div>
  );
}
