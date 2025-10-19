import { useEffect } from "react";

import { useRegisterVisit } from "./api/registerVisit";
import { Router } from "./router";

function App() {
  const { mutate: registerVisit } = useRegisterVisit();

  useEffect(() => {
    registerVisit();
  }, [registerVisit]);

  return <Router />;
}

export default App;
