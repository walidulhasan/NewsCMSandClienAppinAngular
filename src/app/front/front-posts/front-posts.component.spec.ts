import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontPostsComponent } from './front-posts.component';

describe('FrontPostsComponent', () => {
  let component: FrontPostsComponent;
  let fixture: ComponentFixture<FrontPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
