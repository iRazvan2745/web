"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export function SecondSection() {
  const [page, setPage] = useState(1);

  const handleIncrement = () => {
    if (page >= 10) {
      setPage(1);
    }
    setPage(page + 1);
  };
  const handleDecrement = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  return (
    <div className="border-b">
      <div className="flex items-center justify-between mr-40 border-l ml-17.5">
        <div className="w-full flex -mr-23">
          <div className="flex w-full border-l -ml-22.75">
            <div className="border-y w-full flex h-full">
              <div className="w-full justify-center items-center">
                <div className="mx-auto flex flex-col justify-center items-center h-182 w-full px-11.25">
                  <img
                    src={`/beehost/app/${page}.png`}
                    alt="Bee.host images"
                    className="h-auto ml-22.5 w-5xl border-y"
                  />
                </div>
                <div className="flex items-center border-t w-full justify-center">
                  <div className="flex">
                    <ArrowLeft
                      onClick={() => handleDecrement()}
                      size={40}
                      className="border-x hover:bg-foreground hover:text-background duration-200"
                    />
                    <ArrowRight
                      onClick={() => handleIncrement()}
                      size={40}
                      className="border-r hover:bg-foreground hover:text-background duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen w-260 -mr-23 border-x">
          <div className="sticky top-0 mt-71.5 -mr-18 w-full border-y">
            <div className="p-4 border-y w-full -mt-px">
              <div className="justify-end flex items-center gap-4">
                <img
                  src={"/beehost/full2.svg"}
                  className="h-auto w-auto"
                  width={100}
                  height={80}
                  alt="beehost logo"
                  draggable={false}
                />
              </div>
            </div>
            <p className="flex mx-auto items-center justify-center p-1">
              My now closed cloud hosting company powered by the latest Ryzen 9
              CPUs and hardware
            </p>
          </div>

          <div className="justify-center items-center h-[43.75vh] flex">
            <a
              href="/dash"
              className="p-8 border flex items-center hover:bg-foreground hover:text-background hover:underline duration-300"
            >
              <p className="text-lg">Dashboard is for sale</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
