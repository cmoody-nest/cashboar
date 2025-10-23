"use client";

import { WebcamIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactCrop, { type Crop } from "react-image-crop";
import Webcam from "react-webcam";
import { Flex } from "@/components/base/flex";
import { Button } from "@/components/ui/button";
import "react-image-crop/dist/ReactCrop.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import z from "zod";
import { Form, FormField } from "@/components/ui/form";
import { submitDocumentForProcessing } from "@/lib/veryfi/actions";

const videoConstraints = {
  facingMode: "environment",
};

const formSchema = z.object({
  image: z.string().min(1, "Image is required"),
});

type FormValues = z.infer<typeof formSchema>;

async function convertImageToCanvas(source: string, crop?: Crop) {
  const canvas = document.createElement("canvas");
  const image = new window.Image();
  image.src = source;

  await image.decode();

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = (crop?.width ?? image.width) * scaleX;
  canvas.height = (crop?.height ?? image.height) * scaleY;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.drawImage(
      image,
      (crop?.x ?? 0) * scaleX,
      (crop?.y ?? 0) * scaleY,
      (crop?.width ?? image.width) * scaleX,
      (crop?.height ?? image.height) * scaleY,
      0,
      0,
      (crop?.width ?? image.width) * scaleX,
      (crop?.height ?? image.height) * scaleY,
    );
  }

  return canvas;
}

function ReceiptScannerForm() {
  const [crop, setCrop] = useState<Crop>();
  const ref = useRef<Webcam>(null);

  const form = useForm<FormValues>({
    mode: "onTouched",
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
    },
  });

  const submitReceiptMutation = useMutation({
    mutationKey: ["submit-receipt"],
    mutationFn: async (imageDataUrl: string) => {
      const formData = new FormData();
      formData.append("url", imageDataUrl);

      await submitDocumentForProcessing(formData);
    },
    onSuccess: () => {
      toast.success("Receipt submitted successfully");
      form.reset();
    },
    onError: () => {
      toast.error("Failed to submit receipt. Please try again.");
    },
  });

  const onCaptureClick = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const image = ref.current.getScreenshot();

    if (!image) {
      // TODO: Handle error
      return;
    }

    form.setValue("image", image, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [form]);

  const onRecaptureClick = useCallback(() => {
    form.setValue("image", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [form]);

  const onSubmit = useCallback(
    async ({ image }: FormValues) => {
      if (!image) {
        return;
      }

      const canvas = await convertImageToCanvas(image, crop);
      const url = canvas.toDataURL("image/png");

      await submitReceiptMutation.mutateAsync(url);

      canvas.remove();
    },
    [crop, submitReceiptMutation],
  );

  return (
    <Form {...form}>
      <FormField
        name="image"
        control={form.control}
        render={({ field }) => {
          if (field.value) {
            return (
              <Flex direction="column" className="gap-4">
                <ReactCrop crop={crop} onChange={setCrop}>
                  <Image
                    width={450}
                    height={450}
                    src={field.value}
                    alt="Captured"
                  />
                </ReactCrop>
                <Flex direction="column" className="gap-2">
                  <Button
                    type="button"
                    className="cursor-pointer"
                    disabled={
                      form.formState.isSubmitting ||
                      submitReceiptMutation.isPending
                    }
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Submit Receipt
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    disabled={
                      form.formState.isSubmitting ||
                      submitReceiptMutation.isPending
                    }
                    onClick={onRecaptureClick}
                  >
                    Re-capture
                  </Button>
                </Flex>
              </Flex>
            );
          }

          return (
            <Flex direction="column" className="gap-4">
              <Webcam
                ref={ref}
                screenshotFormat="image/png"
                screenshotQuality={1}
                width={450}
                height={450}
                videoConstraints={videoConstraints}
              />
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={onCaptureClick}
              >
                <WebcamIcon />
              </Button>
            </Flex>
          );
        }}
      />
    </Form>
  );
}

export { ReceiptScannerForm };
