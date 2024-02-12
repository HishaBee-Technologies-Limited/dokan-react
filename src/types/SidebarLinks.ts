interface IAsideItem {
  id: number;
  title: string;
  bn_title: string;
  image: string;
  link: string;
}

export interface IAsideBarMenuItem {
  id: number;
  title: string;
  bn_title: string;
  image: string;
  link: string;
  children?: IAsideItem[];
}
