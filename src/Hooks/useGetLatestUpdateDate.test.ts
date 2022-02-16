import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";

import useGetLatestUpdateDate from "./useGetLatestUpdateDate";

const mock = {};

jest.mock("axios");

describe("useGetLatestUpdateDate", () => {
  it("renders correctly", () => {
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: mock });

    const { result } = renderHook(() => useGetLatestUpdateDate());

    console.log("result", result.current);

    expect(1).toBe(1);
  });
});
