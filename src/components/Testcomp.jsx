import React from "react";
import { useReadContract } from "thirdweb/react";
import { BSCTESTCONTRACT } from "../constants/constanst";

const Testcomp = () => {
  const { data: owner, loading: loadingOwner } = useReadContract({
    contract: BSCTESTCONTRACT,
    method: "getOwner",
  });
  return (
    <div>
      {loadingOwner ? <p>...</p> : <p>Contract Owner:{owner?.toString()}</p>}
    </div>
  );
};

export default Testcomp;
