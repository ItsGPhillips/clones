"use client";

import { faker } from "@faker-js/faker";
import { cn } from "@shared/utils/cn";
import { FiSearch } from "react-icons/fi";

const TMP_SEARCH_RESULTS = Array(10)
   .fill(null)
   .map(() => {
      return faker.lorem.sentence().substring(0, 24);
   });

export const SearchResultsPanel: React.FC<{ width: number }> = (props) => {
   return (
      <div
         className="absolute top-[100%] right-0 mt-2 ml-8 rounded-xl bg-white "
         style={{
            width: props.width,
         }}
      >
         <div className="relative h-full w-full pt-4 pb-6">
            {TMP_SEARCH_RESULTS.map((result) => {
               return (
                  <div
                     key={result}
                     tabIndex={0}
                     className={cn(
                        "flex h-8 cursor-pointer flex-row flex-nowrap items-stretch justify-start",
                        "hover:bg-dark-800/20 text-black"
                     )}
                  >
                     <div className="mx-2 flex aspect-square h-full items-center justify-center">
                        <FiSearch className="" />
                     </div>
                     <div className="flex items-center justify-start">
                        {result}
                     </div>
                     <button className="ml-auto mr-4 text-[0.83rem] text-blue-700 decoration-blue-700 hover:underline">
                        Remove
                     </button>
                  </div>
               );
            })}
            <a className="hover:decoration-dark-800/70 absolute bottom-0 right-0 cursor-pointer p-2 text-xs italic text-black/70 hover:underline">
               report search results
            </a>
         </div>
      </div>
   );
};
