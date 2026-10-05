/* ================= LEGOS - FORMULAS PARA VECTOR EN SVG ==================*/
// 1. Configuración de dimensiones y proyección isométrica
// Valores OX y OY modificados para centrar la cámara al nuevo origen 0,0
const C = 19,
  H = 23,
  OX = 492,
  OY = -9;
const P = (x, y, zpx) => [OX + (x - y) * C, OY + ((x + y) * C) / 2 - zpx];

// 2. Función auxiliar para oscurecer colores (caras laterales)
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.min(255, Math.round(v * f));
  return `rgb(${ch((n >> 16) & 255)},${ch((n >> 8) & 255)},${ch(n & 255)})`;
}
const pts = (a) =>
  a.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

// 3. Generador de bloques (caras y tachuelas)
function brick([x, y, z, w, d, col, h = 1, st = true]) {
  const zb = z * H,
    zt = (z + h) * H;
  const t = [
    P(x, y, zt),
    P(x + w, y, zt),
    P(x + w, y + d, zt),
    P(x, y + d, zt),
  ];
  const rb = [P(x + w, y, zb), P(x + w, y + d, zb)];
  const lb = [P(x, y + d, zb), P(x + w, y + d, zb)];
  const sk =
    'stroke="rgba(0,0,0,.28)" stroke-width=".6" stroke-linejoin="round"';

  let s = `<polygon points="${pts([t[3], t[2], lb[1], lb[0]])}" fill="${shade(col, 0.8)}" ${sk}/>`;
  s += `<polygon points="${pts([t[1], t[2], rb[1], rb[0]])}" fill="${shade(col, 0.6)}" ${sk}/>`;
  s += `<polygon points="${pts(t)}" fill="${col}" ${sk}/>`;

  if (st && h >= 0.3 && w >= 0.9 && d >= 0.9) {
    const rx = (0.42 * C).toFixed(1),
      ry = (0.21 * C).toFixed(1),
      sh = (0.26 * C).toFixed(1);
    for (let i = 0; i < Math.round(w); i++) {
      for (let j = 0; j < Math.round(d); j++) {
        const [cx, cy] = P(x + i + 0.5, y + j + 0.5, zt),
          side = shade(col, 0.75);
        s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${side}"/>`;
        s += `<rect x="${cx - rx}" y="${cy - sh}" width="${2 * rx}" height="${sh}" fill="${side}"/>`;
        s += `<ellipse cx="${cx}" cy="${cy - sh}" rx="${rx}" ry="${ry}" fill="${col}"/>`;
      }
    }
  }
  return s;
}

// 4. Ordenamiento para superposición correcta
const bricks = (list) =>
  [...list]
    .sort(
      (a, b) =>
        a[2] - b[2] ||
        a[0] + a[3] / 2 + a[1] + a[4] / 2 - (b[0] + b[3] / 2 + b[1] + b[4] / 2),
    )
    .map(brick)
    .join("");

/* ================= LEGOS - ¡¡¡ FABRICA DE BLOQUES LEGO !!! ==================*/

