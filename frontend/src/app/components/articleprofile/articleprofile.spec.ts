import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Articleprofile } from './articleprofile';

describe('Articleprofile', () => {
  let component: Articleprofile;
  let fixture: ComponentFixture<Articleprofile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Articleprofile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Articleprofile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
