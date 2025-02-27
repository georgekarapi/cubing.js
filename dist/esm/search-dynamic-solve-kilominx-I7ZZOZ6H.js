import {
  Alg
} from "./chunk-VZP3KFTU.js";

// src/cubing/vendor/mpl/xyzzy/kilosolver.js
import { randomUIntBelow } from "random-uint-below";
var PHASE4_THRESHOLD = 7;
function factorial(n) {
  if (n < 2) {
    return n;
  }
  let f = 1;
  for (let i = 2; i <= n; i++) {
    f *= i;
  }
  return f;
}
function C(n, k) {
  if (k < 0 || k > n) {
    return 0;
  }
  if (k === 0 || k === n) {
    return 1;
  }
  let c = 1;
  for (let i = 0; i < k; i++) {
    c = c * (n - i) / (i + 1) | 0;
  }
  return c;
}
function permutation_to_index(perm) {
  perm = perm.slice();
  let n = perm.length;
  let f = factorial(n - 1);
  let ind = 0;
  while (n > 1) {
    n--;
    let e = perm[0];
    ind += e * f;
    for (let i = 0; i < n; i++) {
      let x = perm[i + 1];
      perm[i] = x - (x > e);
    }
    f /= n;
  }
  return ind;
}
function permutation_parity(A) {
  let n = A.length;
  let parity = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i; j < n; j++) {
      if (A[i] > A[j]) {
        parity ^= 1;
      }
    }
  }
  return parity;
}
function evenpermutation_to_index(perm) {
  return permutation_to_index(perm) >> 1;
}
var [evenpermutation10_to_index, index_to_evenpermutation10] = (() => {
  let index_in_set_bits = new Int8Array(1024 * 10);
  let look_up_set_bits = new Int8Array(1024 * 10);
  for (let i = 0; i < 1024; i++) {
    for (let j = 0, counter = 0; j < 10; j++) {
      if ((i >>> j & 1) === 0) {
        continue;
      }
      index_in_set_bits[j << 10 | i] = counter;
      look_up_set_bits[counter << 10 | i] = j;
      counter++;
    }
  }
  function evenpermutation10_to_index2(perm) {
    let unused = 1023;
    let f = 181440;
    let ind = 0;
    for (let i = 0; i < 8; i++) {
      let v = perm[i];
      ind += index_in_set_bits[unused | v << 10] * f;
      unused &= ~(1 << v);
      f /= 9 - i;
    }
    return ind;
  }
  function index_to_evenpermutation102(ind, perm) {
    let unused = 1023;
    let f = 181440;
    let parity = 0;
    for (let i = 0; i < 8; i++) {
      let a = ind / f | 0;
      ind -= a * f;
      parity ^= a & 1;
      let v = look_up_set_bits[unused | a << 10];
      perm[i] = v;
      unused &= ~(1 << v);
      f /= 9 - i;
    }
    perm[8] = look_up_set_bits[unused | parity << 10];
    perm[9] = look_up_set_bits[unused | (parity ^ 1) << 10];
    return perm;
  }
  return [evenpermutation10_to_index2, index_to_evenpermutation102];
})();
function comb_to_index(l) {
  let bits = l.length;
  let ones = 0;
  for (let i = 0; i < bits; i++) {
    ones += +(l[i] === 1);
  }
  let zeros = bits - ones;
  if (zeros === 0 || ones === 0 || bits === 1) {
    return 0;
  }
  let b = C(bits - 1, ones);
  let ind = 0;
  for (let i = 0; zeros > 0 && ones > 0 && bits > 1; i++) {
    bits--;
    if (l[i] === 0) {
      b = b * --zeros / bits;
    } else {
      ind += b;
      b = b * ones-- / bits;
    }
  }
  return ind;
}
function index_to_comb(ind, ones, bits) {
  let zeros = bits - ones;
  let b = C(bits - 1, ones);
  let l = [];
  let n = bits - 1;
  for (let i = 0; i < n; i++) {
    bits--;
    if (ind < b) {
      l.push(0);
      b = b * --zeros / bits;
    } else {
      l.push(1);
      ind -= b;
      b = b * ones-- / bits;
    }
  }
  l.push(ones);
  return l;
}
function compose(A, B) {
  let C2 = [];
  for (let i = 0; i < B.length; i++) {
    C2[i] = A[B[i]];
  }
  return C2;
}
function compose_o(A, B) {
  let p = compose(A[0], B[0]);
  let o = [];
  let n = B[0].length;
  for (let i = 0; i < n; i++) {
    o[i] = (A[1][B[0][i]] + B[1][i]) % 3;
  }
  return [p, o];
}
function permutation_from_cycle(cycle, n) {
  let perm = [];
  for (let i = 0; i < n; i++) {
    perm[i] = i;
  }
  for (let i = 0; i < cycle.length; i++) {
    perm[cycle[i]] = cycle[(i + 1) % cycle.length];
  }
  return perm;
}
function unsparsify_list(d, n) {
  let l = Array(n).fill(0);
  for (let k in d) {
    l[k] = d[k];
  }
  return l;
}
var move_U = [
  permutation_from_cycle([0, 1, 2, 3, 4], 20),
  unsparsify_list({}, 20)
];
var move_R = [
  permutation_from_cycle([4, 3, 11, 12, 13], 20),
  unsparsify_list({ 4: 2, 3: 1, 11: 1, 12: 1, 13: 1 }, 20)
];
var move_F = [
  permutation_from_cycle([3, 2, 9, 10, 11], 20),
  unsparsify_list({ 3: 2, 2: 1, 9: 1, 10: 1, 11: 1 }, 20)
];
var move_L = [
  permutation_from_cycle([2, 1, 7, 8, 9], 20),
  unsparsify_list({ 2: 2, 1: 1, 7: 1, 8: 1, 9: 1 }, 20)
];
var move_BL = [
  permutation_from_cycle([1, 0, 5, 6, 7], 20),
  unsparsify_list({ 1: 2, 0: 1, 5: 1, 6: 1, 7: 1 }, 20)
];
var move_BR = [
  permutation_from_cycle([0, 4, 13, 14, 5], 20),
  unsparsify_list({ 0: 2, 4: 1, 13: 1, 14: 1, 5: 1 }, 20)
];
var move_x2 = [
  [15, 16, 17, 18, 19, 10, 9, 8, 7, 6, 5, 14, 13, 12, 11, 0, 1, 2, 3, 4],
  unsparsify_list({}, 20)
];
var move_y = [
  [1, 2, 3, 4, 0, 7, 8, 9, 10, 11, 12, 13, 14, 5, 6, 19, 15, 16, 17, 18],
  unsparsify_list({}, 20)
];
var moves = [move_U, move_R, move_F, move_L, move_BL, move_BR, move_x2];
var move_names = ["U", "R", "F", "L", "BL", "BR", "x2"];
var id = compose_o(move_x2, move_x2);
var moves_full = [];
for (let i = 0; i < moves.length; i++) {
  moves_full[i] = [id];
  for (let j = 1; j < 5; j++) {
    moves_full[i][j] = compose_o(moves_full[i][j - 1], moves[i]);
  }
}
function random_state() {
  let p = [0];
  for (let i = 1; i < 20; i++) {
    let r = randomUIntBelow(i + 1);
    p[i] = p[r];
    p[r] = i;
  }
  if (permutation_parity(p) === 1) {
    [p[0], p[1]] = [p[1], p[0]];
  }
  let o = Array(20).fill(0);
  for (let i = 0; i < 19; i++) {
    o[i] = randomUIntBelow(3);
    o[19] += 3 - o[i];
  }
  o[19] %= 3;
  return [p, o];
}
function stringify_move_sequence(move_sequence) {
  let suffixes = ["0", "", "2", "2'", "'"];
  let s = move_sequence.map(([m, r]) => move_names[m] + suffixes[r]);
  return s.join(" ");
}
function apply_move_sequence(state, move_sequence) {
  for (let [m, r] of move_sequence) {
    for (let i = 0; i < r; i++) {
      state = compose_o(state, moves[m]);
    }
  }
  return state;
}
function generate_random_state_scramble() {
  return solve(random_state());
}
function solve_phase1(state) {
  let p = state[0];
  if (p.slice(15, 20).every((x) => x < 15)) {
    return [];
  }
  if (p.slice(0, 5).every((x) => x < 15)) {
    return [[6, 1]];
  }
  let flags = p.map((x) => x >= 15);
  let depth = 0;
  let sol;
  while (sol === void 0) {
    depth++;
    sol = search_phase1(flags, depth, -1);
  }
  sol.push([6, 1]);
  return sol;
}
function search_phase1(flags, depth, last) {
  if (depth === 0) {
    if (flags.slice(0, 5).some((x) => x)) {
      return;
    }
    return [];
  }
  for (let move_index = 0; move_index < 6; move_index++) {
    if (move_index === last) {
      continue;
    }
    for (let r = 1; r < 5; r++) {
      let new_flags = compose(flags, moves_full[move_index][r][0]);
      let sol = search_phase1(new_flags, depth - 1, move_index);
      if (sol !== void 0) {
        return [[move_index, r]].concat(sol);
      }
    }
  }
  return;
}
function index_phase2(state) {
  let p = state[0].slice(0, 15);
  let o = state[1];
  let index_c = comb_to_index(p.map((x) => +(x >= 15)));
  let index_o = 243 * index_c;
  for (let i = 0, j = 0; i < 15; i++) {
    if (p[i] < 15) {
      continue;
    }
    index_o += o[i] * Math.pow(3, j);
    j++;
  }
  let index_p = 0;
  for (let i = 0; i < 5; i++) {
    index_p += p.indexOf(15 + i) * Math.pow(15, i);
  }
  return [index_o, index_p];
}
function solve_phase2(state) {
  let mtables = [
    generate_phase23_orientation_mtable(),
    generate_phase23_permutation_mtable()
  ];
  let ptables = [
    generate_phase2_orientation_ptable(),
    generate_phase2_permutation_ptable()
  ];
  return ida_solve(index_phase2(state), mtables, ptables).concat([[6, 1]]);
}
function index_phase3(state) {
  let pieces = [5, 6, 7, 8, 14];
  let p = state[0].slice(0, 15);
  let o = state[1];
  let index_c = comb_to_index(p.map((x) => +(pieces.indexOf(x) !== -1)));
  let index_o = 243 * index_c;
  for (let i = 0, j = 0; i < 15; i++) {
    if (pieces.indexOf(p[i]) === -1) {
      continue;
    }
    index_o += o[i] * Math.pow(3, j);
    j++;
  }
  let index_p = 0;
  for (let i = 0; i < 5; i++) {
    index_p += p.indexOf(pieces[i]) * Math.pow(15, i);
  }
  return [index_o, index_p];
}
function solve_phase3(state) {
  let mtables = [
    generate_phase23_orientation_mtable(),
    generate_phase23_permutation_mtable()
  ];
  let ptables = [
    generate_phase3_orientation_ptable(),
    generate_phase3_permutation_ptable()
  ];
  return ida_solve(index_phase3(state), mtables, ptables);
}
function index_phase4(state) {
  let p = state[0].slice(0, 14);
  let o = state[1];
  let index_o = 0;
  let perm = [];
  let j = 0;
  for (let i of [0, 1, 2, 3, 4, 9, 10, 11, 12, 13]) {
    if (i !== 13) {
      index_o += o[i] * Math.pow(3, j);
    }
    perm[j] = p[i] < 5 ? p[i] : p[i] - 4;
    j++;
  }
  return [index_o, evenpermutation_to_index(perm)];
}
function solve_phase4_fast(state) {
  return phase4_ida_solve(index_phase4(state));
}
function solve(state) {
  let sol = [];
  for (let solver of [
    solve_phase1,
    solve_phase2,
    solve_phase3,
    solve_phase4_fast
  ]) {
    let phase_sol = solver(state);
    state = apply_move_sequence(state, phase_sol);
    sol = sol.concat(phase_sol);
  }
  return sol;
}
var tables = {};
function generate_phase23_orientation_mtable() {
  if (tables.phase23om) {
    return tables.phase23om;
  }
  const C15_5 = C(15, 5);
  const THREE = [1, 3, 9, 27, 81, 243];
  let phase23om = Array(C(15, 5) * THREE[5]);
  tables.phase23om = phase23om;
  for (let i = 0; i < C15_5; i++) {
    let comb = index_to_comb(i, 5, 15).concat(Array(5).fill(0));
    let new_comb_indices = [];
    for (let move_index = 0; move_index < 6; move_index++) {
      let new_comb = compose(comb, moves[move_index][0]).slice(0, 15);
      new_comb_indices[move_index] = comb_to_index(new_comb);
    }
    for (let j = 0; j < THREE[5]; j++) {
      phase23om[j + 243 * i] = [];
      let orient_full = [];
      for (let k = 0, l = 0; k < 20; k++) {
        if (comb[k] === 1) {
          orient_full[k] = (j / THREE[l] | 0) % 3;
          l++;
        } else {
          orient_full[k] = 99;
        }
      }
      for (let move_index = 0; move_index < 6; move_index++) {
        let move = moves[move_index];
        let new_orient_full = [];
        for (let k = 0; k < 15; k++) {
          new_orient_full[k] = orient_full[move[0][k]] + move[1][k];
        }
        let new_orient = new_orient_full.filter((x) => x < 10);
        let J = 0;
        for (let k = 0; k < 5; k++) {
          J += new_orient[k] % 3 * THREE[k];
        }
        phase23om[j + 243 * i][move_index] = J + 243 * new_comb_indices[move_index];
      }
    }
  }
  return phase23om;
}
function generate_phase2_orientation_ptable() {
  if (tables.phase2op) {
    return tables.phase2op;
  }
  let mtable = generate_phase23_orientation_mtable();
  return tables.phase2op = bfs(mtable, [243 * 3002]);
}
function generate_phase3_orientation_ptable() {
  if (tables.phase3op) {
    return tables.phase3op;
  }
  let mtable = generate_phase23_orientation_mtable();
  return tables.phase3op = bfs(mtable, [243 * 246]);
}
function generate_phase23_permutation_mtable() {
  if (tables.phase23pm) {
    return tables.phase23pm;
  }
  const FIFTEEN = [
    1,
    15,
    225,
    Math.pow(15, 3),
    Math.pow(15, 4),
    Math.pow(15, 5)
  ];
  let phase23pm = Array(FIFTEEN[5]);
  let single = Array(15);
  for (let i = 0; i < 15; i++) {
    single[i] = Array(6);
    for (let move_index = 0; move_index < 6; move_index++) {
      single[i][move_index] = moves[move_index][0].indexOf(i);
    }
  }
  let locations = [0, 0, 0, 0, 0];
  for (let ind = 0; ind < FIFTEEN[5]; ind++) {
    phase23pm[ind] = Array(6);
    for (let move_index = 0; move_index < 6; move_index++) {
      let new_ind = 0;
      for (let i = 0; i < 5; i++) {
        new_ind += single[locations[i]][move_index] * FIFTEEN[i];
      }
      phase23pm[ind][move_index] = new_ind;
    }
    locations[0]++;
    for (let i = 0; i < 4; i++) {
      if (locations[i] === 15) {
        locations[i] = 0;
        locations[i + 1]++;
      }
    }
  }
  return tables.phase23pm = phase23pm;
}
function generate_phase2_permutation_ptable() {
  if (tables.phase2pp) {
    return tables.phase2pp;
  }
  let mtable = generate_phase23_permutation_mtable();
  return tables.phase2pp = bfs(mtable, [213090]);
}
function generate_phase3_permutation_ptable() {
  if (tables.phase3pp) {
    return tables.phase3pp;
  }
  let mtable = generate_phase23_permutation_mtable();
  return tables.phase3pp = bfs(mtable, [737420]);
}
function generate_phase4_orientation_mtable() {
  if (tables.phase4om) {
    return tables.phase4om;
  }
  const THREE = [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683, 59049];
  let mtable = Array(THREE[9]);
  for (let i = 0; i < THREE[9]; i++) {
    let o = Array(14).fill(0);
    for (let j = 0; j < 9; j++) {
      let J = j < 5 ? j : j + 4;
      o[J] = (i / THREE[j] | 0) % 3;
      o[13] -= o[J];
    }
    o[13] = (o[13] + 999) % 3;
    mtable[i] = [];
    for (let move_index = 0; move_index < 3; move_index++) {
      let move = moves[move_index];
      let new_o = [0, 1, 2, 3, 4, 9, 10, 11, 12, 13].map(
        (i2) => o[move[0][i2]] + move[1][i2]
      );
      let new_i = 0;
      for (let j = 0; j < 9; j++) {
        new_i += new_o[j] % 3 * THREE[j];
      }
      mtable[i][move_index] = new_i;
    }
  }
  return tables.phase4om = mtable;
}
function generate_phase4_permutation_mtable() {
  if (tables.phase4pm) {
    return tables.phase4pm;
  }
  const HALFFACT10 = factorial(10) / 2;
  const n = 10;
  let pre = [0, 1, 2, 3, 4, -1, -1, -1, -1, 5, 6, 7, 8, 9];
  let post = [0, 1, 2, 3, 4, 9, 10, 11, 12, 13];
  let move_permutations = [
    compose(pre, compose(move_U[0], post)),
    compose(pre, compose(move_R[0], post)),
    compose(pre, compose(move_F[0], post))
  ];
  let mtable = Array(HALFFACT10);
  let perm = Array(10);
  for (let i = 0; i < HALFFACT10; i++) {
    index_to_evenpermutation10(i, perm);
    mtable[i] = [];
    for (let move_index = 0; move_index < 3; move_index++) {
      let new_perm = compose(perm, move_permutations[move_index]);
      mtable[i][move_index] = evenpermutation10_to_index(new_perm);
    }
  }
  return tables.phase4pm = mtable;
}
function generate_phase4_orientation_ptable() {
  if (tables.phase4op) {
    return tables.phase4op;
  }
  let mtable = generate_phase4_orientation_mtable();
  return tables.phase4op = bfs(mtable, [0]);
}
function generate_phase4_permutation_ptable() {
  if (tables.phase4pp) {
    return tables.phase4pp;
  }
  let mtable = generate_phase4_permutation_mtable();
  return tables.phase4pp = bfs(mtable, [0]);
}
function generate_phase4_near_ptable_list(threshold) {
  if (tables.phase4np_list && tables.phase4np_list.threshold === threshold) {
    return tables.phase4np_list;
  }
  let mtables = [
    generate_phase4_orientation_mtable(),
    generate_phase4_permutation_mtable()
  ];
  let base = Math.pow(3, 9);
  let states = [0];
  populate(threshold, [0, 0], -1);
  function populate(depth, state, last2) {
    states.push(state[0] + base * state[1]);
    if (depth === 0) {
      return;
    }
    let new_state = [];
    for (let move_index = 0; move_index < 3; move_index++) {
      if (move_index === last2) {
        continue;
      }
      new_state[0] = state[0];
      new_state[1] = state[1];
      for (let r = 1; r < 5; r++) {
        new_state[0] = mtables[0][new_state[0]][move_index];
        new_state[1] = mtables[1][new_state[1]][move_index];
        populate(depth - 1, new_state, move_index);
      }
    }
    return;
  }
  states.sort((x, y) => x - y);
  let unique_states = [];
  let last = -1;
  for (let state of states) {
    if (state !== last) {
      unique_states.push(last = state);
    }
  }
  unique_states.threshold = threshold;
  return tables.phase4np_list = unique_states;
}
function binary_search(A, x) {
  let lo = 0;
  let hi = A.length - 1;
  while (hi - lo > 1) {
    let mid = lo + hi >> 1;
    if (x > A[mid]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return x === A[lo] || x === A[hi];
}
function bfs(mtable, goal_states) {
  let N = mtable.length;
  let nmoves = mtable[0].length;
  let ptable = Array(N).fill(-1);
  for (let state of goal_states) {
    ptable[state] = 0;
  }
  let depth = 0;
  let done = false;
  while (!done) {
    done = true;
    for (let state = 0; state < N; state++) {
      if (ptable[state] !== depth) {
        continue;
      }
      for (let move_index = 0; move_index < nmoves; move_index++) {
        let new_state = mtable[state][move_index];
        while (new_state !== state) {
          if (ptable[new_state] === -1) {
            done = false;
            ptable[new_state] = depth + 1;
          }
          new_state = mtable[new_state][move_index];
        }
      }
    }
    depth++;
  }
  return ptable;
}
function ida_solve(indices, mtables, ptables) {
  let ncoords = indices.length;
  let bound = 0;
  for (let i = 0; i < ncoords; i++) {
    bound = Math.max(bound, ptables[i][indices[i]]);
  }
  while (true) {
    let path = ida_search(indices, mtables, ptables, bound, -1);
    if (path !== void 0) {
      return path;
    }
    bound++;
  }
}
function ida_search(indices, mtables, ptables, bound, last) {
  let ncoords = indices.length;
  let nmoves = mtables[0][0].length;
  let heuristic = 0;
  for (let i = 0; i < ncoords; i++) {
    heuristic = Math.max(heuristic, ptables[i][indices[i]]);
  }
  if (heuristic > bound) {
    return;
  }
  if (bound === 0 || heuristic === 0) {
    return [];
  }
  for (let m = 0; m < nmoves; m++) {
    if (m === last) {
      continue;
    }
    let new_indices = indices.slice();
    for (let c = 0; c < ncoords; c++) {
      new_indices[c] = mtables[c][indices[c]][m];
    }
    let r = 1;
    while (indices.some((_, i) => indices[i] !== new_indices[i])) {
      let subpath = ida_search(new_indices, mtables, ptables, bound - 1, m);
      if (subpath !== void 0) {
        return [[m, r]].concat(subpath);
      }
      for (let c = 0; c < ncoords; c++) {
        new_indices[c] = mtables[c][new_indices[c]][m];
      }
      r++;
    }
  }
  return;
}
function phase4_ida_solve(indices) {
  let mtable_o = generate_phase4_orientation_mtable();
  let mtable_p = generate_phase4_permutation_mtable();
  let ptable_o = generate_phase4_orientation_ptable();
  let ptable_p = generate_phase4_permutation_ptable();
  let ptable_n = generate_phase4_near_ptable_list(PHASE4_THRESHOLD);
  let bound = Math.max(ptable_o[indices[0]], ptable_p[indices[1]]);
  while (true) {
    let path = phase4_ida_search(
      indices,
      bound,
      -1,
      mtable_o,
      mtable_p,
      ptable_o,
      ptable_p,
      ptable_n
    );
    if (path !== void 0) {
      return path;
    }
    bound++;
  }
}
function phase4_ida_search(indices, bound, last, mtable_o, mtable_p, ptable_o, ptable_p, ptable_n) {
  let heuristic = Math.max(ptable_o[indices[0]], ptable_p[indices[1]]);
  if (heuristic > bound) {
    return;
  }
  if (heuristic <= PHASE4_THRESHOLD && !binary_search(ptable_n, indices[0] + 19683 * indices[1])) {
    heuristic = PHASE4_THRESHOLD + 1;
  }
  if (heuristic > bound) {
    return;
  }
  if (bound === 0 || heuristic === 0) {
    return [];
  }
  for (let m = 0; m < 3; m++) {
    if (m === last) {
      continue;
    }
    let new_indices = indices.slice();
    for (let r = 1; r < 5; r++) {
      new_indices[0] = mtable_o[new_indices[0]][m];
      new_indices[1] = mtable_p[new_indices[1]][m];
      let subpath = phase4_ida_search(
        new_indices,
        bound - 1,
        m,
        mtable_o,
        mtable_p,
        ptable_o,
        ptable_p,
        ptable_n
      );
      if (subpath !== void 0) {
        return [[m, r]].concat(subpath);
      }
    }
  }
  return;
}
function getRandomKilominxScramble() {
  return new Alg(stringify_move_sequence(generate_random_state_scramble()));
}
export {
  getRandomKilominxScramble
};
//# sourceMappingURL=search-dynamic-solve-kilominx-I7ZZOZ6H.js.map
