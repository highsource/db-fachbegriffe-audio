document.addEventListener('DOMContentLoaded', function () {
	var playback = document.getElementById('playback')

	function isAudioLink (el) {
		return el.tagName === 'A' && el.classList.contains('audio')
	}

	function onClick (e) {
		e.preventDefault()
		const target = e.target.getAttribute('href')
		playback.setAttribute('src', target)
		playback.play()
	}

	var links = document.getElementsByTagName('a')
	for (var i = 0; i < links.length; i++) {
		var link = links[i]
		if (!isAudioLink(link)) continue

		link.addEventListener('click', onClick)
	}
})