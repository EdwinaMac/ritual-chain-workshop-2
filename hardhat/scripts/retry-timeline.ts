function buildTimeline(
  start: bigint,
  frequency: bigint,
  count: number
) {
  const timeline = [];

  for (
    let i = 0;
    i < count;
    i++
  ) {
    timeline.push({
      attempt: i + 1,
      block:
        start +
        BigInt(i) *
        frequency,
    });
  }

  return timeline;
}

async function main() {
  const start = 1000n;
  const frequency = 200n;
  const count = 3;

  console.log(
    "Scheduler retry timeline"
  );

  console.log("");

  const timeline =
    buildTimeline(
      start,
      frequency,
      count
    );

  for (
    const item of timeline
  ) {
    console.log(
      `Attempt ${item.attempt}`
    );

    console.log(
      `Block ${item.block}`
    );

    console.log("");
  }

  console.log(
    "A successful first attempt should cancel the remaining schedule."
  );

  console.log(
    "If all attempts fail, the market can enter Invalid."
  );
}

main().catch(
  console.error
);
