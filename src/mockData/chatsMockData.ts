import { IChat } from "../types";

export const chats: IChat[] = [
  {
    id: 1,
    title: "Chat1",
    avatar: "cat_1.jpg",
    unread_count: 3,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Иван",
            second_name: "ИванИванов",
            avatar: "cat_1.jpg",
            email: "ivan@email.com",
            login: "ivanLogin",
            phone: "8(951)-550-09-72",
        },
        time: "01.01",
        content: "Клара украла кораллы у Карла, А Карл у Клары украл кларнет"
    }
  },
  {
    id: 2,
    title: "Chat2",
    avatar: "cat_2.png",
    unread_count: 6,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Сергей",
            second_name: "Петров",
            avatar: "cat_2.png",
            email: "serg@email.com",
            login: "sergLogin",
            phone: "8(951)-550-09-72",
        },
        time: "02.02",
        content: "Клара украла кораллы у Карла, А Карл у Клары украл кларнет"
    }
  },
  {
    id: 3,
    title: "Chat3",
    avatar: "cat_3.jpg",
    unread_count: 6,
    created_by: 12345,
    last_message: {
        user: {
            first_name: "Андрей",
            second_name: "Сидоров",
            avatar: "cat_3.jpg",
            email: "andrew@email.com",
            login: "andrewLogin",
            phone: "8(951)-550-09-72",
        },
        time: "03.03",
        content: "Клара украла кораллы у Карла, А Карл у Клары украл кларнет"
    }
  },
]
