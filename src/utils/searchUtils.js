import axios from "axios";

export const fetchApartments = async (sido, gugun, dong) => {
  console.log({ sido, gugun, dong });

  const response = await axios.post("http://localhost:8080/api/apt/search", {
    sidoName: sido,
    gugunName: gugun,
    dongName: dong,
  });
  if (response.data && response.data.data) {
    console.log(response.data);
    return response.data.data;
  } else {
    throw new Error("Unexpected response structure");
  }
};

export const fetchSido = async () => {
  const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`;
  const response = await axios.get(url);
  if (!response.data || !response.data.regcodes) {
    throw new Error("Failed to fetch sido data");
  }
  return response.data.regcodes.map((region) => ({
    code: region.code,
    name: region.name.split(" ")[0], // 시도 이름
  }));
};

export const fetchRegionData = async (regcode, type) => {
  const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${regcode}&is_ignore_zero=true`;
  const response = await axios.get(url);

  if (!response.data || !response.data.regcodes) {
    throw new Error("Failed to fetch region data");
  }

  return response.data.regcodes.map((region) => {
    const parts = region.name.split(" ");
    return {
      code: region.code,
      name: type === "dong" ? parts[2] || parts[1] : parts[1], // 동은 3번째, 구군은 2번째
    };
  });
};





