/**
 * @name 数据范式化，扁平化
 * @desc: github地址： https://github.com/paularmstrong/normalizr
 */

import { normalize, schema } from "normalizr";

const data = [
  {
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
  },
];

const user = new schema.Entity("users");

const comment = new schema.Entity("comments", {
  commenter: user,
});

const article = new schema.Entity("articles", {
  author: user,
  comments: [comment],
});

console.log(user, "user");
console.log(comment, "comment");
console.log(article, "article");
console.log(normalize(data, user), "normalize");

export default () => {};
