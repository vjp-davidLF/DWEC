function construirMazo(){
	const palos = ["Corazones", "Picas", "Treboles", "Diamantes"];
	const valores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jota", "Reina", "Rey"];
	const mazo = [];
	
	for(const palo of palos){
		for(const val of valores){
			mazo.push([palo, val]);
		}
	}
	
	return mazo;
}

function calcularValorMano(cartas){
	let suma = 0;
	let ases = 0;
	
	for(const carta of cartas){
		const valor = carta[1];
		
		if(valor === 1){
			ases += 1;
			suma += 1;
		} else if(valor === "Jota" || valor === "Reina" || valor === "Rey"){
			suma += 10;
		} else {
			suma += Number(valor);
		}
	}
	
	while(ases > 0 && suma + 10 <= 21){
		suma += 10;
		ases -= 1;
	}
	
	return suma;
}

function turnoJugador(mazo){
	let cartasJugador = [];
	cartasJugador.push(mazo.pop());
	cartasJugador.push(mazo.pop());
	
	let valorJugador = calcularValorMano(cartasJugador);
	
	while(valorJugador <= 21){
		let seguir = confirm(`Tus cartas: ${cartasJugador.map(c => c[1] + " de " + c[0]).join(', ')}\nPuntuación: ${valorJugador}\n¿Quieres pedir otra carta?`);
		
		if(!seguir) break;
		
		cartasJugador.push(mazo.pop());
		valorJugador = calcularValorMano(cartasJugador);
	}
	
	return cartasJugador;
}

function turnoMaquina(mazo, valorJugador){
	let cartasMaquina = [];
	cartasMaquina.push(mazo.pop());
	cartasMaquina.push(mazo.pop());
	
	let valorMaquina = calcularValorMano(cartasMaquina);
	
	while(valorMaquina < 17){
		cartasMaquina.push(mazo.pop());
		valorMaquina = calcularValorMano(cartasMaquina);
	}
	
	return cartasMaquina;
}

function pintarInfoFinalJuego(cartasJugador, cartasMaquina){
	let valorJugador = calcularValorMano(cartasJugador);
	let valorMaquina = calcularValorMano(cartasMaquina);
	
	let mensaje = `Jugador: ${cartasJugador.map(c => c[1] + " de " + c[0]).join(', ')} - Puntos: ${valorJugador}\n`;
	mensaje += `Máquina: ${cartasMaquina.map(c => c[1] + " de " + c[0]).join(', ')} - Puntos: ${valorMaquina}\n\n`;
	
	if(valorJugador > 21){
		mensaje += "Has perdido la partida, has superado 21 puntos";
	} else if(valorMaquina > 21){
		mensaje += "El jugador gana";
	} else if(valorMaquina > valorJugador){
		mensaje += "La máquina gana";
	} else if(valorJugador > valorMaquina){
		mensaje += "El jugador gana";
	} else {
		mensaje += "Empate";
	}
	
	alert(mensaje);
}

function blackJack(){
	let mazo = construirMazo();
	
	for(let i = mazo.length - 1; i > 0; i--){
		const j = Math.floor(Math.random() * (i + 1));
		[mazo[i], mazo[j]] = [mazo[j], mazo[i]];
	}
	
	let cartasJugador = turnoJugador(mazo);
	let valorJugador = calcularValorMano(cartasJugador);
	
	if(valorJugador > 21){
		alert("Has perdido la partida, has superado 21 puntos");
	} else {
		let cartasMaquina = turnoMaquina(mazo, valorJugador);
		pintarInfoFinalJuego(cartasJugador, cartasMaquina);
	}
}

while(confirm('¿Quieres jugar al BlackJack? (S/N)') === true){
	blackJack();
}

