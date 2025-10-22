"use client";

import { WebcamIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import Webcam from "react-webcam";
import { Flex } from "@/components/base/flex";
import { Button } from "@/components/ui/button";

const videoConstraints = {
  facingMode: "environment",
};

function ReceiptScannerForm() {
  const ref = useRef<Webcam>(null);
  const form = useForm();

  const onSubmit = useCallback(async () => {
    if (!ref.current) {
      return;
    }

    const image = ref.current.getScreenshot();

    if (!image) {
      // TODO: Handle error
      return;
    }

    console.log("Captured image:", image);
  }, []);

  return (
    <Flex direction="column" className="gap-4">
      <Webcam
        ref={ref}
        screenshotFormat="image/png"
        screenshotQuality={1}
        videoConstraints={videoConstraints}
      />
      <Button
        variant="outline"
        disabled={form.formState.isSubmitting}
        onClick={form.handleSubmit(onSubmit)}
      >
        <WebcamIcon />
      </Button>
    </Flex>
  );
}

export { ReceiptScannerForm };
