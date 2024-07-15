import './style.css'

const supportedLanguages = ['en', 'es', 'fr', 'de', 'ja', 'pt']
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
	].replace('{{price}}', '$99.99')
	document.querySelector('#weekly').innerHTML = strings['WEEKLY ACCESS']
	document.querySelector('#weekly-price').innerHTML = strings[
		'{{price}} <br>per week'
	].replace('{{price}}', '$9.99')
	document.querySelector('#continue').innerText = strings['Continue']
	document.querySelector('#restore').innerText = strings['Restore']
	document.querySelector('#terms').innerText = strings['Terms of Use']
	document.querySelector('#privacy').innerText = strings['Privacy Policy']

	// Update card texts
	document.querySelector('.card-item:nth-child(1) .card-text').innerHTML =
		strings['Unlimited Art <br>Creation']
	document.querySelector('.card-item:nth-child(2) .card-text').innerHTML =
		strings['Magic Avatars <br>With 20% Off']
	document.querySelector('.card-item:nth-child(3) .card-text').innerHTML =
		strings['Exclusive <br>Styles']
}

async function changeLanguage(lang) {
	const strings = await loadLanguageStrings(lang)
	updateTexts(strings)
}

const language = getLanguage()
loadLanguageStrings(language).then(strings => updateTexts(strings))

document.querySelector('#app').innerHTML = `
  <div class="container">
  <a class="close">x</a>
    <h1 id="title"></h1>
    <div id="cards">
      <div class="card-item">
        <img src="/card1/1.png" alt="card1"/>
        <p class="card-text">Unlimited Art <br>Creation</p>
      </div>
      <div class="card-item">
        <img src="/card2/f2.png" alt="card2"/>
        <p class="card-text">Magic Avatars <br>With 20% Off</p>
      </div>
      <div class="card-item">
        <img src="/card3/f3.png" alt="card3"/>
        <p class="card-text">Exclusive <br>Styles</p>
      </div>
    </div>
    <div class="offer">
      <div class="offer-item active">
        <div>
          <p id="yearly" class="fw-600"></p>
          <p id="yearly-price"></p>
        </div>
        <div>
          <p id="price">$0.48 <br/>per week</p>
        </div>
        <p id="best-offer" class="best-offer"></p>
      </div>
      <div class="offer-item">
        <p id="weekly" class="fw-600"></p>
        <p id="weekly-price"></p>
      </div>
    </div>
    <button id="continue"></button>
    <div class="links">
      <a href="#" id="terms">Terms of Use</a>
      <a href="#" id="privacy">Privacy Policy</a>
      <a href="#" id="restore">Restore</a>
    </div>
  </div>
`
