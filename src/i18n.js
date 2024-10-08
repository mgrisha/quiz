import en from './trans/en.json';
import fr from './trans/fr.json';
import de from './trans/de.json';
import es from './trans/es.json';

import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'


const resources = {
	en: { translation: en },
	fr: { translation: fr },
	de: { translation: de },
	es: { translation: es }
}

i18n
.use(initReactI18next)
.init({
	resources,
	lng: JSON.parse(localStorage.getItem('language')),
	fallbackLng: 'en'
})

export default i18n;
