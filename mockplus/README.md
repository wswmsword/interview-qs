# 测试题

功能描述：根据规则，清理页面中隐藏或锁定图层（Layer）。

代码：

```typescript
/* eslint-disable */
import { EPageType, EMessage } from '../utils';
import i18n from '../i18n';

mockplus.ui.onmessage = (msg?: IMessage) => {
  if (msg?.type === 'clear-layer') {
    new ClearLayer(msg.data);
  }
};

class ClearLayer {
  pages: Page[];
  selectedMenu: string[];    
  deleteLayerIds: string[] = []; 

  constructor({ menuList, pageType }: IClearLayerOption ) {
    this.selectedMenu = menuList
                         .filter((option: IMenu) => option.checked)
                         .map((option: IMenu) => option.text);

    this.pages = this.setPages(pageType);

    this.clearLayerTree();
  }


  private setPages(pageType: EPageType): Page[] {
    const pages = [];
    if (pageType == EPageType.currentPage) {
      pages.push(mockplus.currentPage);
    } else if (pageType == EPageType.allPage) {
      pages.push(...mockplus.root.pages);
    }

    return pages;
  }
 
  private clearLayerTree(): void {
    this.pages.forEach((page: Page) => {
      this.mapLayerTree(page.layers);
    });

    try {
      if (!this.deleteLayerIds.length) {
        this.postMessage(i18n('clear.noClearLayerYet'), EMessage.text);
        return;
      }

      this.deleteLayerIds.forEach((id: string) => {
        mockplus.findLayerById(id).remove();
      });

      this.deleteLayerIds = [];

    } catch (err) {
      this.postMessage(i18n('clear.fail'), EMessage.fail);
      console.error('err', err);
    }

    this.postMessage(i18n('clear.success'), EMessage.success);
    mockplus.commitUndo();
  }

  private mapLayerTree(layers: Layer[]): void {
    layers.forEach((layer: Layer) => {
      if (layer.layers?.length > 0) {
        this.mapLayerTree(layer.layers);
      }
      this.handleLayers(layer);
    });
  }


  private handleLayers(layer: Layer): void {
    if (this.selectedMenu.includes(i18n('options.hidden')) && layer.hidden ) {
      this.deleteLayerIds.push(layer.id);
    }

    if (this.selectedMenu.includes(i18n('options.locked')) && layer.locked ) {
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
    onmessage(message: any): void;  // 接收消息
    postMessage(pluginMessage: any, options?: UIPostMessageOptions);  // 发送消息
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