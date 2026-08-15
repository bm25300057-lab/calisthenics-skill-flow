# Calisthenics Mastery

Build the initial mobile-first UI foundation for my premium calisthenics skill-learning application.

IMPORTANT:
Do NOT implement the entire application in one prompt.
For this stage, focus on the visual system, layouts, navigation and screen structure.

PRODUCT:

This is a premium calisthenics education platform where users learn skills through structured step-by-step pathways taught by one coach.

The app should feel premium, athletic, modern and minimal — NOT like a generic gym tracking application.

TARGET:
Mobile-first users.

CREATE:

Splash/loading screen

Welcome/onboarding screens

Login

Sign up

Goal selection

Current skill level selection

Skill selection

Home dashboard

Skill library

Skill detail

Program/pathway

Lesson screen

Progress screen

Achievements

Profile

Subscription page

Settings

Admin dashboard

NAVIGATION:

Bottom navigation:

Home
Skills
Progress
Profile

Use appropriate navigation for onboarding and authentication.

HOME:

The primary question should be:

"What should I do next?"

Include:

Continue learning

Today's recommended lesson

Current program

Skill progress

Training streak

Recently completed lessons

Recommended next progression

SKILL LIBRARY:

Categories:

Strength
Skills
Advanced

Skills:

Pull-up
Dip
Push-up
Handstand
Muscle-up
Planche
Front Lever
HSPU
90° HSPU
Full Planche

SKILL DETAIL:

Show:

Skill title

Difficulty

Description

Progress

Prerequisites

Number of steps

Estimated pathway

Start/Continue button

PATHWAY:

Display progression vertically with:

Completed
Current
Locked

LESSON SCREEN:

Create the layout for:

Video area

Lesson title

Objective

Prerequisites

Technique explanation

Common mistakes

Regression

Progression

Sets/reps/hold time

Safety notes

Mark Complete

Next Lesson

SUBSCRIPTION:

Create premium locked states and a premium upgrade screen.

ADMIN:

Create a clean admin dashboard UI with sections for:

Skills
Programs
Lessons
Videos
Users
Subscriptions
Analytics

DESIGN:

Mobile-first

Premium athletic aesthetic

Dark UI

Strong typography

Large video cards

Clear CTA buttons

Progress indicators

Excellent spacing

Smooth transitions

Responsive desktop layout as a secondary experience

DO NOT:

add social feeds

add chat

add AI coaching

add leaderboards

add unnecessary features

create fake payment logic

create fake security logic

For now, focus on the UI architecture and reusable components.

Use clean component architecture so we can connect Supabase later.

After implementation, summarize exactly what you created and list any assumptions.

Absolutely. I’d add this as a **dedicated “1-on-1 Personal Training” section**, rather than just putting your WhatsApp/Instagram somewhere in the footer. That makes it a proper conversion point for people who want **physical, in-person coaching**.

Your existing roadmap already includes a profile, admin system, and public-facing product ecosystem, so this fits naturally into it. 

### Add this to the Day 1 Lovable prompt

IMPORTANT ADDITION — 1-ON-1 PERSONAL TRAINING

The app should also promote my separate 1-on-1 PERSONAL TRAINING service.

This is for clients who want physical, in-person calisthenics coaching with me.

Create a dedicated "1-on-1 Personal Training" section that feels premium and professional.

PLACEMENT:

Include a prominent but non-intrusive CTA on:

1. Home/Dashboard

2. Profile

3. A dedicated Personal Training page

4. Optionally near the bottom of the Skill/Program pages

The primary CTA should be:

"Train With Me 1-on-1"

or

"Book Personal Training"

PERSONAL TRAINING PAGE:

Include:

* Professional introduction about the 1-on-1 coaching

* Who the service is for

* What clients can work on

* Personalized skill training

* Technique correction

* Strength development

* Calisthenics skill progression

* In-person coaching

* Location/availability section

* A strong call-to-action

CONTACT OPTIONS:

Provide two clear contact buttons:

1. WhatsApp

   * "Message Me on WhatsApp"

   * Open my WhatsApp contact/chat when tapped.

2. Instagram

   * "DM Me on Instagram"

   * Open my Instagram profile when tapped.

IMPORTANT:

Do not invent my WhatsApp number or Instagram username.

Create placeholders/configuration fields for:

WHATSAPP_NUMBER

INSTAGRAM_USERNAME

PERSONAL_TRAINING_LOCATION

PERSONAL_TRAINING_AVAILABILITY

These should be easy for me to replace later.

MOBILE UX:

The WhatsApp and Instagram buttons should be highly usable on mobile.

Use appropriate icons.

The WhatsApp CTA should use the correct WhatsApp deep-link structure once my number is configured.

The Instagram CTA should link to my actual Instagram profile once the username is configured.

CONVERSION:

The Personal Training CTA should not interfere with the main subscription journey.

The primary product remains the online calisthenics learning platform.

Personal training is a separate premium service for users who want direct, physical, 1-on-1 coaching.

Add a subtle CTA such as:

"Want personal coaching?"

"Train with me 1-on-1."

Do not make the app feel like a generic advertisement.

The section should feel like a natural extension of the coaching brand.

ADMIN:

Add a small "Personal Training Settings" section to the admin dashboard where I can later configure:

* WhatsApp number

* Instagram username

* Training location

* Availability

* Short description

* CTA text

Do not expose these settings to normal users as editable fields.

Keep the design consistent with the existing premium athletic aesthetic.

### And I would add this to the overall app structure

```text

HOME

│

├── Continue Learning

├── Today's Lesson

├── Skill Progress

├── Recommended Progression

│

└── TRAIN WITH ME 1-ON-1

      │

      ├── Personal Training

      ├── What I Offer

      ├── In-Person Coaching

      ├── Location

      └── Contact Me

             ├── WhatsApp

             └── Instagram

```

**One important change:** I would *not* put your personal WhatsApp number directly into the Lovable prompt yet. Keep it as a configuration variable/place­holder until you're ready to provide the actual number and Instagram username. That way Lovable doesn't accidentally invent or hard-code incorrect contact details.

This also gives you **two revenue channels**:

**Online subscription → scalable income**

**1-on-1 physical coaching → high-ticket personal service**

That is a much stronger business model than having the app only sell video subscriptions.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://calisthenics-skill-flow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/575a4a68-68a1-45ce-9241-23ef66c9baa8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
