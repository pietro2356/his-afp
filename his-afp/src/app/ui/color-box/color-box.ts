import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'his-color-box',
  imports: [],
  templateUrl: './color-box.html',
  styleUrl: './color-box.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorBox {
  color = input.required<string>();
  colorRule = computed(() => {
    switch (this.color()) {
      case 'ROSSO':
        return 'bg-red-600';
      case 'ARANCIONE':
        return 'bg-orange-400';
      case 'AZZURRO':
        return 'bg-blue-600';
      case 'VERDE':
        return 'bg-green-600';
      case 'BIANCO':
        return 'bg-gray-600';
      default:
        return '';
    }
  });
}
