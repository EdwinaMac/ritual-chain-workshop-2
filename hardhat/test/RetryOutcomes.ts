import { expect } from "chai";

type Attempt =
  | "SUCCESS"
  | "FAILURE";

function finalResult(
  attempts: Attempt[]
): string {
  for (
    const attempt of attempts
  ) {
    if (
      attempt === "SUCCESS"
    ) {
      return "RESOLVED";
    }
  }

  return "INVALID";
}

describe("Retry outcomes", function () {
  it("resolves on first attempt", function () {
    expect(
      finalResult([
        "SUCCESS",
        "FAILURE",
        "FAILURE",
      ])
    ).to.equal("RESOLVED");
  });

  it("resolves on second attempt", function () {
    expect(
      finalResult([
        "FAILURE",
        "SUCCESS",
        "FAILURE",
      ])
    ).to.equal("RESOLVED");
  });

  it("resolves on third attempt", function () {
    expect(
      finalResult([
        "FAILURE",
        "FAILURE",
        "SUCCESS",
      ])
    ).to.equal("RESOLVED");
  });

  it("becomes invalid after three failures", function () {
    expect(
      finalResult([
        "FAILURE",
        "FAILURE",
        "FAILURE",
      ])
    ).to.equal("INVALID");
  });

  it("does not depend on attempts after success", function () {
    expect(
      finalResult([
        "SUCCESS",
        "SUCCESS",
        "FAILURE",
      ])
    ).to.equal("RESOLVED");
  });
});
