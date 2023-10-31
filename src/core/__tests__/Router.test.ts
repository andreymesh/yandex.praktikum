import { assert, expect } from "chai";
import sinon from "sinon";
import Router from "../Router";
import { Error404, Error500 } from "../../Pages";


describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router(".app");

  });
  const setRouters = () => {
    if (router) {
      router
        .use("/login", Error404)
        .use("/sign-up", Error500)
    }
  }

  it("Router создан корректно", () => {
    expect(router).not.null;
    expect(router.currentRoute).to.be.undefined;
  });

  it("Router должен быть синглтоном", () => {

    const router1 = new Router(".app1");
    assert.equal(router1, router);
  });

  describe("Методы Router-а", () => {
    it("use возвращает instance роута и добавляет новый роут", () => {
      assert.equal(router.getRoute("/login"), null);
      assert.equal(router.use("/login", Error404), router);
      expect(router.getRoute("/login")).not.null;
    });
      
    it("getRoute должен веруть роут или null", () => {
      setRouters();
      expect(router.getRoute("/login")).not.null;
    });


    it("start добавляет event onpopstate", () => {
      assert.equal(window.onpopstate, null);
      router.start();
      expect(window.onpopstate).not.null;
    });

    describe("Методы Navigate", () => {
      beforeEach(() => {
        setRouters();
      });

      it("go работает корректно", () => {
        const pushState = sinon.spy(window.history, "pushState");
        assert.equal(window.location.pathname, "/");
        router.go("/login");
        assert.equal(window.location.pathname, "/login");
        assert(pushState.calledOnce);
      });

      it("back работает корректно", () => {
        const back = sinon.spy(window.history, "back");
        router.go("/login");
        router.go("/signup");
        router.back();
        assert(back.calledOnce);
      });

      it("forward работает корректно", () => {
        const forward = sinon.spy(window.history, "forward");
        router.forward();
        assert(forward.calledOnce);
      });
    });
  });
});
