请检查 [Product.md](Product.md) ，这是项目的前端/后端需求文档，请评估，并告知我需要补充或遗漏的点，我来审核解答

---

整体评估：文档已能表达页面方向，但目前大约只有“原型开发级”完整度，尚不足以保证前后端实现一致、SEO 数据有效以及结果可客观验收。最大问题是“单商户还是商户列表”、路由、响应字段契约、响应式规则和 SEO 数据来源没有定稿。

## 一、需要优先确认的阻塞项

### 1. 页面究竟展示一个商户还是多个商户？

文档前面一直描述单个商户详情页，接口也返回单个对象；但 SSG 部分写的是获取“商家数据”，存在歧义：[Product.md:25](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/Product.md:25)。

请确认：

- 当前只生成一个固定商户详情页？
- 还是“墨尔本 → 装修服务”分类下有多个商户，每个商户生成一个详情页？
- 如果有多个商户，`/details` 应返回列表，还是使用 `/details/{slug}`？
- 是否还需要装修服务商户列表页？

建议：本次若是小型实现，明确为“一个固定商户详情页，不做列表页”。

### 2. 页面 URL 和面包屑路径

当前没有定义页面路由，因此 sitemap、Canonical 和 BreadcrumbList 都无法确定。

需要确认：

- 页面 URL，例如 `/melbourne/renovation/example-company` 还是 `/melbourne/renovation`？
- 面包屑是否为：`首页 > 墨尔本 > 装修服务 > 商户名称`？
- 前三级是否需要可点击？链接目标是什么？
- 网站正式域名是什么？没有域名就无法生成正式的 sitemap 和结构化数据绝对 URL。

建议默认：

```text
URL: /melbourne/renovation/example-company
面包屑：首页 > 墨尔本 > 装修服务 > 商户名称
站点域名：通过 NEXT_PUBLIC_SITE_URL 环境变量配置
```

### 3. 商户完整示例数据

响应示例只给出了两个 `info` 字段，但页面要求十个字段：[Product.md:13](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/Product.md:13)、[Product.md:35](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/Product.md:35)。

需要提供或确认：

- 商户名称
- 地区和区域
- 服务类别
- 公司名称
- 公司地址
- 公司网址
- 服务项目
- 姓名
- 电话
- 微信
- 邮箱
- 简介内容
- FAQ 问答内容，建议至少 3 条

同时需要决定：

- 哪些字段必填，哪些可空？
- 空字段隐藏整行，还是显示“暂无”？
- 字段顺序是否必须与文档一致？
- 电话和邮箱是否可点击？
- 公司网址显示完整 URL 还是简短域名？
- `服务项目` 是字符串，还是字符串数组？

建议不要使用中文 key 作为长期接口契约，可改成稳定的英文属性：

```json
{
  "name": "示例装修公司",
  "slug": "example-company",
  "info": {
    "location": "Melbourne CBD",
    "category": "装修服务",
    "companyName": "Example Renovation Pty Ltd",
    "address": "...",
    "website": "https://example.com",
    "services": ["室内装修", "厨房改造"],
    "contactName": "...",
    "phone": "...",
    "wechat": "...",
    "email": "..."
  },
  "intro": "...",
  "faq": []
}
```

### 4. 简介的内容格式与安全边界

“用户自定义内容”可能代表纯文本、Markdown 或后台富文本 HTML，这三种实现差异很大。

请确认：

- `intro` 是纯文本、Markdown，还是可信 HTML？
- 是否需要支持段落、标题、列表、链接和图片？
- 若允许 HTML，是否要求进行 XSS 清洗？
- 当前后端是硬编码数据，“用户自定义”是仅模拟已有内容，还是需要提供编辑/发布能力？

建议本期定义为 Markdown 或纯文本，不实现编辑功能；如接收 HTML，必须明确清洗规则。

### 5. Next.js 的具体实现模式

只写 Next.js 还不足以确定 SSG 方案。

需要确认：

