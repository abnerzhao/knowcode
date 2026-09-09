# knowcode · 一题一会

从算法到系统设计，选一本，练一题。

一个面向开发者的日常练习与面试复习网站。以书架组织习题册，支持顺序练习、按难度随机抽题，以及本地保存的代码和思路草稿。使用原生 HTML、CSS、JavaScript 构建，无后端、无运行时依赖，可部署为纯静态站点。

## 习题册

目前提供 **8 本习题册、566 个题目条目**。

| 习题册 | 题数 | 内容 |
| --- | ---: | --- |
| HOT 100 | 100 | LeetCode 热题 100，按官方题单顺序练习 |
| 面试经典 150 | 150 | 常见算法与数据结构题 |
| 剑指 Offer | 75 | 对应原 `-lcof` 题目，保留当前官方 LCR 编号和题干 |
| 场景实战 | 20 | 缓存、一致性、并发、故障排查等工程场景 |
| 系统设计 | 20 | 需求分析、容量估算、架构与故障取舍 |
| DevOps / SRE | 61 | 交付、基础设施、排障，以及 SLO、可观测性、应急、容量和容灾 |
| 数据与中间件 | 80 | MySQL、Redis、Elasticsearch、Apache Kafka，各 20 题 |
| 操作系统与网络 | 60 | 操作系统、Linux 常用命令、计算机网络，各 20 题 |

不同算法题库可能包含相同题目，条目总数不代表互不重复的题数。讨论题为本站原创整理，不标榜企业真题或未经验证的面试频率排名。

## 练习方式

先选择习题册，再选择练习模式。

- **顺序练习**：通过目录、搜索和上一题／下一题导航；算法题沿用题单顺序，讨论题按主题编排。
- **随机练习**：直接开始抽题，在练习页切换全部、简单、中等或困难；同一轮不重复，下一轮避免立即重复上一题。
- **代码草稿**：支持 Java、JavaScript、TypeScript、Python、C++、Go。Java 提供初始模板，其他语言从空白开始。
- **思路草稿**：讨论题使用可换行的纯文本编辑框；纯问题题目不附答案或答题提纲。
- **编辑与保存**：支持复制、重置确认和本地自动保存；默认浅色，可手动切换深色并记住偏好。
- **移动端**：支持切换题目描述与编辑区，题目目录可折叠。

刷新会保留 URL 中的题库、模式与题目；随机队列不会持久化，刷新或重新进入随机练习会开启新一轮。讨论题难度是本站练习分级。

## 快速开始

需要 **Node.js 20 或更新版本**。日常开发和构建不需要安装 npm 依赖。

```sh
git clone git@github.com:abnerzhao/knowcode.git
cd knowcode
npm run dev
```

