n = int(input())

for i in range(n):

  a, b = map(int, input().split())

  if b & 1:
    print(a)
  else: print(0)