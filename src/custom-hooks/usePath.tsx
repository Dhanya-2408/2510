import { useLocation, useParams, useSearchParams } from "react-router-dom";

function usePath() {
  const { pathname } = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();

  const getFindPath = (pathIdx: number = 0): string => {
    const splitPath: string[] = pathname.split("/").filter(Boolean);
    return splitPath[pathIdx];
  };

  const getSearchParams = (name: string) => {
    return searchParams.get(name);
  };

  return { getFindPath, params, getSearchParams };
}

export default usePath;
