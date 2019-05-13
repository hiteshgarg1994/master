import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Notes} from './notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  activeIndex: number;
  fillerNav: Array<Notes>;
  @ViewChildren('textArea') textArea;
  filterQuery: string;
  private mobileQueryListener: () => void;


  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.activeIndex = 0;
    this.fillerNav = JSON.parse(localStorage.getItem('notes')) || [];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  addNote = (): void => {
    this.fillerNav.unshift(new Notes());
    this.activeIndex = 0;
    this.focusTextArea();
    this.updateLocalStorage();
  };

  editNote = (index): void => {
    if (index === this.activeIndex) {
      this.focusTextArea();
      return;
    }
    if (this.fillerNav[this.activeIndex].content) {
      this.activeIndex = index;
    } else {
      this.deleteNote();
    }
    this.focusTextArea();
    this.updateLocalStorage();
  };

  deleteNote = (): void => {
    const lastElement = this.activeIndex === this.fillerNav.length - 1;
    this.fillerNav.splice(this.activeIndex, 1);
    this.activeIndex = lastElement ? this.activeIndex - 1 : this.activeIndex;
    this.focusTextArea();
    this.updateLocalStorage();
    if (!this.fillerNav.length) {
      this.filterQuery = '';
    }
  };

  updateLocalStorage = (): void => {
    localStorage.setItem('notes', JSON.stringify(this.fillerNav));
  };

  trackByFn = (index, item) => index;

  focusTextArea = (): void => {
    setTimeout(() => {
      this.textArea.first.nativeElement.focus();
    });
  };

  textAreaValueChange = (newValue): void => {
    this.setTitle(this.fillerNav[this.activeIndex], newValue);
    this.updateLocalStorage();
  };

  setTitle = (notes, newValue): void => {
    notes.content = newValue;
    newValue = newValue.trim();
    if (!newValue) {
      notes.title = 'New Note';
      notes.navContent = 'No description text';
    } else {
      const splitArray = newValue.split('\n');
      const tempTitle = splitArray.shift() || '';
      const tempNavContent = splitArray.join('\n').trim() || '';
      notes.title = tempTitle.length > 20 ? tempTitle.slice(0, 20) + '...' : tempTitle;
      notes.navContent = (tempTitle.length > 60 ? (tempTitle + tempNavContent).slice(60, 80) + '...' :
          (tempNavContent.length > 20 ? tempNavContent.slice(0, 20) + '...' :
            tempNavContent || 'No description text')
      )
      ;
    }
    notes.time = (new Date()).toJSON();
  };

  detectChanges = (): void => this.changeDetectorRef.detectChanges();
}
