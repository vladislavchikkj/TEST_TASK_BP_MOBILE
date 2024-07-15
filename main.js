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
	].replace('{{price}}', '$9.99')
	document.querySelector('#continue').innerText = strings['Continue']
	document.querySelector('#restore').innerText = strings['Restore']
	document.querySelector('#terms').innerText = strings['Terms of Use']
	document.querySelector('#privacy').innerText = strings['Privacy Policy']
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
loadLanguageStrings(language).then(updateTexts)

document.querySelector('#app').innerHTML = `
  <div class="container">
  <div class="mt-0">
    <a href="#" class="close" aria-label="close">
      <img src="/cross/Cross.png" srcset="/cross/Cross@1.5x.png 1.5x, /cross/Cross@2x.png 2x, /cross/Cross@3x.png 3x" alt="Close"/>
    </a>
    <h1 id="title"></h1>
    <div id="cards">
      <div class="card-item">
        <img src="/card1/1.png" srcset="/card1/1@2x.png 2x, /card1/1@3x.png 3x" alt="Unlimited Art Creation"/>
        <p class="card-text"></p>
      </div>
      <div class="card-item">
        <img src="/card2/f2.png" srcset="/card2/2@2x.png 2x, /card2/2@3x.png 3x" alt="Magic Avatars With 20% Off"/>
        <p class="card-text"></p>
      </div>
      <div class="card-item">
        <img src="/card3/f3.png" srcset="/card3/f3@2x.png 2x, /card3/f3@3x.png 3x" alt="Exclusive Styles"/>
        <p class="card-text"></p>
      </div>
    </div>
    <div class="offer">
      <div class="offer-item active">
        <div>
          <p id="yearly" class="fw-600"></p>
          <p id="yearly-price" class="fl-70"></p>
        </div>
        <div>
          <p id="price" class="fl-70">$0.48 <br/>per week</p>
        </div>
        <p id="best-offer" class="best-offer"></p>
      </div>
      <div class="offer-item">
        <p id="weekly" class="fw-600"></p>
        <p id="weekly-price" class="fl-70"></p>
      </div>
    </div>
    <button id="continue"></button>
    </div>
    <div class="links">
      <a href="#" id="terms">Terms of Use</a>
      <a href="#" id="privacy">Privacy Policy</a>
      <a href="#" id="restore">Restore</a>
    </div>
  </div>
`
