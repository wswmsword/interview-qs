# Coding Interview 

## A

进入文件夹目录后，运行 `python3 ./mystic-waves.py`。

## B

```
题意：
x*4+y*6=n
问，x+y 最大和最小为多少。
```

可以用动态规划实现，状态转移方程为：

```
maxF(n)=max(maxF(n-4), maxF(n-6))+1
minF(n)=min(minF(n-4), minF(n-6))+1
```

用滚动数组优化内存。动态规划的实现对于大数 n 会超时。

进入文件夹目录后，运行 `python3 ./cargo-craft-fleet.py`。

## C

查看文件夹内的 [markdown 文件](./C/api-qs.md)。

## frontend

改题使用 Cursor 辅助完成。

```bash
npm install
npm run dev
```

运行后，在链接后添加 `?failProduct=1` 模拟获取信息失败的场景。