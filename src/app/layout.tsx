import { ReactNode } from 'react';

/**
 * Layout racine minimaliste.
 * Le design et la structure sont gérés dans [locale]/layout.tsx
 * pour assurer une compatibilité parfaite avec l'internationalisation.
 */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
