

运行环境：Node.js v12.14.0；yarn v1.22.4。

快速浏览：http://bill.gfbeam.world。

本题需要完成一份建议记账本的制作，功能部分如下：

- 加载提供数据，成为账单列表；
- 筛选账单，筛选条件有年份、月份、标签；
- 添加账单；
- 统计筛选的年份、月份各自的收入和支出，以及月份下各支出标签的情况（需要排序）。

使用 React 快速开发。记账本的布局清晰，根据需要完成的功能把记账本分成 4 个模块，分别是添加、筛选、列表和统计。

首先从无交互的数据源“列表”开始，列表中的标签名称需要在上一步骤处理，通过 Map 数据结构方便和标签标识符做映射，方便在列表中展示标签名称。

有了数据源后，其它 3 个模块就都可以进行初始化。例如“筛选”模块，添加包含输入框和按钮的表单，点击按钮后列表的账单的月份都是输入框中输入的那个月份，就代表初始化成功，这一步需要在列表模块中对账单数组进行 filter 操作。另外 2 个模块中，“添加”模块的重点是进行数据源的处理，即对账单数据源进行 concat 操作，“分析”模块里完成账单的收入和支出展示，2 个模块达到预期效果就代表初始化成功。

视图上有了完整的框架后，对样式进行处理，首先是列表模块的精加工，之后对其它模块进行布局、间距、色彩的调整。

最后，依次完成添加、筛选、统计模块，完成的过程中对代码进行优化处理，以便方便阅读，如使用 reduce 集中处理数据，进一步拆分列表组件。

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
