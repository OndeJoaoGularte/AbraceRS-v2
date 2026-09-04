import { CommonModule } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

export interface GalleryImage {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
}

@Component({
  selector: 'app-custom-gallery',
  imports: [CommonModule],
  templateUrl: './custom-gallery.html',
  styleUrl: './custom-gallery.scss',
})
export class CustomGalleryComponent {
  images = input<GalleryImage[]>([]);

  activeIndex = signal<number>(0);

  activeImage = computed(() => {
    const imgs = this.images();
    if (imgs.length === 0) return null;
    return imgs[this.activeIndex()];
  });

  setActive(index: number) {
    this.activeIndex.set(index);
  }

  next() {
    const total = this.images().length;
    this.activeIndex.update(i => (i + 1) % total);
  }

  prev() {
    const total = this.images().length;
    this.activeIndex.update(i => (i - 1 + total) % total);
  }
}
