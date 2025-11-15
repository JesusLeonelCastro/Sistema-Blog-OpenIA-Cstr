import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createarticle } from './createarticle';

describe('Createarticle', () => {
  let component: Createarticle;
  let fixture: ComponentFixture<Createarticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createarticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createarticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