// 5. Arreglo de piezas a dibujar:
// Coordenadas remapeadas (x + 7, y + 15) para iniciar en 0, 0
//todo =====       [x(\), y(/), z(|), ancho(X), profundidad(Y), color, altura, mostrar_STUDS]
const miSet = [
  /*Placa base */
  [0, 0, -8, 30, 30, "#157511", 1, true],

  //Muro de atardecer
  //1
  [0, 0, -7, 12, 1, "#60b3e6", 1, true],
  [12, 0, -7, 6, 1, "#60b3e6", 1, true],
  [18, 0, -7, 12, 1, "#60b3e6", 1, true],
  //2
  [0, 0, -6, 10, 1, "#60b3e6", 1, true],
  [10, 0, -6, 10, 1, "#60b3e6", 1, true],
  [20, 0, -6, 10, 1, "#60b3e6", 1, true],
  //3
  [0, 0, -5, 5, 1, "#60b3e6", 1, true],
  [5, 0, -5, 5, 1, "#60b3e6", 1, true],
  [10, 0, -5, 5, 1, "#60b3e6", 1, true],
  [15, 0, -5, 5, 1, "#60b3e6", 1, true],
  [20, 0, -5, 5, 1, "#ffffff", 1, true],
  [25, 0, -5, 5, 1, "#60b3e6", 1, true],
  //4
  [0, 0, -4, 12, 1, "#60b3e6", 1, true],
  [12, 0, -4, 6, 1, "#60b3e6", 1, true],
  [18, 0, -4, 12, 1, "#60b3e6", 1, true],
  //5
  [0, 0, -3, 5, 1, "#60b3e6", 1, true],
  [5, 0, -3, 5, 1, "#ffffff", 1, true],
  [10, 0, -3, 5, 1, "#60b3e6", 1, true],
  [15, 0, -3, 5, 1, "#60b3e6", 1, true],
  [20, 0, -3, 5, 1, "#60b3e6", 1, true],
  [25, 0, -3, 5, 1, "#60b3e6", 1, true],
  //6
  [0, 0, -2, 12, 1, "#60b3e6", 1, true],
  [12, 0, -2, 6, 1, "#60b3e6", 1, true],
  [18, 0, -2, 12, 1, "#60b3e6", 1, true],
  //Muro de plantas

  /*Zonas de edificios (agrupadas en esta direccion    \\\    )*/
  /*\\\3*/
  [5, 5, -7, 4, 4, "#2b6c21", 0.3, true],
  [13, 5, -7, 4, 4, "#6b6b6b", 0.3, true],
  [21, 5, -7, 4, 4, "#6b6b6b", 0.3, true],
  /*\\2\*/
  [5, 13, -7, 4, 4, "#6b6b6b", 0.3, true],
  [13, 13, -7, 4, 4, "#6b6b6b", 0.3, true],
  [21, 13, -7, 4, 4, "#2b6c21", 0.3, true],
  /*\1\\*/
  [5, 21, -7, 4, 4, "#2b6c21", 0.3, true],
  [13, 21, -7, 4, 4, "#6b6b6b", 0.3, true],
  [21, 21, -7, 4, 4, "#6b6b6b", 0.3, true],

  /*Banquetas (agrupadas en esta dirección   \\\3)    */
  [4, 4, -7, 1, 6, "#7d7d7d", 0.3, false],
  [5, 4, -7, 4, 1, "#7d7d7d", 0.3, false],
  [5, 9, -7, 4, 1, "#7d7d7d", 0.3, false],
  [9, 4, -7, 1, 6, "#7d7d7d", 0.3, false],

  [12, 4, -7, 1, 6, "#7d7d7d", 0.3, false],
  [13, 4, -7, 4, 1, "#7d7d7d", 0.3, false],
  [13, 9, -7, 4, 1, "#7d7d7d", 0.3, false],
  [17, 4, -7, 1, 6, "#7d7d7d", 0.3, false],

  [20, 4, -7, 1, 6, "#7d7d7d", 0.3, false],
  [21, 4, -7, 4, 1, "#7d7d7d", 0.3, false],
  [21, 9, -7, 4, 1, "#7d7d7d", 0.3, false],
  [25, 4, -7, 1, 6, "#7d7d7d", 0.3, false],

  /*Banquetas (agrupadas en esta dirección   \\2\)    */
  [4, 12, -7, 1, 6, "#7d7d7d", 0.3, false],
  [5, 12, -7, 4, 1, "#7d7d7d", 0.3, false],
  [5, 17, -7, 4, 1, "#7d7d7d", 0.3, false],
  [9, 12, -7, 1, 6, "#7d7d7d", 0.3, false],

  [12, 12, -7, 1, 6, "#7d7d7d", 0.3, false],
  [13, 12, -7, 4, 1, "#7d7d7d", 0.3, false],
  [13, 17, -7, 4, 1, "#7d7d7d", 0.3, false],
  [17, 12, -7, 1, 6, "#7d7d7d", 0.3, false],

  [20, 12, -7, 1, 6, "#7d7d7d", 0.3, false],
  [21, 12, -7, 4, 1, "#7d7d7d", 0.3, false],
  [21, 17, -7, 4, 1, "#7d7d7d", 0.3, false],
  [25, 12, -7, 1, 6, "#7d7d7d", 0.3, false],

  /*Banquetas (agrupadas en esta dirección   \1\\)    */
  [4, 20, -7, 1, 6, "#7d7d7d", 0.3, false],
  [5, 20, -7, 4, 1, "#7d7d7d", 0.3, false],
  [5, 25, -7, 4, 1, "#7d7d7d", 0.3, false],
  [9, 20, -7, 1, 6, "#7d7d7d", 0.3, false],

  [12, 20, -7, 1, 6, "#7d7d7d", 0.3, false],
  [13, 20, -7, 4, 1, "#7d7d7d", 0.3, false],
  [13, 25, -7, 4, 1, "#7d7d7d", 0.3, false],
  [17, 20, -7, 1, 6, "#7d7d7d", 0.3, false],

  [20, 20, -7, 1, 6, "#7d7d7d", 0.3, false],
  [21, 20, -7, 4, 1, "#7d7d7d", 0.3, false],
  [21, 25, -7, 4, 1, "#7d7d7d", 0.3, false],
  [25, 20, -7, 1, 6, "#7d7d7d", 0.3, false],

  /*Calles (agrupadas de esta forma       \///\///\///\      )*/
  /*     ///\3        */
  [2, 2, -7, 8, 2, "#525252", 0.3, false],
  [10, 2, -7, 10, 2, "#525252", 0.3, false],
  [20, 2, -7, 8, 2, "#525252", 0.3, false],
  /**/
  [2, 4, -7, 2, 6, "#525252", 0.3, false],
  [10, 4, -7, 2, 6, "#525252", 0.3, false],
  [18, 4, -7, 2, 6, "#525252", 0.3, false],
  [26, 4, -7, 2, 6, "#525252", 0.3, false],

  /*    ///\2        */
  [2, 10, -7, 8, 2, "#525252", 0.3, false],
  [10, 10, -7, 10, 2, "#525252", 0.3, false],
  [20, 10, -7, 8, 2, "#525252", 0.3, false],
  /**/
  [2, 12, -7, 2, 6, "#525252", 0.3, false],
  [10, 12, -7, 2, 6, "#525252", 0.3, false],
  [18, 12, -7, 2, 6, "#525252", 0.3, false],
  [26, 12, -7, 2, 6, "#525252", 0.3, false],

  /*     \///\1       */
  [2, 18, -7, 8, 2, "#525252", 0.3, false],
  [10, 18, -7, 10, 2, "#525252", 0.3, false],
  [20, 18, -7, 8, 2, "#525252", 0.3, false],
  /**/
  [2, 20, -7, 2, 6, "#525252", 0.3, false],
  [10, 20, -7, 2, 6, "#525252", 0.3, false],
  [18, 20, -7, 2, 6, "#525252", 0.3, false],
  [26, 20, -7, 2, 6, "#525252", 0.3, false],
  /**/
  [2, 26, -7, 8, 2, "#525252", 0.3, false],
  [10, 26, -7, 10, 2, "#525252", 0.3, false],
  [20, 26, -7, 8, 2, "#525252", 0.3, false],

  /*  Edificios (agrupados en esta direccion    \\\    )*/
  /*\\\3*/
  [5, 5, -6.7, 1, 1, "#5a3a14", 1, true],
  [5, 5, -5.7, 1, 1, "#2c7c21", 1, true],
  [5, 7, -6.7, 1, 1, "#5a3a14", 1, true],
  [5, 7, -5.7, 1, 1, "#2c7c21", 1, true],
  [7, 5, -6.7, 2, 2, "#d0c766", 1, true],
  [7, 5, -5.7, 2, 2, "#d0c766", 1, true],
  [7, 5, -4.7, 2, 2, "#934141", 0.3, false],
  [7, 7, -6.7, 2, 2, "#d0c766", 1, true],
  [7, 7, -5.7, 2, 2, "#934141", 0.3, false],

  [13, 5, -6.7, 4, 4, "#404040", 1, true],
  [13, 5, -5.7, 4, 4, "#b9c7d6", 1, true],
  [13, 5, -4.7, 3, 3, "#b9c7d6", 1, true],
  [13, 5, -3.7, 3, 3, "#8fa3bb", 1, true],
  [13, 5, -2.7, 2, 2, "#8fa3bb", 1, true],
  [13, 5, -1.7, 2, 2, "#5d6f87", 1, true],
  [13, 5, -0.7, 1, 1, "#d9382f", 1, true],

  [21, 5, -6.7, 3, 4, "#404040", 1, true],
  [21, 5, -5.7, 3, 2, "#737373", 1, true],
  [21, 5, -4.7, 2, 2, "#aeaeae", 1, true],
  [21, 5, -3.7, 2, 2, "#e8e8e8", 1, true],

  /*  Edificios (agrupados en esta direccion    \\\    )*/
  /*\\2\*/
  [5, 13, -6.7, 2, 4, "#daffff", 1, true],
  [7, 13, -6.7, 2, 2, "#daffff", 1, true],
  [5, 13, -5.7, 4, 2, "#9ec7c7", 1, true],
  [5, 13, -4.7, 2, 2, "#9ca2a2", 0.3, false],
  [7, 13, -4.7, 2, 2, "#daffff", 1, true],
  [7, 13, -3.7, 2, 2, "#daffff", 1, true],
  [7, 13, -2.7, 1, 2, "#daffff", 1, true],
  [8, 13, -2.7, 1, 2, "#b5bebe", 0.3, false],
  [7, 15, -6.7, 1, 1, "#e3d10a", 1, true],

  [13, 13, -6.7, 4, 1, "#4d4d4d", 0.3, true],
  [13, 14, -6.7, 1, 2, "#4d4d4d", 0.3, true],
  [14, 14, -6.7, 2, 2, "#4aa3df", 0.3, false],
  [14.5, 14.5, -6.4, 1, 1, "#4aa3df", 1, true],
  [16, 14, -6.7, 1, 2, "#4d4d4d", 0.3, true],
  [13, 16, -6.7, 4, 1, "#4d4d4d", 0.3, true],

  [21, 13, -6.7, 3, 3, "#ede8dc", 0.3, true],
  [21, 13, -6.4, 3, 1, "#ede8dc", 1, true],
  [22, 14, -5.4, 1, 1, "#653b1e", 1, false],
  [23, 14, -6.4, 2, 1, "#ede8dc", 1, true],
  [23, 14, -5.4, 2, 1, "#ede8dc", 0.7, true],
  [21, 13, -5.4, 3, 1, "#ede8dc", 1, false],
  [21, 14, -6.4, 1, 2, "#ede8dc", 1, true],
  [21, 14, -5.4, 1, 2, "#ede8dc", 1, false],
  [24, 14, -4.7, 1, 1, "#ede8dc", 0.3, false],
  [22, 15, -6.4, 2, 1, "#ede8dc", 1, true],
  [22, 15, -5.4, 2, 1, "#ede8dc", 1, false],

  /*  Edificios (agrupados en esta direccion    \\\    )*/
  /*\1\\*/
  [6, 22, -6.7, 2, 2, "#4aa3df", 0.3, false],
  [6, 24, -6.7, 2, 1, "#7a5230", 0.3, true],
  [5, 21, -6.7, 1, 1, "#5a3a14", 1, true],
  [5, 21, -5.7, 1, 1, "#2c7c21", 1, true],
  [5, 21, -4.7, 1, 1, "#3a9a2c", 1, true],
  [8, 21, -6.7, 1, 1, "#5a3a14", 1, true],
  [8, 21, -5.7, 1, 1, "#2c7c21", 1, true],
  [8, 21, -4.7, 1, 1, "#3a9a2c", 1, true],

  [13, 21, -6.7, 4, 2, "#4b6fa5", 1, true],
  [13, 21, -5.7, 4, 2, "#4b6fa5", 1, true],
  [13, 21, -4.7, 4, 2, "#6d8fc7", 1, true],
  [13, 21, -3.7, 4, 2, "#2f4f7f", 0.3, false],
  [13, 23, -6.7, 2, 2, "#4b6fa5", 1, true],
  [13, 23, -5.7, 2, 2, "#6d8fc7", 1, true],
  [13, 23, -4.7, 2, 2, "#2f4f7f", 0.3, false],
  [15, 23, -6.7, 2, 1, "#d9d9d9", 0.3, true],

  [21, 21, -6.7, 2, 2, "#e1c86c", 1, true],
  [21, 21, -5.7, 2, 2, "#e1c86c", 1, true],
  [21, 21, -4.7, 2, 2, "#364469", 0.3, false],
  [21.5, 21.5, -4.4, 1, 1, "#364469", 1, true],
  [23, 21, -6.7, 2, 1, "#e1c86c", 1, true],
  [24, 21, -5.7, 1, 1, "#e1c86c", 1, true],
  [24, 21, -4.7, 1, 1, "#364469", 0.3, true],
  [22, 23, -6.7, 1, 2, "#e1c86c", 1, true],
  [22, 24, -5.7, 1, 1, "#e1c86c", 1, true],
  [22, 24, -4.7, 1, 1, "#364469", 0.3, true],
  [24, 22, -6.7, 1, 2, "#e1c86c", 0.3, false],
  [24, 24, -6.7, 1, 1, "#e1c86c", 1, true],
  [24, 24, -5.7, 1, 1, "#364469", 0.3, true],
];

