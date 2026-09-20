function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const typeLabels = {
  trace: '<span class="q-type q-type-trace">📊 Calculation & Trace</span>',
  compare: '<span class="q-type q-type-compare">⚖️ Comparative Analysis</span>',
  scenario: '<span class="q-type q-type-scenario">🎯 Scenario & Application</span>',
  concept: '<span class="q-type q-type-concept">💭 Concept & Fundamentals</span>',
  explain: '<span class="q-type q-type-explain">🔍 Engineering Synthesis</span>'
};

const lessonLabels = {
  L3: 'L3 Basic Matrix Theory'
};

// =======================================================
// 12 PURE-SVG MATRIX SCHEMATICS
// =======================================================
// SVG helpers for matrix brackets — width-aware so they enclose the matrix properly
function bracketL() {
  // Left bracket: vertical at x=-12, horizontals from x=-12 to x=-4 at top/bottom
  return '<path d="M -4,-30 L -12,-30 L -12,30 L -4,30" stroke="#1abc9c" stroke-width="3.2" fill="none"/>';
}

function bracketR(widthCols = 1) {
  // Right bracket: vertical at x=(widthCols*32)+12, horizontals ending at (widthCols*32)+12
  const x = widthCols * 32 + 12;
  const x0 = widthCols * 32 + 4;
  return `<path d="M ${x0},-30 L ${x},-30 L ${x},30 L ${x0},30" stroke="#1abc9c" stroke-width="3.2" fill="none"/>`;
}

// Pre-computed bracket constants for inline use (3 columns is most common)
const ML = bracketL();
const MR = bracketR(3);
const MR2 = bracketR(2);
const MR1 = bracketR(1);

// 2x2 matrix display
function mat2x2(a, b, c, d, x = 0, y = 0, scale = 1) {
  const fs = 14 * scale;
  return `
    <g transform="translate(${x},${y})" class="matrix-unit">
      ${bracketL()}
      <text x="0" y="-6" text-anchor="middle" font-size="${fs}" fill="#ffffff">${a}</text>
      <text x="32" y="-6" text-anchor="middle" font-size="${fs}" fill="#ffffff">${b}</text>
      <text x="0" y="20" text-anchor="middle" font-size="${fs}" fill="#ffffff">${c}</text>
      <text x="32" y="20" text-anchor="middle" font-size="${fs}" fill="#ffffff">${d}</text>
      ${bracketR(2)}
    </g>`;
}

// 3x3 matrix display
function mat3x3(elems, x = 0, y = 0, scale = 1) {
  const fs = 14 * scale;
  let html = `<g transform="translate(${x},${y})" class="matrix-unit">${bracketL()}`;
  const positions = [
    [0, -22], [32, -22], [64, -22],
    [0, 0],   [32, 0],   [64, 0],
    [0, 22],  [32, 22],  [64, 22]
  ];
  elems.forEach((e, i) => {
    const [px, py] = positions[i];
    const highlight = e.startsWith('*') ? 'class="el-highlight"' : '';
    const txt = e.replace(/^\*/, '');
    html += `<text x="${px}" y="${py}" text-anchor="middle" font-size="${fs}" fill="#ffffff" ${highlight}>${txt}</text>`;
  });
  return html + bracketR(3) + '</g>';
}

// 3x3 with row/column color highlights
function mat3x3High(elems, x, y, scale, hRow, hCol) {
  const fs = 14 * scale;
  let html = `<g transform="translate(${x},${y})" class="matrix-unit">${bracketL()}`;
  const positions = [
    [0, -22], [32, -22], [64, -22],
    [0, 0],   [32, 0],   [64, 0],
    [0, 22],  [32, 22],  [64, 22]
  ];
  elems.forEach((e, i) => {
    const [px, py] = positions[i];
    const row = Math.floor(i / 3);
    const col = i % 3;
    let fill = '#ffffff';
    let opacity = 1;
    if (hRow !== -1 && hCol !== -1) {
      if (row === hRow) fill = '#5dade2';
      else if (col === hCol) fill = '#f39c12';
      else opacity = 0.4;
    }
    html += `<text x="${px}" y="${py}" text-anchor="middle" font-size="${fs}" fill="${fill}" opacity="${opacity}">${e}</text>`;
  });
  return html + bracketR(3) + '</g>';
}

// Column vector
function colVec(elems, x = 0, y = 0, scale = 1) {
  const fs = 14 * scale;
  let html = `<g transform="translate(${x},${y})" class="matrix-unit">${bracketL()}`;
  elems.forEach((e, i) => {
    html += `<text x="0" y="${-22 + i * 22}" text-anchor="middle" font-size="${fs}" fill="#ffffff">${e}</text>`;
  });
  return html + bracketR(1) + '</g>';
}

// Row vector
function rowVec(elems, x = 0, y = 0, scale = 1) {
  const fs = 14 * scale;
  let html = `<g transform="translate(${x},${y})" class="matrix-unit">${bracketL()}`;
  elems.forEach((e, i) => {
    html += `<text x="${i * 32}" y="0" text-anchor="middle" font-size="${fs}" fill="#ffffff">${e}</text>`;
  });
  return html + bracketR(elems.length) + '</g>';
}

