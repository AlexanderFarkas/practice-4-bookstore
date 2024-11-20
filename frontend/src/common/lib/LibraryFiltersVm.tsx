import { makeAutoObservable } from "mobx";

export class LibraryFiltersVm {
  constructor() {
    makeAutoObservable(this);
  }

  category: string = "";
  author: string = "";
  yearPublished: number | undefined = undefined;

  get params() {
    return {
      author: this.author,
      category: this.category,
      year_published: this.yearPublished,
    };
  }
}
