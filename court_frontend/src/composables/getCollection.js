import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetCollection(
  items,
  setItems,
  search,
  query,
  offset
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setItems([]);
  }, [query, search]);

  useEffect(() => {
    const params = { offset: offset, search: search, ...query };
    // console.log(params);
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://localhost:8000/basic_court/api/cases/",
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      params: params,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        // console.log(res.data);
        setItems([...res.data]);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [search, query, offset]);

  return { loading, error, hasMore };
}
