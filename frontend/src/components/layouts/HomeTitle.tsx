import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";


export default function HomeTitle() {
    return(
        <BackgroundBeamsWithCollision>
            <h2 className="text-2xl relative z-20 md:text-4xl lg:text-[57px] font-bold text-center text-white font-sans tracking-tight">
              Conhecimento em segurança e criptografia{" "}
              <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                  <span className="">CipherHub.</span>
                </div>
                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                  <span className="">CipherHub.</span>
                </div>
              </div>
            </h2>
          </BackgroundBeamsWithCollision>
    )
}