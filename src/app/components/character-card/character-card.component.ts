import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
  imports:[CommonModule,RouterModule]
})
export class CharacterCardComponent {
  @Input() character!: { _id: string; Nombre: string; Imagen: string;
  Ocupacion:string ; Historia:string; Genero:string; Estado:string  };
  constructor(private apiService: ApiService,private router: Router){

  }
  getStatusClass(status: string | undefined): string {
    if (!status) return 'status-other';  // Valor por defecto si `status` es undefined
    switch (status.toLowerCase()) {
      case 'vivo': return 'status-alive';
      case 'fallecido': return 'status-dead';
      default: return 'status-other';
    }
  }
  getStatusIcon(status: string): string {
    if (!status) return 'fa fa-question-circle'; 
    switch (status.toLowerCase()) {
      case 'vivo': return 'fa fa-heart';  // Icono de corazón para "vivo"
      case 'fallecido': return 'fa fa-cross';  // Icono de cruz para "fallecido"
      default: return 'fa fa-question-circle';  // Icono de pregunta para "otros"
    }
  }
  selectCharacter(){
    this.apiService.setSelectedCharacter(this.character);
    this.router.navigate(['/character', this.character._id]);
  }
}