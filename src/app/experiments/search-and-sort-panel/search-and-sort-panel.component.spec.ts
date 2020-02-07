import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndSortPanelComponent } from './search-and-sort-panel.component';

describe('SearchAndSortPanelComponent', () => {
  let component: SearchAndSortPanelComponent;
  let fixture: ComponentFixture<SearchAndSortPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAndSortPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndSortPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
