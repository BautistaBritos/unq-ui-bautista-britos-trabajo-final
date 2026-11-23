import type { CSSProperties } from 'react';
import { Link2, Timer, Trophy, type LucideIcon } from 'lucide-react';
import { Panel } from '../ui/Panel';
import styles from './RulesList.module.css';

interface Rule {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const RULES: Rule[] = [
  {
    icon: Link2,
    title: 'Encadená palabras',
    description: 'Cada palabra empieza con la última letra de la anterior y no se puede repetir.',
    color: 'var(--color-pink)',
  },
  {
    icon: Timer,
    title: '15 segundos por turno',
    description: 'El reloj arranca con tu primera palabra y vuelve a 15 con cada acierto.',
    color: 'var(--color-purple)',
  },
  {
    icon: Trophy,
    title: '1 punto por letra',
    description: 'Las palabras largas suman más. ¡Armá la cadena más larga que puedas!',
    color: 'var(--color-blue)',
  },
];

const STAGGER_MS = 120;

export const RulesList = () => (
  <ul className={styles.rules} aria-label="Cómo se juega">
    {RULES.map(({ icon: Icon, title, description, color }, index) => (
      <Panel
        key={title}
        as="li"
        className={styles.rule}
        style={{ '--accent': color, '--delay': `${index * STAGGER_MS}ms` } as CSSProperties}
      >
        <span className={styles.iconBox} aria-hidden="true">
          <Icon size={30} strokeWidth={2.2} />
        </span>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </Panel>
    ))}
  </ul>
);
