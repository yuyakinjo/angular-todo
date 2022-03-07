[nvm]: https://github.com/nvm-sh/nvm
[setup]: https://github.com/yuyakinjo/angular-todo/blob/main/makdowns/setup.md
[todos]: https://github.com/yuyakinjo/angular-todo/blob/main/makdowns/todos.md
[backup]: https://github.com/yuyakinjo/angular-todo/blob/main/makdowns/backup.md

# Angular のハンズオン集

# 目的

1. アプリケーションの基本といわれる TODO 表 を 作る

# 内容

- コンポーネントの作成・分割
- `Input()`を使用して、コンポーネント同士のデータを渡す方法
- サービスを作成
- パイプを自作
- Mapオブジェクト
- localStorage



# 環境

- Node.js の lts 版を使用しています。
  バージョン管理は、お好みで構いません。
  バージョン管理のサンプルとして、[nvm]を載せておきます。

- VSCode を使用する前提です。

```bash
brew install nvm
```

```bash
nvm install lts
```

```bash
nvm use lts
```

```bash
node -v

#=> v16.14.0
```

# 目次

1. [セットアップ編][setup]
2. [todo リスト作成編][todos]
3. [backup 編][backup]
