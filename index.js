const csv = require('csv');
const fs = require('fs');


const withCsvFile = function(err, data) {
	console.log(data);
	csv.parse(data, {columns: true, delimiter: ";"}, processRecords);
};

const processRecords = function(err, records) {
	records.forEach(processRecord);
};

const processRecord = function(record) {
	if (record['Header.Datensatz-Nummer'] && record['DEU.Benennung'] && record['ENG.Benennung']) {
		console.log('aws polly synthesize-speech --output-format mp3 --voice-id Marlene --text \'' + record['DEU.Benennung'] + '\' ' + record['Header.Datensatz-Nummer'] + '.deu.mp3');
		console.log('aws polly synthesize-speech --output-format mp3 --voice-id Joanna --text \'' + record['ENG.Benennung'] + '\' ' + record['Header.Datensatz-Nummer'] + '.eng.mp3');
	}
};

fs.readFile('./Terminologie_DB Konzern_DE_EN_Definition.csv', withCsvFile);