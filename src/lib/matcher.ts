// Recommendation engine: maps quiz answers → pack IDs + showcase slug.
// Rules are intentionally simple and editable. As the business evolves,
// adjust thresholds or add new showcase slugs here.

export interface QuizAnswers {
  weddingDate?: string;
  location: string;
  ceremonyType: string; // 'civil' | 'religious' | 'symbolic'
  serviceInterest: string; // 'photo' | 'video' | 'both'
  budgetRange: string; // 'low' | 'mid' | 'high' | 'premium'
}

const BUDGET_MAP: Record<string, number> = {
  low: 1300,
  mid: 2000,
  high: 3000,
  premium: 4000,
};

export function recommendPacks(answers: QuizAnswers): string[] {
  const budget = BUDGET_MAP[answers.budgetRange] ?? 2000;
  const svc = answers.serviceInterest;

  if (svc === 'photo') {
    return budget <= 1500 ? ['como-conoci'] : ['lqsa'];
  }
  if (svc === 'video') {
    return budget <= 1500 ? ['this-is-us'] : ['outlander'];
  }
  // 'both'
  if (budget <= 2600) return ['combo-cc-tu'];
  if (budget <= 2900) return ['combo-cc-ol'];
  if (budget <= 3100) return ['combo-lqsa-tu'];
  return ['combo-lqsa-ol'];
}

export function recommendShowcase(answers: QuizAnswers): string {
  const c = answers.ceremonyType;
  const loc = answers.location;

  if (loc === 'international') return 'destination-wedding';
  if (c === 'religious') return 'boda-religiosa';
  if (c === 'symbolic') return 'boda-simbolica';
  // civil by default, pick by location flavour
  if (loc === 'beach' || loc === 'tarragona') return 'boda-civil-platja';
  return 'boda-civil-masia';
}

/** Generate a personalised note (in Catalan) for the auto-created quote. */
export function generateNote(answers: QuizAnswers, coupleName: string): string {
  const lines: string[] = [
    `Hola ${coupleName}! 👋`,
    '',
    `Hem preparat aquesta proposta basada en el que ens heu explicat. Esperem que us agradi!`,
  ];
  if (answers.weddingDate) {
    const d = new Date(answers.weddingDate);
    if (!isNaN(d.getTime())) {
      lines.push(`📅 Data del vostre casament: ${d.toLocaleDateString('ca-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`);
    }
  }
  if (answers.location) {
    const labels: Record<string, string> = {
      tarragona: 'Tarragona / Reus',
      barcelona: 'Barcelona',
      lleida: 'Lleida / Girona',
      other_cat: 'Catalunya',
      international: 'Destí internacional',
    };
    lines.push(`📍 Lloc: ${labels[answers.location] ?? answers.location}`);
  }
  lines.push('', 'Qualsevol dubte, estem a la vostra disposició. Podem quedar per prendre un cafè o fer una videotrucada. 💛');
  return lines.join('\n');
}
