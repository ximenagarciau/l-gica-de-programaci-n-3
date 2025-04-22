// Función que calcula el factorial de un número entero no negativo
function factorial(n) {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("El argumento debe ser un numero entero no negativo");
    }
    let resultado = 1;
    for (let i = 2; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Función para solicitar número al usuario con validación
function solicitarNumero() {
    let numero;
    do {
        const input = prompt("Ingrese un numero entero no negativo:");
        if (input === null) {
            console.log("Operacion cancelada por el usuario.");
            return null;
        }
        numero = Number(input);
        if (isNaN(numero) || !Number.isInteger(numero) || numero < 0) {
            alert("Error: Ingrese un numero entero valido y mayor o igual a 0");
        } else {
            return numero;
        }
    } while (true);
}

// Función para mostrar resultados en el DOM
function mostrarResultado(texto) {
    const divResultado = document.getElementById('resultado');
    divResultado.innerHTML = `<p>${texto}</p>`;
}

// Función principal que usa la función factorial y muestra resultados
function main() {
    const numero = solicitarNumero();
    if (numero === null) return; // Usuario canceló

    try {
        const resultado = factorial(numero);
        console.log(`Factorial de ${numero}: ${resultado}`);
        mostrarResultado(`El factorial de <strong>${numero}</strong> es: <strong>${resultado}</strong>`);
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

// --- Pruebas unitarias simples ---
function runTests() {
    const tests = [
        { input: 5, expected: 120 },
        { input: 6, expected: 720 },
        { input: 0, expected: 1 },
        { input: 1, expected: 1 },
        { input: 10, expected: 3628800 },
    ];

    let passed = 0;
    let failed = 0;

    const resultsContainer = document.createElement('div');
    resultsContainer.innerHTML = '<h2>Resultados de Pruebas Unitarias</h2>';
    document.body.appendChild(resultsContainer);

    tests.forEach((test, index) => {
        try {
            const output = factorial(test.input);
            if (output === test.expected) {
                passed++;
                const p = document.createElement('p');
                p.className = 'success test-result';
                p.textContent = `Test #${index + 1} con input ${test.input}: PASÓ (resultado: ${output})`;
                resultsContainer.appendChild(p);
            } else {
                failed++;
                const p = document.createElement('p');
                p.className = 'error test-result';
                p.textContent = `Test #${index + 1} con input ${test.input}: FALLÓ (esperado ${test.expected}, obtenido ${output})`;
                resultsContainer.appendChild(p);
            }
        } catch (e) {
            failed++;
            const p = document.createElement('p');
            p.className = 'error test-result';
            p.textContent = `Test #${index + 1} con input ${test.input}: FALLO con error (${e.message})`;
            resultsContainer.appendChild(p);
        }
    });

    const summary = document.createElement('p');
    summary.innerHTML = `<strong>Pruebas pasadas:</strong> ${passed} | <strong>Pruebas fallidas:</strong> ${failed}`;
    resultsContainer.appendChild(summary);
}

// Ejecutar programa y pruebas al cargar la página
window.onload = function () {
    main();
    runTests();
};