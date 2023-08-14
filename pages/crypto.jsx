import Image from "next/image";
import React from "react";
import cryptoImg from "../public/assets/projects/capricorn2.png";
import { RiRadioButtonFill } from "react-icons/ri";
import Link from "next/link";

const crypto = () => {
  return (
    <div className="w-full">
      <div className="w-screen h-[50vh] relative">
        <div className="absolute top-0 left-0 w-full h-[50vh] bg-black/70 z-10" />
        <Image
          className="absolute z-1"
          layout="fill"
          objectFit="cover"
          src={cryptoImg}
          alt="/"
        />
        <div className="absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2">
          <h2 className="py-2">Capricorn</h2>
          <h3>React JS / Tailwind / Firebase</h3>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 py-8">
        <div className="col-span-4">
          <p>Project</p>
          <h2>Overview</h2>
          <p>
            I developed this application using React JS for the frontend and
            Node.js for the backend. The application encompasses three user
            roles: super admin, admin, and users. Its primary focus is on
            facilitating bet calculations for users across specific time frames:
            9 am to 12 pm, 12 pm to 5 pm, and 6 pm to 11 pm. Following the PCSO
            outcome, the app determines bet winners if applicable. Additionally,
            it computes daily income, total losses, and maintains a
            comprehensive record of user finances. The application boasts a
            hierarchical structure where the super admin holds the authority to
            oversee admin and user accounts across various locations, providing
            real-time insights into income. Admins, on the other hand, can
            monitor user earnings based on their respective posts. Through this
            project, I demonstrate my adeptness in creating an intricate system
            that efficiently handles betting calculations, financial tracking,
            and user management using React JS and Node.js.
          </p>
          <a
            href="https://github.com/nerdyCoderr/capricorn"
            target="_blank"
            rel="noreferrer"
          >
            <button className="px-8 py-2 mt-4 mr-8">Code</button>
          </a>
          <a href="http://159.65.0.151/" target="_blank" rel="noreferrer">
            <button className="px-8 py-2 mt-4">PAGE LINK</button>
          </a>
        </div>
        <div className="col-span-4 md:col-span-1 shadow-xl shadow-gray-400 rounded-xl py-4">
          <div className="p-2">
            <p className="text-center font-bold pb-2">Technologies</p>
            <div className="grid grid-cols-3 md:grid-cols-1 ">
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> React
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> ANT Design
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Javascript
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> NodeJS
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Web Socket
              </p>
              <p className="text-gray-600 py-2 flex items-center">
                <RiRadioButtonFill className="pr-1" /> Host
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

export default crypto;
