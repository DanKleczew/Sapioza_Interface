import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { PaperMetaData } from '../Interfaces/paper-meta-data';
import {Filter} from "../Interfaces/filter";
import {FilteredPaperMetaData} from "../Interfaces/filtered-paper-meta-data";
import {Review} from "../Interfaces/review";

@Injectable({
  providedIn: 'root'
})
export class PaperQueryService {

  constructor(private http : HttpClient) {
  }

  public queryPaperMetaData(paperId: number) : Observable<PaperMetaData> {
    return this.http.get<PaperMetaData>('/papers/' + paperId);
    };

  public queryRecent(limit: number) : Observable<FilteredPaperMetaData[]> {
    const params = new HttpParams().set('limit', limit).set('DescDate', true);
    return this.http.get<FilteredPaperMetaData[]>('/papers/filter', { params });
  }

  public queryByAuthor(authorId: number, limit: number) : Observable<FilteredPaperMetaData[]> {
    const params = new HttpParams().set('authorId', authorId).set('limit', limit);
    return this.http.get<FilteredPaperMetaData[]>('/papers/filter', { params });
  }

  public queryByFilter(filter: Filter): Observable<FilteredPaperMetaData[]> {
    let params = new HttpParams();
    if(filter.title) params = params.set('title', filter.title);
    if(filter.abstract_) params = params.set('abstract_', filter.abstract_);
    if(filter.keywords) params = params.set('keywords', filter.keywords);
    if(filter.revue) params = params.set('revue', filter.revue);
    if(filter.researchField && filter.researchField != "all") {
      params = params.set('researchField', filter.researchField);
    }
    if(filter.AscDate) params = params.set('AscDate', filter.AscDate);
    if(filter.DescDate) params = params.set('DescDate', filter.DescDate);
    if(filter.DOI) params = params.set('DOI', filter.DOI);
    if(filter.limit) params = params.set('limit', filter.limit);
    return this.http.get<FilteredPaperMetaData[]>('/papers/filter' , { params });
  }

  public getReviews(paperId: number) : Observable<Review[]> {
    return this.http.get<Review[]>('/papers/reviews/' + paperId);
  }

}
