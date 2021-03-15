import { StoryFn } from "@storybook/addons";
import React, { ReactNode } from "react";

export interface IChartsProvider {
  children: ReactNode;
}

export const ChartsProvider = ({ children }: IChartsProvider) => {
  return (
    <>
      <style>
        {`
          canvas {
            border-radius: 3px;
            transition: box-shadow .05s .1s ease-out;
          }
          canvas:focus {
            outline: none;
            box-shadow: inset 0 0 0 2px #232323;
          }
        `}
      </style>
      {children}
    </>
  );
};

export interface IStorybookThemeProviderProps {
  children: ReactNode;
}

export const StorybookThemeProvider = ({
  children,
}: IStorybookThemeProviderProps) => <ChartsProvider>{children}</ChartsProvider>;

export const withStorybookTheme = (storyFn: StoryFn<any>) => (
  <StorybookThemeProvider>{storyFn()}</StorybookThemeProvider>
);
