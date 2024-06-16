"use client";

import React, { FormEvent, useState } from "react";
import { Card } from "@aws-amplify/ui-react";
import { generateRecipe } from "./actions";


export default function Home() {
  const [result, setResult] = useState<string>("");
  const [loading, setloading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setloading(true);
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const data = await generateRecipe(formData);
      const recipe = typeof data === "string" ? data : "No data returned";
      setloading(false);
      setResult(recipe);
    } catch (e) {
      alert(`An error occurred: ${e}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24  m-auto ">
      <div className=" pb-10 mx-auto text-center flex flex-col items-start -center max-w-3xl">
        <h1 className=" text-4xl  font-bold  text-gray-900 sm:text-6xl ">
          Pembantu <span className=" text-blue-600"> Resipi AI </span> anda
          <p className=" mt-10 font-medium   text-lg  max-w-prose text-gray-900 ">
            Anda hanya perlu senaraikan beberapa bahan yang anda miliki dengan
            menggunakan format "bahan1, bahan2, bahan3, ... dan seterusnya"
            dan resipi AI akan menyediakan resipi lazat berdasarkan bahan-bahan tersebut...
          </p>
        </h1>
      </div>

      <section className="   w-1/2  mx-auto ">
        <form
          onSubmit={onSubmit}
          className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto"
        >
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            required
            placeholder="Bahan1, Bahan2, Bahan3,..dll"
            className="border border-black  text-gray-900 p-4 rounded-lg max-w-full w-full text-xl "
          />
          <button
            type="submit"
            className="  text-white p-2 rounded-lg bg-blue-500   w-1/2 text-xl  "
          >
            Cipta Resipi
          </button>
        </form>
      </section>
      {loading ? (
        <div className="flex flex-col items-center gap-4 w-1/2  mx-auto ">
          <h2 className="m-10 font-medium   text-xl   max-w-prose text-blue-600 ">
            Tunggu Sebentar...
          </h2>

        </div>
      ) : (
        <div>
          {result ? (
            <section className="    mt-10 mx-auto  border border-black  bg-gray-50  rounded-xl     ">
              <Card className=" p-4 flex flex-col items-center gap-4  max-w-full mx-auto text-xl  font-semibold    ">
                <h2 className="whitespace-pre-wrap">{result}</h2>
              </Card>
            </section>
          ) : null}
        </div>
      )}
    </main>
  );
}
