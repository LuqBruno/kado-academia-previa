import { describe, it, expect } from 'vitest';
import { modalities, nextTab, PHONE, whatsappUrl } from './data';
describe('caminho de aula da Kado', () => {
  it('mantém as seis modalidades distintas confirmadas', () => {
    expect(modalities).toHaveLength(6);
    expect(new Set(modalities.map(m => m.id)).size).toBe(6);
    expect(modalities.filter(m => m.group === 'Pilates')).toHaveLength(2);
  });
  it('usa o contato oficial e preserva acentos na mensagem contextual', () => {
    for (const m of modalities) {
      const url = new URL(whatsappUrl(m.name));
      expect(url.pathname).toBe(`/${PHONE}`);
      expect(url.searchParams.get('text')).toContain(m.name);
    }
  });
  it('não inventa um agendamento no texto do contato', () => {
    expect(new URL(whatsappUrl()).searchParams.get('text')).toContain('conversar');
    expect(whatsappUrl()).not.toContain('undefined');
  });
  it('teclado circula em ambos os limites e permite Home e End', () => {
    expect(nextTab(5, 'ArrowRight', 6)).toBe(0);
    expect(nextTab(0, 'ArrowLeft', 6)).toBe(5);
    expect(nextTab(3, 'Home', 6)).toBe(0);
    expect(nextTab(0, 'End', 6)).toBe(5);
    expect(nextTab(2, 'Tab', 6)).toBe(2);
  });
});
