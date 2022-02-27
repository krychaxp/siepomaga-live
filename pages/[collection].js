import { useQuery } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const { collection, refetchInterval = 60_000 } = router.query;

  const { data, isLoading, error } = useQuery(
    ["collection", collection],
    () => axios.get(`/api/${collection}`).then((res) => res.data),
    {
      enabled: !!collection,
      refetchInterval: +refetchInterval,
    }
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.payments.map(
        ({ id, paid_at, signature, amount, photo_url, comment_text }) => (
          <div
            key={id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{signature}</span> <span>{amount || "ukryte"} zł</span>
          </div>
        )
      )}
    </div>
  );
}
