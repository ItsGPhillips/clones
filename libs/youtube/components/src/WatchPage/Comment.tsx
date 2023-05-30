import { faker } from "@faker-js/faker";
import { Avatar } from "@youtube/components/Avatar";
import { EllipsisIcon } from "@youtube/icons/EllipsisIcon";
import { LikeIcon } from "@youtube/icons/LikeIcon";

export const Comment = () => {
   const paras = faker.lorem.paragraphs({ min: 1, max: 5 });

   return (
      <div className="group relative flex items-start justify-start gap-4">
         <div className="h-fit w-fit">
            <Avatar firstName="test" imageUrl={null} />
         </div>
         <div className="flex flex-col items-start gap-1">
            <span className="text-xs font-bold">Test User</span>
            {paras.split("\n").map((p) => (
               <p key={p} className="text-sm max-w-5xl">
                  {p}
               </p>
            ))}
            <div className="flex gap-2">
               <LikeIcon fill="white" className="h-6 w-6" />
               <span>123</span>
               <LikeIcon fill="white" className="h-6 w-6 rotate-180" />
               <span className="ml-4">Reply</span>
            </div>
         </div>
         <div className="absolute right-4 top-4 hidden cursor-pointer items-center justify-center rounded-full p-2  opacity-0 transition-all duration-100 hover:bg-white/20 group-hover:flex group-hover:opacity-100">
            <EllipsisIcon fill="white" className="h-6 w-6" />
         </div>
      </div>
   );
};
