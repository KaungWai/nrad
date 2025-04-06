# Module9 - Deployment
ဒီ project ၂ ခုကို ubuntu server ပေါ်ကို deploy လုပ်ကြပါမယ်
- src\frontend\book-manager (frontend)
- src\module9\book-manager-project (backend)

### change directory
```shell
cd src\module9\nrad_module_9_deployment
```

### description
```shell
docker/
    postgres/
        Dockerfile    # database name, username, password နဲ့ port no ကို ဒီမှာကြည့်ပါ
    ubuntu/
        Dockerfile    # curl, nano, git စတဲ့ package တွေကို တစ်ခါတည်း ကြိုထည့်ပေးထားပါတယ်
docker-compose.yml    # ဒီ file ရှိတဲ့လမ်းကြောင်းမှာ docker compose လုပ်ဖို့လိုပါတယ်
```

### docker compose
`docker-compose.yml` ရှိတဲ့လမ်းကြောင်းမှာ ဒီ command ကို run ပေးပါ
```shell
docker compose up -d --build
```

### docker desktop 
အခုချိန် docker desktop မှာ သွားကြည့်မယ်ဆိုရင် postgres နဲ့ ubuntu container တွေ run နေတာကို မြင်ရမှာပါ

## ubuntu terminal
- ubuntu container ရဲ့ terminal ကို ဖွင့်လိုက်ပါ
- ဘာမှမလုပ်ခင် `bash` ဆိုတဲ့ command ကို အရင် run ပါ
- ဒီနောက်ပိုင်းအဆင့်တွေက ubuntu terminal ထဲမှာလုပ်မှာပါ

### install nvm and node:22
nodejs.org ရဲ့ လမ်းညွှန်ချက်အတိုင်း nvm ကို တစ်ဆင့်ခံပြီး node ကို install လုပ်ပါမယ်
```shell
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.14.0".
nvm current # Should print "v22.14.0".

# Verify npm version:
npm -v # Should print "10.9.2".
```

### install pm2 globally
```shell
# install pm2 globally
npm install pm2 -g

# verify pm2 version
pm2 -v
```

### clone project repository
- အရင်ဆုံး home folder ထဲကို သွားပါမယ် `cd /home` 
- project repository ကို clone လုပ်ပါမယ် `git clone https://github.com/KaungWai/nrad.git`
- `ls -ll` နဲ့ကြည့်လိုက်မယ်ဆိုရင် nrad folder ရောက်နေတာကိုမြင်ရပါမယ်
- project ရှိတဲ့ နေရာထိဆက်သွားပါမယ် `cd ./nrad/src/module9/book-manager-project`

### configure project
- .env file ကို create လုပ်ပါမယ် `cp .env.example .env`
- .env file ကို လိုအပ်သလိုပြုပြင်ပါမယ် `nano .env`
```env
PORT=3000
ENVIRONMENT="production"
JWT_SECRET="your_secret_here"
# localhost:5432 အစား postgres:5432 ကိုသုံးထားတာကို သတိပြုပါ (docker dns resolution ကိုသုံးထားလို့ပါ)
DATABASE_URL="postgresql://nrad_user:nrad_password@postgres:5432/nrad_db?schema=public"
```
- dependencies တွေ install လုပ်ပါမယ် `npm install` 
- database migration တွေကို apply လုပ်ပါမယ် `npx prisma migrate deploy`
- prisma client generate လုပ်ပါမယ် `npx prisma generate`
- typescript compile လုပ်ပါမယ် `npx tsc`
- စမ်ကြည့်တဲ့ အနေနဲ့ တစ်ချက် run ကြည့်ပါမယ် `node ./dist/index.js`
- `Server listening at port 3000` ဆိုပြီး ပေါ်လာတယ်ဆိုရင် အဆင်ပြေတဲ့ သဘောမို့လို့ `Ctrl + c` နဲ့ တစ်ချက်ပြန်ပိတ်ထားပါမယ် 
- ကျွန်တော်တို့ project folder ထဲမှာ `ecosystem.config.js` file ကရှိနေပြီးသားဖြစ်ပါတယ်
- ဒါကြောင့်မို့လို `pm2 start` ကိုသုံးပြီး background service ကိုဖန်တီးပါမယ်
```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │      │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ book-manager-api   │ fork     │ 0    │ online    │ 0%       │ 37.8mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### generate self-signed ssl certificate
- ssl certificate ထုတ်ပါမယ်
- country, city စတဲ့ မေးခွန်းတွေမေးလာရင် သင့်တော်သလို ဖြေလိုက်ပါ
```shell
mkdir /home/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /home/ssl/nrad.key -out /home/ssl/nrad.crt
```
- `ls /home/ssl` ဆိုတဲ့ command နဲ့ ကြည့်လိုက်မယ်ဆိုရင် nrad.key နဲ့ nrad.crt ကိုမြင်ရမှာပါ

### install and configure nginx
- nginx install လုပ်ပါမယ်
```shell
apt update
apt install -y nginx
```
- nginx ရဲ့ config file က `/etc/nginx/nginx.conf` မှာ ရှိပါတယ်
```conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
}

