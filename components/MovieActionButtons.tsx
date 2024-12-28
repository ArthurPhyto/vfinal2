"use client";

import { Play, Download } from "lucide-react";

interface MovieActionButtonsProps {
  movieTitle: string;
}

export default function MovieActionButtons({ movieTitle }: MovieActionButtonsProps) {
  return (
    <div className="flex flex-col gap-4 my-8">
      <button 
        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors w-full md:w-auto"
        onClick={() => console.log("Regarder")}
      >
        <Play className="w-6 h-6" />
        Regarder en streaming
      </button>
      
      <button 
        className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors w-full md:w-auto"
        onClick={() => console.log("Télécharger")}
      >
        <Download className="w-6 h-6" />
        Télécharger
      </button>
    </div>
  );
}