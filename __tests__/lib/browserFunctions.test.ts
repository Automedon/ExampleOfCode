import { isBrowser } from "../../lib/browserFunctions";
import { JSDOM } from "jsdom";
import renderer from "react-test-renderer";
import Index from "../../pages";
//import React from "react";
const dom = new JSDOM();

const { window } = dom;
const global: any = {};

describe("Snapshot index page", () => {
  it("index renders correctly", () => {
    expect(isBrowser()).toBeFalsy();
    global.window = window;
    expect(isBrowser()).toBeFalsy();
  });
});