- 使用 App Router 还是 Pages Router？
- Next.js、React、Tailwind、shadcn/ui 的版本要求？
- 使用 npm、pnpm 还是 yarn？
- “SSG”是要求构建时静态生成，还是要求最终可做完全静态导出？
- 构建期间 Django 服务不可用时，应构建失败还是使用本地兜底数据？
- 是否需要 ISR，还是数据更新后必须重新 build？

建议：使用当前稳定版 Next.js App Router，构建时请求 Django；请求失败则明确构建失败，不静默使用旧数据。

### 6. 前后端运行和交付方式

需要确认：

- 前后端放在同一仓库的 `frontend/`、`backend/` 目录吗？
- 本地端口分别是什么？
- 是否需要 Docker / Docker Compose？
- 是否需要 `.env.example`？
- 是否要求 README 包含安装、启动、构建和测试说明？
- Python、Django、DRF 的版本要求？
- 是否需要锁定依赖文件，例如 `requirements.txt`？

建议至少交付：

```text
frontend/
backend/
README.md
frontend/.env.example
backend/requirements.txt
```

## 二、页面与交互规则需要补齐

### 7. 分类网格尺寸存在歧义

文档同时要求“两行展示”“高度 120px”“每格最小宽 120px”：[Product.md:19](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/Product.md:19)。

需要确认：

- 120px 是整个分类区域的高度，还是每个分类格子的高度？
- 箭头是否占用网格可用宽度？
- 分类排列方向是先横向再换行，还是先纵向？
- 点击箭头每次翻一整页，还是移动一列？
- 第一页左箭头、最后一页右箭头是否禁用？
- 不足一页时是否隐藏箭头？
- 当前“装修服务”是否显示选中状态？
- 点击分类是否需要跳转？文档只说发布、登录无需功能，没有说明分类项。

建议：区域内容高度 120px，每行 60px；每次翻一页；边界箭头禁用；不足一页时隐藏箭头；装修服务显示选中态。

### 8. 移动端响应式规则

目前仅描述了最大宽度和动态列数，没有说明手机端。

需要确认：

- 最小支持宽度是 320px、360px 还是其他？
- 手机端导航栏如何容纳 icon、搜索框、发布和登录？
- 发布按钮是否可以隐藏文字或折叠？
- 商户信息左右结构在窄屏是否仍保持两列，还是改为上下排列？
- 页面左右 padding 分别是多少？
- 1024px 指内容宽度，还是包含左右 padding 后的容器总宽度？

建议：

- 容器 `max-width: 1024px`
- 桌面左右 padding 24px，移动端 16px
- 信息区域移动端仍为两列，但 key 列缩小；极窄屏改上下结构
- 导航栏与正文使用完全相同的容器规则

### 9. Fixed 导航栏行为

需要补充：

- 导航栏高度是多少？
- 正文是否添加对应顶部间距，防止内容被遮挡？
- 是否有背景、边框、阴影和 `z-index` 要求？
- 页面滚动时分类区是否跟随固定？目前看只有 navbar 固定。
- 左侧 icon 是品牌 Logo、房屋图标还是占位符？
- 搜索框是否允许输入？无需搜索功能时，提交后该发生什么？

建议：只有 navbar 固定；搜索框允许输入但不提交，或明确标记为视觉占位。按钮不要使用无法解释的假链接。

### 10. FAQ 行为

请确认：

- FAQ 有多少条？
- 默认全部折叠，还是第一条展开？
- 是否允许同时打开多个问题？
- FAQ 为空时隐藏整个板块，还是显示空状态？
- FAQ 是否需要额外生成 `FAQPage` 结构化数据？

建议：默认全折叠、单项展开；空数组时隐藏板块。是否加入 `FAQPage` 需你明确批准，因为当前只要求了另外三种结构化数据。

## 三、SEO 和结构化数据缺失项

文档要求 LocalBusiness、Service 和 BreadcrumbList，但后端数据尚不能完整支撑这些对象：[Product.md:23](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/Product.md:23)。

需要确认：

