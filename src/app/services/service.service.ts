import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiURL = environment.baseUrl;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getArticles();
  }
  getArticles() {
    const url = `${environment.baseUrl}everything?q=tesla&from=2023-04-09&sortBy=publishedAt&apiKey=${environment.ApiKey}`;
    return this.http.get(url);
  }
}
