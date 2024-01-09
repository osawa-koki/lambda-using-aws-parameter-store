# lambda-using-aws-parameter-store

🛎🛎🛎 Lambdaで`AWS Systems ManagerのParameter Store`を使うサンプルです！  

[![ci](https://github.com/osawa-koki/lambda-using-aws-parameter-store/actions/workflows/ci.yml/badge.svg)](https://github.com/osawa-koki/lambda-using-aws-parameter-store/actions/workflows/ci.yml)
[![cd](https://github.com/osawa-koki/lambda-using-aws-parameter-store/actions/workflows/cd.yml/badge.svg)](https://github.com/osawa-koki/lambda-using-aws-parameter-store/actions/workflows/cd.yml)

## 環境構築

最初にAWS CLIをインストールします。  
<https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html>  

以下のコマンドを実行して、AWS CLIのバージョンが表示されればOKです。  

```shell
aws --version
```

認証情報を設定します。  

```shell
aws configure
```

以下のように聞かれるので、適宜入力してください。

```shell
AWS Access Key ID [None]: アクセスキーID
AWS Secret Access Key [None]: シークレットアクセスキー
Default region name [None]: リージョン名
Default output format [None]: json
```

これらの情報は、AWSのコンソール画面から確認できます。  
IAMのページから指定のユーザを選択肢、アクセスキーを発行してください。  

続いて、AWS SAMをインストールします。  
こちらはサーバレスアプリケーションを構築するためのツールです。  
<https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html>  

以下のコマンドを実行して、AWS SAMのバージョンが表示されればOKです。  

```shell
sam --version
```

サーバサイドアプリケーションを開発用に実行するためには、以下のコマンドを実行します。  
ビルドにはDockerが必要です。  

```shell
sam build --use-container
sam local start-api
```

## 本番環境の準備

### GitHub Secretsの設定

| キー | バリュー |
| --- | --- |
| STACK_NAME | プロジェクト名(CloudFormationのスタック名) |
| AWS_ACCESS_KEY_ID | AWSのアクセスキーID |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | リージョン名 |

`v-*`形式のタグをつけたコミットをプッシュすると、本番環境にデプロイされます。  
また、以下のコマンドを実行して手動でデプロイすることもできます。  

```shell
sam build --use-container
sam deploy --stack-name <スタック名>
```

以下のコマンドでエンドポイントを確認できます。  

```shell
aws cloudformation describe-stacks --stack-name <スタック名> --query 'Stacks[].Outputs[?OutputKey==`LambdaFunctionEndpoint`].OutputValue' --output text
```

パラメータストアに`/スタック名/<KEY>`という形式のデータを保存し、当該エンドポイントに`keys`パラメータを付与すると、パラメータストアから値を取得して返却します。  
`/スタック名/<KEY>`という形式のデータが存在しない場合は、`null`を返却します。  

値が存在しない場合は、エラーとなります。  
適宜、エラーハンドリングを追加してください。  

## 環境情報

| 環境 | バージョン |
| --- | --- |
| Node.js | v18.12.1 |
| AWS CLI | 2.11.16 |
| SAM CLI | 1.82.0 |
