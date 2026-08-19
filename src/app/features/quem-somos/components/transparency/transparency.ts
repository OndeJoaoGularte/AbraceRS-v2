import { Component, signal } from '@angular/core';

export interface coreValue {
  icon: string;
  title: string;
  text: string;
  btnText: string;
  linkUrl: string;
  downloadName?: string;
}

@Component({
  selector: 'app-transparency',
  imports: [],
  templateUrl: './transparency.html',
  styleUrl: './transparency.scss',
})
export class TransparencyComponent {

  coreValues = signal<coreValue[]>([
    {
      icon: 'fas fa-file-alt',
      title: 'Relatórios de Atividades',
      text: 'Acompanhe nossas ações, projetos concluídos e o número de pessoas impactadas por nossas iniciativas.',
      btnText: 'Ver Relatórios',
      linkUrl: '#'
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Prestação de Contas',
      text: 'Veja como os recursos arrecadados são distribuídos e investidos para maximizar nosso impacto social.',
      btnText: 'Ver Financeiro',
      linkUrl: '#'
    },
    {
      icon: 'fas fa-gavel',
      title: 'Estatuto Social',
      text: 'Acesse o documento oficial que rege a nossa organização, nossos objetivos e nossa estrutura de governança.',
      btnText: 'Baixar Estatuto',
      linkUrl: 'assets/docs/estatuto.pdf',
      downloadName: 'estatuto-social-instituto-abracers.pdf'
    }
  ]);

}