const notesData = [
  {
    id: 't1', icon: '1', title: 'What is a Matrix?',
    titleZh: '矩陣的定義與記法',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#1abc9c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1abc9c">Matrix = Array of numbers in rows and columns</text>

        <!-- 4x3 example matrix with column/row labels -->
        <g transform="translate(330, 110)">
          ${ML}
          <!-- Row labels -->
          <text x="-30" y="-18" text-anchor="middle" font-size="11" fill="#5dade2">R1</text>
          <text x="-30" y="4" text-anchor="middle" font-size="11" fill="#5dade2">R2</text>
          <text x="-30" y="26" text-anchor="middle" font-size="11" fill="#5dade2">R3</text>
          <text x="-30" y="48" text-anchor="middle" font-size="11" fill="#5dade2">R4</text>
          <text x="-30" y="-40" text-anchor="middle" font-size="10" fill="#5dade2" font-weight="bold">rows ↓</text>

          <!-- Elements -->
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₂</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₃</text>

          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₂</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₃</text>

          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₁</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₂</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₃</text>

          <text x="0" y="44" text-anchor="middle" font-size="14" fill="#ffffff">a₄₁</text>
          <text x="32" y="44" text-anchor="middle" font-size="14" fill="#ffffff">a₄₂</text>
          <text x="64" y="44" text-anchor="middle" font-size="14" fill="#ffffff">a₄₃</text>

          ${MR}
        </g>

        <!-- Caption -->
        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">
          Matrix A is 4 × 3 (4 rows × 3 columns) — element aᵢⱼ is in row i, column j
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 1: A matrix is an array of numbers arranged in rows and columns. Element aᵢⱼ means row i, column j.',
    sections: [
      {
        title: 'Definition / 定義',
        zh: '<p>矩陣 (matrix) 是按<strong>列 (rows) 與行 (columns)</strong> 排列的數字陣列。元素記為 <strong>aᵢⱼ</strong>，表示第 <strong>i</strong> 列、第 <strong>j</strong> 行。</p>',
        en: '<p>A <strong>matrix</strong> is an array of numbers arranged in <strong>rows</strong> and <strong>columns</strong>. An element is denoted <strong>aᵢⱼ</strong>, meaning row <strong>i</strong>, column <strong>j</strong>.</p>'
      },
      {
        title: 'Size Notation / 矩陣大小',
        zh: '<div class="formula-block">大小 = (列數) × (行數) = m × n\n   m = 列數 (rows),  n = 行數 (columns)\n\n例: 上方矩陣為 4 × 3 矩陣。\n英文: "4 by 3 matrix"</div>',
        en: '<div class="formula-block">Size = (rows) × (columns) = m × n\n   m = number of rows,  n = number of columns\n\nExample: the matrix above is a 4 × 3 matrix.\nSpoken: "4 by 3 matrix"</div>'
      }
    ]
  },
  {
    id: 't2', icon: '2', title: 'Vectors as Matrices',
    titleZh: '以矩陣表示向量',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#1abc9c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1abc9c">Vector v in 3D as a single-row or single-column matrix</text>

        <!-- 3D coordinate system -->
        <g transform="translate(540, 145)">
          <line x1="-100" y1="50" x2="100" y2="50" stroke="#bdc3c7" stroke-width="1.2"/>
          <text x="105" y="54" font-size="11" fill="#bdc3c7">x</text>
          <line x1="-100" y1="50" x2="-150" y2="-100" stroke="#bdc3c7" stroke-width="1.2"/>
          <text x="-160" y="-110" font-size="11" fill="#bdc3c7">y</text>
          <line x1="-100" y1="50" x2="0" y2="-100" stroke="#bdc3c7" stroke-width="1.2"/>
          <text x="5" y="-100" font-size="11" fill="#bdc3c7">z</text>
          <!-- vector v from origin -->
          <line x1="-100" y1="50" x2="50" y2="-80" stroke="#f39c12" stroke-width="3"/>
          <polygon points="50,-80 38,-72 40,-83" fill="#f39c12"/>
          <text x="60" y="-75" font-size="13" fill="#f39c12" font-weight="bold">v</text>
          <!-- component a11 -->
          <line x1="-100" y1="50" x2="50" y2="50" stroke="#5dade2" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="-30" y="42" text-anchor="middle" font-size="11" fill="#5dade2">a₁₁</text>
          <line x1="50" y1="50" x2="50" y2="-80" stroke="#5dade2" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="60" y="-15" font-size="11" fill="#5dade2">a₁₃</text>
          <line x1="-100" y1="50" x2="-150" y2="-100" stroke="#5dade2" stroke-width="2" stroke-dasharray="3 2"/>
          <text x="-130" y="-25" font-size="11" fill="#5dade2">a₁₂</text>
        </g>

        <!-- Left side: equation -->
        <g transform="translate(40, 70)">
          <text x="0" y="0" font-size="13" fill="#ffffff">Vector form:</text>
          <text x="0" y="22" font-size="14" fill="#f39c12" font-style="italic">v</text>
          <text x="14" y="22" font-size="14" fill="#ffffff"> = a₁₁</text>
          <text x="70" y="22" font-size="13" fill="#5dade2">x</text>
          <text x="85" y="22" font-size="14" fill="#ffffff"> + a₁₂</text>
          <text x="143" y="22" font-size="13" fill="#5dade2">y</text>
          <text x="158" y="22" font-size="14" fill="#ffffff"> + a₁₃</text>
          <text x="218" y="22" font-size="13" fill="#5dade2">z</text>
        </g>

        <!-- Matrix form -->
        <g transform="translate(40, 130)">
          <text x="0" y="0" font-size="13" fill="#ffffff">Matrix form (column vector):</text>
          <g transform="translate(0, 25)">
            ${ML}
            <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">x</text>
            <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">y</text>
            <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">z</text>
            ${MR}
          </g>
          <text x="40" y="-7" font-size="16" fill="#1abc9c" font-weight="bold">[a₁₁ a₁₂ a₁₃]</text>
          <text x="40" y="38" font-size="14" fill="#ffffff"> = a₁₁</text>
          <text x="96" y="38" font-size="13" fill="#5dade2">x</text>
          <text x="110" y="38" font-size="14" fill="#ffffff"> + a₁₂</text>
          <text x="167" y="38" font-size="13" fill="#5dade2">y</text>
          <text x="182" y="38" font-size="14" fill="#ffffff"> + a₁₃</text>
          <text x="241" y="38" font-size="13" fill="#5dade2">z</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">
          Convention: column vectors are the standard form for engineering matrices
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 2: A 3D vector v with components (a₁₁, a₁₂, a₁₃) can be written as either a row or a column matrix; columns are the standard.',
    sections: [
      {
        title: 'Row vs Column Vector / 行向量 vs 列向量',
        zh: '<p>三維向量 v 可以用兩種矩陣形式表示：</p><ul><li><strong>列向量 (column vector)</strong>：常見的工程標準寫法（直立）。</li><li><strong>行向量 (row vector)</strong>：水平寫法（較少見但仍合法）。</li></ul><div class="tip-box"><strong>工程慣例：</strong>向量以<strong>粗體小寫</strong>字母表示（除 X、Y、Z），印刷用 Sans Serif 字體。</div>',
        en: '<p>A 3D vector v can be written as either a row or a column matrix:</p><ul><li><strong>Column vector</strong>: standard form in engineering (vertical).</li><li><strong>Row vector</strong>: horizontal form (valid but uncommon).</li></ul><div class="tip-box"><strong>Engineering convention:</strong> vectors are written in <strong>bold lowercase</strong> (except X, Y, Z) in Sans Serif typeface.</div>'
      },
      {
        title: 'Matrix Equation Form / 矩陣方程式寫法',
        zh: '<div class="formula-block">v = a₁₁ x + a₁₂ y + a₁₃ z\n\n[ a₁₁  a₁₂  a₁₃ ] &nbsp; [ x ] &nbsp; = &nbsp; a₁₁ x + a₁₂ y + a₁₃ z\n                  &nbsp; [ y ]\n                  &nbsp; [ z ]</div>',
        en: '<div class="formula-block">v = a₁₁ x + a₁₂ y + a₁₃ z\n\n[ a₁₁  a₁₂  a₁₃ ] &nbsp; [ x ] &nbsp; = &nbsp; a₁₁ x + a₁₂ y + a₁₃ z\n                  &nbsp; [ y ]\n                  &nbsp; [ z ]</div>'
      }
    ]
  },
  {
    id: 't3', icon: '3', title: 'Square Matrix & Trace',
    titleZh: '方陣與軌跡',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#1abc9c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1abc9c">Square matrix &amp; its leading diagonal (trace)</text>

        <!-- 3x3 matrix with leading diagonal highlighted -->
        <g transform="translate(280, 130)">
          ${ML}
          <!-- Leading diagonal -->
          <line x1="-8" y1="-30" x2="72" y2="30" stroke="#f39c12" stroke-width="2" stroke-dasharray="4 3" class="el-highlight"/>
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">a₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₂</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₃</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">a₂₂</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₃</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₁</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₂</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">a₃₃</text>
          ${MR}
        </g>

        <!-- Side labels -->
        <text x="80" y="100" font-size="12" fill="#5dade2" font-weight="bold">Trace A =</text>
        <text x="80" y="120" font-size="14" fill="#f39c12">a₁₁ + a₂₂ + a₃₃</text>
        <text x="80" y="140" font-size="11" fill="#bdc3c7" font-style="italic">Sum of leading-diagonal elements</text>

        <text x="540" y="100" font-size="12" fill="#5dade2" font-weight="bold">Square matrix:</text>
        <text x="540" y="120" font-size="11" fill="#ffffff">rows = columns = n</text>
        <text x="540" y="140" font-size="11" fill="#ffffff">size = n × n</text>
        <text x="540" y="160" font-size="11" fill="#bdc3c7" font-style="italic">e.g. 3 × 3 square matrix</text>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">
          Trace = a₁₁ + a₂₂ + a₃₃ + ...   (sum of leading diagonal only)
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 3: A square matrix has equal rows and columns. The leading diagonal (highlighted) sums to the trace.',
    sections: [
      {
        title: 'Square Matrix / 方陣',
        zh: '<p><strong>方陣 (Square matrix)</strong> 是<strong>列數 = 行數</strong> 的矩陣，記為 <strong>n × n</strong>。圖中為 3 × 3 方陣。</p>',
        en: '<p>A <strong>square matrix</strong> has the <strong>same number of rows and columns</strong>, written n × n. The example above is a 3 × 3 square matrix.</p>'
      },
      {
        title: 'Trace / 軌跡',
        zh: '<div class="formula-block">軌跡 Trace(A) = a₁₁ + a₂₂ + a₃₃ + ... + aₙₙ\n  (沿主對角線元素之和)</div><div class="tip-box"><strong>應用：</strong>軌跡在特徵值理論、控制系統穩定性分析中扮演重要角色。</div>',
        en: '<div class="formula-block">Trace(A) = a₁₁ + a₂₂ + a₃₃ + ... + aₙₙ\n  (sum of leading-diagonal elements only)</div><div class="tip-box"><strong>Why it matters:</strong> the trace appears in eigenvalue theory and stability analysis of control systems.</div>'
      }
    ]
  },
  {
    id: 't4', icon: '4', title: 'Special Matrices: Diagonal, Unit, Zero',
    titleZh: '特殊矩陣：對角、單位、零矩陣',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#1abc9c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1abc9c">Diagonal · Unit (I) · Zero (Null) Matrices</text>

        <!-- Diagonal -->
        <g transform="translate(70, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#f39c12">1</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#f39c12">4</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#f39c12">−5</text>
          ${MR}
        </g>
        <text x="100" y="195" text-anchor="middle" font-size="12" fill="#f39c12" font-weight="bold">Diagonal</text>
        <text x="100" y="212" text-anchor="middle" font-size="10" fill="#bdc3c7">all off-diagonals = 0</text>

        <!-- Unit -->
        <g transform="translate(320, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">1</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">1</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">1</text>
          ${MR}
        </g>
        <text x="350" y="195" text-anchor="middle" font-size="12" fill="#1abc9c" font-weight="bold">Unit Matrix I</text>
        <text x="350" y="212" text-anchor="middle" font-size="10" fill="#bdc3c7">all leading-diag = 1</text>

        <!-- Zero -->
        <g transform="translate(560, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          ${MR}
        </g>
        <text x="590" y="195" text-anchor="middle" font-size="12" fill="#ff7675" font-weight="bold">Zero / Null</text>
        <text x="590" y="212" text-anchor="middle" font-size="10" fill="#bdc3c7">every element = 0</text>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">
          AI = IA = A (unchanged)  ·  A × 0 = 0
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 4: Three special square matrices — diagonal, unit (identity), and zero (null).',
    sections: [
      {
        title: 'Three Special Matrices / 三種特殊矩陣',
        zh: '<div class="formula-block">對角矩陣 Diagonal:   對角線外元素皆為 0\n單位矩陣 Unit I:       對角線元素皆為 1\n零矩陣   Zero:         所有元素皆為 0</div>',
        en: '<div class="formula-block">Diagonal matrix:    every off-diagonal element = 0\nUnit (identity) I:   every leading-diagonal element = 1, off-diagonals = 0\nZero (null) matrix:  every element = 0</div>'
      },
      {
        title: 'Critical Property / 關鍵性質',
        zh: '<div class="key-point"><strong>AI = IA = A：</strong>任何矩陣乘以單位矩陣都<strong>不變</strong>，就像實數乘以 1 一樣。<br><br><strong>A × 0 = 0：</strong>任何矩陣乘以零矩陣都得到零矩陣。</div>',
        en: '<div class="key-point"><strong>AI = IA = A:</strong> multiplying any matrix by the unit (identity) matrix leaves it <strong>unchanged</strong> — just like real-number multiplication by 1.<br><br><strong>A × 0 = 0:</strong> multiplying any matrix by the zero matrix gives the zero matrix.</div>'
      }
    ]
  },
  {
    id: 't5', icon: '5', title: 'Transpose Matrix Aᵀ',
    titleZh: '轉置矩陣',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#9b59b6" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#bb86fc">Transpose: swap rows and columns</text>

        <!-- A -->
        <g transform="translate(130, 145)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">2</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">7</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">8</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">A</text>
          <text x="32" y="72" text-anchor="middle" font-size="10" fill="#bdc3c7">2 × 3</text>
        </g>

        <!-- arrow -->
        <g transform="translate(260, 145)">
          <text x="0" y="-5" text-anchor="middle" font-size="22" fill="#1abc9c">⟶</text>
          <text x="0" y="18" text-anchor="middle" font-size="11" fill="#1abc9c">transpose</text>
        </g>

        <!-- Aᵀ -->
        <g transform="translate(380, 110)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">2</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">8</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">7</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          ${MR}
          <text x="16" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">Aᵀ</text>
          <text x="16" y="72" text-anchor="middle" font-size="10" fill="#bdc3c7">3 × 2</text>
        </g>

        <!-- Right side note -->
        <g transform="translate(520, 70)">
          <rect x="0" y="0" width="170" height="160" fill="#1a252f" stroke="#1abc9c" rx="6"/>
          <text x="85" y="22" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">Rules</text>
          <text x="12" y="48" font-size="10.5" fill="#ffffff">Row i of A</text>
          <text x="12" y="62" font-size="10.5" fill="#ffffff">becomes</text>
          <text x="12" y="76" font-size="10.5" fill="#ffffff">column i of Aᵀ</text>
          <line x1="12" y1="86" x2="158" y2="86" stroke="#34495e"/>
          <text x="12" y="106" font-size="10.5" fill="#ffffff">(Aᵀ)ᵀ = A</text>
          <text x="12" y="126" font-size="10.5" fill="#ffffff">Iᵀ = I</text>
          <text x="12" y="146" font-size="10.5" fill="#ffffff">size flips</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#bb86fc" font-weight="bold">
          (AB)ᵀ = Bᵀ Aᵀ  (transpose reverses the order of products)
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 5: The transpose Aᵀ swaps the rows and columns of A. The shape flips from 2×3 to 3×2.',
    sections: [
      {
        title: 'Definition / 定義',
        zh: '<p>矩陣 A 的<strong>轉置矩陣 Aᵀ</strong> 是把 A 的<strong>列變行、行變列</strong> 得到的矩陣。A 是 m × n 時，Aᵀ 是 n × m。</p><div class="formula-block">例:\nA = &nbsp;[ 2 5 7 ]\n    &nbsp;[ 4 8 3 ]\n\nAᵀ = &nbsp;[ 2 4 ]\n    &nbsp;[ 5 8 ]\n    &nbsp;[ 7 3 ]</div>',
        en: '<p>The <strong>transpose Aᵀ</strong> swaps the rows and columns of A. If A is m × n, then Aᵀ is n × m.</p><div class="formula-block">Example:\nA = &nbsp;[ 2 5 7 ]\n    &nbsp;[ 4 8 3 ]\n\nAᵀ = &nbsp;[ 2 4 ]\n    &nbsp;[ 5 8 ]\n    &nbsp;[ 7 3 ]</div>'
      },
      {
        title: 'Key Properties / 關鍵性質',
        zh: '<div class="key-point"><strong>注意：</strong>(AB)ᵀ = Bᵀ Aᵀ — 轉置會<strong>反轉乘積的順序</strong>。<br><strong>(Aᵀ)ᵀ = A</strong> · <strong>Iᵀ = I</strong> · <strong>單位矩陣的轉置仍是單位矩陣</strong>。</div>',
        en: '<div class="key-point"><strong>Important:</strong> (AB)ᵀ = Bᵀ Aᵀ — the transpose <strong>reverses the order</strong> of multiplication.<br>(Aᵀ)ᵀ = A · Iᵀ = I · <strong>The transpose of a unit matrix is still a unit matrix.</strong></div>'
      }
    ]
  },
  {
    id: 't6', icon: '6', title: 'Addition & Subtraction',
    titleZh: '矩陣加減法',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#f39c12" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#f39c12">Element-wise A ± B (same size required)</text>

        <!-- A -->
        <g transform="translate(70, 145)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">2</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">7</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">8</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">9</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">1</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">A</text>
        </g>

        <text x="190" y="140" font-size="22" fill="#1abc9c">+</text>

        <!-- B -->
        <g transform="translate(220, 145)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">1</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">6</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">1</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">7</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">9</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">B</text>
        </g>

        <text x="340" y="140" font-size="22" fill="#1abc9c">=</text>

        <!-- A+B -->
        <g transform="translate(370, 145)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">3</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">10</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">10</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">7</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">14</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">4</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">16</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">6</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">13</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">A + B</text>
        </g>

        <!-- Right rule box -->
        <g transform="translate(520, 60)">
          <rect x="0" y="0" width="180" height="160" fill="#1a252f" stroke="#f39c12" rx="6"/>
          <text x="90" y="22" text-anchor="middle" font-size="11" fill="#f39c12" font-weight="bold">Rule</text>
          <text x="12" y="48" font-size="10.5" fill="#ffffff">(A ± B)ᵢⱼ</text>
          <text x="12" y="62" font-size="10.5" fill="#ffffff">= Aᵢⱼ ± Bᵢⱼ</text>
          <line x1="12" y1="72" x2="168" y2="72" stroke="#34495e"/>
          <text x="12" y="92" font-size="10.5" fill="#ffffff">Both matrices must</text>
          <text x="12" y="106" font-size="10.5" fill="#ffffff">be the SAME SIZE</text>
          <text x="12" y="120" font-size="10.5" fill="#ffffff">(otherwise undefined).</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#f39c12" font-weight="bold">
          Worked Example 1: A + B and A − B (verified above)
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 6: Matrix addition and subtraction are done element-by-element. Both matrices must have the same size.',
    sections: [
      {
        title: 'Element-wise Rule / 逐元素規則',
        zh: '<div class="formula-block">(A ± B)ᵢⱼ = Aᵢⱼ ± Bᵢⱼ\n\n兩個矩陣必須大小相同 (both m × n)。\n否則加減法未定義。</div>',
        en: '<div class="formula-block">(A ± B)ᵢⱼ = Aᵢⱼ ± Bᵢⱼ\n\nBoth matrices must be the same size (both m × n).\nOtherwise addition/subtraction is undefined.</div>'
      },
      {
        title: 'Worked Example 1 / 例題一',
        zh: '<div class="formula-block">A = [ 2 5 7 ]    B = [ 1 5 3 ]\n    [ 4 8 3 ]        [ 3 6 1 ]\n    [ 9 1 4 ]        [ 7 5 9 ]\n\nA + B = [ 3 10 10 ]\n       [ 7 14 4  ]\n       [ 16 6 13 ]\n\nA − B = [ 1  0  4 ]\n       [ 1  2  2 ]\n       [ 2 −4 −5 ]</div>',
        en: '<div class="formula-block">A = [ 2 5 7 ]    B = [ 1 5 3 ]\n    [ 4 8 3 ]        [ 3 6 1 ]\n    [ 9 1 4 ]        [ 7 5 9 ]\n\nA + B = [ 3 10 10 ]\n       [ 7 14 4  ]\n       [ 16 6 13 ]\n\nA − B = [ 1  0  4 ]\n       [ 1  2  2 ]\n       [ 2 −4 −5 ]</div>'
      }
    ]
  },
  {
    id: 't7', icon: '7', title: 'Scalar Multiplication',
    titleZh: '純量乘法',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#1abc9c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1abc9c">α A — multiply every element by the scalar α</text>

        <!-- α symbol -->
        <text x="170" y="160" font-size="28" fill="#f39c12" font-weight="bold">α</text>

        <!-- A -->
        <g transform="translate(220, 145)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₂</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₃</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₂</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₃</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₁</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₂</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₃</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">A</text>
        </g>

        <text x="340" y="160" font-size="22" fill="#1abc9c">=</text>

        <!-- αA -->
        <g transform="translate(380, 145)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c">α a₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c">α a₁₂</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c">α a₁₃</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#1abc9c">α a₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#1abc9c">α a₂₂</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#1abc9c">α a₂₃</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#1abc9c">α a₃₁</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#1abc9c">α a₃₂</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#1abc9c">α a₃₃</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">α A</text>
        </g>

        <!-- Right rule box -->
        <g transform="translate(540, 80)">
          <rect x="0" y="0" width="160" height="125" fill="#1a252f" stroke="#1abc9c" rx="6"/>
          <text x="80" y="22" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">Properties</text>
          <text x="12" y="48" font-size="10.5" fill="#ffffff">α (A + B) = α A + α B</text>
          <text x="12" y="64" font-size="10.5" fill="#ffffff">(α + β) A = α A + β A</text>
          <text x="12" y="80" font-size="10.5" fill="#ffffff">(α β) A = α (β A)</text>
          <text x="12" y="100" font-size="10.5" fill="#ffffff">−A = (−1) · A</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">
          Same size matrix preserved · α = 1 gives A · α = 0 gives the zero matrix
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 7: Multiplying a matrix by a scalar α scales every element by α. The matrix shape is unchanged.',
    sections: [
      {
        title: 'Definition / 定義',
        zh: '<div class="formula-block">(α A)ᵢⱼ = α · Aᵢⱼ\n\n矩陣大小不變，只是每個元素都被放大 α 倍。</div>',
        en: '<div class="formula-block">(α A)ᵢⱼ = α · Aᵢⱼ\n\nMatrix shape is unchanged; every element is scaled by α.</div>'
      },
      {
        title: 'Scalar Algebra Laws / 純量代數律',
        zh: '<div class="key-point"><strong>分配律：</strong>α (A + B) = α A + α B<br><strong>結合律：</strong>(α + β) A = α A + β A<br><strong>結合律：</strong>(α β) A = α (β A)</div>',
        en: '<div class="key-point"><strong>Distributive:</strong> α (A + B) = α A + α B<br><strong>Distributive:</strong> (α + β) A = α A + β A<br><strong>Associative:</strong> (α β) A = α (β A)</div>'
      }
    ]
  },
  {
    id: 't8', icon: '8', title: 'Matrix × Column Vector',
    titleZh: '矩陣乘向量',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#5dade2" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#5dade2">A · x = b (a matrix times a column vector)</text>

        <!-- A matrix -->
        <g transform="translate(110, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₂</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">a₁₃</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₂</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₃</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₁</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₂</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">a₃₃</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">A</text>
        </g>

        <text x="230" y="148" font-size="22" fill="#1abc9c">·</text>

        <!-- x column vector -->
        <g transform="translate(265, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">x</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">y</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">z</text>
          ${MR}
          <text x="0" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">x</text>
        </g>

        <text x="340" y="148" font-size="22" fill="#1abc9c">=</text>

        <!-- b column vector -->
        <g transform="translate(380, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c">b₁</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#1abc9c">b₂</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#1abc9c">b₃</text>
          ${MR}
          <text x="0" y="55" text-anchor="middle" font-size="14" fill="#9b59b6" font-weight="bold">b</text>
        </g>

        <!-- Right: the three equations -->
        <g transform="translate(490, 70)">
          <rect x="0" y="0" width="220" height="155" fill="#1a252f" stroke="#5dade2" rx="6"/>
          <text x="110" y="22" text-anchor="middle" font-size="11" fill="#5dade2" font-weight="bold">Expands into 3 equations</text>
          <text x="12" y="50" font-size="11" fill="#ffffff">a₁₁ x + a₁₂ y + a₁₃ z = b₁</text>
          <text x="12" y="74" font-size="11" fill="#ffffff">a₂₁ x + a₂₂ y + a₂₃ z = b₂</text>
          <text x="12" y="98" font-size="11" fill="#ffffff">a₃₁ x + a₃₂ y + a₃₃ z = b₃</text>
          <line x1="12" y1="112" x2="208" y2="112" stroke="#34495e"/>
          <text x="12" y="130" font-size="10" fill="#1abc9c" font-style="italic">A system of 3 linear equations</text>
          <text x="12" y="145" font-size="10" fill="#1abc9c" font-style="italic">in 3 unknowns (x, y, z).</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#5dade2" font-weight="bold">
          Rule: column 1 of A · row 1 of x, column 2 of A · row 2 of x, ...
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 8: A × x = b is the matrix form of three simultaneous linear equations in three unknowns.',
    sections: [
      {
        title: 'Matrix × Column Vector / 矩陣乘向量',
        zh: '<p>一個 m × n 矩陣 A 乘以 n × 1 的列向量 x 得到 m × 1 的列向量 b，恰好是<strong>m 條線性方程式</strong>的形式。</p>',
        en: '<p>An m × n matrix A multiplied by an n × 1 column vector x produces an m × 1 column vector b — precisely the form of <strong>m simultaneous linear equations</strong>.</p>'
      },
      {
        title: 'Worked Example 2 / 例題二（行 × 列）',
        zh: '<div class="formula-block">[ 2 3 4 ] × [ 4 ] = (2·4) + (3·1) + (4·5)\n            [ 1 ]   = 8 + 3 + 20\n            [ 5 ]   = 31</div>',
        en: '<div class="formula-block">[ 2 3 4 ] × [ 4 ] = (2·4) + (3·1) + (4·5)\n            [ 1 ]   = 8 + 3 + 20\n            [ 5 ]   = 31</div>'
      }
    ]
  },
  {
    id: 't9', icon: '9', title: 'Matrix × Matrix: Row × Column Rule',
    titleZh: '矩陣乘法：行 × 列規則',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#f39c12" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#f39c12">cᵢⱼ = (row i of A) · (column j of B)</text>

        <!-- A matrix (highlighted row 1) -->
        <g transform="translate(70, 80)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#5dade2" font-weight="bold">a₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#5dade2" font-weight="bold">a₁₂</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">a₂₂</text>
          ${MR}
          <rect x="-8" y="-32" width="50" height="20" fill="none" stroke="#5dade2" stroke-width="2" rx="3"/>
          <text x="14" y="38" text-anchor="middle" font-size="12" fill="#5dade2" font-weight="bold">A</text>
          <text x="14" y="55" text-anchor="middle" font-size="10" fill="#bdc3c7">2 × 2</text>
        </g>

        <text x="170" y="80" font-size="22" fill="#1abc9c">·</text>

        <!-- B matrix (highlighted col 1) -->
        <g transform="translate(200, 65)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">b₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">b₁₂</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">b₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">b₂₂</text>
          ${MR}
          <rect x="-8" y="-32" width="20" height="42" fill="none" stroke="#f39c12" stroke-width="2" rx="3"/>
          <text x="14" y="38" text-anchor="middle" font-size="12" fill="#f39c12" font-weight="bold">B</text>
          <text x="14" y="55" text-anchor="middle" font-size="10" fill="#bdc3c7">2 × 2</text>
        </g>

        <text x="290" y="80" font-size="22" fill="#1abc9c">=</text>

        <!-- C matrix (highlight c11) -->
        <g transform="translate(330, 80)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">c₁₁</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">c₁₂</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">c₂₁</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">c₂₂</text>
          ${MR}
          <text x="14" y="38" text-anchor="middle" font-size="12" fill="#1abc9c" font-weight="bold">C</text>
          <text x="14" y="55" text-anchor="middle" font-size="10" fill="#bdc3c7">2 × 2</text>
        </g>

        <!-- Formula bottom -->
        <g transform="translate(60, 180)">
          <rect x="0" y="0" width="640" height="50" fill="#111111" stroke="#1abc9c" rx="4"/>
          <text x="320" y="22" text-anchor="middle" font-size="13" fill="#1abc9c" font-weight="bold">c₁₁ = a₁₁ b₁₁ + a₁₂ b₂₁</text>
          <text x="320" y="42" text-anchor="middle" font-size="11" fill="#ffffff">(row 1 of A) · (column 1 of B) — dot product of the highlighted pair</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#f39c12" font-weight="bold">
          A is 2×3, B is 3×4 ⇒ AB is 2×4. Rule: cols of A must equal rows of B.
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 9: For each element cᵢⱼ of the product, take row i of A and column j of B and form their dot product.',
    sections: [
      {
        title: 'Row × Column Rule / 行 × 列規則',
        zh: '<div class="formula-block">cᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ\n       (A 的第 i 列) · (B 的第 j 行)\n\n每個元素 cᵢⱼ = A 第 i 列與 B 第 j 行的點積。</div>',
        en: '<div class="formula-block">cᵢⱼ = Σₖ Aᵢₖ · Bₖⱼ\n       (row i of A) · (column j of B)\n\nEach element cᵢⱼ is the dot product of row i of A with column j of B.</div>'
      },
      {
        title: 'Worked Example 6 / 例題六',
        zh: '<div class="formula-block">A = [ 2 5 7 ]     B = [ 1 5 3 ]\n    [ 4 8 3 ]         [ 3 6 1 ]\n    [ 9 1 4 ]         [ 7 5 9 ]\n\nc₁₁ = 2·1 + 5·3 + 7·7  = 2 + 15 + 49  = 66\nc₁₂ = 2·5 + 5·6 + 7·5  = 10 + 30 + 35 = 75\nc₁₃ = 2·3 + 5·1 + 7·9  = 6 + 5 + 63   = 74\nc₂₁ = 4·1 + 8·3 + 3·7  = 4 + 24 + 21  = 49\nc₂₂ = 4·5 + 8·6 + 3·5  = 20 + 48 + 15 = 83\nc₂₃ = 4·3 + 8·1 + 3·9  = 12 + 8 + 27  = 47\nc₃₁ = 9·1 + 1·3 + 4·7  = 9 + 3 + 28   = 40\nc₃₂ = 9·5 + 1·6 + 4·5  = 45 + 6 + 20  = 71\nc₃₃ = 9·3 + 1·1 + 4·9  = 27 + 1 + 36  = 64\n\nAB = [ 66 75 74 ]\n     [ 49 83 47 ]\n     [ 40 71 64 ]</div>',
        en: '<div class="formula-block">A = [ 2 5 7 ]     B = [ 1 5 3 ]\n    [ 4 8 3 ]         [ 3 6 1 ]\n    [ 9 1 4 ]         [ 7 5 9 ]\n\nc₁₁ = 2·1 + 5·3 + 7·7  = 2 + 15 + 49  = 66\nc₁₂ = 2·5 + 5·6 + 7·5  = 10 + 30 + 35 = 75\nc₁₃ = 2·3 + 5·1 + 7·9  = 6 + 5 + 63   = 74\nc₂₁ = 4·1 + 8·3 + 3·7  = 4 + 24 + 21  = 49\nc₂₂ = 4·5 + 8·6 + 3·5  = 20 + 48 + 15 = 83\nc₂₃ = 4·3 + 8·1 + 3·9  = 12 + 8 + 27  = 47\nc₃₁ = 9·1 + 1·3 + 4·7  = 9 + 3 + 28   = 40\nc₃₂ = 9·5 + 1·6 + 4·5  = 45 + 6 + 20  = 71\nc₃₃ = 9·3 + 1·1 + 4·9  = 27 + 1 + 36  = 64\n\nAB = [ 66 75 74 ]\n     [ 49 83 47 ]\n     [ 40 71 64 ]</div>'
      }
    ]
  },
  {
    id: 't10', icon: '10', title: 'Multiplication Properties: AB ≠ BA',
    titleZh: '矩陣乘法性質：AB ≠ BA',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#e74c3c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#ff7675">AB ≠ BA — matrix multiplication is NOT commutative</text>

        <!-- AB -->
        <g transform="translate(70, 95)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">38</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">88</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">17</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">−92</text>
          ${MR}
          <text x="16" y="35" text-anchor="middle" font-size="13" fill="#1abc9c" font-weight="bold">AB</text>
        </g>

        <text x="200" y="100" font-size="22" fill="#ff7675">≠</text>

        <!-- BA -->
        <g transform="translate(240, 95)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">−6</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">80</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">66</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#f39c12" font-weight="bold">−48</text>
          ${MR}
          <text x="16" y="35" text-anchor="middle" font-size="13" fill="#f39c12" font-weight="bold">BA</text>
        </g>

        <!-- Worked Example 5 detail -->
        <g transform="translate(390, 60)">
          <rect x="0" y="0" width="320" height="170" fill="#1a252f" stroke="#e74c3c" rx="6"/>
          <text x="160" y="22" text-anchor="middle" font-size="11" fill="#ff7675" font-weight="bold">Worked Example 5</text>
          <text x="12" y="46" font-size="11" fill="#ffffff">A = [ 2   8 ]    B = [ 7  −4 ]</text>
          <text x="12" y="62" font-size="11" fill="#ffffff">    [ 5  −6 ]        [ 3  12 ]</text>
          <line x1="12" y1="72" x2="308" y2="72" stroke="#34495e"/>
          <text x="12" y="92" font-size="11" fill="#1abc9c">AB[1,1] = 2·7 + 8·3   = 14 + 24  = 38</text>
          <text x="12" y="108" font-size="11" fill="#1abc9c">AB[1,2] = 2·(−4)+8·12 = −8 + 96  = 88</text>
          <text x="12" y="124" font-size="11" fill="#1abc9c">AB[2,1] = 5·7+(−6)·3  = 35 − 18  = 17</text>
          <text x="12" y="140" font-size="11" fill="#1abc9c">AB[2,2] = 5·(−4)+(−6)·12= −20 − 72 = −92</text>
          <text x="12" y="158" font-size="10" fill="#bdc3c7" font-style="italic">BA gives an entirely different result.</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#ff7675" font-weight="bold">
          However: A(BC) = (AB)C, (A+B)C = AC+BC, A(B+C) = AB+AC, (AB)ᵀ = BᵀAᵀ
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 10: Worked Example 5 — for the same A and B, AB and BA give different results. Matrix multiplication is not commutative.',
    sections: [
      {
        title: 'NOT Commutative / 不滿足交換律',
        zh: '<div class="key-point"><strong>AB ≠ BA</strong>（一般情況下）。即使 A 和 B 都是方陣，且 AB 和 BA 都存在，兩者也幾乎一定不同。矩陣乘法只滿足<strong>結合律</strong>和<strong>分配律</strong>，但<strong>不滿足交換律</strong>。</div>',
        en: '<div class="key-point"><strong>AB ≠ BA</strong> in general. Even when A and B are both square, and both AB and BA exist, they almost always differ. Matrix multiplication is <strong>associative</strong> and <strong>distributive</strong>, but <strong>NOT commutative</strong>.</div>'
      },
      {
        title: 'Valid Algebra Laws / 仍成立的代數律',
        zh: '<div class="formula-block">結合律:  A(BC) = (AB)C\n分配律:  (A + B)C = AC + BC\n分配律:  A(B + C) = AB + AC\n轉置律:  (AB)ᵀ = Bᵀ Aᵀ</div>',
        en: '<div class="formula-block">Associative:  A(BC) = (AB)C\nDistributive: (A + B)C = AC + BC\nDistributive: A(B + C) = AB + AC\nTranspose:    (AB)ᵀ = Bᵀ Aᵀ</div>'
      }
    ]
  },
  {
    id: 't11', icon: '11', title: 'Unit Matrix Property: AI = A',
    titleZh: '單位矩陣性質：AI = A',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#1abc9c" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#1abc9c">Worked Example 4: AI = A</text>

        <!-- A -->
        <g transform="translate(110, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">2</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">7</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">8</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">9</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">1</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="13" fill="#9b59b6" font-weight="bold">A</text>
        </g>

        <text x="230" y="148" font-size="22" fill="#1abc9c">·</text>

        <!-- I -->
        <g transform="translate(265, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">1</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">1</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">0</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#1abc9c" font-weight="bold">1</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="13" fill="#9b59b6" font-weight="bold">I</text>
        </g>

        <text x="380" y="148" font-size="22" fill="#1abc9c">=</text>

        <!-- AI -->
        <g transform="translate(420, 130)">
          ${ML}
          <text x="0" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">2</text>
          <text x="32" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">5</text>
          <text x="64" y="-22" text-anchor="middle" font-size="14" fill="#ffffff">7</text>
          <text x="0" y="0" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          <text x="32" y="0" text-anchor="middle" font-size="14" fill="#ffffff">8</text>
          <text x="64" y="0" text-anchor="middle" font-size="14" fill="#ffffff">3</text>
          <text x="0" y="22" text-anchor="middle" font-size="14" fill="#ffffff">9</text>
          <text x="32" y="22" text-anchor="middle" font-size="14" fill="#ffffff">1</text>
          <text x="64" y="22" text-anchor="middle" font-size="14" fill="#ffffff">4</text>
          ${MR}
          <text x="32" y="55" text-anchor="middle" font-size="13" fill="#9b59b6" font-weight="bold">AI = A</text>
        </g>

        <!-- Worked detail -->
        <g transform="translate(570, 70)">
          <rect x="0" y="0" width="135" height="160" fill="#1a252f" stroke="#1abc9c" rx="6"/>
          <text x="67" y="22" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">Sample</text>
          <text x="8" y="48" font-size="10" fill="#ffffff">AI[1,1] =</text>
          <text x="8" y="64" font-size="10" fill="#ffffff">2·1+5·0+7·0 = 2</text>
          <text x="8" y="88" font-size="10" fill="#ffffff">AI[2,3] =</text>
          <text x="8" y="104" font-size="10" fill="#ffffff">4·0+8·0+3·1 = 3</text>
          <text x="8" y="128" font-size="10" fill="#1abc9c">All diagonal</text>
          <text x="8" y="142" font-size="10" fill="#1abc9c">entries of I are 1</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">
          AI = IA = A  (identity matrix leaves any matrix unchanged)
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 11: Worked Example 4 — multiplying any matrix by the unit matrix I returns the original matrix.',
    sections: [
      {
        title: 'Worked Example 4 / 例題四',
        zh: '<div class="formula-block">A · I = A\n\n舉例: A[2,3] = 4·0 + 8·0 + 3·1 = 3 ✓\n\n每個 Aᵢⱼ = (A 第 i 列) · (I 第 j 行) = Aᵢⱼ · 1 + 其他 · 0 = Aᵢⱼ</div>',
        en: '<div class="formula-block">A · I = A\n\nExample: A[2,3] = 4·0 + 8·0 + 3·1 = 3 ✓\n\nEach Aᵢⱼ = (row i of A) · (column j of I) = Aᵢⱼ · 1 + 0 = Aᵢⱼ</div>'
      },
      {
        title: 'Identity Property / 單位矩陣身份性質',
        zh: '<div class="key-point"><strong>AI = IA = A</strong>：單位矩陣是矩陣乘法的「1」。<br>若要「反轉」一個矩陣（矩陣除法），需要的是<strong>逆矩陣 A⁻¹</strong>，下一講將介紹。</div>',
        en: '<div class="key-point"><strong>AI = IA = A</strong>: the identity is the "1" of matrix multiplication.<br>To "divide" by a matrix we need the <strong>inverse matrix A⁻¹</strong>, covered in the next lecture.</div>'
      }
    ]
  },
  {
    id: 't12', icon: '12', title: 'Worked Examples Recap',
    titleZh: '八道例題總覽',
    diagram: `<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" width="100%">
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="720" height="270" fill="#243342" stroke="#5dade2" stroke-width="2" rx="8"/>
        <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="bold" fill="#5dade2">Eight Worked Examples (Tutorial 1 of 2)</text>

        <!-- Example cards -->
        <g transform="translate(20, 50)">
          <rect x="0" y="0" width="220" height="200" fill="#1a252f" stroke="#1abc9c" rx="5"/>
          <text x="110" y="22" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">Ex 7 — 3×3 × 3×2</text>
          <text x="10" y="42" font-size="9" fill="#ffffff">A = [3 2 3; 2 2 1; 2 3 1]</text>
          <text x="10" y="54" font-size="9" fill="#ffffff">B = [2 -2; -3 4; 1 1]</text>
          <line x1="10" y1="62" x2="210" y2="62" stroke="#34495e"/>
          <text x="10" y="80" font-size="10" fill="#1abc9c">AB[1,1] = 3·2+2·(−3)+3·1</text>
          <text x="10" y="94" font-size="10" fill="#1abc9c">       = 6 − 6 + 3 = 3</text>
          <text x="10" y="112" font-size="10" fill="#1abc9c">AB[1,2] = 3·(−2)+2·4+3·1</text>
          <text x="10" y="126" font-size="10" fill="#1abc9c">       = −6 + 8 + 3 = 5</text>
          <text x="10" y="146" font-size="11" fill="#f39c12" font-weight="bold">AB = [ 3   5 ]</text>
          <text x="10" y="162" font-size="11" fill="#f39c12" font-weight="bold">    [ −1  5 ]</text>
          <text x="10" y="178" font-size="11" fill="#f39c12" font-weight="bold">    [ −4  9 ]</text>
        </g>

        <g transform="translate(250, 50)">
          <rect x="0" y="0" width="220" height="200" fill="#1a252f" stroke="#1abc9c" rx="5"/>
          <text x="110" y="22" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">Ex 3 — length²</text>
          <text x="10" y="42" font-size="10" fill="#ffffff">[ x y z ] [ x; y; z ]</text>
          <line x1="10" y1="52" x2="210" y2="52" stroke="#34495e"/>
          <text x="10" y="70" font-size="11" fill="#1abc9c">a₁₁ = (x)(x) + (y)(y) + (z)(z)</text>
          <text x="10" y="84" font-size="11" fill="#1abc9c">      = x² + y² + z²</text>
          <line x1="10" y1="96" x2="210" y2="96" stroke="#34495e"/>
          <text x="10" y="116" font-size="11" fill="#ffffff">The row vector is the</text>
          <text x="10" y="130" font-size="11" fill="#ffffff">transpose of the column.</text>
          <text x="10" y="150" font-size="11" fill="#f39c12" font-weight="bold">Xᵀ X = |X|² (length²)</text>
        </g>

        <g transform="translate(480, 50)">
          <rect x="0" y="0" width="220" height="200" fill="#1a252f" stroke="#1abc9c" rx="5"/>
          <text x="110" y="22" text-anchor="middle" font-size="11" fill="#1abc9c" font-weight="bold">Ex 8 — (AB)ᵀ = BᵀAᵀ</text>
          <text x="10" y="42" font-size="9" fill="#ffffff">From Ex 7: AB = [ 3   5 ]</text>
          <text x="10" y="54" font-size="9" fill="#ffffff">                    [ −1  5 ]</text>
          <text x="10" y="66" font-size="9" fill="#ffffff">                    [ −4  9 ]</text>
          <line x1="10" y1="74" x2="210" y2="74" stroke="#34495e"/>
          <text x="10" y="92" font-size="10" fill="#1abc9c">(AB)ᵀ = [ 3  −1  −4 ]</text>
          <text x="10" y="106" font-size="10" fill="#1abc9c">        [ 5   5   9 ]</text>
          <line x1="10" y1="116" x2="210" y2="116" stroke="#34495e"/>
          <text x="10" y="134" font-size="10" fill="#ffffff">Aᵀ = [ 3 2 2; 2 2 3; 3 1 1 ]</text>
          <text x="10" y="146" font-size="10" fill="#ffffff">Bᵀ = [ 2 -3 1; -2 4 1 ]</text>
          <text x="10" y="166" font-size="11" fill="#f39c12" font-weight="bold">BᵀAᵀ = (AB)ᵀ  ✓</text>
        </g>

        <rect x="0" y="245" width="720" height="25" fill="#111111"/>
        <text x="360" y="261" text-anchor="middle" font-size="11" fill="#5dade2" font-weight="bold">
          These are the key worked examples of L03. Practice them until you can reproduce each step.
        </text>
      </g>
    </svg>`,
    diagramCaption: 'Fig 12: Highlighted recap of three core worked examples — 3×3 × 3×2 multiplication, the length-squared identity XᵀX, and the transpose-of-product rule (AB)ᵀ = BᵀAᵀ.',
    sections: [
      {
        title: 'Self Assessment 1 — Selected Answers / 自測題一精選',
        zh: '<div class="formula-block">Q2 (i)  C = A + B = [ 3   5  −1 ]\n                       [ 3   0   1 ]\n                       [ 1   3  −2 ]\n\nQ2 (v)  C = AB = [ −14   1   15 ]\n                    [ 40  −17   13 ]\n                    [ 46   11  −31 ]\n\nQ2 (vi) C = BA = [ −36   3   13 ]\n                    [ 49  11    7 ]\n                    [  7  −5  −37 ]\n\nQ3 (i)  AB = [ −1  12 ]\n            [ −5  20 ]\n            [ −9  28 ]\n\nQ4      ABᵀ = [ 9.5  1.5   7  ]\n              [ 12   9     5  ]\n              [ 15.2 2    11.6 ]</div>',
        en: '<div class="formula-block">Q2 (i)  C = A + B = [ 3   5  −1 ]\n                       [ 3   0   1 ]\n                       [ 1   3  −2 ]\n\nQ2 (v)  C = AB = [ −14   1   15 ]\n                    [ 40  −17   13 ]\n                    [ 46   11  −31 ]\n\nQ2 (vi) C = BA = [ −36   3   13 ]\n                    [ 49  11    7 ]\n                    [  7  −5  −37 ]\n\nQ3 (i)  AB = [ −1  12 ]\n            [ −5  20 ]\n            [ −9  28 ]\n\nQ4      ABᵀ = [ 9.5  1.5   7  ]\n              [ 12   9     5  ]\n              [ 15.2 2    11.6 ]</div>'
      }
    ]
  }
];

