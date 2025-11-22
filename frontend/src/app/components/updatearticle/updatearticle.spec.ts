import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updatearticle } from './updatearticle';

describe('Updatearticle', () => {
  let component: Updatearticle;
  let fixture: ComponentFixture<Updatearticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updatearticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updatearticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
