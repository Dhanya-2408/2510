export interface ISubMenu {
  title: string;
  subUrl: string;
}

export interface INavData {
  id: number;
  title: string;
  url: string;
  dropDown?: ISubMenu[];
}

export const navData: INavData[] = [
  {
    id: 1,
    title: "Home",
    url: "home",
  },
  {
    id: 2,
    title: "BRAND",
    url: "brand",
  },
  {
    id: 3,
    title: "INDUSTRY",
    url: "industry",
  },
  {
    id: 4,
    title: "CONSULTANT",
    url: "consultant",
  },
  {
    id: 5,
    title: "CASE STUDY",
    url: "casestudy/beanie-and-scarf",
    dropDown: [
      {
        title: "Beanie and scarf ",
        subUrl: "casestudy/beanie-and-scarf",
      },
      {
        title: "Sweater",
        subUrl: "casestudy/sweater",
      },
      {
        title: "Inflatable paddle board",
        subUrl: "casestudy/inflatable-paddle-board",
      },
      {
        title: "Skateboard",
        subUrl: "casestudy/skateboard",
      },
      // {
      //   title: "Leather bags",
      //   subUrl: "casestudy/leather-bags",
      // },
      {
        title: "Window and doors",
        subUrl: "casestudy/window-and-doors",
      },
      {
        title: "Underwear",
        subUrl: "casestudy/underwear",
      },
    ],
  },
  {
    id: 6,
    title: "Contact",
    url: "contact",
  },
];