- 页面 `<title>` 和 meta description 的生成模板
- Canonical URL
- Open Graph 标题、描述和图片是否需要
- 商户 Logo 或图片是否存在
- LocalBusiness 的具体子类型，使用通用 `LocalBusiness` 还是更精确类型
- `address` 如何拆成街道、城市、州、邮编、国家
- Service 的 `provider`、`areaServed`、`serviceType`
- 电话国家区号和邮箱
- sitemap 是否只包含一个详情页
- 是否需要 `robots.txt`
- 测试环境是否应阻止索引

建议增加后端字段：

```text
slug
metaTitle
metaDescription
address.street
address.locality
address.region
address.postalCode
address.country
serviceArea
```

同时明确：JSON-LD 必须与页面可见内容一致，URL 使用绝对地址。

## 四、后端接口契约需要补齐

### 11. `/details` 的精确行为

Django 默认常见路径带尾斜杠，文档写的是 `/details`：[Product.md:30](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/Product.md:30)。

请确认：

- 最终是 `/details` 还是 `/api/details/`？
- 是否只允许 GET？
- 是否需要 API 版本，例如 `/api/v1/details/`？
- 成功状态是否固定为 `200`？
- 错误响应格式是什么？
- JSON 是否使用 UTF-8 中文原文？
- 是否要提供 DRF Browsable API？
- 是否需要健康检查接口？

建议使用：

```text
GET /api/v1/details/
200 application/json
```

### 12. CORS 范围

“允许跨域”需要明确安全范围：

- 开发环境只允许 `http://localhost:3000`？
- 生产环境允许哪个前端域名？
- 是否真的允许所有来源 `*`？
- 是否只开放 GET？

建议开发阶段允许 localhost，生产环境通过环境变量配置允许来源，不默认开放所有域名。

## 五、质量和验收标准

建议在文档中加入可以直接判断是否完成的验收条件：

- `npm run build` 时成功从 Django 获取数据并生成静态页面
- 查看页面源代码时能直接看到商户正文，不依赖客户端请求
- sitemap 包含正确的商户详情绝对 URL
- JSON-LD 可被解析，且内容与页面一致
- 320px 到桌面宽度无横向溢出
- 键盘可以操作分类翻页按钮和 FAQ
- 所有图标按钮具有可访问名称
- 页面只有一个 `h1`，标题层级连续
- 固定导航不遮挡正文或键盘焦点
- URL、电话、邮箱采用正确语义
- 前端对接口数据进行类型约束和必要校验
- 后端至少有一个接口测试，前端至少有构建或页面渲染验证
- 无数据库、登录、发布、搜索后台和管理后台功能

## 建议你优先回复这 12 项

为了快速推进，你可以直接按下面格式审核：

```text
1. 单商户还是多商户：
2. 页面 URL：
3. 正式域名或占位域名：
4. 面包屑层级：
5. 商户完整示例数据：
6. intro 格式（纯文本 / Markdown / HTML）：
7. 分类项是否可点击：
8. 分类区 120px 指整体还是单格：
9. 移动端信息表保持两列还是改上下结构：
10. Next.js App Router 是否可以：
11. 接口路径：
12. 是否接受上述建议验收标准：
```

其中第 1、2、3、5、6、8、11 项会直接影响架构或数据契约，建议在开发前确定；其余项目如果你不指定，可以采用上述建议默认值。

---

1. 页面展示单个商户
2. 路由路径为 `/melbourne/renovation/example-company`，`example-company`固定即可；面包屑前三级允许点击，点击后展示空页面即可；域名为 `test.com`
3. 字段响应使用稳定的英文，字段的必填与否暂不做限制，全部以硬编码、有数据的形式返回；服务项目是字符串数组；电话和邮箱可点击
4. 简介纯文本即可
5. 使用 App router，依赖库保持最新，使用 npm，构建时静态生成，不考虑 Django 服务不可用情况，无需 ISR
6. 前后端放在同一仓库的不同目录，使用默认端口，无需 Docker、无需环境变量文件，补充 README 包含安装、启动、构建、测试说明，Python 3.12、Django 5.2.x、djangorestframework 4.16.x；锁定依赖文件
7. 120px 为每个分类格子的高度，改一下，最小宽度为 136px，高度为 136px；箭头为 absolute 定位；分类先横向再换行；箭头翻整页；第一页和最后一页禁用箭头；不足一页隐藏；无需选中状态；不用跳转，占位即可，无功能
8. 不设置最小支持宽度；手机上将搜索框改为 icon 按钮，放在发布的左侧，无需点击响应；窄屏保持左右，允许左右滑动；padding自行决定；1024 为内容宽度，不包含 padding
9. navbar 高度为 60px；正文要添加间距避免遮挡；添加底部边框，无需阴影，z-index 大一点；分类无需跟随滚动；icon 为品牌 logo；搜索框输入即可，无需后续交互
10. faq 先放 7 条例子，默认都收起，生成 FAQPage 结构化数据；

