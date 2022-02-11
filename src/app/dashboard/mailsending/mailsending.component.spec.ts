import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsendingComponent } from './mailsending.component';

describe('MailsendingComponent', () => {
  let component: MailsendingComponent;
  let fixture: ComponentFixture<MailsendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailsendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailsendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
