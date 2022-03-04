[eslint]: https://eslint.org/
[prettier]: https://prettier.io/

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

### **`src/app/app.component.html`**

```html
<h1>{{ title }}</h1>
```

### **`src/app/app.component.ts`**

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "hello world";
}
```

下記のような画面が表示されます。

![スクリーンショット 2022-03-04 9 58 27](https://user-images.githubusercontent.com/20474933/156678820-95ed8757-2ad3-4d39-89d7-985cfc674c16.png)

# 6. ESLint・Prettier 追加

編集しているうちに、人によってばらつきが出ないように開発初期で [ESLint][eslint] と [Prettier][prettier] の設定を行います。

簡単に説明すると、ESLint はコードを書くときのルールをチェックしてくれるツールです。
Prettier は、コードを書くときのスタイルを整えてくれるツールです。

## 6-1. ESLint・Prettier 追加

Angular での ESLint の設定を追加していきます。

```bash
npx ng add @angular-eslint/schematics
```

上記コマンドを実行すると、自動で ESLint のコマンド・パッケージ・config ファイルが追加されます。

次は Prettier を追加します。

```bash
npm i -D prettier eslint-config-prettier
```

現状では、Prettier と ESLint が競合してしまうので、競合しないようにするために、以下のように設定を変更します。

### **`.eslintrc.json`**

```diff
{
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "parserOptions": {
        "project": [
          "tsconfig.json"
        ],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
+       "prettier"
      ],
  // 以下省略
}

```

## 6-2. VSCode 上で ESLint や Prettier が効くように下記ファイル追加

設定の追加は完了しましたが、現状は`npm run lint`を実行しないと、ESLint と Prettier が効かないです。

これらが効くタイミングで一番いいのは、VSCode 上のファイル保存で効くと、コマンドを実行する手間を省くことができます。
その設定を追加しましょう。

ルートディレクトリに `.vscode` というフォルダを用意して、`settings.json`を作成します。

### **`.vscode/settings.json`**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "extensions.ignoreRecommendations": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```
