import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChartPaletteService {
  // Hue escolhido para o azul "padrão" (Salário)
  private static readonly BLUE_HUE = 210;
  private static readonly BLUE = `hsl(${ChartPaletteService.BLUE_HUE} 85% 45%)`;
  private static readonly PINNED_LABELS_BLUE = new Set<string>(['salario']);

  // Paleta alinhada a uma lista de labels (garante cor fixa para alguns rótulos)
  getColorsForLabels(labels: string[], opts?: { excludeRed?: boolean }): string[] {
    const excludeRed = !!opts?.excludeRed;
    const colors: string[] = [];
    const used = new Set<number>();

    // reservar o hue azul para rótulos fixos, se houver
    // isso evita colisão quando formos gerar as demais cores
    let reserveBlue = labels.some((l) => this.isPinnedBlue(l));
    if (reserveBlue) used.add(ChartPaletteService.BLUE_HUE);

    const count = Math.max(labels.length, 1);
    const step = 360 / count;

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i] ?? '';
      if (this.isPinnedBlue(label)) {
        colors.push(ChartPaletteService.BLUE);
        continue;
      }

      let hue = Math.round(step * i) % 360;
      hue = this.ensureUniqueHue(hue, used, excludeRed);
      used.add(hue);
      colors.push(`hsl(${hue} 70% 55%)`);
    }

    return colors;
  }

  getPalette(length: number): string[] {
    const colors: string[] = [];
    const used = new Set<number>();
    const count = Math.max(length, 1);
    const step = 360 / count;
    for (let i = 0; i < length; i++) {
      let hue = Math.round(step * i);
      hue = this.ensureUniqueHue(hue, used, false);
      used.add(hue);
      colors.push(`hsl(${hue} 70% 55%)`);
    }
    return colors;
  }

  getPaletteExcludingRed(length: number): string[] {
    const colors: string[] = [];
    const used = new Set<number>();
    if (length <= 0) return colors;
    const count = Math.max(length, 1);
    const step = 360 / count;
    for (let i = 0; i < length; i++) {
      let hue = Math.round(step * i) % 360;
      hue = this.ensureUniqueHue(hue, used, true);
      used.add(hue);
      colors.push(`hsl(${hue} 70% 55%)`);
    }
    let h = 0;
    while (colors.length < length && h < 360) {
      let hue = h;
      if (!used.has(hue) && !this.isRedHue(hue)) {
        used.add(hue);
        colors.push(`hsl(${hue} 70% 55%)`);
      }
      h++;
    }
    return colors;
  }

  getPaletteRange(length: number, startHue: number, endHue: number): string[] {
    const colors: string[] = [];
    const used = new Set<number>();
    const count = Math.max(length, 1);
    const span = endHue - startHue;
    for (let i = 0; i < length; i++) {
      let hue = Math.round(startHue + (span * i) / count);
      hue = this.ensureUniqueHue(hue, used, false);
      used.add(hue);
      colors.push(`hsl(${hue} 70% 55%)`);
    }
    return colors;
  }

  private ensureUniqueHue(
    hue: number,
    used: Set<number>,
    avoidRed: boolean
  ): number {
    let h = ((Math.round(hue) % 360) + 360) % 360;
    let attempts = 0;
    while ((used.has(h) || (avoidRed && this.isRedHue(h))) && attempts < 360) {
      h = (h + 1) % 360;
      attempts++;
    }
    return h;
  }

  private isRedHue(hue: number): boolean {
    const h = ((hue % 360) + 360) % 360;
    return h >= 345 || h <= 15;
  }

  private isPinnedBlue(label: string): boolean {
    const key = this.normalize(label);
    return ChartPaletteService.PINNED_LABELS_BLUE.has(key);
  }

  private normalize(text: string): string {
    return (text ?? '')
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
