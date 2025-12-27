
import { useState } from "react";
import axios from "axios";

export default function Scan() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const scan = async () => {
    const res = await axios.post("http://localhost:5000/api/scan", { url });
    setResult(res.data);
  };

  return (
    <div>
      <h2>TrustLens Scan</h2>
      <input onChange={e => setUrl(e.target.value)} />
      <button onClick={scan}>Scan</button>
      {result && <p>Trust Score: {result.trustScore}</p>}
    </div>
  );
}
