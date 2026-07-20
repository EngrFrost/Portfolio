import traverseThumb from "@/public/assets/projects/traverse.png";
import traverseCover from "@/public/assets/projects/traverse2.png";
import capricornThumb from "@/public/assets/projects/capricorn.png";
import capricornCover from "@/public/assets/projects/capricorn2.png";
import hydroilThumb from "@/public/assets/projects/hydroil.png";
import hydroilCover from "@/public/assets/projects/hydroil2.png";
import yellowImg from "@/public/assets/projects/yellow.png";
import pnpImg from "@/public/assets/projects/pnp.png";
import mandaImg from "@/public/assets/projects/manda.png";

export const PROJECTS = [
  {
    slug: "traverse-ph",
    title: "Traverse PH",
    tag: "React JS",
    subtitle: "React JS / Laravel",
    thumb: traverseThumb,
    cover: traverseCover,
    overview:
      "I developed this application utilizing React JS for the front end and Laravel for the back end from my previous work. The app enables users to conveniently search for hotels in the Philippines based on their preferred location. Users can explore hotel names, check-in times, and check-out times, and even filter results based on their desired area. The app also provides a comprehensive list of recommended hotels in the selected area, along with real-time availability information for the specified dates. This project showcases my proficiency in creating a user-friendly interface for hotel search and booking, seamlessly integrating React JS and Laravel.",
    tech: ["React", "Bootstrap 5", "JavaScript", "Laravel"],
    live: "https://traverse.ph/",
    code: null,
  },
  {
    slug: "capricorn",
    title: "Capricorn App",
    tag: "React JS",
    subtitle: "React JS / Node.js",
    thumb: capricornThumb,
    cover: capricornCover,
    overview:
      "I developed this application using React JS for the frontend and Node.js for the backend. The application encompasses three user roles: super admin, admin, and users. Its primary focus is on facilitating bet calculations for users across specific time frames. Following the PCSO outcome, the app determines bet winners if applicable. Additionally, it computes daily income, total losses, and maintains a comprehensive record of user finances. The application boasts a hierarchical structure where the super admin can oversee admin and user accounts across various locations, providing real-time insights into income.",
    tech: ["React", "ANT Design", "JavaScript", "Node.js", "Web Socket", "Hosting"],
    live: "http://159.65.0.151/",
    code: "https://github.com/nerdyCoderr/capricorn",
  },
  {
    slug: "hydroil",
    title: "Hydroil Solutions",
    tag: "HTML/CSS",
    subtitle: "HTML / CSS / Umbraco",
    thumb: hydroilThumb,
    cover: hydroilCover,
    overview:
      "I designed and developed this website utilizing HTML and CSS, while the backend was implemented using the Umbraco CMS. The website serves as a clear and concise platform, effectively showcasing the company profile, services, and capabilities. It offers visitors the opportunity to engage with the company through contact forms. Additionally, the site features a dedicated section highlighting current job openings, seamlessly integrating front-end design with Umbraco CMS for efficient content management.",
    tech: ["HTML", "CSS", "JavaScript", "Umbraco"],
    live: "http://www.hydroil-solutions.com/",
    code: "https://github.com/EngrFrost/Hydroil-Home",
  },
  {
    slug: "yellow-sun",
    title: "Yellow Sun Tech",
    tag: "HTML/CSS",
    subtitle: "HTML / CSS / Umbraco",
    thumb: yellowImg,
    cover: yellowImg,
    overview:
      "I developed this website using HTML and CSS, with the backend powered by the Umbraco CMS. The website serves as a direct and uncomplicated platform, effectively presenting the company identity, services, and capabilities. It offers a seamless means for visitors to connect with the company, enabling easy contact. This project exemplifies my proficiency in crafting a straightforward and user-friendly website, integrating front-end design with the Umbraco CMS.",
    tech: ["HTML", "CSS", "JavaScript", "Umbraco"],
    live: "http://yellowsuntech.com/",
    code: null,
  },
  {
    slug: "pnp-edpcr",
    title: "PNP eDPCR",
    tag: "React JS",
    subtitle: "React JS / Laravel",
    thumb: pnpImg,
    cover: pnpImg,
    overview:
      "I played a key role as the front-end developer in a collaborative team that constructed this application using ReactJS for the front end and Laravel for the backend. The project's central objective revolves around generating and managing reports, catering to a hierarchical structure spanning from lowest-ranking personnel to administrators and super administrators. A noteworthy feature is the ability to sort and filter files and diverse records across an array of report categories. My contribution showcases my adeptness in front-end development, contributing to a robust and dynamic report-management system.",
    tech: ["React JS", "ANT Design", "JavaScript", "Laravel"],
    live: null,
    code: null,
  },
  {
    slug: "manda",
    title: "MANDA",
    tag: "React JS",
    subtitle: "React JS / Laravel",
    thumb: mandaImg,
    cover: mandaImg,
    overview:
      "I actively contributed as a front-end developer within a collaborative team that crafted this application for Mandaluyong Hospital, harnessing ReactJS for the front end and Laravel for the backend. The project is designed with a multifaceted approach, incorporating essential functionalities such as inpatient tracking, outpatient tracking, inventory management, and employee status monitoring. My role exemplifies my prowess in front-end development, helping to create a robust and comprehensive system that seamlessly integrates diverse functionalities to optimize tracking and management processes.",
    tech: ["React JS", "Bootstrap 5", "JavaScript", "Laravel"],
    live: null,
    code: null,
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}
