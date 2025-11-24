---
title: {{ title }}
date: {{ date }}
---

# Hexo 日常使用指令完全指南

> 本文整理了 Hexo 博客的日常操作指令，从文章创作到部署发布，涵盖所有常用场景。

## 🚀 日常使用指令

### 文章创作流程
```bash
# 创建新文章
hexo new "文章标题"

# 本地预览（最常用）
hexo clean && hexo g && hexo s

# 部署发布
hexo clean && hexo g && hexo d
```

### 页面管理
```bash
# 创建关于页面
hexo new page about

# 创建标签页
hexo new page tags

# 创建分类页  
hexo new page categories
```

## ⚡ 快捷指令组合

### 一键预览
```bash
hexo clean && hexo g && hexo s
```

### 一键部署
```bash
hexo clean && hexo g && hexo d
```

### 写作+预览组合
```bash
hexo new "文章标题" && hexo clean && hexo g && hexo s
```

## 🛠️ 维护指令

### 清理缓存
```bash
hexo clean
```

### 仅生成静态文件
```bash
hexo generate
# 或
hexo g
```

### 仅启动服务器
```bash
hexo server
# 或  
hexo s
```

### 仅部署
```bash
hexo deploy
# 或
hexo d
```

## 📋 内容管理

### 草稿功能
```bash
# 创建草稿
hexo new draft "草稿标题"

# 发布草稿
hexo publish draft "草稿标题"
```

### 列出内容
```bash
# 列出所有文章
hexo list post

# 列出所有页面
hexo list page

# 列出所有草稿
hexo list draft
```

## 🎯 实用场景指令

### 调试模式
```bash
# 显示详细生成信息
hexo g --debug

# 详细输出模式
hexo g --verbose
```

### 指定端口
```bash
# 如果默认端口被占用
hexo s -p 5000
hexo server --port 5000
```

### 监视模式
```bash
# 自动检测文件变化
hexo g --watch
# 或
hexo g -w
```

### 静默模式
```bash
# 减少输出信息
hexo g --silent
```

## 💡 配置快捷脚本

### 在 `package.json` 中添加：
```json
{
  "scripts": {
    "preview": "hexo clean && hexo g && hexo s",
    "deploy": "hexo clean && hexo g && hexo d",
    "new": "hexo new",
    "serve": "hexo s",
    "clean": "hexo clean",
    "generate": "hexo g",
    "draft": "hexo new draft"
  }
}
```

### 使用快捷脚本：
```bash
npm run preview        # 本地预览
npm run deploy         # 部署发布
npm run new "标题"     # 创建文章
npm run serve          # 启动服务器
npm run clean          # 清理缓存
npm run generate       # 生成静态文件
npm run draft "标题"   # 创建草稿
```

### 自定义部署脚本 `deploy.sh`
```bash
#!/bin/bash
echo "🚀 开始部署Hexo博客..."
hexo clean
hexo g
hexo d
echo "✅ 博客部署完成！"
```

## 📊 指令速查表

| 场景 | 指令 | 说明 |
|------|------|------|
| **写新文章** | `hexo new "标题"` | 创建文章 |
| **本地测试** | `hexo clean && hexo g && hexo s` | 清理+生成+预览 |
| **发布博客** | `hexo clean && hexo g && hexo d` | 清理+生成+部署 |
| **创建页面** | `hexo new page 页面名` | 创建关于/标签等页面 |
| **清理缓存** | `hexo clean` | 修改配置后必用 |
| **创建草稿** | `hexo new draft "标题"` | 创建草稿文章 |
| **发布草稿** | `hexo publish draft "标题"` | 将草稿转为正式文章 |

## 🔧 高级配置指令

### 主题相关
```bash
# 安装主题
git clone https://github.com/theme-author/theme-name.git themes/theme-name

# 更新主题
cd themes/theme-name && git pull

# 切换主题后重新生成
hexo clean && hexo g
```

### 插件管理
```bash
# 安装插件
npm install hexo-generator-search --save

# 卸载插件
npm uninstall hexo-plugin-name --save
```

## 🎪 趣味指令彩蛋

### 在控制台查看博客信息
```bash
# 显示Hexo版本
hexo version

# 显示帮助信息
hexo help

# 显示Hexo配置
hexo config

# 列出所有命令
hexo list
```

### 生成站点地图
```bash
# 安装站点地图插件
npm install hexo-generator-sitemap --save

# 安装百度站点地图插件
npm install hexo-generator-baidu-sitemap --save
```

## 🚨 常见问题解决

### 端口占用问题
```bash
# 查找占用4000端口的进程
lsof -i :4000

# 杀死进程
kill -9 <PID>

# 或者换端口启动
hexo s -p 5000
```

### 部署失败处理
```bash
# 重新安装部署插件
npm install hexo-deployer-git --save

# 检查部署配置
cat _config.yml | grep deploy
```

### 主题显示异常
```bash
# 清理重新生成
hexo clean
hexo g
hexo s
```

## 💡 使用小贴士

### 日常写作流程
1. **开始写作**：`hexo new "文章标题"`
2. **编辑内容**：在 `source/_posts/` 中找到文件编辑
3. **本地预览**：`hexo clean && hexo g && hexo s`
4. **检查效果**：访问 `http://localhost:4000`
5. **部署发布**：`hexo clean && hexo g && hexo d`

### 重要提醒
- 🎯 **部署前务必先本地预览**
- 🔧 **修改配置后记得 `hexo clean`**
- 💾 **定期备份源码到Git仓库**
- 📝 **使用有意义的文章文件名**

### 推荐工作流
```bash
# 1. 创建文章
hexo new "我的新文章"

# 2. 编写内容（在编辑器中）

# 3. 本地测试
hexo clean && hexo g && hexo s

# 4. 提交源码到Git
git add .
git commit -m "post: 发布新文章"
git push

# 5. 部署发布
hexo clean && hexo g && hexo d
```

---

> 记住：日常写作只需掌握前几个核心指令组合即可满足大部分需求。Happy Blogging! 🎉

**标签**: `Hexo`, `博客管理`, `命令行`, `工作流`, `静态站点`

**分类**: `技术指南 / 博客建设`