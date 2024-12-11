# 测试题

功能描述：根据规则，清理页面中隐藏或锁定图层（Layer）。

代码：

```typescript
/* eslint-disable */
import { EPageType, EMessage } from '../utils';
import i18n from '../i18n';

mockplus.ui.onmessage = (msg: IMessage) => {
  if (msg.type === 'clear-layer') { // msg 必传，访问 msg.type 无需可选链
    new ClearLayer(msg.data);
  }
};

class ClearLayer {
  pages: Page[];
  selectedMenuTxt: string[]; // 选中的选项内容文字
  deleteLayerIds: string[] = []; 

  constructor({ menuList, pageType }: IClearLayerOption ) {
    this.selectedMenuTxt = menuList
                         .filter((option: IMenu) => option.checked)
                         .map((option: IMenu) => option.text);

    this.setPages(pageType);

    this.clearLayerTree();
  }


  private setPages(pageType: EPageType): Page[] {
    const typeMap = new Map([ // Map 可看作键值对数据库，这种情况比 if 更易读，另一方面 if 有更优的性能，需要对比平衡
      [EPageType.currentPage, mockplus.currentPage],
      [EPageType.allPage, mockplus.root.pages],
    ])
    this.pages = [].concat(typeMap.get(pageType));
  }

  private clearLayerTree(): void {
    this.pages.forEach((page: Page) => {
      this.mapLayerTree(page.layers);
    });

    try {
      if (this.deleteLayerIds.length === 0) { // 全等的意义明确
        this.postMessage(i18n('clear.noClearLayerYet'), EMessage.text);
        return;
      }

      this.deleteLayerIds.forEach((id: string) => {
        const layer = mockplus.findLayerById(id); // layer 可能为 null
        if (layer) layer.remove();
      });

      this.deleteLayerIds = [];

      this.postMessage(i18n('clear.success'), EMessage.success);
      mockplus.commitUndo();
    } catch (err) {
      this.postMessage(i18n('clear.fail'), EMessage.fail);
      console.error('err', err);
    }
  }

  private mapLayerTree(layers: Layer[]): void {
    if (layers == null || layers.length === 0) return; // 递归出口放在头部，利于理解
    layers.forEach((layer: Layer) => {
      this.mapLayerTree(layer.layers);
      this.handleLayers(layer);
    });
  }


  private handleLayers(layer: Layer): void {
    if (layer.hidden && !layer.removed &&
      this.selectedMenuTxt.includes(i18n('options.hidden'))) { // 布尔值放在条件头部，减少计算量提高性能
      this.deleteLayerIds.push(layer.id);
    }
    else if (layer.locked && !layer.removed &&
      this.selectedMenuTxt.includes(i18n('options.locked'))) { // 使用 else if 避免重复添加 layer id
      this.deleteLayerIds.push(layer.id);
    }
  }

  private postMessage(text: string, type: EMessage): void {  /* 省略代码*/  }
}
```

API：

```typescript
declare global {
  const mockplus: PluginAPI;
  readonly ui: UIAPI;

  interface PluginAPI {
    currentPage: Page;  // 当前页面
    readonly root: Document;  // 当前文档
    readonly ui: UIAPI;
    findLayerById(id: string): Layer | null;  // 查找图层 ***
    commitUndo():void; // 提交数据
  }

  interface UIAPI {
    onmessage(message: IMessage): void;  // 接收消息
    postMessage(pluginMessage: string, options?: UIPostMessageOptions);  // 发送消息
  }

  interface UIPostMessageOptions {}

  interface Document {
    readonly appID: string;
    readonly pages: ReadonlyArray<Page>;  // 项目中的所有页面
  }


  // 图层结构
  interface Layer {
    readonly id: string;
    removed: boolean;
    hidden: boolean;  // 是否隐藏
    locked: boolean;  // 是否锁定
    readonly layers?: ReadonlyArray<Layer>; // 子图层    
    remove(): void;
  }

  interface Page {    
    readonly id: string;
    readonly layers: ReadonlyArray<Layer>;  // 所有子图层 ***
  }
}
```

数据结构：

```typescript
interface IMenu {
  checked: boolean;
  text: string;
  id: string; // 唯一
}

interface IClearLayerOption {
  menuList: IMenu[];
  pageType: EPageType;
}

interface IMessage {
  type: string;
  data: IClearLayerOption;
}

enum EPageType {
   currentPage,
   allPage,
}

enum EMessage {
   text,
   success,
   fail,
}
```