SEO 相关：
title 和 description 自行决定；Open Graph 填充虚拟的即可；LocalBusiness 的具体子类型使用通用 LocalBusiness；address 为各个层级添加后端字段；sitemap 只需包含一个详情页；无需 robots.txt；无需阻止索引，不上线

后端契约：
11. `/details` 即可；GET；无需版本；固定为 200 状态码；无需错误格式；无需健康检查接口
12. 允许所有来源
以上是我的解答，没有答复的地方请结合我的回复按照你的推荐实现。接下来开始按顺序实现后端和前端，要注意项目的可读性和可维护性，对于通用的工具函数请抽取，但是不要刻意为了减少代码量而抽象方法、函数，导致代码难以理解和维护，前端要抽取通用组件复用。

---

已按确认后的需求完成后端、前端、SEO 与文档，未部署上线。

主要实现：

- Django `GET /details`、硬编码英文契约、分层地址、7 条 FAQ、全开放 CORS：[后端数据](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/backend/details/data.py:3)
- Next.js App Router 静态详情页：[页面入口](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/melbourne/renovation/example-company/page.tsx:14)
- 136×136 响应式分类分页、绝对定位翻页按钮：[分类组件](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/category-pager.tsx:10)
- 导航栏、面包屑、横向滚动商户信息、shadcn Accordion FAQ
- LocalBusiness、Service、BreadcrumbList、FAQPage、Canonical、Open Graph 和单页 sitemap
- 完整安装、启动、构建和测试说明：[README](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/README.md:1)

验证结果：

- Django 检查通过，2 个测试通过
- 前端 ESLint 通过，3 个测试通过
- Next.js 生产构建通过，详情页与 sitemap 均为静态预渲染
- 生产依赖安全审计：0 个已知漏洞
- 真实 `/details` HTTP 请求返回 200
- 生成 HTML 已确认包含正文和四类 JSON-LD

