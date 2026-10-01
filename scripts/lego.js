/* ================= LEGOS - FORMULAS PARA VECTOR EN SVG ==================*/
// 1. Configuración de dimensiones y proyección isométrica
const C = 19,
  H = 23,
  OX = 340,
  OY = 200;
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
//todo =====       [x(\), y(/), z(|), ancho(X), profundidad(Y), color, altura, mostrar_STUDS]
const miSet = [
  /*Placa base */
  [-7, -15, -8, 30, 30, "#1a852f", 1, true],

  /*Zonas de edificios (agrupadas en esta direccion    \\\    )*/
  /*\\\3*/
  [-2, -10, -7, 4, 4, "#2b6c21", 0.3, true],
  [6, -10, -7, 4, 4, "#6b6b6b", 0.3, true],
  [14, -10, -7, 4, 4, "#6b6b6b", 0.3, true],
  /*\\2\*/
  [-2, -2, -7, 4, 4, "#6b6b6b", 0.3, true],
  [6, -2, -7, 4, 4, "#6b6b6b", 0.3, true],
  [14, -2, -7, 4, 4, "#2b6c21", 0.3, true],
  /*\1\\*/
  [-2, 6, -7, 4, 4, "#2b6c21", 0.3, true],
  [6, 6, -7, 4, 4, "#6b6b6b", 0.3, true],
  [14, 6, -7, 4, 4, "#6b6b6b", 0.3, true],

  /*Banquetas (agrupadas en esta dirección   \\\3)    */
  [-3, -11, -7, 1, 6, "#7d7d7d", 0.3, false],
  [-2, -11, -7, 4, 1, "#7d7d7d", 0.3, false],
  [-2, -6, -7, 4, 1, "#7d7d7d", 0.3, false],
  [2, -11, -7, 1, 6, "#7d7d7d", 0.3, false],

  [5, -11, -7, 1, 6, "#7d7d7d", 0.3, false],
  [6, -11, -7, 4, 1, "#7d7d7d", 0.3, false],
  [6, -6, -7, 4, 1, "#7d7d7d", 0.3, false],
  [10, -11, -7, 1, 6, "#7d7d7d", 0.3, false],

  [13, -11, -7, 1, 6, "#7d7d7d", 0.3, false],
  [14, -11, -7, 4, 1, "#7d7d7d", 0.3, false],
  [14, -6, -7, 4, 1, "#7d7d7d", 0.3, false],
  [18, -11, -7, 1, 6, "#7d7d7d", 0.3, false],

  /*Banquetas (agrupadas en esta dirección   \\2\)    */
  [-3, -3, -7, 1, 6, "#7d7d7d", 0.3, false],
  [-2, -3, -7, 4, 1, "#7d7d7d", 0.3, false],
  [-2, 2, -7, 4, 1, "#7d7d7d", 0.3, false],
  [2, -3, -7, 1, 6, "#7d7d7d", 0.3, false],

  [5, -3, -7, 1, 6, "#7d7d7d", 0.3, false],
  [6, -3, -7, 4, 1, "#7d7d7d", 0.3, false],
  [6, 2, -7, 4, 1, "#7d7d7d", 0.3, false],
  [10, -3, -7, 1, 6, "#7d7d7d", 0.3, false],

  [13, -3, -7, 1, 6, "#7d7d7d", 0.3, false],
  [14, -3, -7, 4, 1, "#7d7d7d", 0.3, false],
  [14, 2, -7, 4, 1, "#7d7d7d", 0.3, false],
  [18, -3, -7, 1, 6, "#7d7d7d", 0.3, false],

  /*Banquetas (agrupadas en esta dirección   \1\\)    */
  [-3, 5, -7, 1, 6, "#7d7d7d", 0.3, false],
  [-2, 5, -7, 4, 1, "#7d7d7d", 0.3, false],
  [-2, 10, -7, 4, 1, "#7d7d7d", 0.3, false],
  [2, 5, -7, 1, 6, "#7d7d7d", 0.3, false],

  [5, 5, -7, 1, 6, "#7d7d7d", 0.3, false],
  [6, 5, -7, 4, 1, "#7d7d7d", 0.3, false],
  [6, 10, -7, 4, 1, "#7d7d7d", 0.3, false],
  [10, 5, -7, 1, 6, "#7d7d7d", 0.3, false],

  [13, 5, -7, 1, 6, "#7d7d7d", 0.3, false],
  [14, 5, -7, 4, 1, "#7d7d7d", 0.3, false],
  [14, 10, -7, 4, 1, "#7d7d7d", 0.3, false],
  [18, 5, -7, 1, 6, "#7d7d7d", 0.3, false],

  /*Calles (agrupadas de esta forma       \///\///\///\      )*/
  /*     ///\3        */
  [-5, -13, -7, 8, 2, "#525252", 0.3, false],
  [3, -13, -7, 10, 2, "#525252", 0.3, false],
  [13, -13, -7, 8, 2, "#525252", 0.3, false],
  /**/
  [-5, -11, -7, 2, 6, "#525252", 0.3, false],
  [3, -11, -7, 2, 6, "#525252", 0.3, false],
  [11, -11, -7, 2, 6, "#525252", 0.3, false],
  [19, -11, -7, 2, 6, "#525252", 0.3, false],

  /*    ///\2        */
  [-5, -5, -7, 8, 2, "#525252", 0.3, false],
  [3, -5, -7, 10, 2, "#525252", 0.3, false],
  [13, -5, -7, 8, 2, "#525252", 0.3, false],
  /**/
  [-5, -3, -7, 2, 6, "#525252", 0.3, false],
  [3, -3, -7, 2, 6, "#525252", 0.3, false],
  [11, -3, -7, 2, 6, "#525252", 0.3, false],
  [19, -3, -7, 2, 6, "#525252", 0.3, false],

  /*     \///\1       */
  [-5, 3, -7, 8, 2, "#525252", 0.3, false],
  [3, 3, -7, 10, 2, "#525252", 0.3, false],
  [13, 3, -7, 8, 2, "#525252", 0.3, false],
  /**/
  [-5, 5, -7, 2, 6, "#525252", 0.3, false],
  [3, 5, -7, 2, 6, "#525252", 0.3, false],
  [11, 5, -7, 2, 6, "#525252", 0.3, false],
  [19, 5, -7, 2, 6, "#525252", 0.3, false],
  /**/
  [-5, 11, -7, 8, 2, "#525252", 0.3, false],
  [3, 11, -7, 10, 2, "#525252", 0.3, false],
  [13, 11, -7, 8, 2, "#525252", 0.3, false],

  /*  Edificios (agrupados en esta direccion    \\\    )*/
  /*\\\3*/
  [-2, -10, -6.7, 1, 1, "#5a3a14", 1, true],
  [-2, -10, -5.7, 1, 1, "#2c7c21", 1, true],
  [-2, -8, -6.7, 1, 1, "#5a3a14", 1, true],
  [-2, -8, -5.7, 1, 1, "#2c7c21", 1, true],
  [-0, -10, -6.7, 2, 2, "#d0c766", 1, true],
  [-0, -10, -5.7, 2, 2, "#d0c766", 1, true],
  [-0, -10, -4.7, 2, 2, "#934141", 0.3, false],
  [-0, -8, -6.7, 2, 2, "#d0c766", 1, true],
  [-0, -8, -5.7, 2, 2, "#934141", 0.3, false],

  [6, -10, -6.7, 4, 4, "#404040", 1, true],
  [6, -10, -5.7, 4, 4, "#b9c7d6", 1, true],
  [6, -10, -4.7, 3, 3, "#b9c7d6", 1, true],
  [6, -10, -3.7, 3, 3, "#8fa3bb", 1, true],
  [6, -10, -2.7, 2, 2, "#8fa3bb", 1, true],
  [6, -10, -1.7, 2, 2, "#5d6f87", 1, true],
  [6, -10, -0.7, 1, 1, "#d9382f", 1, true],

  [14, -10, -6.7, 3, 4, "#404040", 1, true],
  [14, -10, -5.7, 3, 2, "#737373", 1, true],
  [14, -10, -4.7, 2, 2, "#aeaeae", 1, true],
  [14, -10, -3.7, 2, 2, "#e8e8e8", 1, true],

  /*  Edificios (agrupados en esta direccion    \\\    )*/
  /*\\2\*/
  [-2, -2, -6.7, 2, 4, "#daffff", 1, true],
  [-0, -2, -6.7, 2, 2, "#daffff", 1, true],
  [-2, -2, -5.7, 4, 2, "#9ec7c7", 1, true],
  [-2, -2, -4.7, 2, 2, "#9ca2a2", 0.3, false],
  [-0, -2, -4.7, 2, 2, "#daffff", 1, true],
  [-0, -2, -3.7, 2, 2, "#daffff", 1, true],
  [-0, -2, -2.7, 1, 2, "#daffff", 1, true],
  [1, -2, -2.7, 1, 2, "#b5bebe", 0.3, false],

  [6, -2, -6.7, 4, 1, "#4d4d4d", 0.3, true],
  [6, -1, -6.7, 1, 2, "#4d4d4d", 0.3, true],
  [7, -1, -6.7, 2, 2, "#4b559e", 0.3, false],
  [9, -1, -6.7, 1, 2, "#4d4d4d", 0.3, true],
  [6, 1, -6.7, 4, 1, "#4d4d4d", 0.3, true],

  [14, -2, -6.7, 3, 3, "#ede8dc", 0.3, true],
  [14, -2, -6.4, 3, 1, "#ede8dc", 1, true],
  [15, -1, -5.4, 1, 1, "#653b1e", 1, false],
  [16, -1, -6.4, 2, 1, "#ede8dc", 1, true],
  [16, -1, -5.4, 2, 1, "#ede8dc", 0.7, true],
  [14, -2, -5.4, 3, 1, "#ede8dc", 1, false],
  [14, -1, -6.4, 1, 2, "#ede8dc", 1, true],
  [14, -1, -5.4, 1, 2, "#ede8dc", 1, false],
  [17, -1, -4.7, 1, 1, "#ede8dc", 0.3, false],
  [15, 0, -6.4, 2, 1, "#ede8dc", 1, true],
  [15, 0, -5.4, 2, 1, "#ede8dc", 1, false],

  /*  Edificios (agrupados en esta direccion    \\\    )*/
  /*\1\\*/
  [-1, 7, -6.7, 2, 2, "#4aa3df", 0.3, false],
  [-1, 9, -6.7, 2, 1, "#7a5230", 0.3, true],
  [-2, 6, -6.7, 1, 1, "#5a3a14", 1, true],
  [-2, 6, -5.7, 1, 1, "#2c7c21", 1, true],
  [-2, 6, -4.7, 1, 1, "#3a9a2c", 1, true],
  [1, 6, -6.7, 1, 1, "#5a3a14", 1, true],
  [1, 6, -5.7, 1, 1, "#2c7c21", 1, true],
  [1, 6, -4.7, 1, 1, "#3a9a2c", 1, true],

  [6, 6, -6.7, 4, 2, "#4b6fa5", 1, true],
  [6, 6, -5.7, 4, 2, "#4b6fa5", 1, true],
  [6, 6, -4.7, 4, 2, "#6d8fc7", 1, true],
  [6, 6, -3.7, 4, 2, "#2f4f7f", 0.3, false],
  [6, 8, -6.7, 2, 2, "#4b6fa5", 1, true],
  [6, 8, -5.7, 2, 2, "#6d8fc7", 1, true],
  [6, 8, -4.7, 2, 2, "#2f4f7f", 0.3, false],
  [8, 8, -6.7, 2, 1, "#d9d9d9", 0.3, true],

  [14, 6, -6.7, 2, 2, "#e1c86c", 1, true],
  [14, 6, -5.7, 2, 2, "#e1c86c", 1, true],
  [14, 6, -4.7, 2, 2, "#364469", 0.3, false],
  [14.5, 6.5, -4.4, 1, 1, "#364469", 1, true],
  [16, 6, -6.7, 2, 1, "#e1c86c", 1, true],
  [17, 6, -5.7, 1, 1, "#e1c86c", 1, true],
  [17, 6, -4.7, 1, 1, "#364469", 0.3, true],
  [15, 8, -6.7, 1, 2, "#e1c86c", 1, true],
  [15, 9, -5.7, 1, 1, "#e1c86c", 1, true],
  [15, 9, -4.7, 1, 1, "#364469", 0.3, true],
  [17, 7, -6.7, 1, 2, "#e1c86c", 0.3, false],
  [17, 9, -6.7, 1, 1, "#e1c86c", 1, true],
  [17, 9, -5.7, 1, 1, "#364469", 0.3, true],
];

//todo=========================== Exporta una funcion global, bricks genera un bloque por cada array, miSet es un array de arrays
export { bricks, miSet };
