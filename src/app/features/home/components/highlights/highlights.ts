import { Component, input } from '@angular/core';
import { Highlight } from '../../../../core/services/highlights/highlights';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.html',
  styleUrl: './highlights.scss',
})
export class HighlightsComponent {
  highlights = input<Highlight[]>([]);
  isLoading = input<boolean>(true);

  ctaHref(highlight: Highlight): string {
    return highlight.file_url || highlight.link_url || '#';
  }

  isExternal(highlight: Highlight): boolean {
    const href = this.ctaHref(highlight);
    return /^https?:\/\//i.test(href);
  }

  isDownload(highlight: Highlight): boolean {
    return !!highlight.file_url;
  }
}
