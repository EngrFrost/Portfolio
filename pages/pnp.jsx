import Image from "next/image";
import React from "react";
import twitchImg from "../public/assets/projects/pnp.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const pnp = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[50vh] relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-black/70 z-10" />
        <Image
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
          src={twitchImg}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">PNP eDPCR</h2>
          <h3>REACTJS</h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            I played a key role as the front-end developer in a collaborative
            team that constructed this application using ReactJS for the front
            end and Laravel for the backend. The project central objective
            revolves around generating and managing reports, catering to a
            hierarchical structure spanning from lowest ranking personnel to
            administrators and super administrators. <br />
            <br />A noteworthy feature of the application is the ability to sort
            and filter files and diverse records across an array of report
            categories. While specific functionalities cannot be divulged, the
            project overarching purpose centers on streamlining and enhancing
            the reporting process. My contribution to this initiative showcases
            my adeptness in front-end development, contributing to a robust and
            dynamic system that effectively facilitates report management and
            user interaction.
          </p>
        </div>
        <div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl py-4">
          <div className="p-2">
            <p className="text-center font-bold pb-2">Technologies</p>
            <div className="grid grid-cols-3 md:grid-cols-1">
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> REACT JS
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> ANT Design
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Javascript
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Laravel
              </p>
            </div>
          </div>
        </div>
        <Link href="/#projects">
          <p className="underline cursor-pointer">Back</p>
        </Link>
      </div>
    </div>
  );
};

export default pnp;
