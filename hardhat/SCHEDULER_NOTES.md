# Scheduler Notes

I spent some time trying to understand why the market books multiple
resolution attempts instead of simply scheduling one callback.

The answer is reliability.

## Three Attempts

The workshop schedules three calls.

The calls are separated by a fixed number of blocks.

Conceptually:

Attempt 1
-> resolve block

Attempt 2
-> resolve block + frequency

Attempt 3
-> resolve block + frequency * 2

## Why Retry

The external resolution path can fail.

A failure should not automatically mean:

NO

That would confuse "the prediction is false" with "we could not obtain the
data."

The contract treats those situations differently.

## Successful First Attempt

If the first attempt works, the remaining scheduled calls do not need to run.

## Failed Attempts

If one attempt fails, the Scheduler can try again.

If all attempts fail, the market can become Invalid.

## What I Found Useful

Thinking about the Scheduler as a retry mechanism made the callback code easier
to understand.

It is not a second oracle.

It is a way of giving the oracle path multiple opportunities to succeed.
