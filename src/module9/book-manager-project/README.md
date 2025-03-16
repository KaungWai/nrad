### git pull
git ကနေ latest source ကို pull လုပ်ပါ

### change directory
```shell
cd \your_dir\src\module9\book-manager-project
```

### install dependencies
```shell
npm install
```

### create env file
- `module9\book-manager-project` folder ထဲမှာ `.env` file ဆောက်ပါ 
- အထဲမှာ ဘာထည့်ရမလဲက `.env.example` file ကို နမူနာကြည့်လို့ရပါတယ် (prisma အတွက် username, pasword, dbname က docker-compose.yml file ကိုကြည့်ပါ)

### setup database
- docker မှာ တခြား run နေတဲ့ databse တွေရှိရင် အရင်ကြိုပိတ်လိုက်ပါ
- ပြီးရင်တော့ terminal မှာ ဒါကို run လိုက်ပါ
```shell
docker compose up -d
```

## prisma migrate
```shell
npx prisma migrate dev
```

### ssl setup
- `module9\book-manager-project` folder ထဲမှာ `certificates` folder ဆောက်ပါ
- ဒီ link ကို သွားပြီး software ကို download ဆွဲပါ https://apps.microsoft.com/detail/9PF4X1JG1D94
- software ကို အသုံးပြုပြီး self-signed certificate ထုတ်ပါ
- ရလာတဲ့ zip ထဲက file 2 file ကို `certificates` folder ထဲမှာ ထည့်ပါ
- file တွေကို localhost.crt နဲ့ localhost.key ဆိုပြီး rename လုပ်ပါ
```shell
module9
|_ book-manager-project
  |_ certificates
    |_ localhost.crt
    |_ localhost.key
```

## start server
```shell
npm run dev
```
