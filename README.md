## 抽奖程序-潘多拉（pandora）


### 一、项目说明

1、**[DEMO地址](https://yuyongyu08.github.io/pandora/)**

2、本项目参考了[lottery](https://github.com/fouber/lottery)，主要改进：

功能：
* 新增形状（球状、滚筒状）的配置
* 新增奖项的配置
* 新增奖项个数
* 新增中奖名单的展示功能
* 新增中奖人员删除功能

技术：
* 使用Vue2进行了重写
* 引入webpack作为编译工具




### 二、开发指南
1.安装依赖
```
npm i
```

2.开发

```
npm run dev
```

2.构建

```
npm run build
```



### 三、操作指南（小白专用）

#### 1.如何打开页面？

用chrome打开build文件夹下的index.html文件


#### 2.被抽中但缺席的人员如何移除？

方式一：鼠标放到白色方块上右下角会出现删除标示

方式二：点击"展开"，获奖名单前面有删除标示

#### 3.重置按钮点击后发生什么？

会清空之前所有的抽奖数据，且不可逆，现场使用时慎点！

#### 4.如何查看所有中奖名单？

浏览器的开发这工具 》 Application 》 Storage 》 localStorage 》 展开
