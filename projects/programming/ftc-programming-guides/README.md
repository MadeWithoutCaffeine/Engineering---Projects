# FTC Programming Guides

[All projects](../../../README.md) · [Project home](README.md) · [Guides](guides.md) · [Examples](examples/README.md) · [Blocks illustrations](blocks.md) · [Results](results.md) · [Sources](sources.md) · [Portfolio](https://github.com/MadeWithoutCaffeine/Michael-Polanczyk-Portfolio)

A practical FTC Java reference for setting up a robot, understanding its code, and building toward autonomous path following. Pick a subject, follow the steps, then try the matching example.

## At a glance

| Field | Details |
| --- | --- |
| Status | Written reference · robot testing pending |
| Goal | Make common FTC programming tasks easier to understand and reuse |
| My role | Subject selection and organization of the learning collection |
| Tools | Java, Android Studio, FTC SDK; Pedro Pathing for the pathing lessons |
| Version baseline | FTC SDK 12.0.0; Pedro revhub 3.0.2 and tuning 1.0.3 |

## Project guide

| Section | What you'll find |
| --- | --- |
| [Guides](guides.md) | Twelve subjects in a suggested learning order |
| [Examples](examples/README.md) | Complete Java files and exact setup requirements |
| [Blocks illustrations](blocks.md) | Block-style logic images for every example and additional lesson fragments |
| [Results](results.md) | What has been checked and what still needs robot testing |
| [Sources](sources.md) | Official references and version details |

## Background

As the programmer for FTC team 3665, I wanted a place to keep useful coding explanations together. The collection starts with basic robot code and builds toward Pedro Pathing. These are teaching examples, not an archive of our competition robot's tested code.

## Approach

Each guide has a question, setup requirements, steps, a Blocks-style illustration, and a suggested test. Start with [setup](01-setup.md), then [telemetry](02-telemetry.md). If you already have working Java code, choose a subject from the guide index.

## Use this collection

1. Open a guide and check its hardware and dependency requirements.
2. Open the linked Java file. On GitHub, use **Download raw file** or copy its contents.
3. Add it to `TeamCode/src/main/java/org/firstinspires/ftc/teamcode/` in an FTC Android Studio project. Keep the filename equal to its public class name.
4. Change the listed hardware names and robot-specific settings.
5. Build, deploy, and run the test described in that guide.

The files here are source examples; this folder is not a complete Android Studio project. The Pedro example additionally needs a configured, tuned Quickstart project and its `pedro.Constants` class.

## Results and limits

All eight examples passed host-side compilation with test doubles and 15 control-flow checks. An Android Studio build with the actual FTC/Pedro dependencies and physical robot tests are still pending. Motor directions, servo travel, odometry settings, and tuning values must come from the actual robot. See [Results](results.md) for the verification scope.

## Next steps

- Build the SDK examples in the team's FTC project.
- Test each example on the matching hardware.
- Add measured observations and team-specific adaptations after testing.
