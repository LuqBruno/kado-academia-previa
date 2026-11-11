export const PHONE = '5548991687524';
export const INSTAGRAM = 'https://www.instagram.com/kadoacademia/';
export const MAPS = 'https://www.google.com/maps/search/?api=1&query=Kado+Academia+Rua+Wolmir+Wosnievski+226+Criciuma';
export const MAP_EMBED = 'https://www.google.com/maps?q=Kado+Academia+Rua+Wolmir+Wosnievski+226+Criciuma&z=15&output=embed';
export const modalities = [
  { id: 'musculacao', name: 'Musculação', focus: 'Força no seu ritmo.', text: 'Treino com pesos, aparelhos e acompanhamento da equipe. Um ponto de partida para quem está começando e espaço para quem já tem a sua rotina.', detail: 'Converse sobre avaliação e orientação para o seu treino.', group: 'Treino de força' },
  { id: 'cross', name: 'Cross Training', focus: 'Movimento que se adapta a você.', text: 'Uma aula com diferentes movimentos e possibilidades de adaptação. No Instagram, a Kado apresenta o Cross como um treino que não exige chegar forte para começar.', detail: 'Consulte a equipe sobre turmas e participação na primeira aula.', group: 'Treino em grupo' },
  { id: 'ritmos', name: 'Ritmos + Jump', focus: 'Energia que se compartilha.', text: 'Música e movimento em uma experiência coletiva. Conheça as aulas de Ritmos + Jump que fazem parte das modalidades divulgadas pela Kado.', detail: 'Peça os horários e as orientações para participar.', group: 'Treino em grupo' },
  { id: 'gap', name: 'GAP', focus: 'Um foco para o seu treino.', text: 'Aulas de Glúteos, Abdômen e Pernas. Uma das opções coletivas apresentadas pela academia para compor a sua rotina de movimento.', detail: 'Confirme com a equipe a programação e como começar.', group: 'Treino em grupo' },
  { id: 'pilates-solo', name: 'Pilates Solo', focus: 'Atenção a cada movimento.', text: 'Uma das modalidades de Pilates divulgadas pela Kado. Conheça a proposta das aulas no solo e converse sobre a opção adequada ao seu momento.', detail: 'A equipe informa a disponibilidade e a forma de atendimento.', group: 'Pilates' },
  { id: 'pilates-studio', name: 'Pilates Studio', focus: 'Controle. Presença. Movimento.', text: 'Conheça o Studio de Pilates da Kado e o trabalho com os equipamentos. A equipe orienta sobre o atendimento e a participação nas sessões.', detail: 'Agende uma conversa antes de escolher a modalidade.', group: 'Pilates' },
] as const;
export type ModalityId = typeof modalities[number]['id'];
export function whatsappUrl(subject?: string) {
  const message = subject ? `Olá! Gostaria de conhecer a Kado e conversar sobre uma aula de ${subject}.` : 'Olá! Gostaria de conhecer a Kado e conversar sobre uma aula.';
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}
export function nextTab(current: number, key: string, length: number) {
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  if (key === 'ArrowRight' || key === 'ArrowDown') return (current + 1) % length;
  if (key === 'ArrowLeft' || key === 'ArrowUp') return (current - 1 + length) % length;
  return current;
}
export const hours = [
  ['Segunda a quinta', '5h às 23h30'], ['Sexta', '5h às 23h'], ['Sábado', '9h às 15h'],
];
