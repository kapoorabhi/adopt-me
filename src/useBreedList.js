import { useState, useEffect } from "react";

const localCache = {};

const useBreedList = (animal) => {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  const requestBreedList = async () => {
    setBreedList([]);
    setStatus("loading");

    const response = await fetch(
      `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );

    const json = await response.json();

    localCache[animal] = json.breeds || [];
    setBreedList(localCache[animal]);
    setStatus("loaded");
  };

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animal]);

  return [breedList, status];
};

export default useBreedList;
