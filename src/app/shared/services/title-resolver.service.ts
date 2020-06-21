import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

export class Data {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TitleResolverService implements Resolve<any> {
  constructor(
    private title: Title
  ) { }

  resolve(router: ActivatedRouteSnapshot) {
    const data = (router.data as Data);

    if (data) {
      this.title.setTitle(`${data.title}`);
    }
  }
}