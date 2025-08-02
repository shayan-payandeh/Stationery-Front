import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ChangeEvent } from "react";

export const queryHandler = (
  e:
    | ChangeEvent<HTMLSelectElement>
    | { target: { name: string; value: string } },
  searchParams: URLSearchParams,
  router: AppRouterInstance,
  pathname: string,
) => {
  const newUrlParams = new URLSearchParams(searchParams);
  newUrlParams && e.target.value
    ? newUrlParams.set(`${e.target.name}`, `${e.target.value}`)
    : newUrlParams.delete(`${e.target.name}`);

  // remove page (in query) when we select filter section
  // we should assure that we dont remove page (in query) when we change the page number
  if (isNaN(parseInt(e.target.value)) && newUrlParams.get("page")) {
    newUrlParams.delete("page");
  }
  router.push(`${pathname}?${newUrlParams.toString()}`);
};
