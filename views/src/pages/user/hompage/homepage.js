import React from "react";
import HeroImg from "../../../img/hero.png"


export default function Homepage(){
    return(
        <main>
            <div className="mt-8 w-screen flex justify-center">
                <img
                    src={HeroImg}
                    alt="A short introduction of the club"
                    className="rounded-lg"
                />
            </div>
        </main>
    )
}