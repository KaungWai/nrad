module.exports = {
  apps: [
    {
      name: 'book-manager-api',
      script: 'git pull origin main && npm install && npx prisma migrate deploy && npx prisma generate && npx tsc && node ./dist/index.js',
    },
  ],
}
