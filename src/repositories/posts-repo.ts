import { bloggers_db, posts_db } from "../common_db";
import { IBloggers, IPosts } from "../types";

class PostsRepo {
  constructor(public postsList: IPosts[], public bloggersList: IBloggers[]) {}
  getPostsList() {
    return this.postsList;
  }
  findPost(id: number) {
    const foundPost = this.postsList.find((item) => item.id === Number(id));
    return foundPost;
  }
  createPost(
    bloggerId: number,
    title: string,
    shortDescription: string,
    content: string
  ) {
    const foundBlogger = this.bloggersList.find(
      (item) => item.id === bloggerId
    );

    if (foundBlogger) {
      const newId = Number(new Date());

      const newPost: IPosts = {
        id: newId,
        title,
        shortDescription,
        content,
        bloggerId,
        bloggerName: foundBlogger.name,
      };

      this.postsList.push(newPost);
    }
  }

  updatePost(
    bloggerId: number,
    title: string,
    shortDescription: string,
    content: string,
    postId: number
  ) {
    const updatedPost = this.postsList.find((item) => item.id === postId);

    if (updatedPost) {
      updatedPost.title = title;
      updatedPost.shortDescription = shortDescription;
      updatedPost.content = content;
      updatedPost.bloggerId = bloggerId;
    }

    return updatedPost;
  }

  removePost(id: number) {
    const removablePost = this.postsList.find((item) => item.id === id);
    if (removablePost) {
      const currentIndex = this.postsList.indexOf(removablePost);
      this.postsList.splice(currentIndex, currentIndex + 1);
    }
    return removablePost;
  }
}

export default new PostsRepo(posts_db, bloggers_db);
