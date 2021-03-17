// import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { withStorybookTheme } from "../src/lib/storybook";

export const parameters = {
  options: {
    storySort: {
      order: [
        "Charts",
        [
          "Line",
          "Area",
          "Stacked line",
          "Bar",
          "Doughnut",
          "Pie",
          "Bubble",
          "States",
        ],
      ],
    },
  },
  // Remove an additional padding in canvas body (Added in v.6)
  layout: "fullscreen",
  docs: {
    page: null,
    inlineStories: false,
  },
};

export const decorators = [withA11y, withStorybookTheme];
