"use server";
import { validateRequest } from "@/auth";
import { createStorySchema } from "@/validation";

export const submitStory = async (input: string) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");
  const dataStory = {
    content: input,
    imageUrl: input,
    videoUrl: input,
  };
  const validateInput = createStorySchema.parse(dataStory);
};
