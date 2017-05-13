const csv = require('csv');
const fs = require('fs');


const withCsvFile = function(err, data) {
	csv.parse(data, {columns: true, delimiter: ";"}, processRecords);
};

const processRecords = function(err, records) {
	records.forEach(processRecord);
};

const processRecord = function(record) {
	if (record['Header.Datensatz-Nummer'] && record['DEU.Benennung'] && record['ENG.Benennung']) {
		console.log('<tr><td>' + 
			record['Header.Datensatz-Nummer'] + 
			'</td><td>' + 
			record['DEU.Benennung'] + 
			'</td><td>' + 
			'<audio controls><source src="audio/' +record['Header.Datensatz-Nummer'] + '.deu.mp3 " type="audio/mpeg"></audio>'+
			'</td><td>' + 
			record['ENG.Benennung'] + 
			'</td><td>' + 
			'<audio controls><source src="audio/' +record['Header.Datensatz-Nummer'] + '.eng.mp3 " type="audio/mpeg"></audio>'+
			'</td>');
	}



};

fs.readFile('./Terminologie_DB Konzern_DE_EN_Definition.csv', withCsvFile);