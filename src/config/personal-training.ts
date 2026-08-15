/**
 * 1-on-1 Personal Training configuration.
 * Replace these placeholder values with real details (or load them from the
 * backend later — the admin dashboard exposes the same fields).
 */
export const personalTrainingConfig = {
  /** International format, digits only, e.g. "94771234567". Leave empty until configured. */
  WHATSAPP_NUMBER: "",
  /** Instagram handle without the @, e.g. "coachname". Leave empty until configured. */
  INSTAGRAM_USERNAME: "",
  PERSONAL_TRAINING_LOCATION: "Location to be configured",
  PERSONAL_TRAINING_AVAILABILITY: "Availability to be configured",
  SHORT_DESCRIPTION:
    "Direct, in-person calisthenics coaching. We work on your skill goals, correct your technique and build the strength the movement actually demands.",
  CTA_TEXT: "Train With Me 1-on-1",
} as const;

export const whatsappLink = (message = "Hi! I'd like to book 1-on-1 calisthenics training.") =>
  personalTrainingConfig.WHATSAPP_NUMBER
    ? `https://wa.me/${personalTrainingConfig.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : null;

export const instagramLink = () =>
  personalTrainingConfig.INSTAGRAM_USERNAME
    ? `https://instagram.com/${personalTrainingConfig.INSTAGRAM_USERNAME}`
    : null;
