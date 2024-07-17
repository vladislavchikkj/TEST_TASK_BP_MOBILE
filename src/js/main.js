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

	if (isMobileDevice()) {
		adjustFontSize()
	} else {
		document.querySelector('h1').style.fontSize = '1.5rem'
	}
}

function isMobileDevice() {
	return (
		window.innerWidth <= 414 ||
		navigator.userAgent.toLowerCase().includes('mobile')
	)
}

function adjustFontSize() {
	const elements = document.querySelectorAll(
		'.card-text, .text-bold, .text-dimmed, .best-offer, button, .links a'
	)
	elements.forEach(el => {
		let fontSize = parseFloat(
			window.getComputedStyle(el, null).getPropertyValue('font-size')
		)
		const lineHeight = parseFloat(
			window.getComputedStyle(el, null).getPropertyValue('line-height')
		)

		while (
			(el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) &&
			fontSize > 10
		) {
			fontSize -= 0.1
			el.style.fontSize = `${fontSize / lineHeight}em`
		}
	})
}

function setupOfferSelection() {
	const yearlyOffer = document.getElementById('yearly-offer')
	const weeklyOffer = document.getElementById('weekly-offer')
	const continueButton = document.getElementById('continue')

	yearlyOffer.addEventListener('click', () => {
		yearlyOffer.classList.add('active')
		weeklyOffer.classList.remove('active')
	})

	weeklyOffer.addEventListener('click', () => {
		weeklyOffer.classList.add('active')
		yearlyOffer.classList.remove('active')
	})

	continueButton.addEventListener('click', () => {
		if (yearlyOffer.classList.contains('active')) {
			window.location.href = 'https://www.apple.com'
		} else if (weeklyOffer.classList.contains('active')) {
			window.location.href = 'https://www.google.com'
		}
	})
}

const language = getLanguage()
loadLanguageStrings(language).then(updateTexts)
setupOfferSelection()
