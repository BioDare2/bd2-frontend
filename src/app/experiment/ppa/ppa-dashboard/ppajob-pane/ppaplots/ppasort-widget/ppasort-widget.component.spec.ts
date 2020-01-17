import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PPASortWidgetComponent} from './ppasort-widget.component';
import {FormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap';

describe('PPASortWidgetComponent', () => {
  let component: PPASortWidgetComponent;
  let fixture: ComponentFixture<PPASortWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ButtonsModule
      ],
      declarations: [ PPASortWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPASortWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
