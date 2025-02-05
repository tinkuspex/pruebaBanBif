import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@Component({
  standalone: true,
  imports: [CommonModule, CharacterCardComponent,FormsModule],
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  objetoConsulta :any;
  searchTerm: string = ''; 
  constructor(private apiService: ApiService) {
    
  }
  async ngOnInit() {
    await this.loadCharacters();
  }
  async loadCharacters() {
    await this.apiService.getCharacters(this.currentPage).subscribe((data) => {
      this.characters = data.docs;
      this.objetoConsulta = data;
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.loadCharacters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }
 async onSearch() {
    if(this.searchTerm.length>3){
      this.currentPage = 1;
      await this.apiService.getCharacterById(this.searchTerm).subscribe((data) => {
        this.characters = data.result;
        this.objetoConsulta = data;
      });
    }else{
      await this.loadCharacters()
    }
    
  }
}