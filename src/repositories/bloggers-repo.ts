import { bloggers_db } from "../common_db";
import { IBloggers } from "../types";

class BloggersRepo {
  constructor(public bloggersList: IBloggers[]) {}
  getBloggersList() {
    return this.bloggersList;
  }

  findBlogger(id: number) {
    return this.bloggersList.find((item) => item.id === id);
  }

  createBlogger(name: string, youtubeUrl: string) {
    const newId = Number(new Date());

    const newBlogger = {
      id: newId,
      name,
      youtubeUrl,
    };

    this.bloggersList.push(newBlogger);
    return newBlogger;
  }

  updateBlogger(id: number, name: string, youtubeUrl: string) {
    const foundBlogger = this.bloggersList.find((item) => item.id === id);
    if (foundBlogger) {
      foundBlogger.name = name;
      foundBlogger.youtubeUrl = youtubeUrl;
    }
    return foundBlogger;
  }

  removeBlogger(id: number) {
    const foundItem = this.bloggersList.find((item) => id === item.id);
    if (foundItem) {
      const currentIndex = this.bloggersList.indexOf(foundItem);
      this.bloggersList.splice(currentIndex, currentIndex + 1);
    }
    return foundItem;
  }
}

export default new BloggersRepo(bloggers_db);
