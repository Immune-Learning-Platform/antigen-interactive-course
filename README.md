# 抗原 · 互动学习资源（兽医免疫学 第一章第一节）

一个面向课堂演示与课外自主学习的静态教学站点：把《兽医免疫学》第一章第一节《抗原》的课堂教学内容，重构为可交互的在线学习资源（知识图谱、三维模型、分步动画、随堂测评、案例教学、课程思政、学科前沿、扫码入口）。

- 技术栈：React 19 + TypeScript 5 + Vite 7 + Three.js（原生 API）
- 构建产物：纯静态文件，可部署到任意支持 HTTPS 的静态托管（默认方案：GitHub Pages）
- 无后端：学习记录保存在**本机浏览器**（localStorage），不上传、不做“教师后台”
- 无位图素材：所有图示为原创 SVG、三维模型为程序化几何，无版权与元数据风险

---

## 一、快速开始

```bash
npm install
npm run dev          # 本地开发 http://localhost:5173
npm run build        # 生产构建（先做 TypeScript 类型检查）
npm run preview      # 预览构建产物
```

质量检查：

```bash
npm run typecheck                     # 仅类型检查
npm run preview:test                  # 在 4321 端口预览（供 e2e 使用）
npm run e2e                           # 冒烟验收（需先启动 preview:test）
```

> `npm run e2e` 依赖 `playwright-core` 与本机已安装的 Edge/Chrome（不下载浏览器）。
> 若使用 Chrome：`E2E_CHANNEL=chrome npm run e2e`。

---

## 二、目录结构

```
src/
  content/                    ← 内容层（换章节只改这里）
    types.ts                  内容数据模型（全部章节共用）
    index.ts                  课程注册表 + 学习进度口径
    antigen/
      course.ts               课程元信息、导航、首页分区、知识图谱
      modules.ts              三个知识模块正文（含补充知识标注）
      questions.ts            全部题目（课前/随堂/互动/作业/测验）
      extras.ts               案例、作业分层、评价维度、思政、前沿、术语表
  components/                 ← 可复用组件
    ui.tsx                    原子组件（标题/卡片/标签/提示/进度）
    AppShell.tsx              全站骨架：双层导航、面包屑、进度、移动端抽屉
    learn.tsx                 页头、三维目标、知识图谱、学习路径、课堂任务卡
    quiz.tsx                  题型引擎（单选/多选/判断/排序/拖拽分类/开放题）
    progress.tsx              学习进度（localStorage）+ 统计
    glossary.tsx              术语悬停解释
    visuals.tsx               原创 SVG 科学图示
    labs.tsx                  三维实验室（表位 / 结构解剖台 / AI 结构示意）
    StepPlayer.tsx            分步动画播放器（播放/暂停/重播/变速/跳步）
    BindingSimulator.tsx      抗原—抗体匹配模拟
    ModuleVisual.tsx          可视化分发器（visual key → 组件）
  three/                      ← Three.js 场景（程序化建模）
    ModelViewer.tsx           通用查看器：轨道控制、标签投影、拾取、取景、降级
    createAntibodyScene.ts    抗体—抗原表位模型
    createBacteriumScene.ts   细菌结构成分抗原模型
    createVirusScene.ts       有囊膜病毒模型
    shared.ts                 配色、光照、高亮、释放工具
  pages/                      ← 页面（只做渲染与交互，不硬编码学科知识）
  styles/                     ← tokens.css（设计令牌）/ global.css / components.css
scripts/
  make-qr.mjs                 生成静态二维码 PNG + SVG
  e2e-smoke.mjs               冒烟验收（路由/交互/三维/多分辨率/移动端）
docs/                         匿名化检查报告、测试记录、复用说明
```

---

## 三、部署到 GitHub Pages（推荐方案）

### 1. 建仓库（中性命名）

仓库名建议保持中性，例如 `antigen-interactive-course`。描述不要写单位、姓名、比赛信息。

### 2. 推送代码

本目录（`web/`）内容即仓库根目录：

```bash
git init
git branch -M main
git add .
git commit -m "init: 抗原互动学习资源"
git remote add origin https://github.com/<账号>/<仓库>.git
git push -u origin main
```

> 提交前请确认 git 提交身份也是中性的（见 `docs/匿名化检查报告.md`）。