Django REST framework 不存在 4.16.x，因此根据[官方发布记录](https://www.django-rest-framework.org/community/release-notes/)锁定为 `3.16.1`；Django 锁定为 5.2 系列最新补丁版。前端要求 Node.js ≥20.9，已在 README 标明。

使用 `sites-building` 技能规范了组件拆分、静态构建和最终验证；按照你的“不上线”要求，没有执行部署。使用内置 `imagegen` 生成并接入了品牌化分享图：

![Open Graph 分享图](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/public/og.png)

<details>
<summary>Open Graph 最终生成提示词</summary>

```text
Use case: ads-marketing
Asset type: 1200x630 Open Graph social preview for a Chinese-language Melbourne local services merchant page
Primary request: create a complete polished social card for Harbour & Stone Renovations, representing a trustworthy Melbourne residential renovation company and the refined local-directory website 邻里集
Scene/backdrop: abstract architectural composition inspired by Melbourne townhouses and interior renovation plans; no people; clean editorial geometry, subtle paper grain
Subject: tasteful overlapping room-plan lines, an elegant house silhouette, and a small location-pin motif
Style/medium: premium flat editorial illustration with crisp modern typography, not a screenshot or UI mockup
Composition/framing: landscape 1200:630; strong teal brand block balanced with warm off-white space; generous safe margins for social cropping
Lighting/mood: calm, trustworthy, contemporary
Color palette: deep teal #0f766e, warm off-white #f7f8f6, slate #13201f, pale teal accents
Text (verbatim): "Harbour & Stone Renovations" and "墨尔本装修服务" and small brand label "邻里集"
Constraints: exact text only; highly legible at thumbnail size; no unrelated company names; no URL; no badge; no photo-realism
Avoid: watermark, browser chrome, device frame, clutter, illegible microtext, invented words
```

</details>

---

页面缺少交互动画。顶部网格，左右滑动的时候，检查是否可以复用 shadcn 的 Carousel 组件（https://ui.shadcn.com/docs/components/radix/carousel），并固定网格区域的高度，避免滑动到第二页的时候，内容不满两行时，导致布局抖动；FAQ 的手风琴组件（https://ui.shadcn.com/docs/components/radix/accordion）缺少过渡动画，请检查并修复，样式使用 shadcn 官网的五边框样式。

---

已完成交互动画修复。

- 顶部分类改为 shadcn 官方推荐的 Embla Carousel 结构，支持按钮、触摸拖拽和键盘方向键滑动：[Carousel 组件](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/ui/carousel.tsx:47)、[官方文档](https://ui.shadcn.com/docs/components/radix/carousel)
- 分类仍按响应式列数分页，每页固定为 `284px`，即两行 `136px` 加 `12px` 间距；第二页不足两行时不会改变高度：[分类网格](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/category-pager.tsx:91)
- 分类卡片增加悬浮上移、阴影和图标缩放动画。
- FAQ 使用官网 Borders 样式：外层完整边框，内部 `border-b last:border-b-0`：[Accordion 组件](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/ui/accordion.tsx:15)、[官方文档](https://ui.shadcn.com/docs/components/radix/accordion)
- 添加实际可用的展开、收起关键帧以及箭头旋转动画：[动画样式](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/globals.css:33)

实际浏览器验证：

- Carousel 第一页、滑动中、第二页高度均为 `284px`
- 滑动过程中检测到连续水平位移
- 第二页后“下一页”禁用，“上一页”启用
- FAQ 展开动画 `accordion-down` 为 `220ms`
- FAQ 收起动画 `accordion-up` 为 `180ms`
- ESLint、前后端测试和 Next.js 静态生产构建均通过

本次通过 `sites-building` 保持现有站点结构，并使用 `browser:control-in-app-browser` 实际验证了动画状态和布局高度。

---

顶部网格板块，翻页到第二页的过程，会看到第二页的第一列网格紧贴第一页的最后一列网格，请优化这里的间隔，使切换页面的时候，两页的间隔保持和网格中每个格子间的间隔一致；移除格子的 hover 效果

---

已完成顶部分类网格优化：

- Carousel 页面间增加 `12px` 间距，与格子间距一致。
- 翻页前、动画中、翻页后实测间距均为 `12px`。
- 网格高度仍固定为 `284px`，不会产生布局抖动。
- 已移除格子的位移、阴影、边框及图标缩放等 hover 效果。
- ESLint、3 项测试和静态构建均通过。

修改位置：[category-pager.tsx](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/category-pager.tsx:102)

本次使用 `sites-building` 保持现有站点结构，并通过 `browser:control-in-app-browser` 实测翻页过程中的布局间距。


---

简介板块，标题和内容纵向排列，扩充内容，并在内容顶部添加轮播图，用于展示商家的图片，图片从 unsplash 获取 3 张即可；faq 板块的展开和收起的动画，请保持速度函数和持续时间一致。

---

已完成：

- 简介标题与内容改为纵向排列。
- 简介扩充为三段商户介绍。
- 内容顶部新增可滑动图片轮播，支持箭头、触控滑动和分页指示。
- 后端新增稳定的 `images` 字段，包含图片、替代文本、作者和来源地址。
- 使用 3 张 Unsplash 装修场景图片：[厨房](https://unsplash.com/photos/YFzqRFFyauw)、[浴室](https://unsplash.com/photos/WWx_cFoRuDY)、[开放式厨房](https://unsplash.com/photos/BqTsh7ivTB8)。
- FAQ 展开、收起及箭头旋转统一为 `220ms`、`cubic-bezier(0.16, 1, 0.3, 1)`。

主要修改：

- [简介布局](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/melbourne/renovation/example-company/page.tsx:62)
- [图片轮播组件](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/merchant-gallery.tsx:20)
- [FAQ 动画参数](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/globals.css:59)
- [后端商户数据](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/backend/details/data.py:29)

前后端测试、ESLint 和静态构建均通过；浏览器中也确认三张图片正常加载、轮播可切换，FAQ 展开与收起参数完全一致。

本次使用 `sites-building` 维护现有站点结构，并使用 `browser:control-in-app-browser` 验证实际交互与动画。


---

进入页面的时候，顶部网格的格子并非固定，宽度会先闪动一下后回归正常，请检查问题并修复，对于 grid 网格布局、格子的宽度，使用 CSS 实现，无需引入 js

---

已修复顶部网格首屏闪动。

问题原因是组件先按 3 列渲染，挂载后再通过 `ResizeObserver` 计算实际列数，触发二次布局。

现在：

- 完全移除了宽度状态、`useEffect`、`ResizeObserver` 和行内网格样式。
- 使用 CSS Container Queries 根据容器宽度切换 1–7 列布局。
- 格子最小宽度固定为 `136px`，高度固定为 `136px`。
- 网格间距保持 `12px`，整体高度保持 `284px`。
- 轮播分页及横向滑动功能保持不变。

实际验证中，页面刚载入和稳定 1 秒后的布局均为 6 列，格子宽度始终约 `152.66px`，未再发生变化。

修改位置：

- [分类网格组件](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/components/category-pager.tsx:31)
- [纯 CSS 网格与响应式规则](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/globals.css:91)

ESLint、前端测试和静态构建均通过。本次使用 `sites-building` 完成现有站点修改，并通过 `browser:control-in-app-browser` 验证首屏尺寸稳定性。


---

设置打开首页后自动跳转 `/melbourne/renovation/example-company`；然后检查一下页面的语义化标签和用于 SEO 的结构化数据是否完善

---

已完成首页跳转和 SEO/语义化补强。

- `/` 现在返回 `308 Permanent Redirect`，自动跳转至 `/melbourne/renovation/example-company`。
- 页面保持唯一的 `main`、`article` 和 `h1`。
- 四个主要板块使用连续的 `h2`，FAQ 问题使用 `h3`。
- 面包屑使用 `nav + ol`，商户资料使用 `section + dl/dt/dd`，图片使用 `figure/figcaption`。
- 商户信息标题改为可见语义标题，桌面搜索框增加 `search` 地标。
- 补齐详情页独立的 canonical、Open Graph 和 Twitter Card，避免嵌套 metadata 被覆盖。
- JSON-LD 现在包含 `WebSite`、`WebPage`、`LocalBusiness`、`Service`、`BreadcrumbList` 和 `FAQPage`。
- `LocalBusiness` 已包含 Google 要求的 `name`、`address`，并补充电话、图片、描述、官网身份、联系方式和服务目录。[Google LocalBusiness 文档](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- 面包屑数据与页面可见层级保持一致，符合 Google 对典型用户路径的建议。[Google Breadcrumb 文档](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- 没有虚构营业时间、坐标、价格或评价数据，符合结构化数据应准确对应页面内容的原则。[Google 结构化数据规范](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

需要注意：`FAQPage` 数据有效且与页面内容一致，但 Google 当前通常只向权威政府和健康网站展示 FAQ 富媒体结果；保留标记不会造成问题，但不能预期普通商户页面出现 FAQ 富结果。[Google FAQ 政策说明](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

主要修改：

- [首页永久跳转](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/page.tsx:1)
- [详情页 SEO 元数据](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/app/melbourne/renovation/example-company/page.tsx:22)
- [结构化数据](/Users/wswmsword.love/Documents/active-repos/interview-qs/local-life/frontend/src/lib/structured-data.ts:10)

ESLint、4 项测试及静态构建均通过；浏览器中确认跳转、canonical、OG 标签和 6 类 JSON-LD 均正确输出。本次使用 `sites-building` 完成站点调整，并通过 `browser:control-in-app-browser` 验证最终页面。