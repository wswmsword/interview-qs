def f(n: int):
    if n & 1:
        return -1  # 奇数直接 -1
    if n in (1, 2, 3, 5, 6):
        return -1

    maxF = {}
    minF = {}

    maxF[0] = minF[0] = 0
    maxF[4] = minF[4] = 1
    maxF[6] = minF[6] = 1

    res = [1, 1]

    for i in range(7, n + 1):
        res = [None, None]

        idx4 = ((i - 4 + 6) % 6) or 6
        idx6 = ((i - 6 + 6) % 6) or 6

        max4 = maxF.get(idx4)
        max6 = maxF.get(idx6)
        min4 = minF.get(idx4)
        min6 = minF.get(idx6)

        if max4 is None and max6 is None:
            max_val = -1
        else:
            max_val = max4 if (max6 is None or (max4 is not None and max4 > max6)) else max6

        if min4 is None and min6 is None:
            min_val = -1
        else:
            min_val = min4 if (min6 is None or (min4 is not None and min4 < min6)) else min6

        if max_val > -1:
            maxF[(i % 6) or 6] = max_val + 1
            res[1] = max_val + 1

        if min_val > -1:
            minF[(i % 6) or 6] = min_val + 1
            res[0] = min_val + 1

    return res


if __name__ == "__main__":

    n = int(input())

    for i in range(n):
      t = int(input().strip())
      ans = f(t)

      if ans == -1:
          print(-1)
      else:
          print(ans[0], ans[1])