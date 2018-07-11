if [ "$1" = "master" ];
then
  dir='/var/www/mybws.win'
elif [ "$1" = "next" ];
then
  dir='/var/www/staging.mybws.win';
else
  dir='';
fi
pkgver=$(grep version package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
name=$(grep name package.json | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[:space:]')
matchTagged=$(curl https://api.github.com/repos/rabidpug/"$name"/releases | grep -Eo "\"v$pkgver\"")
echo "$dir $matchTagged"
if [ ! -z "$dir" ] && [ ! -z "$matchTagged" ];
then
  echo 'copying package.json and client dist'
  rm -rf $dir/dist/*
  cp -rf dist package.json $dir
  echo 'copying server'
  rsync -rvhm --delete-after server/ $dir/lib
  echo 'installing server dependencies'
  yarn install --cwd $dir --prod --check-files --non-interactive;
else
  echo 'Not a branch to publish';
fi
