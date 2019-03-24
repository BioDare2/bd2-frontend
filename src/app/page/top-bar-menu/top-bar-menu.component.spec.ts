import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TopBarMenuComponent} from './top-bar-menu.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('TopBarMenuComponent', () => {
  let component: TopBarMenuComponent;
  let fixture: ComponentFixture<TopBarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarMenuComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