// =======================================================
// 25 MULTIPLE CHOICE QUESTIONS
// =======================================================
const mcData = [
  // ─── Matrix definition & notation (Q1–Q4)
  { type:'concept', text:'An element aᵢⱼ of a matrix is located at:',
    options:['Row j, column i','Row i, column j','Diagonal position only','Always (1,1)'],
    correct:1,
    explanation:'Convention: aᵢⱼ means row i, column j. The first subscript is the row.' },
  { type:'concept', text:'A matrix described as "4 by 3" has:',
    options:['4 columns and 3 rows','4 rows and 3 columns','3 elements total','9 elements'],
    correct:1,
    explanation:'"m by n" → m rows × n columns. A 4×3 matrix has 4 rows and 3 columns (12 elements total).' },
  { type:'concept', text:'In standard matrix notation, vectors are usually written as:',
    options:['Row vectors','Column vectors','Either, both equally common','Diagonal entries'],
    correct:1,
    explanation:'Column vectors are the engineering standard (the source explicitly states "column vectors are the normal").' },
  { type:'trace', text:'The trace of A = [2 5 7; 4 8 3; 9 1 4] is:',
    options:['14','16','20','24'],
    correct:0,
    explanation:'Trace = a₁₁ + a₂₂ + a₃₃ = 2 + 8 + 4 = 14.' },

  // ─── Square, diagonal, unit, zero (Q5–Q9)
  { type:'concept', text:'A square matrix is one in which:',
    options:['All entries are squares','The number of rows equals the number of columns','All diagonal entries are equal','It contains only integers'],
    correct:1,
    explanation:'A square matrix has the same number of rows and columns.' },
  { type:'concept', text:'The unit (identity) matrix I has:',
    options:['All zeros on the leading diagonal','All ones on the leading diagonal, zeros elsewhere','All entries equal to 1','Random values'],
    correct:1,
    explanation:'The unit matrix has 1s on the leading diagonal and 0s everywhere else.' },
  { type:'concept', text:'What is the result of A · I for any compatible matrix A?',
    options:['The zero matrix','A itself','I itself','A transposed'],
    correct:1,
    explanation:'AI = IA = A. The identity matrix leaves any matrix unchanged.' },
  { type:'concept', text:'Multiplying any matrix by the zero matrix gives:',
    options:['The original matrix','A matrix of all ones','The zero matrix','Undefined'],
    correct:2,
    explanation:'Every element of the product is 0, so the result is the zero matrix.' },
  { type:'trace', text:'The trace of the 3×3 unit matrix I is:',
    options:['0','1','3','9'],
    correct:2,
    explanation:'I has 1s on the leading diagonal. Trace = 1 + 1 + 1 = 3.' },

  // ─── Transpose (Q10–Q12)
  { type:'concept', text:'The transpose of a matrix A is denoted:',
    options:['A−1','Aᵀ','A*','A′'],
    correct:1,
    explanation:'Standard notation for transpose is Aᵀ (or sometimes A′).' },
  { type:'concept', text:'If A is 2×3, then Aᵀ is:',
    options:['3×2','2×3','2×2','3×3'],
    correct:0,
    explanation:'Transposing swaps rows and columns, so the size flips from m×n to n×m. 2×3 → 3×2.' },
  { type:'trace', text:'A = [2 5 7; 4 8 3]. What is Aᵀ[3,1]?',
    options:['2','5','7','3'],
    correct:2,
    explanation:'Aᵀ is 3×2 (rows become columns). Aᵀ[3,1] = A[1,3] = 7. Transpose flips the row/column indices.' },

  // ─── Addition & subtraction (Q13–Q15)
  { type:'concept', text:'For matrix addition to be defined, the two matrices must be:',
    options:['Square','The same size','Invertible','Transposes of each other'],
    correct:1,
    explanation:'Element-wise addition only makes sense when both matrices have the same dimensions.' },
  { type:'trace', text:'Given A = [1 2; 3 4] and B = [5 6; 7 8], what is A + B?',
    options:['[6 8; 10 12]','[4 4; 4 4]','[5 12; 21 32]','[1 2; 3 4]'],
    correct:0,
    explanation:'A + B = [(1+5) (2+6); (3+7) (4+8)] = [6 8; 10 12].' },
  { type:'trace', text:'Given A = [1 2; 3 4] and B = [5 6; 7 8], what is A − B?',
    options:['[4 4; 4 4]','[−4 −4; −4 −4]','[6 8; 10 12]','[−4 4; 4 −4]'],
    correct:1,
    explanation:'A − B = [(1−5) (2−6); (3−7) (4−8)] = [−4 −4; −4 −4].' },

  // ─── Scalar multiplication (Q16)
  { type:'trace', text:'If α = 3 and A = [1 2; 3 4], what is 3A?',
    options:['[3 6; 9 12]','[1 2; 3 4]','[4 5; 6 7]','[3 2; 1 4]'],
    correct:0,
    explanation:'Every element is multiplied by 3: [3·1 3·2; 3·3 3·4] = [3 6; 9 12].' },

  // ─── Matrix × vector (Q17–Q18)
  { type:'trace', text:'Compute [2 3 4] · [4; 1; 5] (Worked Example 2):',
    options:['12','20','31','36'],
    correct:2,
    explanation:'(2·4) + (3·1) + (4·5) = 8 + 3 + 20 = 31. This is a row × column dot product giving a single scalar.' },
  { type:'trace', text:'Compute [x y z] · [x; y; z] (Worked Example 3):',
    options:['x + y + z','3x + 3y + 3z','x² + y² + z²','xyz'],
    correct:2,
    explanation:'(x·x) + (y·y) + (z·z) = x² + y² + z², which is the square of the vector\'s length.' },

  // ─── Matrix × matrix (Q19–Q22)
  { type:'concept', text:'For the matrix product AB to be defined, we require:',
    options:['A and B to be square','The number of columns of A equals the number of rows of B','A = B','All entries to be positive'],
    correct:1,
    explanation:'The columns of A must equal the rows of B. If A is m×n and B is n×p, then AB is m×p.' },
  { type:'trace', text:'A 3×4 matrix times a 4×2 matrix gives a matrix of size:',
    options:['3×2','4×4','3×4','12×1'],
    correct:0,
    explanation:'(3×4) × (4×2) → (3×2). The inner dimensions (4) cancel.' },
  { type:'trace', text:'In AB, the element at row 2, column 3 (i.e. AB[2,3]) is computed as:',
    options:['Row 2 of A × Row 3 of B','Column 2 of A × Column 3 of B','Row 2 of A × Column 3 of B','Row 3 of A × Column 2 of B'],
    correct:2,
    explanation:'Each element cᵢⱼ = (row i of A) · (column j of B). So AB[2,3] = row 2 of A · column 3 of B.' },
  { type:'trace', text:'Worked Example 6: A = [2 5 7; 4 8 3; 9 1 4], B = [1 5 3; 3 6 1; 7 5 9]. What is AB[1,1]?',
    options:['49','66','74','83'],
    correct:1,
    explanation:'AB[1,1] = (row 1 of A) · (col 1 of B) = 2·1 + 5·3 + 7·7 = 2 + 15 + 49 = 66.' },

  // ─── AB ≠ BA & special properties (Q23–Q25)
  { type:'concept', text:'For two square matrices A and B in general:',
    options:['AB = BA always','AB = BA only if A = B','AB ≠ BA in general','AB is undefined'],
    correct:2,
    explanation:'Matrix multiplication is NOT commutative. Worked Example 5 demonstrates AB ≠ BA explicitly.' },
  { type:'trace', text:'Worked Example 5: A = [2 8; 5 −6], B = [7 −4; 3 12]. What is AB[1,2]?',
    options:['38','88','17','−92'],
    correct:1,
    explanation:'AB[1,2] = (row 1 of A) · (col 2 of B) = 2·(−4) + 8·12 = −8 + 96 = 88.' },
  { type:'explain', text:'The transpose of a matrix product satisfies which identity?',
    options:['(AB)ᵀ = AᵀBᵀ','(AB)ᵀ = BᵀAᵀ','(AB)ᵀ = AB','(AB)ᵀ = (BA)ᵀ'],
    correct:1,
    explanation:'(AB)ᵀ = BᵀAᵀ — the transpose REVERSES the order of multiplication. This is the reverse of the typical associativity.' }
];

