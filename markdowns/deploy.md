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
