import './style.css'

const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja', 'pt']
const defaultLanguage = 'en'

function getLanguage() {
	const urlParams = new URLSearchParams(window.location.search)
	const langParam = urlParams.get('lang')
	const systemLang = navigator.language.slice(0, 2)

	if (langParam && supportedLanguages.includes(langParam)) {
		return langParam
	} else if (supportedLanguages.includes(systemLang)) {
		return systemLang
	} else {
		return defaultLanguage
	}
}

async function loadLanguageStrings(lang) {
	try {
		const response = await fetch(`/lang/${lang}.json`)
		if (!response.ok)
			throw new Error(`Failed to load language file: ${response.statusText}`)
		return await response.json()
	} catch (error) {
		console.error('Error loading language file:', error)
		const fallbackResponse = await fetch(`/lang/${defaultLanguage}.json`)
		if (!fallbackResponse.ok)
			throw new Error(
				`Failed to load fallback language file: ${fallbackResponse.statusText}`
			)
		return await fallbackResponse.json()
	}
}

function updateTexts(strings) {
	document.querySelector('#title').innerHTML =
		strings['Get Unlimited <br>Access']
	document.querySelector('#yearly').innerHTML = strings['YEARLY ACCESS']
	document.querySelector('#best-offer').innerHTML = strings['BEST OFFER']
	document.querySelector('#yearly-price').innerHTML = strings[
		'Just {{price}} per year'
	].replace('{{price}}', '$99.99')
	document.querySelector('#weekly').innerHTML = strings['WEEKLY ACCESS']
	document.querySelector('#weekly-price').innerHTML = strings[
		'{{price}} <br>per week'
	].replace('{{price}}', '$0.48')
	document.querySelector('#weekly-price-secondary').innerHTML = strings[
		'{{price}} <br>per week'
	].replace('{{price}}', '$9.99')
	document.querySelector('#continue').innerText = strings['Continue']
	document.querySelector('#restore').innerText = strings['Restore']
	document.querySelector('#terms').innerText = strings['Terms of Use']
	document.querySelector('#privacy').innerText = strings['Privacy Policy']
	document.querySelector('#card-text-1').innerHTML =
		strings['Unlimited Art <br>Creation']
	document.querySelector('#card-text-2').innerHTML =
		strings['Magic Avatars <br>With 20% Off']
	document.querySelector('#card-text-3').innerHTML =
		strings['Exclusive <br>Styles']
}

const language = getLanguage()
loadLanguageStrings(language).then(updateTexts)
