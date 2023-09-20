import { IChatMessage } from "../types";

export const messagesMockData: IChatMessage[] = [
  {
    id: 123,
    user_id: 231,
    chat_id: 312,
    time: "2020-01-02",
    type: "file",
    content: 132,
    file: {
      id: 132,
      user_id: 231,
      path: `cat_2.png`,
      filename: "file name",
      content_type: "image/png",
      content_size: 543672,
      upload_date: "2020-01-02T14:22:22.000Z"
    }
  },
  {
    id: 123,
    user_id: 231,
    chat_id: 312,
    time: "2020-01-02",
    type: "file",
    content: 'Клара!!!',
    main: true,
  }
];