http {
	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
	ssl_prefer_server_ciphers on;

	access_log /var/log/nginx/access.log;

	gzip on;

	include /etc/nginx/conf.d/*.conf;
	# ဒီ folder အောက်က file တွေကိုလဲ import လုပ်ထားပါတယ် 
	include /etc/nginx/sites-enabled/*; 
}
```
- `/etc/nginx/sites-enabled/` အောက်မှာ default ဆိုတဲ့ config တစ်ခုရှိပါတယ် 
- အဲ့ဖိုင်ကို ဖျက်လိုက်ပါမယ် `rm /etc/nginx/sites-enabled/default`
- အဲ့ဒီဖိုင်အစား config ဖိုင်ကို ကိုယ့်ဘာသာ ဖန်တီးပါမယ် `nano /etc/nginx/sites-enabled/nrad`
```conf
server {
    listen 80;
    # redirect all http requests to https 
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;

    ssl_certificate /home/ssl/nrad.crt; # certificate
    ssl_certificate_key /home/ssl/nrad.key; # private key

    root /var/www/html; # frontend app is deployed here

    # when http://hostname:{port}/api/ is requested
    location /api/ {
        rewrite ^/api/(.*)$ /$1 break; # remove api/ from url
        proxy_pass http://localhost:3000;  # forward request to nodejs service running at port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
- configuration က အဆင်ပြေရဲ့လားဆိုတာကို testing စစ်ပါမယ် `nginx -t`
- nginx ကို start လုပ်ပါမယ် `service nginx start` 
- တစ်ခုခု အဆင်မပြေလို့ ပြင်ပြီး restart မယ်ဆိုရင်တော့ `service nginx start` ကို သုံးပါ
- အားလုံးအဆင်ပြေရင်တော့ host machine ရဲ့ browser ကနေ `https://localhost/api/auth/user` ကို ဝင်ကြည့်ပါ

### deploy frontend application
- အရင်ဆုံး fronedend source folder ဆီကို အရင်သွားလိုက်ပါမယ် `cd /home/nrad/src/frontend/book-manager`
- dependencies တွေ install လုပ်ပါမယ် `npm install` 
- project ကို build လုပ်ပါမယ် `npm run build`
- build output က ./dist folder ထဲမှာ ရလာမှာဖြစ်တဲ့ အတွက် အဲ့ထဲက file အကုန်လုံးကို nginx ရဲ့ root folder ထဲကို ကူးထည့်ပါမယ်
```shell
cp -r ./dist/* /var/www/html/
```

### create default user
- လောလောဆယ် database ထဲက user table ထဲမှာ record တစ်ခုမှ ရှိနေမှာ မဟုတ်ပါဘူး
- အဲ့ဒါကြောင့် login ဝင်လို့ရအောင် record တစ်ခုလောက် insert လုပ်ပေးပါ
```shell
user_id: 08897213-1e43-4fb4-84df-c1fdcf52b789
user_name: admin
role: ADMIN
hash: $2b$10$qbpVJtc7KUbhY92NIvnE6Oe3W30.5DwKGNcp3JCyCUNvl9PMYNLlK
```

### test the application
- host machine ရဲ့ browser ကနေ `https://localhost/` ကို ဝင်ကြည့်ပါ
- username: admin, password: 12345678
