import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSnapshotComponent } from './movie-snapshot.component';

describe('MovieSnapshotComponent', () => {
  let component: MovieSnapshotComponent;
  let fixture: ComponentFixture<MovieSnapshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieSnapshotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
