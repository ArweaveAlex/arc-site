import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children?: React.ReactNode;
};

const Portal: React.FC = (props: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        props.children as any,
        document?.querySelector("#portal") as any
      )
    : null;
};

export default Portal;
