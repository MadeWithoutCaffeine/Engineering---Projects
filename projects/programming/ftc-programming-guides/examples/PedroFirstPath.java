package org.firstinspires.ftc.teamcode;

import com.pedropathing.api.Paths;
import com.pedropathing.api.PoseFactory;
import com.pedropathing.follower.Follower;
import com.pedropathing.math.Pose;
import com.pedropathing.paths.Path;
import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.util.ElapsedTime;
import org.firstinspires.ftc.teamcode.pedro.Constants;

@Autonomous(name = "Guide - Pedro First Path", group = "Guides")
public class PedroFirstPath extends LinearOpMode {
    @Override public void runOpMode() throws InterruptedException {
        // Pedro revhub 3.0.2. Requires a configured and tuned Constants.create().
        // Confirm field placement and motion constraints before PLAY.
        Follower follower = Constants.create(hardwareMap);
        if (follower == null) {
            telemetry.addData("Setup required", "Complete pedro.Constants.create() first");
            telemetry.update();
            return;
        }
        PoseFactory poses = PoseFactory.degrees();
        Pose startPose = poses.of(24, 24, 0);
        Pose endPose = poses.of(36, 24, 0);
        Path path = Paths.line(startPose, endPose).linear(startPose, endPose);
        follower.setPose(startPose);
        telemetry.addData("Ready", "Place at (24,24,0); path ends at (36,24,0)");
        telemetry.update();
        waitForStart();
        if (isStopRequested()) return;
        ElapsedTime timer = new ElapsedTime();
        try {
            follower.follow(path);
            timer.reset();
            while (opModeIsActive()) {
                follower.update();
                Pose currentPose = follower.pose();
                telemetry.addData("X (in)", "%.2f", currentPose.x());
                telemetry.addData("Y (in)", "%.2f", currentPose.y());
                telemetry.addData("Heading (deg)", "%.1f",
                        Math.toDegrees(currentPose.heading()));
                telemetry.addData("Mode", follower.mode());
                telemetry.addData("Busy", follower.isBusy());
                telemetry.update();
                if (!follower.isBusy() || timer.seconds() >= 8.0) break;
                idle();
            }
            telemetry.addData("Result", isStopRequested() ? "Stopped" :
                    (follower.isBusy() ? "Timeout" : "Follower reports complete"));
            telemetry.update();
        } finally {
            // Stop the drivetrain directly even if localization/update has failed.
            try {
                follower.stop();
            } finally {
                follower.drivetrain.stop();
            }
        }
        while (opModeIsActive()) idle();
    }
}
