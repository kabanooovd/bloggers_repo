export interface IBloggers {
  id: number;
  name: string;
  youtubeUrl: string;
}

export interface IPosts {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  bloggerId: number;
  bloggerName: string;
}
