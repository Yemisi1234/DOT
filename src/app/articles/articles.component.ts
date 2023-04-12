import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit{
  bookmarks: any;

  author: string | undefined;
  title: string | undefined;
  urlToImage: string | undefined;
  filteredItems: any[] = [];
  searchTerm: string = '';
  constructor(private articleService: ServiceService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((data) => {
      this.bookmarks = data;
      console.log('heyyy', this.bookmarks);
      this.filteredItems = [...this.bookmarks.articles];
    });
  }
  addBookmark() {
    const newItem = {
      author: this.author,
      title: this.title,
      urlToImage: this.urlToImage,
    };

    if (!this.bookmarks) {
      this.bookmarks = { articles: [] };
    }

    this.bookmarks.articles.push(newItem);
    this.filteredItems = [...this.bookmarks.articles];
    this.author = '';
    this.title = '';
    this.urlToImage = '';
  }

  filterItems(searchTerm: string) {
    if (!searchTerm) {
      this.filteredItems = this.bookmarks.articles.slice();
    } else {
      this.filteredItems = this.bookmarks.articles.filter(
        (item: { urlToImage: any; title: any; author: string }) => {
          return (
            (item.author?.toLowerCase() ?? '').includes(
              searchTerm.toLowerCase()
            ) ||
            (item.title?.toLowerCase() ?? '').includes(
              searchTerm.toLowerCase()
            ) ||
            (item.urlToImage?.toLowerCase() ?? '').includes(
              searchTerm.toLowerCase()
            )
          );
        }
      );
    }
    console.log('Search term:', searchTerm);
  }

  deleteItem(item: any) {
    const index = this.bookmarks.articles.indexOf(item);
    if (index > -1) {
      this.bookmarks.articles.splice(index, 1);
      this.filteredItems = this.bookmarks.articles.slice();
    }
  }
}
