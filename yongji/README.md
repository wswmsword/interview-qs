# Coding Interview 

## A

进入文件夹目录后，运行 `python3 ./mystic-waves.py`。

After entering the folder directory, run `python3 ./mystic-waves.py`.

## B

```
题意：
x*4+y*6=n
问，x+y 最大和最小为多少。

Problem description:  
x*4+y*6=n  
Question: what are the maximum and minimum values of x + y?
```

可以用动态规划实现，状态转移方程为：

```
maxF(n)=max(maxF(n-4), maxF(n-6))+1
minF(n)=min(minF(n-4), minF(n-6))+1
```

This can be solved using dynamic programming. The state transition equations are:

```
maxF(n)=max(maxF(n-4), maxF(n-6))+1
minF(n)=min(minF(n-4), minF(n-6))+1
```

用滚动数组优化内存。⚠️动态规划的实现对于大数 n 会超时。

Use a rolling array to optimize memory usage. ⚠️ However, the dynamic programming approach may time out for large values of n.

进入文件夹目录后，运行 `python3 ./cargo-craft-fleet.py`。

After entering the folder directory, run `python3 ./cargo-craft-fleet.py`.

## C

查看文件夹内的 [markdown 文件](./C/api-qs.md)。

Check the [markdown file](./C/api-qs.md) in the folder.

## frontend

该题使用 Cursor 辅助完成。

This task was completed with the assistance of Cursor.

```bash
npm install
npm run dev
```

运行后，在链接后添加 `?failProduct=1` 模拟获取信息失败的场景。

After running, append `?failProduct=1` to the URL to simulate a failure scenario when fetching data.