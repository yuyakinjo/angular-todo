# セットアップ編

# 1. workspace へ移動

`workspace`(各々の任意の場所で構いません)から angular-cli で初期フォルダを作成するために、フォルダ作成していい任意の場所に移動。

```bash
cd workspace
```

# 2. angular-cli で `ng new` を実行

```bash
npx @angular/cli new angular-todo --style scss --routing
```

# 3. `ng new` で作成したフォルダに移動

```bash
cd angular-todo
```

# 4. VSCode で開く

```bash
code .
```

VSCode で開いたら、以下のようになっていると思います。

![スクリーンショット 2022-03-03 20 32 55](https://user-images.githubusercontent.com/20474933/156556711-c2d82177-e29d-490a-a0bb-d27ab65c0785.png)

# 5. Hello World

Hello World を表示してみましょう。

```html:src/app/app.component.html
<h1>{{ title | uppercase }}</h1>
```

```typescript:src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "todo"
}
```
