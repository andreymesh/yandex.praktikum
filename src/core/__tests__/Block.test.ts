import { expect} from "chai";
import sinon from "sinon";
import Block from "../Block";
import { IProps } from "../../types/IProps";

interface IComponent {
  text?: string;
}

const testTitle = "testTitle";

describe("Block", () => {
  let Component: typeof Block;
    
  before(() => {
    class ComponentClass extends Block<IComponent> {
      constructor(props: IProps<IComponent>) {
        super({ ...props });
      }

      render(): string {
        return `<div>
                  <span id="test-text">{{text}}</span>
                </div>`;
      }
    }

    Component = ComponentClass as typeof Block;
  });

  it("Компонент возвращает разметку через функицию getContent", () => {
    const component = new Component();
    const componentText = component.getContent()?.innerHTML;
    expect(componentText).to.not.eq("");
  });

  it("Компонент устанавливает свойства, если они переданы", () => {
    const component = new Component({ text: testTitle });
    const componentTitle = component.getContent()?.querySelector("#test-text")?.innerHTML;
    expect(componentTitle).to.eq(testTitle);
  });

  it("Компонент перерисовывается, если свойства изменились", () => {
    const text = 'New title';
    const component = new Component({ text: testTitle });
    component.setProps({ text });
    const componentTitle = component.getContent()?.querySelector('#test-text')?.innerHTML;
    expect(componentTitle).to.eq(text);
  });

  it("Компонент должен добваить обработчики событий", () => {
    const componentClickHandler = sinon.stub();
    const component = new Component({ events: { click: componentClickHandler } });
    const event = new MouseEvent('click');
    component.getContent()?.dispatchEvent(event);
    expect(componentClickHandler.calledOnce).to.be.true;
  });

  it('Компонент должен очищать обработчики событий, после вызова события жизненного цикла ComponentWillUnmount',
    () => {
      const componentClickHandler = sinon.stub();
      const component = new Component({ events: { click: componentClickHandler } });
      component.remove();
      const event = new MouseEvent('click');
      component.getContent()?.dispatchEvent(event);
      expect(componentClickHandler.calledOnce).to.be.false;
    }
  );
});
