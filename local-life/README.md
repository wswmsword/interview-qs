# 墨尔本本地生活商户详情页

<details>
<summary>截图</summary>

![截图](./localhost_3000_melbourne_renovation_example-company.png)

</details>

> 本项目的前后端产品文档为 [Product.md](./Product.md)，并由 ChatGPT5.5 和 Opus4.8 基于产品文档开发，对应的提示词对话存放在 [Prompt_codex.md](./Prompt_codex.md) 和 [Prompt_claude.md](./Prompt_claude.md) 中。

本仓库包含一个无数据库的 Django REST API，以及一个在构建期间读取该
API、静态生成商户详情页的 Next.js 前端。

## 项目结构

```text
backend/   Django 5.2 + Django REST framework API
frontend/  Next.js App Router + Tailwind CSS + shadcn/ui + Phosphor Icons
```

详情页地址：

```text
http://localhost:3000/melbourne/renovation/example-company
```

API 地址：

```text
GET http://127.0.0.1:8000/details
```

## 环境要求

- Python 3.12
- Node.js 20.9 或更高版本
- npm 10 或更高版本

> Django REST framework 当前不存在 4.16.x 版本，因此本项目锁定使用
> 与 Django 5.2 兼容的 `djangorestframework==3.16.1`。

## 安装与启动后端

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python manage.py runserver
```

后端使用默认的 `8000` 端口，不使用数据库。`/details` 仅提供 GET
响应，数据定义在 `backend/details/data.py`，并允许所有来源跨域访问。

## 安装与启动前端

另开一个终端，在仓库根目录执行：

```bash
cd frontend
npm install
npm run dev
```

前端使用默认的 `3000` 端口。API 地址和站点域名按照需求分别固定为
`http://127.0.0.1:8000/details` 和 `https://test.com`。

## 生产构建

静态构建依赖正在运行的 Django 服务。先按照上文启动后端，再执行：

```bash
cd frontend
npm run build
npm run start
```

构建会静态生成详情页和 `/sitemap.xml`。详情页中包含
`LocalBusiness`、`Service`、`BreadcrumbList` 和 `FAQPage` JSON-LD。

## 测试与代码检查

后端：

```bash
cd backend
source .venv/bin/activate
python manage.py check
python manage.py test
```

前端：

```bash
cd frontend
npm run lint
npm test
```

前端测试覆盖 API 数据契约解析和地址格式化；后端测试覆盖详情响应结构与
CORS 响应头。
