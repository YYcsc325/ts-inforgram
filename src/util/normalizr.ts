/**
 * @name 数据范式化，扁平化
 * @desc: github地址： https://github.com/paularmstrong/normalizr
 */

import { normalize, denormalize, schema } from "normalizr";

/** 例子1 */
function demoOne() {
  const myData = [
    {
      id: "1",
      name: "张三",
      book: [
        {
          id: "45",
          name: "小说1",
        },
      ],
    },
    {
      id: "2",
      name: "李四",
      book: [
        {
          id: "45",
          name: "小说1",
        },
        {
          id: "46",
          name: "小说2",
        },
      ],
    },
  ];
  const book = new schema.Entity("books");
  /** 这里是第一步 */
  /** users是顶层的key */
  /** user数据中有book属性的嵌套, [book]说明book在元数据中是个数组的形式 */
  /** book: [book]只是用来说明，并不会真正的把对应数据写到users下面，只是提示里面有嵌套而已, 这个属性下面有什么去这个属性下寻找 */
  const user = new schema.Entity("users", { book: [book] });

  const normalizedData = normalize(myData, new schema.Array(user));

  console.log(normalizedData, "例子1");
}

/** 例子2 */
function demoTwo() {
  const data = [
    {
      id: "1",
      name: "北京",
      children: [
        {
          id: "1-1",
          name: "北京1",
          children: [
            {
              id: "1-1-1",
              name: "北京11",
              children: [],
            },
            {
              id: "1-1-2",
              name: "北京112",
              children: [],
            },
          ],
        },
        {
          id: "1-2",
          name: "北京2",
          children: [],
        },
      ],
    },
    {
      id: "2",
      name: "上海",
      children: [],
    },
  ];

  const city3 = new schema.Entity("city3");
  const city2 = new schema.Entity("city2", { children: [city3] });
  const city1 = new schema.Entity("city1", { children: [city2] });

  const dealData = normalize(data, new schema.Array(city1));

  console.log(dealData, "例子2");
}
/** 例子3 */
function demoThree() {
  const originalData = {
    id: "123",
    author: {
      id: "1",
      name: "Paul",
    },
    title: "My awesome blog post",
    comments: [
      {
        id: "324",
        commenter: {
          id: "2",
          name: "Nicole",
        },
      },
    ],
  };

  const user = new schema.Entity("users");

  const comment = new schema.Entity("comments", {
    commenter: user,
  });

  const article = new schema.Entity(
    "articles",
    {
      author: user,
      comments: [comment], // 完后这里会把id拿出来
      commenter: user,
    },
    {
      idAttribute: (value, parent, key) => {
        console.log(value, "value");
        console.log(parent, "parent");
        console.log(key, "key");
        return value?.title || value?.id; // 可以设置指定的key去查找
      },
    }
  );

  const normalizedData = normalize(originalData, article);
  console.log(normalizedData, "例子4");
}

// users是什么， users就是auther跟commenter的集合, 在把id拿出来作为key
// comment是什么， comment就是comments的集合，在把id拿出来作为key
// articles是什么，articles就是最外层，把id拿出来作为key， 并且附加之前定义的author跟comments属性

// define 里面定义的是嵌套的属性， 找到元数据中对应的属性付给右边的变量。
// 数据是一层层来处理的，所以当前层下面有什么属性就设置什么属性，所以才会有归属的问题。

/** 例子4 */
function demoFour() {
  const data = [
    {
      id: "1",
      name: "第一页",
      children: [
        {
          id: "1-1",
          type: "Img",
          defaultPostion: {
            left: 200,
            top: 200,
          },
          url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
          scale: true,
        },
        {
          id: "1-2",
          type: "Img",
          defaultPostion: {
            left: 300,
            top: 300,
          },
          url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
          scale: false,
        },
        {
          id: "1-3",
          type: "LineChart",
          defaultPostion: {
            left: 500,
            top: 200,
          },
          url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
          scale: false,
        },
      ],
    },
    {
      id: "2",
      name: "第二页",
      children: [
        {
          id: "2-1",
          type: "Img",
          defaultPostion: {
            left: 300,
            top: 300,
          },
          url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
          scale: false,
        },
        {
          id: "2-2",
          type: "LineChart",
          defaultPostion: {
            left: 500,
            top: 200,
          },
          url: "https://infogram-thumbs-200.s3-eu-west-1.amazonaws.com/2fadc5a9-2c1f-4899-9749-da58b82a340b.jpg?v=1618138121000",
          scale: false,
        },
      ],
    },
  ];
  const dataBox = new schema.Entity("box");
  const dataPage = new schema.Entity("page", { children: [dataBox] });

  /** 序列化 */
  const normalizedData = normalize(data, [dataPage]);
  console.log(normalizedData, "normalizedData");

  /** 反序列化 */
  const denormalizedData = denormalize(
    normalizedData.result,
    [dataPage],
    normalizedData.entities
  );
  console.log(denormalizedData, "denormalizedData");
}

/** 例子5 */
function demoFive() {
  const myData = { users: [{ id: 1 }, { id: 2 }] };
  const user = new schema.Entity("users");
  const mySchema = { users: [user] };
  const normalizedData = normalize(myData, mySchema);

  const denormalizedData = denormalize(
    normalizedData.result,
    mySchema,
    normalizedData.entities
  );
  console.log(denormalizedData, "denormalizedData_____");
}

demoOne();
demoTwo();
demoThree();
demoFour();
demoFive();

export default () => {};
