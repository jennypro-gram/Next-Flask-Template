import { Fetcher } from "openapi-typescript-fetch";
import { paths } from "./schema";

const fetcher = Fetcher.for<paths>();

fetcher.configure({
    baseUrl: "http://localhost:8080",
});

export const helloWorld = fetcher.path("/hello-world").method("get").create();
export const getList = fetcher.path("/list").method("get").create();
export const addToList = fetcher.path("/addToList").method("post").create();
