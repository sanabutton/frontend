# さなボタン (2) のフロントエンド

## データの追加・編集

- [さなボタン(2)](https://github.com/sanabutton/sanabutton.github.io)で配信やボタンが追加されると、そちらを読み込み反映します。本番反映にはデプロイが必要です。
- お知らせ一覧は src/_notifications.txs を編集してください。 JSX という記法ですが基本的には HTML にならって書けます。

## 開発環境

- next.js を使用し、ビルド時に API を叩いてボタンデータを整形しています。
- `$ npm start` で開発環境(自動差分ビルド)が開始します。
- `$ npm build` で本番環境向けビルドを `out` に出力します。

ISSUE は、[こちらで](https://github.com/sanabutton/sanabutton.github.io/issues)一元管理しています。
