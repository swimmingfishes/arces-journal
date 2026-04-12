// lib/countries.ts
import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(enLocale)

export const COUNTRIES = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  label: name,
  value: code,
}))
