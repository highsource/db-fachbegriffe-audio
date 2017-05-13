'use strict'

const csv = require('csv-parser')
const through2 = require('through2')
const h = require('vhtml')
const slugg = require('slugg')
// const insertHead = require('head-stream')

const head = `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>todo</title>
	<script type="application/javascript" src="audio.js"></script>
</head>
<body>
<audio id="playback" src=""></audio>
`

const tail = `
</body>
</html>
`

process.stdout.write(head)

process.stdin
.pipe(csv({separator: ';'}))
.pipe(through2.obj(function (row, _, cb) {
	const idKey = Object.keys(row).find((k) => slugg(k) === 'header-datensatz-nummer')
	if (!idKey) {
		console.error('couldnt find id column')
		return cb()
	}

	const id = row[idKey]
	const name = row['DEU.Benennung'] || row['DEU.Synonym.Benennung(1_1)']
	if (!id) {
		console.error('missing id', name)
		return cb()
	}
	if (!name) {
		console.error('missing name', id)
		return cb()
	}

	this.push(h('h1', {}, [name]))
	this.push(h('a', {href: id + '.deu.mp3', class: 'audio'}, ['german']))
	this.push(h('a', {href: id + '.eng.mp3', class: 'audio'}, ['english']))
	cb()
}))
.once('end', () => {
	process.stdout.write(tail)
})
.pipe(process.stdout)