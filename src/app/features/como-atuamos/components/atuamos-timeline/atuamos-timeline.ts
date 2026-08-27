import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-atuamos-timeline',
  imports: [],
  templateUrl: './atuamos-timeline.html',
  styleUrl: './atuamos-timeline.scss',
})
export class AtuamosTimelineComponent {
  
  timelineSteps = signal([
    {
      step: 1,
      title: 'QG Humanitário',
      description: 'Nosso QG na Av. São Pedro se tornou um centro de resgate e distribuição de doações para o 4º Distrito.'
    },
    {
      step: 2,
      title: 'Expansão da Ajuda',
      description: 'Levamos nosso apoio a locais com menor visibilidade, como Eldorado do Sul e as Ilhas de Porto Alegre.'
    },
    {
      step: 3,
      title: 'Institucionalização',
      description: 'Para organizar e ampliar o apoio, o grupo de voluntários se formalizou, criando o Instituto Abrace.'
    }
  ]);

}