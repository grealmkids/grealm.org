import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryBooksComponent } from './story-books.component';

describe('StoryBooksComponent', () => {
  let component: StoryBooksComponent;
  let fixture: ComponentFixture<StoryBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
