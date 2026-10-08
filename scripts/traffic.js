/* ================= TRÁFICO - MOVIMIENTO ALEATORIO DE LOS CARROS ==================*/

import { carBricks, C } from "./lego.js";

const capaCarros = document.querySelector("#carros");

// Centros de las calles de la ciudad (cada calle mide 2 de ancho)
const CALLES_X = [3, 11, 19, 27];
const CALLES_Y = [3, 11, 19, 27];

const VELOCIDADES = {
  Lentisimo: 2,
  Lento: 4,
  Normal: 6,
  Rapido: 8,
  Rapidismo: 10,
}; // tachuelas por segundo
const CARRIL = 0.5; // separación del carro respecto al centro de la calle
const DIRECCIONES = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const carros = new Map(); // id -> estado del carro (posición, destino, velocidad...)
let carroHover = null; // id del carro que tiene el mouse encima (se detiene)

/* ---------- Cruces y decisión al azar ---------- */
const cruce = (c, r) => ({ c, r, x: CALLES_X[c], y: CALLES_Y[r] });

// Cruces vecinos a los que se puede ir desde un cruce
function vecinos({ c, r }) {
  return DIRECCIONES.map(([dc, dr]) => [c + dc, r + dr])
    .filter(
      ([nc, nr]) =>
        nc >= 0 && nr >= 0 && nc < CALLES_X.length && nr < CALLES_Y.length,
    )
    .map(([nc, nr]) => cruce(nc, nr));
}

// Elige un vecino al azar; no regresa por donde vino, salvo que no haya otra salida
function elegirSiguiente(actual, anterior) {
  const opciones = vecinos(actual);
  const adelante = opciones.filter(
    (n) => !anterior || n.c !== anterior.c || n.r !== anterior.r,
  );
  const pool = adelante.length ? adelante : opciones;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ---------- Crear, actualizar y quitar carros ---------- */
// El carro se dibuja una vez por cada dirección; solo se muestra la que corresponde
const gruposHTML = (v) =>
  DIRECCIONES.map(
    (d, i) =>
      `<g class="dir" display="${i ? "none" : "inline"}">${carBricks(v.vehicle, v.color, d)}</g>`,
  ).join("");

export function agregarCarro(v) {
  capaCarros.insertAdjacentHTML(
    "beforeend",
    `<g class="car" data-id="${v.id}"><g class="inner">${gruposHTML(v)}</g></g>`,
  );
  const el = capaCarros.lastElementChild;

  const desde = cruce(
    Math.floor(Math.random() * CALLES_X.length),
    Math.floor(Math.random() * CALLES_Y.length),
  );
  const hasta = elegirSiguiente(desde, null);
  const ux = Math.sign(hasta.x - desde.x);
  const uy = Math.sign(hasta.y - desde.y);

  const carro = {
    el,
    desde,
    hasta,
    t: Math.random() * 0.6, // avance dentro del tramo (0 a 1)
    dir: 0,
    velocidad: VELOCIDADES[v.speed] ?? 2.5,
    grupos: [...el.querySelectorAll(".dir")],
    ox: -uy * CARRIL, // desplazamiento lateral actual
    oy: ux * CARRIL,
    prof: 0, // profundidad (x + y), sirve para ordenar
  };
  carros.set(String(v.id), carro);
  mover(carro, 0);
}

// Cambia el aspecto (tipo, color) y la velocidad, conservando la posición
export function actualizarCarro(v) {
  const carro = carros.get(String(v.id));
  if (!carro) return;
  carro.velocidad = VELOCIDADES[v.speed] ?? 2.5;
  carro.el.querySelector(".inner").innerHTML = gruposHTML(v);
  carro.grupos = [...carro.el.querySelectorAll(".dir")];
  carro.grupos[0].setAttribute("display", "none");
  carro.grupos[carro.dir].setAttribute("display", "inline");
}

// Se desvanece y luego se elimina del DOM
export function quitarCarro(id) {
  const carro = carros.get(String(id));
  if (!carro) return;
  carros.delete(String(id)); // deja de moverse
  carro.el.style.transition = "opacity .4s";
  carro.el.style.opacity = "0";
  setTimeout(() => carro.el.remove(), 400);
}

/* ---------- Movimiento ---------- */
function mover(carro, dt) {
  const dx = carro.hasta.x - carro.desde.x;
  const dy = carro.hasta.y - carro.desde.y;
  carro.t += (carro.velocidad * dt) / Math.hypot(dx, dy);

  if (carro.t >= 1) {
    // llegó a un cruce: decide hacia dónde sigue
    const anterior = carro.desde;
    carro.desde = carro.hasta;
    carro.hasta = elegirSiguiente(carro.desde, anterior);
    carro.t -= 1;
    return mover(carro, 0);
  }

  const ux = Math.sign(dx);
  const uy = Math.sign(dy);

  // Muestra el dibujo de la dirección actual
  const i = DIRECCIONES.findIndex((d) => d[0] === ux && d[1] === uy);
  if (i !== carro.dir) {
    carro.grupos[carro.dir].setAttribute("display", "none");
    carro.grupos[i].setAttribute("display", "inline");
    carro.dir = i;
  }

  // Cambio suave de carril en las vueltas
  const k = Math.min(1, dt * 6);
  carro.ox += (-uy * CARRIL - carro.ox) * k;
  carro.oy += (ux * CARRIL - carro.oy) * k;

  const x = carro.desde.x + dx * carro.t + carro.ox;
  const y = carro.desde.y + dy * carro.t + carro.oy;
  carro.el.setAttribute(
    "transform",
    `translate(${((x - y) * C).toFixed(1)} ${(((x + y) * C) / 2).toFixed(1)})`,
  );
  carro.prof = x + y;
}

// Los carros más lejanos se dibujan primero, así uno puede tapar a otro
let orden = [];
function ordenar() {
  const nuevo = [...carros.values()].sort((a, b) => a.prof - b.prof);
  if (nuevo.some((c, i) => c !== orden[i])) {
    nuevo.forEach((c) => capaCarros.appendChild(c.el));
  }
  orden = nuevo;
}

/* ---------- Bucle de animación ---------- */
let ultimo = performance.now();
function cuadro(ahora) {
  const dt = Math.min((ahora - ultimo) / 1000, 0.05);
  ultimo = ahora;
  for (const carro of carros.values()) mover(carro, dt);
  ordenar();
  requestAnimationFrame(cuadro);
}
requestAnimationFrame(cuadro);
