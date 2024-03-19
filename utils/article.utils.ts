import { IMultiOptionSelect } from "@/components/forms/inputs/MultiSelect";
import { MessageKeys } from "next-intl";

export const getArticleCategoriesOptions = (tArticle: (key: MessageKeys<any, any>) => string): IMultiOptionSelect[] => {
  return [
    {
      label: tArticle('philosophy'),
      value: "philosophy",
    },
    {
      label: tArticle('science'),
      value: "science",
    },
    {
      label: tArticle('technology'),
      value: "technology",
    },
    {
      label: tArticle('geopolitics'),
      value: "geopolitics",
    },
    {
      label: tArticle('sport'),
      value: "sport",
    },
    {
      label: tArticle('religion'),
      value: "religion",
    },
    {
      label: tArticle('history'),
      value: "history",
    },
    {
      label: tArticle('economy'),
      value: "economy",
    },
    {
      label: tArticle('cinema'),
      value: "cinema",
    },
    {
      label: tArticle('literature'),
      value: "literature",
    },
  ];
}
