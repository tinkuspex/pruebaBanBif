import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Location } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.apiService.selectedCharacter$.subscribe((data) => {
      this.character = data;
    });
  }

  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();  // Usamos la API de window directamente
    } else {
      this.router.navigate(['/']);  // Si no hay historial, redirige a la página principal
    }
  }
}
