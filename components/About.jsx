import React from "react";
import Image from "next/image";
import Link from "next/link";
import AboutImg from "../public/assets/about.jpg";

const About = () => {
  return (
    <div id="about" className="w-full md:h-screen p-2 flex items-center py-16">
      <div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="uppercase text-xl tracking-widest text-[#5651e5]">
            About
          </p>
          <h2 className="py-4">Who I Am</h2>
          {/* <p className='py-2 text-gray-600'>
            / / I am not your average developer
          </p> */}
          <p className="py-2 text-gray-600">
            Graduate with a love for computer engineering discussing technical
            subjects like creating a system. a committed, enthusiastic, and
            ready individual must diligently strive toward the success of the
            team. Working with computers and technology has always come
            naturally to me. My employment began in 2022. After mastering HTML
            and CSS, I moved on to javascript and became even more excited about
            creating interactive websites. I then began working for others. My
            time is currently being spent learning new technologies, developing
            apps with React JS, and NextJS.
          </p>
          <Link href="/#projects">
            <p className="py-2 text-gray-600 underline cursor-pointer">
              Check out some of my latest projects.
            </p>
          </Link>
        </div>
        <div className="w-full h-auto m-auto shadow-xl shadow-gray-400 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300">
          <Image src={AboutImg} className="rounded-xl" alt="/" />
        </div>
      </div>
    </div>
  );
};

export default About;
