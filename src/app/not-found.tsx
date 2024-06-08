"use client";
import Layout from "@/_layouts";

export default function NotFoundPage() {
  return (
    <Layout>
      <div className="w-full flex h-60 lg:h-80 bg-gradient-to-b via-destructive from-black to-black justify-center items-center relative">
        <p className="absolute inset-0 flex justify-center items-center text-[10rem] lg:text-[20rem] text-white opacity-20 font-black uppercase">
          404
        </p>
        <p className="text-4xl lg:text-7xl text-white font-black uppercase relative">
          Not found
        </p>
      </div>
    </Layout>
  );
}
