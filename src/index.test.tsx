import nock from "nock";
import { render, screen } from "@testing-library/react";
import Subsidies from "./App";

describe("Subsidies", () => {
  beforeEach(() => {
    nock("http://localhost").get("/dcatd/datasets/yvlbMxqPKn1ULw/purls/72c8_AyB5gvJ4Q").reply(200, {});
  });

  it("should render", async () => {
    render(<Subsidies />);

    await screen.findAllByText("Feiten");
  });
});
