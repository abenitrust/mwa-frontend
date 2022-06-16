import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from '../model/page';

export interface Disable {
  prev: boolean;
  next: boolean;
}

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  countOptions: number[] = [5, 10, 15, 20];

  @Input()
  page: Page = new Page();

  @Output()
  pageChanged: EventEmitter<Page> = new EventEmitter<Page>();

  constructor() { }

  ngOnInit(): void {
  }

  prev() {
    const newOffest = this.page.start - this.page.count;
    this.page.start = newOffest;
    this.emitPageEvent();
  }

  next() {
    const newOffset = this.page.start + this.page.count;
    this.page.start = newOffset;
    this.emitPageEvent();
  }

  start() {
    this.page.start = 1;
    this.emitPageEvent();
  }

  end() {
    const newOffset =Math.ceil(this.page.totalCount/this.page.count)*this.page.count - this.page.count + 1;
    this.page.start = newOffset;
    this.emitPageEvent();
  }

  countChanged(count: string) {
    const nubmerCount = parseInt(count);
    if (isNaN(nubmerCount)) {
      return;
    }
    this.page.count = Math.max(5, nubmerCount);
    this.emitPageEvent();
  }

  lastPage(): boolean {
    let lastPage = false;
    if (this.page.start + this.page.count > this.page.totalCount) {
      lastPage = true;
    }
    return lastPage;
  }

  countSelectorDisabled(): boolean {
    let disabled = (this.page.count >= this.page.totalCount && this.page.count === 5);
    return disabled;
  }

  emitPageEvent() {
    this.pageChanged.emit(this.page);
  }

}
