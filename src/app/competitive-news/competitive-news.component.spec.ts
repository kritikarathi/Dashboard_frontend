import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitiveNewsComponent } from './competitive-news.component';

describe('CompetitiveNewsComponent', () => {
  let component: CompetitiveNewsComponent;
  let fixture: ComponentFixture<CompetitiveNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitiveNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitiveNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
