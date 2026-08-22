import { expect } from "chai";

function attemptBlocks(
  firstBlock: bigint,
  frequency: bigint,
  calls: number
): bigint[] {
  const result: bigint[] = [];

  for (
    let i = 0;
    i < calls;
    i++
  ) {
    result.push(
      firstBlock +
      BigInt(i) *
      frequency
    );
  }

  return result;
}

describe("Scheduler retry sequence", function () {
  it("creates three attempts", function () {
    const blocks =
      attemptBlocks(
        1000n,
        200n,
        3
      );

    expect(
      blocks.length
    ).to.equal(3);
  });

  it("spaces attempts by frequency", function () {
    const blocks =
      attemptBlocks(
        1000n,
        200n,
        3
      );

    expect(
      blocks[1] - blocks[0]
    ).to.equal(200n);

    expect(
      blocks[2] - blocks[1]
    ).to.equal(200n);
  });

  it("keeps the first block unchanged", function () {
    const blocks =
      attemptBlocks(
        1000n,
        200n,
        3
      );

    expect(
      blocks[0]
    ).to.equal(1000n);
  });

  it("supports one attempt", function () {
    expect(
      attemptBlocks(
        1000n,
        200n,
        1
      )
    ).to.deep.equal([
      1000n
    ]);
  });
});
