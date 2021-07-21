#!/bin/sh
set -x

message=$1
home_dir="$PWD"
dist="storybook-static"
remote_name="common"
temp_dir="$$"

repo="jfeat@112.74.26.228:/home/jfeat/git/components/html-public.git"

npm run build-storybook
if [[ $? != 0 ]]; then
    echo "Error occurred"
    exit 1
fi

mkdir -p $temp_dir
cd $temp_dir
git init
#拉取remote的all objects信息
git remote add -f origin $repo
#开启sparse clone
git config core.sparsecheckout true
#设置需要pull的目录 
echo "$remote_name" >> .git/info/sparse-checkout
#将origin 端，由第三步（文件 .git/info/sparse-checkout）设置的 目录下的文件 pull 到本地
echo "Pulling origin"
git pull --depth=1 origin master

echo "Copying "
cd $home_dir
cp -r storybook-static/* $temp_dir/$remote_name

echo "Commit new dist files"
cd $temp_dir
git add --all
git commit -m "`date` publish static $message"
git push origin master

echo "Cleaning tempdir $temp_dir"
cd $home_dir
rm -rf $temp_dir