/* ================= LEGOS - VEHÍCULOS ==================*/
// Piezas de cada vehículo en SU propio sistema:
// [f0, f1, l0, l1, z, altura, color]
//   f = hacia adelante (el frente del carro es +f)   l = hacia el lado
//   color null = usa el color que eligió el usuario

const SUELO_Z = -6.7; // altura de la superficie de las calles
const OSCURO = "#2b2e33",
  BLANCO = "#ebebeb";
const CHASIS = [-1, 1, -0.5, 0.5, 0, 0.3, OSCURO]; // placa oscura de 2x1 (las "ruedas")

const MODELOS = {
  // Sedán: cuerpo de 2x1 + techo blanco 1x1 en la parte de atrás
  Sedan: [
    CHASIS,
    [-1, 1, -0.5, 0.5, 0.3, 0.3, null, false],
    [-0.5, 0.5, -0.5, 0.5, 0.6, 0.3, null, false],
  ],
  // Deportivo: bajo y plano
  Deportivo: [
    CHASIS,
    [-1.25, 1, -0.5, 0.5, 0.3, 0.3, null, false],
    [-0.75, 0.25, 0.5, -0.5, 0.6, 0.3, null, false],
    [-1.25, -1, 0.5, -0.5, 0.6, 0.3, OSCURO, false],
  ],
  // Camioneta: cabina adelante + caja amarilla atrás, sobre una placa
  Camioneta: [
    CHASIS,
    [-1, 1, -0.5, 0.5, 0.3, 0.3, null, false],
    [0, 1, -0.5, 0.5, 0.6, 0.3, null, false],
  ],

  // mini: cabina de placa centrada
  Mini: [
    CHASIS,
    [-1, 1, -0.5, 0.5, 0.3, 0.3, null, false],
    [-0.75, 0.25, -0.5, 0.5, 0.6, 0.3, BLANCO, false],
  ],
  // coupe: cabina centrada y parabrisas negro
  Sub: [
    CHASIS,
    [-1, 1, -0.5, 0.5, 0.3, 0.3, null, false],
    [-0.5, 0.5, -0.5, 0.5, 0.6, 0.3, null, false],
    [-0.5, -1, -0.5, 0.5, 0.6, 0.3, "#000000", false],
  ],
  // clasico: cabina atrás y parabrisas negro adelante
  Clasico: [
    CHASIS,
    [-1.25, 1, -0.5, 0.5, 0.3, 0.3, null, true],
    [-1, 0, -0.5, 0.5, 0.6, 0.3, OSCURO, false],
  ],
  // cubo: cuerpo alto con techo blanco atrás
  Cubo: [[-1, 0, -0.5, 0.5, 0, 0.9, null, false]],
  // pickup: 3 de largo, cabina adelante y caja con carga atrás
  Bus: [
    [-1.5, 1.5, -0.5, 0.5, 0, 0.3, OSCURO],
    [-1.5, 1.5, -0.5, 0.5, 0.3, 0.3, null, false],
    [-1.5, 0.5, -0.5, 0.5, 0.6, 0.3, null, false],
    [0.5, 1.5, -0.5, 0.5, 0.6, 0.3, BLANCO, false],
  ],
};

