import { Component, signal } from '@angular/core';

export interface CoreValue {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-about-mission',
  imports: [],
  templateUrl: './about-mission.html',
  styleUrl: './about-mission.scss',
})
export class AboutMissionComponent {

  coreValues = signal<CoreValue[]>([
    {
      icon: 'fas fa-bullseye',
      title: 'Missão',
      text: 'Promover ações paliativas, corretivas e/ou preventivas voltadas à população de cidades e comunidades resilientes através de atividades e trabalhos de relevância pública e social. Prestar suporte e oferecer amparo para vítimas de eventos diversos, naturais ou não, sendo climáticos, de saúde, catástrofes ou calamidades diversas nas cidades, estado, país e mundo.'
    },
    {
      icon: 'fas fa-eye',
      title: 'Visão',
      text: 'Ser um farol de esperança, liderando esforços que impactam positivamente vidas e comunidades, buscando construir um mundo onde todas as pessoas possam prosperar e encontrar apoio. Em essência, ser uma referência em ação humanitária e promover a solidariedade e a dignidade humana, especialmente para aqueles que vivem em situação de vulnerabilidade.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Valores',
      text: 'Humanidade, neutralidade, imparcialidade e independência. Além disso, a transparência, a responsabilidade e o respeito pela diversidade e pluralismo são cruciais em nossas operações.'
    }
  ]);

}
