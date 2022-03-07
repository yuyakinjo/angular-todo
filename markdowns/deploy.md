# デプロイ編

Github Pages にデプロイをして、公開してみます。
Github Pages 用のパッケージをインストールを行い、コマンドを実行する流れです。

# パッケージのインストール

```fish
npx ng add angular-cli-ghpages
```

# deploy コマンドの実行

このフォルダの名前を `base-href` の引数に指定して、`deploy` コマンドを実行します。

今回は、angular-todo というフォルダにあるので、`base-href` に `/angular-todo/` を指定しています(スラッシュで囲む必要があります。)

```fish
npx ng deploy --base-href=/angular-todo/
```

# デプロイ完了

デプロイ完了後は、Github の Settings → Pages → Source → ブランチを「gh-pages」を選択

![スクリーンショット 2022-03-07 18 56 36](https://user-images.githubusercontent.com/20474933/157008964-baed0b57-c803-41b9-b53a-caa9ed59c5eb.png)

デプロイ完了後の URL はこちらに記載されています。

![スクリーンショット 2022-03-07 18 59 32](https://user-images.githubusercontent.com/20474933/157009423-c9528c1a-bc8d-430a-b78b-0e54befb4c63.png)

# デプロイ削除

このままデプロイしていても問題ないと思いますが、削除も方法も示しておきます。

```fish
git push --delete origin gh-pages
```

上記コマンドを覚えるのは面倒なので、 `pakcage.json`にコマンドを記載しておいても良さそうですね。

## **`package.json`**

```diff
{
  "name": "angular-todo",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
+   "publish": "ng deploy --base-href=/angular-todo/",
+   "unpublish": "git push --delete origin gh-pages"
  },
  // 省略
}
```

すると、次からは、Github Pages に公開するときは下記コマンド

```fish
npm run publish
```

非公開にするときは下記コマンドを実行すると、コマンドを忘れても思い出せるひっかかりをつくることができました。

```fish
npm run unpublish
```
