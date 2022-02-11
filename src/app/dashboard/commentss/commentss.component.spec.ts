import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentssComponent } from './commentss.component';

describe('CommentssComponent', () => {
  let component: CommentssComponent;
  let fixture: ComponentFixture<CommentssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentssComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
