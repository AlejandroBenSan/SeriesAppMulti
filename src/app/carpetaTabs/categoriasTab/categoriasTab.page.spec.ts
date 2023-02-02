import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { CategoriasTabPage } from './categoriasTab.page';

describe('Tab2Page', () => {
  let component: CategoriasTabPage;
  let fixture: ComponentFixture<CategoriasTabPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriasTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
