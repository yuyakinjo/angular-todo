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

# 5. `npm run start` を実行

サーバーを立ち上げて、ブラウザでアクセスしてみましょう。

```bash
npm run start
```

Angular のローカルホストは 4200 ポートで開きます。

```bash
http://localhost:4200
```

下記のような画面が表示されます。

![スクリーンショット 2022-03-04 9 52 05](https://user-images.githubusercontent.com/20474933/156678314-1548ea27-146e-4e70-9823-4780e187b3f5.png)

# 5. Hello World

Hello World を表示してみましょう。
初期の表示している実態は`app.component.ts`と`app.component.html`です。
このファイルを編集すると反映されます。

```html:src/app/app.component.html
<h1>{{ title }}</h1>
```

```typescript:src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "hello world"
}
```

下記のような画面が表示されます。

![スクリーンショット 2022-03-04 9 58 27](https://user-images.githubusercontent.com/20474933/156678820-95ed8757-2ad3-4d39-89d7-985cfc674c16.png)
