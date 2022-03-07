[eslint]: https://eslint.org/
[prettier]: https://prettier.io/

# セットアップ編

# 1. workspace へ移動

`workspace`(各々の任意の場所で構いません)から angular-cli で初期フォルダを作成するために、フォルダ作成していい任意の場所に移動。

```fish
cd workspace
```

# 2. angular-cli で `ng new` を実行

```fish
npx @angular/cli new angular-todo --style scss --routing
```

# 3. `ng new` で作成したフォルダに移動

```fish
cd angular-todo
```

# 4. VSCode で開く

```fish
code .
```

VSCode で開いたら、以下のようになっていると思います。

![スクリーンショット 2022-03-03 20 32 55](https://user-images.githubusercontent.com/20474933/156556711-c2d82177-e29d-490a-a0bb-d27ab65c0785.png)

# 5. `npm run start` を実行

サーバーを立ち上げて、ブラウザでアクセスしてみましょう。

```fish
npm run start
```

Angular のローカルホストは 4200 ポートで開きます。

```fish
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

```fish
npx ng add @angular-eslint/schematics
```

上記コマンドを実行すると、自動で ESLint のコマンド・パッケージ・config ファイルが追加されます。

次は Prettier を追加します。

```fish
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

```fish
mkdir -p $PWD/.vscode; echo "" > .vscode/settings.json
```

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

これで、ファイル保存時に ESLint と Prettier が効くようになりました。

現状、Prettier はすべてのファイルに対して適応したわけではないので、コマンドを追加して実行してみましょう

#### **`package.json`**

```diff
{
  "name": "delete-todo",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "lint": "ng lint",
+   "prettier": "prettier --write --check '**/*'"
  },
  # 以下省略
```

```fish
npm run prettier
```

コマンド実行後、ルートディレクトリすべてのファイルに Prettier が適応されるはずです。
対象外のファイルもエラーとして表示されるので、それは除外リストに追加しましょう。

```fish
touch .prettierignore
```

#### **`.prettierignore`**

```
.gitkeep
favicon.ico
.browserslistrc
.editorconfig
.gitignore
.prettierignore
```

再度、`npm run prettier` を実行して、エラーファイルがなければ OK です。

```fish
npm run prettier
```

## 6-3. VSCode 拡張共通 設定

ただし、ESLint・Prettier の VSCode の拡張はたくさんあります。
チーム開発をする時は、拡張を共通の ID をおくと、たくさんある中から選択できるようになります。

```fish
echo "" > .vscode/extensions.json
```

### **`.vscode/extensions.json`**

```json
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=827846
  "recommendations": ["angular.ng-template", "esbenp.prettier-vscode", "dbaeumer.vscode-eslint"]
}
```

上記のように、拡張を共通の ID をおくことで、拡張を選択できるようになります。
この中にインストールしていない拡張があると、インストールを促すようにできます。
試しに、VSCode を再起動してみます。

すると、このディレクトリで推奨している拡張のインストールを促すポップアップが表示されました ↓

<img width="547" alt="スクリーンショット 2022-03-04 11 06 35" src="https://user-images.githubusercontent.com/20474933/156686631-c1543acf-484c-4919-b2cf-dcff6258f40d.png">

インストールボタンを押すと、拡張がインストールされます。
もしポップアップが表示されたらインストールしておきましょう。

## 6-4. わざとエラーを起こす

ちゃんと、指摘をしてくれるか、確かめてみましょう。
`.eslintrc.json`をみると、`overrides.rules.@angular-eslint/component-selector.style` が `kebab-case` になっています。
コンポーネントの selector がケバブケースに設定されているので、わざとキャメルケースにしてみます。

### **`src/app/app.component.ts`**

```diff
import { Component } from '@angular/core';

@Component({
+  selector: 'appRoot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// 以下省略
```

コンポーネントのセレクターを `appRoot` にして、コマンドを実行しましょう。
（既に VSCode 上でも指摘でているはずですが）

```fish
npm run lint
```

エラー対象ファイルと、エラーメッセージも表示されれば OK です。

<img width="365" alt="スクリーンショット 2022-03-04 11 43 17" src="https://user-images.githubusercontent.com/20474933/156689056-b2c33bee-f58a-4116-a627-c7c850674978.png">

セレクターは元に戻しておきましょう。

お疲れ様でした 🐴

次は [todo リスト作成編](https://github.com/yuyakinjo/angular-todo/blob/main/markdowns/todos.md) です。
