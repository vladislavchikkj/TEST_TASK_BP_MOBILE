import './style.css'

const supportedLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt']
let defaultLanguage = 'en'

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
		if (!response.ok) {
			throw new Error(`Failed to load language file: ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error loading language file:', error)
		const fallbackResponse = await fetch(`/lang/${defaultLanguage}.json`)
		if (!fallbackResponse.ok) {
			throw new Error(
				`Failed to load fallback language file: ${fallbackResponse.statusText}`
			)
		}
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
	].replace('{{price}}', '$99.99') // пример, вставьте свою цену
	document.querySelector('#weekly').innerHTML = strings['WEEKLY ACCESS']
	document.querySelector('#weekly-price').innerHTML = strings[
		'{{price}} <br>per week'
	].replace('{{price}}', '$9.99') // пример, вставьте свою цену
	document.querySelector('#continue').innerText = strings['Continue']
	document.querySelector('#restore').innerText = strings['Restore']
	document.querySelector('#terms').innerText = strings['Terms of Use']
	document.querySelector('#privacy').innerText = strings['Privacy Policy']
}

const language = getLanguage()
loadLanguageStrings(language).then(strings => updateTexts(strings))

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1 id="title"></h1>
    <div class="offer">
      <div class="offer-item">
        <p id="yearly"></p>
        <p id="best-offer"></p>
        <p id="yearly-price"></p>
      </div>
      <div class="offer-item">
        <p id="weekly"></p>
        <p id="weekly-price"></p>
      </div>
    </div>
    <button id="continue"></button>
    <div class="links">
      <a href="#" id="restore">Restore</a>
      <a href="#" id="terms">Terms of Use</a>
      <a href="#" id="privacy">Privacy Policy</a>
    </div>
  </div>
`
