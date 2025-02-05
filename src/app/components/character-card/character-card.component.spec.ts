import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { ApiService } from '../../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('CharacterCardComponent (Standalone)', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['setSelectedCharacter']);

    await TestBed.configureTestingModule({
      imports: [CharacterCardComponent, RouterTestingModule], 
      providers: [{ provide: ApiService, useValue: apiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    component.character = {
      _id: '1',
      Nombre: 'Homer Simpson',
      Imagen: 'https://example.com/homer.jpg',
      Ocupacion: 'Nuclear Safety Inspector',
      Historia: 'Padre de la familia Simpson.',
      Genero: 'Masculino',
      Estado: 'Vivo',
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('vivo')).toBe('status-alive');
    expect(component.getStatusClass('fallecido')).toBe('status-dead');
    expect(component.getStatusClass('otro')).toBe('status-other');
  });

  it('should return correct status icon', () => {
    expect(component.getStatusIcon('vivo')).toBe('fa fa-heart');
    expect(component.getStatusIcon('fallecido')).toBe('fa fa-cross');
    expect(component.getStatusIcon('otro')).toBe('fa fa-question-circle');
  });

  it('should navigate to character detail page when selected', () => {
    spyOn(component['router'], 'navigate');

    component.selectCharacter();

    expect(apiService.setSelectedCharacter).toHaveBeenCalledWith(component.character);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/character', '1']);
  });
});
