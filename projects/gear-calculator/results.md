# Gear Calculator — Results and Limits

[All projects](../../README.md) · [Project home](README.md) · [Story](build-log.md) · [Code illustrations](photos.md) · [Results](results.md) · [Sources](sources.md) · [Portfolio](https://github.com/MadeWithoutCaffeine/Michael-Polanczyk-Portfolio)

The automated checks run the actual JavaScript extracted from the downloadable HTML file.

**Checked November 12, 2026:** 13 known-output cases, 17 invalid-input cases, and 2,000 generated gear trains passed. The table below shows seven of the known-output cases.

| Case | Input | Expected output |
| --- | --- | --- |
| Reduction | 20 → 40 teeth, 1 N·m, 100 RPM | 2:1, 2 N·m, 50 RPM, opposite direction |
| Speed increase | 40 → 20 teeth, 1 N·m, 100 RPM | 0.5:1, 0.5 N·m, 200 RPM, opposite direction |
| Intermediate gear | 20 → 80 → 40 teeth, 1 N·m, 100 RPM | 2:1, 2 N·m, 50 RPM, same direction |
| Compound example | 12 → 36 / 10 → 40, shared middle shaft, 1 N·m, 120 RPM | 12:1, 12 N·m, 10 RPM, same direction |
| Chain | 40 → 20 teeth, 1 N·m, 100 RPM | 0.5:1, 0.5 N·m, 200 RPM, same direction |
| Nine equal gears | Nine 20-tooth gears, eight meshes, 1 N·m, 100 RPM | 1:1, 1 N·m, 100 RPM, same direction |
| Zero input | 20 → 40 teeth, 0 N·m, 0 RPM | 0 N·m, 0 RPM |

Run the repeatable checks with `node check.cjs` from this folder. Node is only needed for these checks, not to use the calculator.

The expanded checks cover pitch-diameter inputs, same-shaft and mixed connections, zero torque/speed, every intermediate stage, input preservation, invalid data, and numerical overflow or underflow. Generated cases use a fixed seed, compare with an independent log-ratio reference, and check ideal-power conservation and direction.

The calculation visits each gear once and uses no third-party runtime libraries. With two to nine gears, its time and memory use are small.

These are calculation tests. A browser launch and local-file browser check were blocked by the testing environment, so browser interaction and appearance remain unverified. No physical torque or speed measurements have been made.