// Arma el vehículo mirando hacia la dirección [dx, dy] (por ejemplo [1, 0] o [0, -1])
function carBricks(tipo, color, [dx, dy]) {
  const girar = (f, l) => [f * dx - l * dy, f * dy + l * dx];
  return bricks(
    (MODELOS[tipo] ?? MODELOS.sedan).map(
      ([f0, f1, l0, l1, z, h, c, tachuelas = true]) => {
        const a = girar(f0, l0),
          b = girar(f1, l1);
        return [
          Math.min(a[0], b[0]),
          Math.min(a[1], b[1]),
          z + SUELO_Z,
          Math.abs(a[0] - b[0]),
          Math.abs(a[1] - b[1]),
          c ?? color,
          h,
          tachuelas,
        ];
      },
    ),
  );
}

/* ================= LEGOS - CAPAS: SUELO Y EDIFICIOS ==================*/
// Sin tocar miSet: lo que está en z <= -7 es suelo (placa, zonas, banquetas, calles)
// y lo que está más arriba son edificios, árboles, estanques...
const suelo = miSet.filter((b) => b[2] <= -7);
const edificios = miSet.filter((b) => b[2] > -7);

/* ====== Y REEMPLAZA tu línea de export por esta ====== */
export { bricks, miSet, suelo, edificios, carBricks, C };
