import Image from "next/image";
import Link from "next/link";
import React from "react";
import propertyImg from "../public/assets/projects/traverse.png";
import cryptoImg from "../public/assets/projects/capricorn.png";
import netflixImg from "../public/assets/projects/hydroil.png";
import twitchImg from "../public/assets/projects/yellow.png";
import pnp from "../public/assets/projects/pnp.png";
import manda from "../public/assets/projects/manda.png";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  return (
    <div id="projects" className="w-full">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <p className="text-xl tracking-widest uppercase text-[#5651e5]">
          Projects
        </p>
        <h2 className="py-4">What I&apos;ve Built</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectItem
            title="Traverse PH"
            backgroundImg={propertyImg}
            projectUrl="/property"
            tech="React JS"
          />
          <ProjectItem
            title="Capricorn App"
            backgroundImg={cryptoImg}
            projectUrl="/crypto"
            tech="React JS"
          />
          <ProjectItem
            title="Hydroil Solutions"
            backgroundImg={netflixImg}
            projectUrl="/netflix"
            tech="HTML/CSS"
          />
          <ProjectItem
            title="Yellow Sun Tech"
            backgroundImg={twitchImg}
            projectUrl="/twitch"
            tech="HTML/CSS"
          />

          <ProjectItem
            title="PNP eDPCR"
            backgroundImg={pnp}
            projectUrl="/pnp"
            tech="REACT JS"
          />
          <ProjectItem
            title="MANDA"
            backgroundImg={manda}
            projectUrl="/manda"
            tech="REACT JS"
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