浏览器打开 [http://127.0.0.1:4173](http://127.0.0.1:4173)。请通过 HTTP 服务访问，不要直接双击 HTML 文件。

端口被占用时可以指定其他端口：

```sh
PORT=4174 npm run dev
```

## 检查与构建

```sh
npm test         # 题库完整性与核心逻辑测试
npm run check    # JavaScript 语法检查、测试、静态构建
npm run build    # 生成 dist/
npm run preview  # 预览 dist/，默认使用 4173 端口
```

构建只校验并复制仓库内的静态文件，不访问外部接口，也不会自动抓取题库。开发服务和预览服务默认使用相同端口，请避免同时启动，或通过 `PORT` 区分。

### 可选：浏览器回归

先在默认端口启动网站，再运行：

```sh
npm run test:browser
```

该检查需要额外提供 Playwright 及浏览器环境，不是网站运行依赖。可以设置 `PLAYWRIGHT_MODULE` 指向本机已有 Playwright 的 `index.mjs`，设置 `BROWSER_CHANNEL=chrome` 使用已安装的 Chrome。

检查覆盖题库导航、随机抽题、草稿保存、配色切换、移动端布局、加载失败与浏览器存储不可用等情况；截图输出到被 Git 忽略的 `.cache/screenshots/`。

## 静态部署

仓库自带 `vercel.json`，已配置构建命令、输出目录和安全响应头。导入仓库时使用：

| 配置 | 值 |
| --- | --- |
| Root Directory | 仓库根目录 |
| Framework Preset | Other |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| 环境变量 | 不需要 |

也可以将 `dist/` 部署到其他静态 HTTP 服务。页面使用 hash 路由，不需要服务端处理题目路径；没有后端服务、数据库或登录系统。

## 数据与隐私

- 题目、示例图片和页面资源随项目提供，练习时无需访问外部题库接口；点击原题或参考链接后会访问对应网站。
- 草稿只存储在当前浏览器的 `localStorage` 中，按题库、题目和语言隔离，不上传、不跨设备同步。
- 配色偏好在所有习题册间共用，与草稿分开存储。
- 清理浏览器数据、切换浏览器或更换站点域名后，原草稿不会自动迁移；重要内容请自行复制备份。
- 存储不可用或空间不足时会显示提示，仍可继续练习。

## 功能边界

**这是复习和草稿工具，不是在线判题系统。**

代码编辑框不会编译或运行代码，没有隐藏测试用例与自动评分。“去验证”会打开对应力扣原题，需要自行选择语言并粘贴代码。讨论题不提供标准答案，也不会自动评价作答。

DevOps / SRE 原有 36 题保留场景、设计和知识提纲；新增 25 道日常工作题，以及数据与中间件、操作系统与网络两册，仅提供问题与空白草稿。所有运维场景均用于文本推演，不要求在生产环境执行操作。

## 题库来源

### 算法题

- [LeetCode 热题 100](https://leetcode.cn/studyplan/top-100-liked/) → `public/data/questions.json`
- [LeetCode 面试经典 150](https://leetcode.cn/studyplan/top-interview-150/) → `public/data/interview150.json`
- [LeetCode Interview 75](https://leetcode.cn/studyplan/coding-interviews/) → `public/data/offer.json`

剑指 Offer 册使用原 `-lcof` 题目链接，不混入 Offer II。官网已更新的题目名称和内容以数据抓取时的版本为准，不是旧版书籍题干的原样存档。

JSON 保存每题来源、分类、顺序和数据更新时间；题目示意图保存在 `public/images/`。

### 工程与面试题

根据第一方技术资料及有注明来源的讨论主题重新编写，不转载整篇资料或答案。选题依据、技术版本和适用边界见：

- [场景实战与系统设计](docs/interview-sources.md)
- [DevOps / SRE 与日常工作](docs/devops-sre-sources.md)
- [数据与中间件](docs/data-middleware-sources.md)
- [操作系统与网络](docs/os-network-sources.md)

### 更新题库

仅在需要更新算法数据时运行抓取脚本，正常启动和部署不需要执行：

```sh
npm run fetch:questions
npm run fetch:questions -- --bank=interview150
npm run fetch:questions -- --bank=offer
npm run fetch:questions -- --refresh
```

脚本依赖网络和 `curl`，复用 `.cache/`，支持断点续抓、有限重试；某册全部题目及图片成功后才替换该册正式数据。脚本只访问公开页面，不使用登录信息、不绕过验证码。抓取失败会明确报错，不生成虚构题目。

可通过 `LEETCODE_PROXY` 指定自己的 HTTP 代理；需要浏览器渲染时可使用 `--browser`，并按上述方式配置可选的 Playwright 环境。

讨论题直接维护本地 JSON 和来源笔记，不使用力扣抓取脚本：

- 每题使用稳定的 `slug` 和编号，避免使已有链接及草稿失效。
- 使用 `kind: discussion`、`references` 与 `answerTemplate`，每题 `source` 对应其参考来源之一。
- 纯问题使用 `format: questions-only`，`answerTemplate` 为空字符串；其他讨论题保留非空提纲。
- 新增习题册时同步更新目录、资源路由、来源和测试；提交前运行 `npm run check`。

## 项目结构

```text
index.html                  页面结构
styles.css                  书架、响应式布局与编辑区配色
src/
  app.js                    页面状态、编辑、存储与交互
  banks.js                  习题册目录与存储键
  core.js                   校验、筛选、随机队列与路由
  content.js                题干 HTML 白名单处理
public/
  data/                     8 个静态题库
  images/                   本地题目示意图
  favicon.svg               网站图标
docs/                       选题来源与核验记录
scripts/
  serve.mjs                 本地开发与预览
  build.mjs                 静态构建
  fetch-questions.mjs        算法题库抓取
  browser-check.mjs          可选浏览器回归
tests/core.test.mjs          题库与核心逻辑测试
vercel.json                 静态部署配置
LICENSE                     项目代码许可证
```

## 许可与内容声明

项目代码采用 [MIT License](LICENSE)。第三方题目、题干、示例图片及引用资料的权利归各自权利人所有，不因本仓库的代码许可证而改变；相关第三方声明见 [THIRD_PARTY_LICENSES.txt](public/THIRD_PARTY_LICENSES.txt)。

本项目不是 LeetCode 或其他资料来源方的官方产品。公开部署或再分发第三方内容前，请确认相应使用权限。
