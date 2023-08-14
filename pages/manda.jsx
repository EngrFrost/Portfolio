import Image from "next/image";
import React from "react";
import twitchImg from "../public/assets/projects/manda.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const manda = () => {
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
          <h2 className="py-2">MANDA</h2>
          <h3>REACTJS</h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            I actively contributed as a front-end developer within a
            collaborative team that crafted this application for Mandaluyong
            Hospital, harnessing ReactJS for the front end and Laravel for the
            backend. The project is designed with a multifaceted approach,
            incorporating essential functionalities such as inpatient tracking,
            outpatient tracking, inventory management, and employee status
            monitoring.
            <br /> <br /> While Im unable to divulge specific details about
            other functionalities, the overarching purpose of the project
            encompasses these core features. My role in this endeavor
            exemplifies my prowess in front-end development, helping to create a
            robust and comprehensive system that seamlessly integrates diverse
            functionalities to optimize tracking and management processes.
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
                <RiRadioButtonFill className="pr-1" /> Bootstrap5
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

export default manda;
