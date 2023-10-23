import { Block, IProps } from "../../core";
import { IUser } from "../../types";
import { getUserName } from "../../utils";

interface IUserItemProps {
  user: IUser;
  icon: 'plus' | 'delete';
  onClick?: () => void;
}

export class UserItem extends Block<IUserItemProps> {
  constructor(props: IProps<IUserItemProps>) {
    super({ ...props });
  }

  public renderForList = this.render;

  protected render(): string {
    const { icon = '', user } = this.props;
    return (`
        <div class='user-item' >
          <p  class='user-item-name'>${getUserName(user, true)}</p>  
          <div class='user-item-icon ${`user-item-icon-` + icon}' id='${user.id || ''}'></div>
        </div>
    `);
  }
}