// =======================================================
// 5 SHORT-ANSWER QUESTIONS
// =======================================================
const shortData = [
  {
    title: 'Worked Example 1 — Add & Subtract Two 3×3 Matrices',
    titleZh: '例題一 — 兩 3×3 矩陣的加減',
    prompt: 'Given A = [2 5 7; 4 8 3; 9 1 4] and B = [1 5 3; 3 6 1; 7 5 9], compute (a) A + B and (b) A − B. Show every element calculation.',
    modelAnswer: `Step 1 — verify same size. Both are 3 × 3 ✓

Step 2 — A + B (add element by element):

  Position  A   B   Sum
  [1,1]    2 + 1 = 3
  [1,2]    5 + 5 = 10
  [1,3]    7 + 3 = 10
  [2,1]    4 + 3 = 7
  [2,2]    8 + 6 = 14
  [2,3]    3 + 1 = 4
  [3,1]    9 + 7 = 16
  [3,2]    1 + 5 = 6
  [3,3]    4 + 9 = 13

A + B = [ 3  10  10 ]
       [ 7  14   4 ]
       [16   6  13 ]

Step 3 — A − B (subtract element by element):

  Position  A − B   Diff
  [1,1]    2 − 1   = 1
  [1,2]    5 − 5   = 0
  [1,3]    7 − 3   = 4
  [2,1]    4 − 3   = 1
  [2,2]    8 − 6   = 2
  [2,3]    3 − 1   = 2
  [3,1]    9 − 7   = 2
  [3,2]    1 − 5   = −4
  [3,3]    4 − 9   = −5

A − B = [ 1   0   4 ]
       [ 1   2   2 ]
       [ 2  −4  −5 ]`,
    tips: 'List every (row, column) pair. Make sure both matrices are the same size before attempting.'
  },
  {
    title: 'Worked Example 2 — Row × Column Dot Product',
    titleZh: '例題二 — 行 × 列 內積計算',
    prompt: 'Compute [2 3 4] · [4; 1; 5] using the row × column rule. Then compute the same for [3 5 7] · [2; 0; 1].',
    modelAnswer: `Formula: (row · col) = a₁b₁ + a₂b₂ + a₃b₃

Part (a):  [ 2 3 4 ] · [ 4 ]
                          [ 1 ]
                          [ 5 ]
       = (2)(4) + (3)(1) + (4)(5)
       = 8 + 3 + 20
       = 31

Part (b):  [ 3 5 7 ] · [ 2 ]
                          [ 0 ]
                          [ 1 ]
       = (3)(2) + (5)(0) + (7)(1)
       = 6 + 0 + 7
       = 13

Note: a row vector (1 × 3) times a column vector (3 × 1)
produces a single scalar (1 × 1).`,
    tips: 'Each pair of corresponding entries multiplies together; the three products are then summed.'
  },
  {
    title: 'Worked Example 3 — Length-Squared of a Vector',
    titleZh: '例題三 — 向量長度平方',
    prompt: 'Show that [x y z] · [x; y; z] = x² + y² + z². Explain in words what this product represents geometrically.',
    modelAnswer: `Computation (row × column dot product):

  [ x y z ] · [ x ]
              [ y ]
              [ z ]
  = (x)(x) + (y)(y) + (z)(z)
  = x² + y² + z²

Geometric meaning:

• The column vector X = [x; y; z] has length
  |X| = √(x² + y² + z²)
• The row vector [x y z] is the transpose Xᵀ.
• Xᵀ X = |X|² = (length of X)²

So the product Xᵀ X is literally the square of the
vector's magnitude — the reason we use the term "dot
product" for this row-by-column multiplication.`,
    tips: 'Show both the algebraic expansion and a brief geometric interpretation. Mention that the row vector is Xᵀ.'
  },
  {
    title: 'Worked Example 6 — Full 3×3 × 3×3 Matrix Product',
    titleZh: '例題六 — 完整 3×3 矩陣乘法',
    prompt: 'Compute AB for A = [2 5 7; 4 8 3; 9 1 4] and B = [1 5 3; 3 6 1; 7 5 9]. Show the calculation for EVERY element of the product (9 dot products in total).',
    modelAnswer: `Each element cᵢⱼ = (row i of A) · (column j of B).

Row 1 of AB:
  c₁₁ = 2·1 + 5·3 + 7·7  = 2 + 15 + 49  = 66
  c₁₂ = 2·5 + 5·6 + 7·5  = 10 + 30 + 35 = 75
  c₁₃ = 2·3 + 5·1 + 7·9  = 6 + 5 + 63   = 74

Row 2 of AB:
  c₂₁ = 4·1 + 8·3 + 3·7  = 4 + 24 + 21  = 49
  c₂₂ = 4·5 + 8·6 + 3·5  = 20 + 48 + 15 = 83
  c₂₃ = 4·3 + 8·1 + 3·9  = 12 + 8 + 27  = 47

Row 3 of AB:
  c₃₁ = 9·1 + 1·3 + 4·7  = 9 + 3 + 28   = 40
  c₃₂ = 9·5 + 1·6 + 4·5  = 45 + 6 + 20  = 71
  c₃₃ = 9·3 + 1·1 + 4·9  = 27 + 1 + 36  = 64

Final result:
  AB = [ 66  75  74 ]
       [ 49  83  47 ]
       [ 40  71  64 ]`,
    tips: 'Work systematically: finish all of row 1 before row 2. Check arithmetic carefully — 3 terms per dot product, 9 dot products total.'
  },
  {
    title: 'Worked Example 8 — Verify (AB)ᵀ = BᵀAᵀ',
    titleZh: '例題八 — 驗證 (AB)ᵀ = BᵀAᵀ',
    prompt: 'For A = [3 2 3; 2 2 1; 2 3 1] and B = [2 -2; -3 4; 1 1], first compute AB, then verify the identity (AB)ᵀ = BᵀAᵀ by computing both sides.',
    modelAnswer: `Step 1 — compute AB (3 × 3) × (3 × 2) = 3 × 2.

  c₁₁ = 3·2 + 2·(−3) + 3·1 = 6 − 6 + 3 = 3
  c₁₂ = 3·(−2) + 2·4 + 3·1 = −6 + 8 + 3 = 5
  c₂₁ = 2·2 + 2·(−3) + 1·1 = 4 − 6 + 1 = −1
  c₂₂ = 2·(−2) + 2·4 + 1·1 = −4 + 8 + 1 = 5
  c₃₁ = 2·2 + 3·(−3) + 1·1 = 4 − 9 + 1 = −4
  c₃₂ = 2·(−2) + 3·4 + 1·1 = −4 + 12 + 1 = 9

  AB = [  3   5 ]
       [ −1   5 ]
       [ −4   9 ]

Step 2 — transpose AB.

  (AB)ᵀ = [ 3  −1  −4 ]
          [ 5   5   9 ]

Step 3 — compute Bᵀ Aᵀ.

  Aᵀ = [ 3  2  2 ]
       [ 2  2  3 ]
       [ 3  1  1 ]

  Bᵀ = [ 2  −3   1 ]
       [ −2  4   1 ]

  Bᵀ is 2 × 3, Aᵀ is 3 × 3, so Bᵀ Aᵀ is 2 × 3.

  Row 1 of Bᵀ Aᵀ:
    r₁₁ = 2·3 + (−3)·2 + 1·3  = 6 − 6 + 3   = 3
    r₁₂ = 2·2 + (−3)·2 + 1·1  = 4 − 6 + 1   = −1
    r₁₃ = 2·2 + (−3)·3 + 1·1  = 4 − 9 + 1   = −4

  Row 2 of Bᵀ Aᵀ:
    r₂₁ = (−2)·3 + 4·2 + 1·3  = −6 + 8 + 3 = 5
    r₂₂ = (−2)·2 + 4·2 + 1·1  = −4 + 8 + 1 = 5
    r₂₃ = (−2)·2 + 4·3 + 1·1  = −4 + 12 + 1 = 9

  Bᵀ Aᵀ = [ 3  −1  −4 ]
          [ 5   5   9 ]

Step 4 — compare.

  (AB)ᵀ = [ 3  −1  −4 ]
          [ 5   5   9 ]    ✓

  Bᵀ Aᵀ = [ 3  −1  −4 ]
          [ 5   5   9 ]

  They match. The identity (AB)ᵀ = Bᵀ Aᵀ is verified.`,
    tips: 'Compute AB first (it has only 6 elements, not 9), then form the transposes. Watch for sign mistakes when computing Bᵀ Aᵀ.'
  }
];

