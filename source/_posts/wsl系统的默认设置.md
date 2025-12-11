---
title: wsl系统的默认设置
categories:
  - 总结
tags:
  - 总结
date: 2025-12-11 14:04:55
---

# WSL 默认发行版被 Docker 篡改？快速修复指南

> 记录一次 WSL 默认发行版被 Docker Desktop 自动篡改的问题和解决方案

## 🚨 问题现象
明明设置了 `Ubuntu` 为默认 WSL 发行版，但某天打开终端发现：
- 输入 `wsl` 命令进入了 `docker-desktop`
- 或者在 PowerShell 中看到默认标记 `*` 在 Docker 发行版上

## 🔍 原因分析
**罪魁祸首：Docker Desktop for Windows**

当安装或更新 Docker Desktop 时，它会：
1. 自动创建两个 WSL 2 发行版：
   - `docker-desktop`（运行环境）
   - `docker-desktop-data`（数据存储）
2. **有时会将自己设为默认发行版**
3. 特别是重启电脑或更新 Docker 后容易发生

## 🛠️ 解决方案

### 方法一：简单修复（推荐）
```powershell
# 1. 查看当前所有发行版及状态
wsl -l -v

# 2. 设置 Ubuntu 为默认发行版
wsl --set-default Ubuntu

# 3. 验证修改
wsl -l -v
# 应该看到 * 标记在 Ubuntu 前
```

### 方法二：禁用 Docker 自动设置
```powershell
# 如果只想保留 Docker 但不想让它捣乱
wsl --shutdown

# 然后打开 Docker Desktop：
# Settings → Resources → WSL Integration
# 取消勾选 "Start Docker Desktop when you log in"
# 或只保留需要的发行版集成
```

### 方法三：彻底移除 Docker 发行版
```powershell
# 如果完全不需要 Docker 的 WSL 发行版
wsl --unregister docker-desktop
wsl --unregister docker-desktop-data

# 重新设置默认
wsl --set-default Ubuntu
```

## 📝 预防措施

### 1. 检查默认发行版的快捷命令
```powershell
# 创建检查别名（PowerShell 中）
function Check-WSLDefault {
    wsl -l -v | Select-String "*"
}
```

### 2. 使用 WSL 配置文件（Windows 11 22H2+）
在 `C:\Users\<用户名>\.wslconfig` 中添加：
```ini
[wsl2]
default = Ubuntu  # 锁定默认发行版
```

### 3. 直接启动特定发行版
```bash
# 明确指定发行版，避免依赖默认值
wsl -d Ubuntu  # 总是启动 Ubuntu
wsl -d Debian  # 启动 Debian
```

## 🎯 一键修复脚本
```powershell
# 保存为 fix-wsl-default.ps1
Write-Host "正在检查 WSL 默认发行版..." -ForegroundColor Cyan
wsl -l -v

$defaultDistro = Read-Host "请输入要设为默认的发行版名称 (如: Ubuntu)"
wsl --set-default $defaultDistro

Write-Host "已设置 $defaultDistro 为默认发行版！" -ForegroundColor Green
wsl -l -v

Pause
```

## 💡 实用技巧
1. **快速切换发行版**：
   ```powershell
   # 临时切换
   wsl -d Ubuntu -- ls -la
   
   # 设置会话默认
   $env:WSL_DISTRO_NAME="Ubuntu"
   ```

2. **查看发行版详细信息**：
   ```powershell
   # 查看 Ubuntu 的 WSL 版本
   wsl --status
   
   # 导出当前配置备份
   wsl --export Ubuntu ubuntu_backup.tar
   ```

3. **别名设置（Linux 端）**：
   ```bash
   # 在 ~/.bashrc 中添加
   alias wsl-restart='wsl --shutdown && wsl'
   ```

## ⚠️ 注意事项
- Docker Desktop 更新后可能需要重新设置
- WSL 2 比 WSL 1 更适合 Docker 集成
- 不要删除 `docker-desktop-data` 除非你确定不需要 Docker 数据

## 📦 相关命令速查
| 命令 | 说明 |
|------|------|
| `wsl -l -v` | 列出所有发行版及状态 |
| `wsl --set-default <名称>` | 设置默认发行版 |
| `wsl --set-version <名称> 2` | 升级到 WSL 2 |
| `wsl --shutdown` | 停止所有 WSL 实例 |
| `wsl --unregister <名称>` | 删除发行版 |

---

**总结**：Docker Desktop 为了自身集成会"自作主张"，定期检查 `wsl -l -v` 确保默认发行版符合预期。最简单的修复就是 `wsl --set-default Ubuntu`。

> 更新日期: 2024年 | 环境: Windows 10/11 + WSL 2