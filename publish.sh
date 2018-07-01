if [ "$1" = "master" ];
then
  dir='/var/www/mybws.win'
elif [ "$1" = "next" ];
then
  dir='/var/www/staging.mybws.win';
else
  dir='';
fi
if [ ! -z "$dir" ];
then
  echo 'copying package.json and client dist'
  rm -rf $dir/dist/*
  cp -rf dist package.json $dir
  echo 'copying server'
  rsync -rvhm --delete-after server/ $dir/server
  echo 'installing server dependencies'
  yarn install --cwd $dir --prod --check-files --non-interactive;
else
  echo 'Not a branch to publish';
fi
