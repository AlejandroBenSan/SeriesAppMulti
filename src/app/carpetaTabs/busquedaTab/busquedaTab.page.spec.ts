import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { BusquedaTabPage } from './busquedaTab.page';

describe('Tab3Page', () => {
  let component: BusquedaTabPage;
  let fixture: ComponentFixture<BusquedaTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusquedaTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
