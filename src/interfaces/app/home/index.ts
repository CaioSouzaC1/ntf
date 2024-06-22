interface IGridLinks {
  link: string;
  name: string;
  url: string;
  category: string;
}

interface HomeGridCardProps {
  grid: IGridLinks;
  cols: string;
}
