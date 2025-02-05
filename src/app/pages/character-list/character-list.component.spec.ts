import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent } from './character-list.component';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('CharacterListComponent (Standalone)', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getCharacters', 'getCharacterById']);

    await TestBed.configureTestingModule({
      imports: [CharacterListComponent, CharacterCardComponent, FormsModule, HttpClientTestingModule], 
      providers: [{ provide: ApiService, useValue: apiSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters on init', () => {
    const mockCharacters = { docs: [{ _id: '1', Nombre: 'Homer' }], hasNextPage: true };
    apiService.getCharacters.and.returnValue(of(mockCharacters));

    component.ngOnInit();
    fixture.detectChanges();

    expect(apiService.getCharacters).toHaveBeenCalledWith(1);
    expect(component.characters.length).toBe(1);
    expect(component.objetoConsulta).toEqual(mockCharacters);
  });

  it('should load next page of characters', () => {
    component.currentPage = 1;
    spyOn(component, 'loadCharacters');
    
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.loadCharacters).toHaveBeenCalled();
  });

  it('should load previous page of characters', () => {
    component.currentPage = 2;
    spyOn(component, 'loadCharacters');
    
    component.previousPage();
    expect(component.currentPage).toBe(1);
    expect(component.loadCharacters).toHaveBeenCalled();
  });

  it('should search for a character when searchTerm has more than 3 characters', () => {
    component.searchTerm = 'Bart';
    const mockSearchResult = { result: [{ _id: '2', Nombre: 'Bart' }] };
    apiService.getCharacterById.and.returnValue(of(mockSearchResult));

    component.onSearch();
    fixture.detectChanges();

    expect(apiService.getCharacterById).toHaveBeenCalledWith('Bart');
    expect(component.characters.length).toBe(1);
  });

  it('should reload all characters when searchTerm is empty', () => {
    component.searchTerm = '';
    spyOn(component, 'loadCharacters');

    component.onSearch();
    
    expect(component.loadCharacters).toHaveBeenCalled();
  });
});
