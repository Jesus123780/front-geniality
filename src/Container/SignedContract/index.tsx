import React, { useState } from "react";
import { TermsAndCondition } from "../../stories/pages/TermsAndCondition";

export const SignedContract = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  }

  return <TermsAndCondition onChange={onChange} checked={isChecked} />;
};