### 3. 开启 Pages

仓库 `Settings → Pages → Build and deployment → Source: GitHub Actions`。
仓库内置工作流 `.github/workflows/deploy.yml`：每次 push 到 `main` 自动构建并发布。

构建配置要点（已在 `vite.config.ts` 设好）：

- `base: './'` —— 产物使用相对路径，部署在 `/<仓库>/` 子路径下也能正常加载资源；
- 路由使用 `HashRouter` —— 刷新任意深链接不会 404，无需服务端重写规则。

### 4. 得到稳定地址

形如 `https://<账号>.github.io/<仓库>/`。这就是**固定 URL**：后续只更新内容、不换仓库/账号时，地址保持不变。

### 5. 生成二维码

页面 `#/qr` 会按**当前访问地址**实时生成二维码（部署后自动正确）。若要印刷素材：

```bash
npm run qr -- https://<账号>.github.io/<仓库>/
```

输出 `public/qr/site-qr.png`（1024×1024）与 `site-qr.svg`（矢量，放大不失真），随站点一起部署。

**可用性依赖（请如实告知使用者）**：二维码本身不会过期，但它指向的地址必须持续可访问；若删除仓库、账号受限、更换域名或托管策略变更，链接会失效。建议材料中同时保留纯文本链接。

---

## 四、修改内容（教师日常维护）

| 想改什么 | 改哪个文件 |
|---|---|
| 课程标题 / 导语 / 学习目标 / 关键词 | `src/content/antigen/course.ts` |
| 模块正文、补充知识、随堂小测挂载 | `src/content/antigen/modules.ts` |
| 题目（题干、选项、答案、解析、回链） | `src/content/antigen/questions.ts` |
| 案例、作业分层、评价维度、思政、前沿、术语表、任务清单 | `src/content/antigen/extras.ts` |
| 配色、字号、间距 | `src/styles/tokens.css` |
| 导航栏目数量/名称 | `course.ts` 的 `nav`（顺序在 `AppShell.tsx` 的 `PRIMARY`/`UTILITY` 中） |

改完执行 `npm run build` 即可；`npm run e2e` 可回归验证。

---

## 五、复用：开发第 2—8 个课件

1. 复制 `src/content/antigen/` → `src/content/<course-id>/`，按新课件改写四个数据文件；
2. 在 `src/content/index.ts` 里新增 `courseBundle` 并在 `courses` 数组注册（`activeCourse` 指向本次要发布的课程）；
3. 若需要新的可视化，新增一个 `VisualKey` + 在 `ModuleVisual.tsx` 中登记组件；三维模型按 `createXxxScene.ts` 的约定新增（返回 `ViewerScene`，包含 `parts`/`toggles`/`fit`）；
4. 仓库级方案（多课程共用一个站点）可改为 `/:courseId/...` 路由；单课程独立仓库则各建一个站点即可。

**不要**为了占位而创建空壳页面：未开发的章节不要出现在导航里。

---

## 六、无障碍与性能

- 全站键盘可操作（Tab 顺序、`:focus-visible` 高亮、面包屑、抽屉、题目按钮均为原生控件）；
- 拖拽分类提供“点选条目 → 点分类框”的键盘/触屏替代路径；
- 判定结果通过 `role="status"`/`aria-live` 播报；
- `prefers-reduced-motion` 下关闭自动旋转与入场动画；
- 三维场景按设备能力降级（核数/内存/屏宽判断 → 低多边形、限帧、像素比上限）；
- WebGL 不可用时自动显示等价静态图示与结构清单，内容不丢失；
- 首屏 JS 已按 `react` / `three` / 业务代码分包（gzip 后约 18KB + 133KB + 149KB）。

---

## 七、已知边界

- 学习进度、答题与草稿仅存本机，**不是**教师可查看的分析后台；
- 站内不使用课件中的位图与视频（避免商品标识、水印、EXIF 与版权不明问题）；如需接入视频，把文件放入 `public/media/` 并核验内容与匿名性后引用；
- 三维模型为教学示意（结构比例、部件数量不代表真实电镜或原子级结构），页面内已注明；
- 学科内容以本章课件为准，超出部分一律标注“补充知识”并给出可核验来源。
