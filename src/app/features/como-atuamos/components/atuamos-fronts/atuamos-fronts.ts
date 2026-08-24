import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-atuamos-fronts',
  imports: [],
  templateUrl: './atuamos-fronts.html',
  styleUrl: './atuamos-fronts.scss',
})
export class AtuamosFrontsComponent {

  fronts = signal([
    {
      icon: 'fas fa-hands-helping',
      title: 'Ajuda Humanitária',
      description:
        'Distribuímos toneladas de itens essenciais como alimentos, água, roupas, produtos de higiene e centenas de refeições para desabrigados.',
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Apoio à Saúde Mental',
      description:
        'Com o projeto "renovaMENTE", promovemos acolhimento, cuidado emocional e fortalecimento da saúde mental com práticas integrativas gratuitas.',
    },
    {
      icon: 'fas fa-paw',
      title: 'Causa Animal',
      description:
        'Apoiamos ONGs e abrigos com o que precisam para manter os animais resgatados até que possam voltar para suas casas ou serem adotados.',
    },
  ]);
}
