import { RouterProvider } from "react-router";
//import FaceExpression from "./features/Expression/components/FaceExpression";
import { Router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </>
  );
}

export default App;
