let weightIndex = {
	"Thin": 100,
	"Extra Light": 200,
	"Light": 300,
	"Normal": 400,
	"Regular": 400,
	"Medium": 500,
	"Semi Bold": 600,
	"Bold": 700,
	"Extra Bold": 800,
	"Black": 900
};

const fs = require('fs');
let tokens = JSON.parse(fs.readFileSync('./tokens.json'));

console.log("/* _variables.scss */");
for (let token of tokens.entities){
	if (token.category_id === 'ref.palette'){
		let key = token.id.replace(/md\.ref\.palette\.([^.]+)/, '$1');
		let value = token.value;
		console.log(`$${key}: ${value};`);
	}
}

// Light
console.log("\n/* _variables-light.scss */");
for (let token of tokens.entities){
	if (token.category_id === 'sys.color.light'){
		let key = token.id.replace(/md\.sys\.color\.([^.]+).[a-z]*/, '$1');
		let value = token.value;
		console.log(`$${key}: ${value};`);
	}
}

// Dark
console.log("\n/* _variables-dark.scss */");
for (let token of tokens.entities){
	if (token.category_id === 'sys.color.dark'){
		let key = token.id.replace(/md\.sys\.color\.([^.]+).[a-z]*/, '$1');
		let value = token.value;
		console.log(`$${key}: ${value};`);
	}
}


console.log("\n/* _mixins.scss */");
console.log("// Typography")
let fonts = JSON.parse(fs.readFileSync('./fonts.json'));
for (let font of fonts.entities){
	let key = font.id.replace(/md\.sys\.typescale\.([^.]+)/, '$1');
	let family, lineHeight, weight, letterSpacing, size;
	for (let token of font.tokens){
		switch (token.key){
			case "family": family = `"${token.value}"`; break;
			case "line-height": lineHeight = `${token.value}px`; break;
			case "weight": weight = `${weightIndex[token.value]}`; break;
			case "tracking": letterSpacing = `${token.value}px`; break;
			case "size": size = `${token.value}px`; break;
		}
	}
	console.log(`@mixin ${key}() {`);
	// console.log(`	font-family: ${family}, "Noto Sans", sans-serif;`);
	console.log(`	font-size: ${size};`);
	console.log(`	font-weight: ${weight};`);
	console.log(`	line-height: ${lineHeight};`);
	console.log(`	letter-spacing: ${letterSpacing};`);
	console.log(`}`);
}
