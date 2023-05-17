import { faker } from "@faker-js/faker";
import { cn } from "@shared/utils/cn";
import { FiSearch } from "react-icons/fi";

export const SearchResultsPanel: React.FC<{ width: number }> = (props) => {
   return (
      <div
         className="absolute top-[100%] right-0 mt-2 ml-8 rounded-xl bg-white "
         style={{
            width: props.width,
         }}
      >
         <div className="pb-6pt-4 relative h-full w-full pt-4 pb-6">
            {Array(10)
               .fill(null)
               .map(() => {
                  return (
                     <div
                        className={cn(
                           "flex h-8 flex-row flex-nowrap items-stretch justify-start",
                           "hover:bg-dark-800/20 text-black"
                        )}
                     >
                        <div className="mx-2 flex aspect-square h-full items-center justify-center">
                           <FiSearch className="" />
                        </div>
                        <div className="flex items-center justify-start ">
                           {faker.lorem.sentence().substring(0, 24)}
                        </div>
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
