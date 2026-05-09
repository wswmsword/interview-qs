// v2
function t(n) {
  if (n & 1) return -1; // 奇数
  if ([1, 2, 3, 5, 6].includes(n)) return -1;
  const maxF = []
  const minF = []
  let res = [1, 1]
  maxF[0] = minF[0] = 0
  maxF[4] = minF[4] = 1
  maxF[6] = minF[6] = 1
  for (let i = 7; i < n + 1; ++i) {
    res = [];
    const max4 = maxF[((i - 4 + 6) % 6) || 6]
    const max6 = maxF[((i - 6 + 6) % 6) || 6]
    const min4 = minF[((i - 4 + 6) % 6) || 6]
    const min6 = minF[((i - 6 + 6) % 6) || 6]
    const max = max4 == null && max6 == null ?
      -1 :
      max4 > max6 ? max4 || max6 : max6 || max4;
    const min = min4 == null && min6 == null ?
      -1 :
      min4 > min6 ? min6 || min4 : min4 || min6;
    if (max > -1) {
      maxF[(i % 6) || 6] = max + 1;
      res[1] = max + 1;
    }
    if (min > -1) {
      minF[(i % 6) || 6] = min + 1;
      res[0] = min + 1;
    }
  }

  return res;
}


// v1
// function t(n) {
//   if ([1, 2, 3, 5, 6].includes(n)) return -1;
//   const maxF = []
//   const minF = []
//   maxF[4] = minF[4] = 1
//   maxF[6] = minF[6] = 1
//   for (let i = 7; i < n + 1; ++i) {
//     const max = maxF[i - 4] == null && maxF[i - 6] == null ?
//       -1 :
//       maxF[i - 4] > maxF[i - 6] ? maxF[i - 4] || maxF[i - 6] : maxF[i - 6] || maxF[i - 4];
//     const min = minF[i - 4] == null && minF[i - 6] == null ?
//       -1 :
//       minF[i - 4] > minF[i - 6] ? minF[i - 6] || minF[i - 4] : minF[i - 4] || minF[i - 6];
//     if (max > -1)
//       maxF[i] = max + 1;
//     if (min > -1)
//       minF[i] = min + 1;
//   }

//   return minF[n] == null && maxF[n] == null ? -1 : [minF[n] || maxF[n], maxF[n] || minF[n]];
// }