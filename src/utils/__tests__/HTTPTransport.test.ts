import { expect } from "chai";
import sinon from "sinon";
import { HTTPTransport } from "../HTTPTransport";
import { BASE_API_URL } from "../../config";


describe("Проверяем HTTPTransport", () => {
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: Array<sinon.SinonFakeXMLHttpRequest> = [];
  let http: HTTPTransport;

  beforeEach(() => {
    http = new HTTPTransport();
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
    requests = [];
  });

  afterEach(() => {
    sinon.restore();
    requests = [];
  });

  it("Должны отправляться POST-запросы", async () => {
    const request = sinon.stub(http, "post").resolves();
    await http.post("");
    expect(request.called).to.be.true;
  });

  it("Должны отправляться PUT-запросы", async () => {
    const request = sinon.stub(http, "put").resolves();
    await http.put("");
    expect(request.called).to.be.true;
  });

  it("Должны отправляться DELETE-запросы", async () => {
    const request = sinon.stub(http, "delete").resolves();
    await http.delete("");
    expect(request.called).to.be.true;
  });

  it("Должны отправляться GET-запросы", async () => {
    const request = sinon.stub(http, "get").resolves();
    await http.get("");
    expect(request.called).to.be.true;
  });

  it("GET-запрос должен корректно преобразовать объект params в строку запроса, где все параметры строкового типа",
    () => {
      const expectedUrl = `${BASE_API_URL}/testEndpoint?prop1=val1&prop2=val2`;
      
      http.get("/testEndpoint", { params: { prop1: "val1", prop2: "val2" } });
      expect(requests[0]?.url).to.equal(expectedUrl);
    }
  );

  it("GET-запрос должен корректно преобразовать объект params в строку запроса,"
    + " где параметры строкового или числового типа",
    () => {
      const expectedUrl = `${BASE_API_URL}/testEndpoint?prop1=val1&prop2=2`;

      http.get("/testEndpoint", { params: { prop1: "val1", prop2: 2 } });
      expect(requests[0]?.url).to.equal(expectedUrl);
    });

  it("GET-запрос должен корректно обрабатывать пробельные символы в URL", () => {
    const expectedUrl = `${BASE_API_URL}/testEndpoint?prop=val1%20val2`;
            
    http.get("/testEndpoint", { params: { prop: "val1 val2" } });
    expect(requests[0]?.url).to.equal(expectedUrl);
  });

  it("GET-запрос должен корректно обрабатывать кириллицу в URL", () => {
    const expectedUrl
      = `${BASE_API_URL}/testEndpoint?prop1=%D0%BA%D0%B8%D1%80%D0%B8%D0%BB%D0%BB%D0%B8%D1%86%D0%B0`;
            
    http.get("/testEndpoint", { params: { prop1: "кириллица" } });
    expect(requests[0]?.url).to.equal(expectedUrl);
  });
});
