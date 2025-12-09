---
title: C++ 使用 cout 控制小数点输出位数（fixed + setprecision）
categories:
  - C++学习
tags:
  - C++
date: 2025-12-09 20:37:04
---

在 C++ 刷题或写程序时，经常需要控制浮点数输出的小数位数（比如保留 2 位或 6 位小数）。使用 `cout` 配合 `<iomanip>` 头文件中的 `std::fixed` 和 `std::setprecision` 即可轻松实现。

## 基本用法

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double x = 3.1415926;
    cout << fixed << setprecision(2) << x << endl;  // 输出: 3.14
    return 0;
}
```
