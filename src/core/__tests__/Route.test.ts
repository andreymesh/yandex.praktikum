import {assert} from "chai";
import Block from "../Block";
import Route from "../Route";

describe("Route", () => {
    let Component: typeof Block;
    const testUrl = "/testUrl";
    const enotherUrl = "/enotherUrl"
    
    before(() => {
        class ComponentClass extends Block {
            public static Name = "TestComponent";
            constructor() {
                super();
            }
            protected render(): string {
                return "<div>Test</div>";
            }
        }
        Component = ComponentClass;
    });

    it("Route корректно создан", () => {
        const route = new Route(testUrl, Component, {});
        assert.equal(route.pathname, testUrl);
    });

    describe("Методы Route", () => {
        let route: Route;
        beforeEach(()=>{
            route = new Route(testUrl, Component, {});
        })

        it("метод match должен вернуть true для того же", () => {
            assert.equal(route.match(testUrl), true);
        });

        it("метод match должен вернуть false для иного урла", () => {
            assert.equal(route.match(enotherUrl), false);
        });

        it("метод navigate работает корректно", () => {
            route.navigate(testUrl);
        });

        it("метод leave работает корректно", () => {
            route.leave();
        });
    });
});
