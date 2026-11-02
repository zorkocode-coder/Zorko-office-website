import { websiteStories } from "./website-stories.js";
const curated = {
  "2-0": "founder-anand",
  "3-0": "founder-amrit",
  "49-1": "office-reception",
  "50-0": "office-corridor",
  "50-2": "office-work",
  "45-5": "site-team-existing-outlets-support",
  "40-0": "culture-hero",
  "14-0": "shark-tank",
  "23-0": "cheese-outlets",
  "26-0": "waffle-interior",
  "31-0": "consultancy",
  "52-0": "outlet-52-0",
  "7-0": "mag-07-02",
};
export const asset = (page, index = 0) =>
  `/media/${curated[`${page}-${index}`] || `mag-${String(page).padStart(2, "0")}-${String(index).padStart(2, "0")}`}.webp`;
export const nav = [
  ["The company", "/about/"],
  ["Our founders", "/founders/"],
  ["Our office", "/office/"],
  ["Our people", "/people/"],
  ["Life at ZORKO", "/culture/"],
  ["Our brands", "/brands/"],
  ["Recognition", "/recognition/"],
  ["Journal & blogs", "/journal/"],
  ["Careers", "/careers/"],
  ["Contact", "/contact/"],
];
export const timeline = [
  {
    year: "2020",
    label: "An idea takes its first step.",
    text: "Anand and Amrit Nahar establish ZORKO in Surat, with a shared ambition to make vegetarian food and entrepreneurship more accessible.",
  },
  {
    year: "2021",
    label: "The first chapter of growth.",
    text: "The early outlet network begins to take shape, bringing the founding idea into everyday neighbourhoods.",
  },
  {
    year: "2022",
    label: "Building beyond the beginning.",
    text: "The magazine records an 18+ outlet network, as the company develops its approach to expansion.",
  },
  {
    year: "2023",
    label: "A wider Indian footprint.",
    text: "A growing network reaches 72+ outlets, connecting more communities with the ZORKO brand.",
  },
  {
    year: "2024",
    label: "A national stage.",
    text: "ZORKO appears on Shark Tank India Season 3. The magazine marks this chapter with 150+ outlets.",
  },
  {
    year: "2025",
    label: "More places. More possibilities.",
    text: "The network reaches 284+ outlets, with recognition and new milestones alongside its expansion.",
  },
  {
    year: "2026",
    label: "One vision. Endless milestones.",
    text: "The November 2026 magazine records 550+ outlets, 275+ cities and a presence across 25+ states.",
  },
];
export const departmentNames = [
  [
    "Management",
    "Leadership",
    "Guiding the company’s direction and bringing its teams together.",
  ],
  [
    "Key managerial personnel",
    "Leadership",
    "Coordinating the responsibilities that support a growing organisation.",
  ],
  [
    "Senior management",
    "Leadership",
    "Connecting long-term goals with day-to-day execution.",
  ],
  [
    "Sales",
    "Growth",
    "Introducing prospective partners to the ZORKO opportunity.",
  ],
  [
    "Purchase",
    "Operations",
    "Supporting procurement and the needs of the outlet network.",
  ],
  [
    "Existing outlets support",
    "Operations",
    "Working alongside established franchise partners.",
  ],
  [
    "Upcoming outlets support",
    "Operations",
    "Helping partners prepare for the next chapter.",
  ],
  [
    "Human resources",
    "People",
    "Supporting the people and practices behind the workplace.",
  ],
  [
    "Legal",
    "Operations",
    "Supporting the company’s legal and documentation requirements.",
  ],
  ["Graphics", "Creative", "Shaping the visual language of the brands."],
  ["Administration", "Operations", "Keeping the everyday workplace connected."],
  ["Training", "People", "Sharing practical knowledge across the network."],
  [
    "Social media",
    "Creative",
    "Connecting the brand with its digital communities.",
  ],
  [
    "Marketing",
    "Growth",
    "Bringing the brands and their stories to wider audiences.",
  ],
  ["Video editing", "Creative", "Turning brand stories into moving images."],
  [
    "Influencer marketing",
    "Growth",
    "Building creative collaborations and audience connections.",
  ],
  [
    "Warehouse",
    "Operations",
    "Supporting the physical flow behind the network.",
  ],
  ["Accounts", "Operations", "Supporting the company’s financial operations."],
  [
    "Location",
    "Growth",
    "Working on the places where the network takes shape.",
  ],
  [
    "Technology",
    "Creative",
    "Supporting the digital systems behind the organisation.",
  ],
];
export const brands = [
  {
    name: "ZORKO",
    tag: "The brand of food lovers.",
    kind: "Vegetarian quick service",
    text: "The founding food brand. A neighbourhood-focused vegetarian menu and a franchise network that connects cities across India.",
    image: asset(52, 0),
    url: "https://zorko.in/",
  },
  {
    name: "Cheese Corner",
    tag: "A little more cheesy.",
    kind: "Cheesy fusion food",
    text: "An Indian fusion food concept from the house of ZORKO, with cheese at the heart of its menu.",
    image: asset(23, 0),
    url: "https://cheesecornerindia.com/",
  },
  {
    name: "UK Waffle",
    tag: "Good food. Great memories.",
    kind: "Waffles, desserts & café",
    text: "A dessert and café concept bringing waffles, cakes and sweet moments into the group’s brand family.",
    image: asset(26, 0),
    url: "https://www.ukwaffle.com/",
  },
  {
    name: "ZORKO Consultancy",
    tag: "From concept to execution.",
    kind: "Food business consultancy",
    text: "Brand development and food business guidance, bringing together concept, identity and operational thinking.",
    image: asset(31, 0),
    url: null,
  },
];
export const stories = [
  {
    id: "a-national-stage",
    category: "Recognition",
    title: "A national stage for a Surat story.",
    summary:
      "The founders take ZORKO’s vegetarian food and franchise story to Shark Tank India Season 3.",
    image: asset(14, 0),
    body: "ZORKO’s November 2026 Spotlight magazine looks back at the company’s appearance on Shark Tank India Season 3. For a brand founded in Surat, the appearance brought its story of affordable vegetarian food and entrepreneurship to a national audience. The moment sits within a broader journey: building a network of outlets and the teams that support them.",
  },
  {
    id: "inside-our-headquarters",
    category: "Workplace",
    title: "The place behind the possibilities.",
    summary:
      "A look inside the Surat headquarters, from shared workstations to spaces for conversation.",
    image: "/media/office-detail-16.webp",
    articleImage: "/media/office-corridor.webp",
    sections: [
      {
        title: "A welcome at the centre of the space",
        text: "The reception photographs show a green desk, the ZORKO Limited name and planted details set against glass-partitioned work areas. The materials and layout make the headquarters feel distinct from the outlet spaces that customers usually associate with the brand.",
      },
      {
        title: "Different settings for different work",
        text: "The magazine’s office gallery moves between shared workstations, individual cabins, meeting tables and seating areas. Together, the photographs show how a corporate workplace accommodates more than one kind of working day: focused desk work, conversations and team discussions.",
      },
      {
        title: "See the office for yourself",
        text: "Our office page brings these photographs into a room-by-room visual tour and an expandable gallery. It is a closer look at the real Surat workplace, using company photography rather than illustrative office scenes.",
      },
    ],
    related: "/office/",
    relatedLabel: "Take the office tour",
    body: "The Surat corporate office brings the company’s departments into one connected workplace. The magazine’s office photographs show a reception, glass-partitioned workspaces, cabins, meeting rooms and busy shared workstations. This is the everyday setting behind the network: a place for planning, collaboration and the work that happens between milestones.",
  },
  {
    id: "people-behind-the-progress",
    category: "People",
    title: "Progress has a human side.",
    summary: "Meet the departments that connect a growing organisation.",
    image: asset(45, 5),
    body: "Faces of ZORKO, the magazine’s team directory, introduces the people behind the brand. Alongside leadership, the directory includes sales, purchase, outlet support, HR, legal, graphics, administration, training, social media, marketing, video, influencer marketing, warehouse, accounts, location and technology teams. Together, these departments give the company’s ambitions an everyday working rhythm.",
  },
  {
    id: "life-beyond-the-desk",
    category: "Culture",
    title: "There is life beyond the desk.",
    summary:
      "Celebrations, shared experiences and the moments that make a workplace feel personal.",
    image: asset(40, 0),
    sections: [
      {
        title: "Making time for shared experiences",
        text: "The events pages bring together photographs from trips and celebrations, including Saputara, trekking and Women’s Day. These are specific company occasions, offering a different view of colleagues from the more formal department photographs.",
      },
      {
        title: "Recognition is part of the story",
        text: "The magazine also documents Employee of the Month and Employee of the Year recognition, alongside performance celebrations. The photographs put faces to those moments and show how individual contributions become part of the company’s wider story.",
      },
      {
        title: "Explore the employee experience",
        text: "Culture includes both the social moments and practical support. The Careers page brings together the workplace, the teams and the benefits described in the magazine, with regular benefits separated from those linked to one- and two-year milestones. Current eligibility is confirmed by the HR team.",
      },
    ],
    related: "/careers/#career-benefits",
    relatedLabel: "Explore the employee experience",
    body: "The Spotlight magazine’s events and celebrations section captures another part of the company’s story: people spending time together beyond their everyday responsibilities. It includes a Saputara trip, a trekking trip, Women’s Day celebrations and other team occasions. These photographs offer a view of the relationships behind the departments.",
  },
  ...websiteStories,
];
export const contact = {
  address:
    "310, 311, 322, 3rd Floor, Exult Shoppers, Vesu Main Road, Surat, Gujarat",
  email: "support@zorko.in",
  phone: "+91 9909900139",
};
