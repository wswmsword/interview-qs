# API questions

## C1

使用 Xero 提供的 API Explorer 测试一下。

程序里可以在调用 `/Invoices` 之前，使用一些轻量的 api 提前测试，例如 `/connections`。

Test it using Xero’s API Explorer.

In the program, before calling `/Invoices`, you can use some lightweight APIs for an initial check, such as `/connections`.

## C2

先测试是否能够复现，每次都是 `/connections` 成功 `/Invoices` 失败，然后检查 http 状态码、响应体的报错信息。

First, verify whether the issue can be consistently reproduced — for example, `/connections` succeeds every time while `/Invoices` fails. Then check the HTTP status code and the error details in the response body.

## C3

调用 `https://api.xero.com/api.xro/2.0/Invoices`

Call: `https://api.xero.com/api.xro/2.0/Invoices`

## C4

调用 `GET https://api.xero.com/api.xro/2.0/Invoices/243216c5-369e-4056-ac67-05388f86dc81`

路径的最后部份是 `InvoiceId`

Call `GET https://api.xero.com/api.xro/2.0/Invoices/243216c5-369e-4056-ac67-05388f86dc81`

The last part of the path is the `InvoiceId`.

## C5

HTTP 429 是请求过多时的状态码，服务端可以检查 `Retry-After` 来保存接口再次有效的时间，然后做一些请求优化，如果客户端继续请求直接跳过即可，同时响应给客户端友好地提示，用于展示在用户界面上。

HTTP 429 indicates too many requests. On the server side, you can check the `Retry-After` header to determine when the API will be available again, then apply request optimizations. If the client continues to send requests, you can simply skip them and return a user-friendly message to the client for display in the UI.