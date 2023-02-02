import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { SeriesTabPage } from './seriesTab.page';

describe('Tab1Page', () => {
  let component: SeriesTabPage;
  let fixture: ComponentFixture<SeriesTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeriesTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
