import {getRequestConfig} from 'next-intl/server';

/**
 * Configuration de next-intl compatible avec toutes les versions 3.x.
 * Cette syntaxe utilise le paramètre locale passé par le routeur 
 * et retourne l'objet attendu par Vercel (incluant la propriété locale).
 */
export default getRequestConfig(async ({locale}) => {
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
