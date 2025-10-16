import { differenceInYears, isValid } from "date-fns";
import z from "zod";

const MIN_AGE = 18;
const MAX_AGE = 100;

function validateDateOfBirth(dateString: string) {
  const date = new Date(dateString);

  if (!isValid(date)) {
    return false;
  }

  const today = new Date();
  const age = Math.abs(differenceInYears(date, today));

  if (age < MIN_AGE || age > MAX_AGE) {
    return false;
  }

  return true;
}

export const OnboardingProfileDataSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { error: "Last name must be at least 2 characters." }),
  dateOfBirth: z.string().refine(validateDateOfBirth, {
    error: `You must be between ${MIN_AGE} and ${MAX_AGE} years old.`,
  }),
  gender: z.enum(["male", "female"], {
    error: "Please select a valid gender.",
  }),
  state: z.string().min(2, { error: "State must be at least 2 characters." }),
  city: z.string().min(2, { error: "City must be at least 2 characters." }),
  zipCode: z
    .string()
    .min(2, { error: "Zip code must be at least 2 characters." }),
});
