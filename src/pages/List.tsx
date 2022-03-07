import axios from 'axios';
import React, { useEffect, useState } from 'react';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
  const loadData = async () => {
    await axios
      .get(
        `https://api.odcloud.kr/api/15099285/v1/uddi:57e7fc08-b32c-482d-8dc7-ab02864a70b7?serviceKey=${SERVICE_KEY}&page=1&perPage=10`,
      )
      .then((res) => {
        const jsonRes = res.data;
        setData(jsonRes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(data);

  return <div></div>;
};

export default List;