// =======================================================
// RENDER NOTES
// =======================================================
function renderNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = notesData.map(t => {
    const sections = t.sections.map(s => `
      <div class="lang-pair">
        <div class="lang-cell en">
          <div class="lang-label">📘 English</div>
          ${s.en}
        </div>
        <div class="lang-cell zh">
          <div class="lang-label">📕 中文</div>
          ${s.zh}
        </div>
      </div>
    `).join('');
    return `
      <div class="topic-card" id="${t.id}">
        <div class="topic-header">
          <div class="topic-icon">${t.icon}</div>
          <div class="topic-title">
            <h2>${escapeHtml(t.title)}</h2>
            <p style="margin:2px 0 0;color:#7f8c8d;font-size:13px;">${escapeHtml(t.titleZh)}</p>
          </div>
        </div>
        <div class="diagram-block">
          <div class="diagram-title">${escapeHtml(lessonLabels.L3)}</div>
          ${t.diagram}
          <div class="diagram-caption">${escapeHtml(t.diagramCaption)}</div>
        </div>
        ${sections}
      </div>
    `;
  }).join('');
}

// =======================================================
// RENDER MC QUESTIONS
// =======================================================
function renderMC() {
  const container = document.getElementById('mcContainer');
  container.innerHTML = mcData.map((q, i) => {
    const opts = q.options.map((opt, j) => `
      <label>
        <input type="radio" name="q${i}" value="${j}">
        ${opt}
      </label>
    `).join('');
    return `
      <div class="question-card" id="mcq${i}">
        <div class="q-header">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
            <span class="q-number">Q${i+1}</span>
            ${typeLabels[q.type]}
          </div>
          <span class="q-tag">EM1 · L3</span>
        </div>
        <div class="q-text">${escapeHtml(q.text)}</div>
        <div class="options">${opts}</div>
        <div class="explanation" id="exp${i}">
          <strong>Explanation / 解釋：</strong><br>${escapeHtml(q.explanation)}
        </div>
      </div>
    `;
  }).join('');
}

