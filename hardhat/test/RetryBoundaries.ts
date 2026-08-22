import { expect } from "chai";

function isReady(
  current: bigint,
  scheduled: bigint
) {
  return current >= scheduled;
}

describe("Retry block boundaries", function () {
  it("is not ready before the scheduled block", function () {
    expect(
      isReady(
        999n,
        1000n
      )
    ).to.equal(false);
  });

  it("is ready at the scheduled block", function () {
    expect(
      isReady(
        1000n,
        1000n
      )
    ).to.equal(true);
  });

  it("remains ready after the block", function () {
    expect(
      isReady(
        1001n,
        1000n
      )
    ).to.equal(true);
  });

  it("supports the second attempt", function () {
    const second =
      1000n + 200n;

    expect(
      isReady(
        second,
        second
      )
    ).to.equal(true);
  });

  it("supports the third attempt", function () {
    const third =
      1000n + 400n;

    expect(
      isReady(
        third,
        third
      )
    ).to.equal(true);
  });

  it("keeps attempt ordering", function () {
    const first = 1000n;
    const second = 1200n;
    const third = 1400n;

    expect(
      first
    ).to.be.lessThan(second);

    expect(
      second
    ).to.be.lessThan(third);
  });
});