// =======================================================
// RENDER SHORT-ANSWER QUESTIONS
// =======================================================
function renderShort() {
  const container = document.getElementById('shortContainer');
  container.innerHTML = shortData.map((q, i) => `
    <div class="question-card short-q">
      <div class="q-header">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <span class="q-number">SQ${i+1}</span>
          <span class="q-type q-type-explain">✏️ Short Answer</span>
        </div>
        <span class="q-tag">${escapeHtml(q.title)}</span>
      </div>
      <div style="font-size:14px;color:#7f8c8d;margin-bottom:6px;">${escapeHtml(q.titleZh)}</div>
      <div class="q-text">${escapeHtml(q.prompt)}</div>
      <textarea placeholder="Type your matrix working here... / 在此輸入你的矩陣計算過程..."></textarea>
      <div class="answer-tips" id="tips${i}" style="display:none;">
        <strong>Tips / 評分要點：</strong> ${escapeHtml(q.tips)}
      </div>
      <div class="model-answer" id="ans${i}">
        <strong>📝 Model Answer / 參考答案：</strong>
        <pre>${escapeHtml(q.modelAnswer)}</pre>
      </div>
    </div>
  `).join('');
}

// =======================================================
// TAB SWITCHING
// =======================================================
function showSection(name, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(name + 'Section').classList.add('active');
  if (btn && btn.classList) {
    btn.classList.add('active');
  } else {
    const match = document.querySelector(`.tab-btn[onclick*="showSection('${name}')"]`);
    if (match) match.classList.add('active');
  }
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// =======================================================
// MC SUBMISSION
// =======================================================
function submitMC() {
  let correct = 0;
  let answered = 0;
  const reviewItems = [];
  mcData.forEach((q, i) => {
    const card = document.getElementById('mcq' + i);
    const sel = document.querySelector(`input[name="q${i}"]:checked`);
    const exp = document.getElementById('exp' + i);
    exp.style.display = 'block';
    card.classList.add('answered');
    if (sel) {
      answered++;
      const chosen = parseInt(sel.value, 10);
      const labels = card.querySelectorAll('.options label');
      labels.forEach((lbl, j) => {
        if (j === q.correct) lbl.classList.add('correct');
        if (j === chosen && chosen !== q.correct) lbl.classList.add('incorrect');
      });
      if (chosen === q.correct) {
        correct++;
        card.classList.remove('wrong');
        reviewItems.push(`<div class="review-item correct">Q${i+1}: ✓ ${escapeHtml(q.text.substring(0, 60))}…</div>`);
      } else {
        card.classList.add('wrong');
        reviewItems.push(`<div class="review-item wrong">Q${i+1}: ✗ ${escapeHtml(q.text.substring(0, 60))}…</div>`);
      }
    } else {
      const labels = card.querySelectorAll('.options label');
      labels.forEach((lbl, j) => { if (j === q.correct) lbl.classList.add('correct'); });
      reviewItems.push(`<div class="review-item wrong">Q${i+1}: — (not answered)</div>`);
    }
  });
  const pct = Math.round((correct / mcData.length) * 100);
  document.getElementById('answeredCount').textContent = `${answered}/${mcData.length}`;
  document.getElementById('scoreDisplay').textContent = `${pct}%`;
  document.getElementById('progressBar').style.width = `${pct}%`;
  const panel = document.getElementById('resultPanel');
  panel.style.display = 'block';
  document.getElementById('scoreCircle').style.setProperty('--percent', pct);
  document.getElementById('finalScore').textContent = pct + '%';
  let msg = pct >= 80 ? "Excellent! / 出色！" :
            pct >= 60 ? "Good progress. / 良好。" :
            pct >= 40 ? "Keep practising. / 繼續努力。" :
                        "Review the notes and try again. / 複習筆記後再試。";
  document.getElementById('resultMsg').textContent = msg;
  document.getElementById('reviewSection').innerHTML = '<strong>Review / 題目回顧：</strong>' + reviewItems.join('');
  panel.scrollIntoView({behavior:'smooth', block:'center'});
}

// =======================================================
// SHOW SHORT ANSWERS
// =======================================================
function showAnswers() {
  shortData.forEach((q, i) => {
    document.getElementById('ans' + i).style.display = 'block';
    document.getElementById('tips' + i).style.display = 'block';
  });
  document.getElementById('shortContainer').scrollIntoView({behavior:'smooth', block:'start'});
}

// =======================================================
// TIMER
// =======================================================
let totalSeconds = 90 * 60;
function tick() {
  totalSeconds--;
  if (totalSeconds < 0) { totalSeconds = 0; }
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  document.getElementById('timer').textContent =
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// =======================================================
// BACK-TO-TOP
// =======================================================
function setupToTop() {
  const btn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('show');
    else btn.classList.remove('show');
  });
}

// =======================================================
// INIT
// =======================================================
window.addEventListener('DOMContentLoaded', () => {
  renderNotes();
  renderMC();
  renderShort();
  setupToTop();
  setInterval(tick, 1000);
});
